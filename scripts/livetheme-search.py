# /// script
# dependencies = ["pysr", "numpy"]
# ///
"""Find a compact CSS expression for each colour curve, by symbolic regression.

generate-livetheme.ts writes livetheme-curves.json: for every quantity the stylesheet
has to compute, the inputs CSS will actually have at that point and the value MCU
produces. This searches an expression tree for each one and writes livetheme-fits.json
back, which the generator then emits verbatim.

Why a search rather than a least-squares fit: a fit that is linear in its parameters can
only ever produce SUMS of whatever basis you picked in advance. The shapes that
actually win here are factored -- ".013*(a - .1*b)*l" -- and no basis of that size
expresses them. min/max matter too: several roles flip tone discontinuously once
contrast demands it, which a smooth model cannot follow at any length.

Complexity is denominated in CSS BYTES (a variable costs 1, a constant 5, "*" 1,
" + " 3), so PySR's Pareto front is directly the size/accuracy tradeoff, and the
front entry chosen is the shortest one meeting the accuracy target.

  uv run scripts/livetheme-search.py [--curves N] [--iters N] [--only ROLE]
"""

import argparse
import json
import math
import os
import re
import sys
import time
from pathlib import Path

# PySR converts every front entry through sympy, which recurses once per node. The
# palette curves are allowed to be long (see PALETTE_SIZE in the generator), and at
# that depth the default 1000 is not enough.
sys.setrecursionlimit(40000)

# Julia sizes a heap per worker and takes a thread per core by default; unbounded,
# that is enough to take a workstation down. Must be set before juliacall loads.
os.environ.setdefault("JULIA_NUM_THREADS", "2")
os.environ.setdefault("PYTHON_JULIACALL_HEAP_SIZE_HINT", "1200M")
for _v in ("OMP_NUM_THREADS", "OPENBLAS_NUM_THREADS", "MKL_NUM_THREADS"):
    os.environ.setdefault(_v, "1")

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
# Both are build outputs, not sources. The curves dump is a regenerable intermediate;
# the fits are the expensive result, produced by CI and published as an artifact.
# --fits points at a downloaded copy, e.g. ~/Downloads/livetheme-fits.json.
CURVES = ROOT / "build" / "livetheme-curves.json"
DEFAULT_FITS = ROOT / "build" / "livetheme-fits.json"

NUMBER = re.compile(r"-?(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?")
PREC_SUM, PREC_PRODUCT, PREC_ATOM = 1, 2, 3


class _Raw:
    """already-rendered text, so collected terms can be re-emitted without reparsing"""

    def __init__(self, text: str):
        self.text = text


# scripts/dev-css-ops.py re-derives this table from the installed browsers.
BINARY_OPERATORS = ["+", "-", "*", "min", "max", "hypot"]
UNARY_OPERATORS = ["abs", "sign", "round"]
# bytes each costs to print, e.g. "abs(" + ")" = 5, "round(x,1)" wraps 9 around x
OPERATOR_BYTES = {
    "+": 3,
    "-": 3,
    "*": 1,
    "min": 6,
    "max": 6,
    "hypot": 8,
    "abs": 5,
    "sign": 6,
    "round": 9,
}


# --- printing ---------------------------------------------------------------
# PySR emits a raw parse tree: "(((b * -0.1) + a) * (0.013 * l))". Most of those
# parentheses are structural, every constant carries full float precision, and
# negatives arrive as "+ -c". Printed naively that is a third larger than it needs
# to be, and size is half the objective.
def format_number(x: float) -> str:
    """CSS number. Lossless on purpose -- dropping digits changes the function, so
    it belongs in `shrink` where it is checked against the error budget."""
    if x == int(x) and abs(x) < 1e15:
        return str(int(x))
    s = repr(float(x))
    if "e" in s or "E" in s:  # calc() has no exponent notation
        s = f"{x:.20f}".rstrip("0").rstrip(".")
    return re.sub(r"^(-?)0\.", r"\1.", s) or "0"


def _flatten_product(node):
    import ast

    if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Mult):
        c1, f1 = _flatten_product(node.left)
        c2, f2 = _flatten_product(node.right)
        return c1 * c2, f1 + f2
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.USub):
        c, f = _flatten_product(node.operand)
        return -c, f
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return float(node.value), []
    return 1.0, [node]


def _flatten_sum(node):
    import ast

    if isinstance(node, ast.BinOp) and isinstance(node.op, (ast.Add, ast.Sub)):
        left = _flatten_sum(node.left)
        right = _flatten_sum(node.right)
        if isinstance(node.op, ast.Sub):
            right = [(-s, c, f) for s, c, f in right]
        return left + right
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.USub):
        return [(-s, c, f) for s, c, f in _flatten_sum(node.operand)]
    c, f = _flatten_product(node)
    return [(1.0, c, f)]


def _render_product(coef, factors):
    if not factors:
        return format_number(coef)
    parts = []
    if abs(coef - 1.0) > 1e-12:
        parts.append("-1" if abs(coef + 1.0) < 1e-12 else format_number(coef))
    for f in factors:
        if isinstance(f, _Raw):
            parts.append(f.text)
            continue
        s, p = _emit(f)
        parts.append(f"({s})" if p < PREC_PRODUCT else s)
    return "*".join(parts)


def _emit(node):
    """returns (text, precedence)"""
    import ast

    if isinstance(node, ast.Expression):
        return _emit(node.body)
    if isinstance(node, ast.Name):
        return node.id, PREC_ATOM
    if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
        return format_number(float(node.value)), PREC_ATOM
    if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
        fn = node.func.id
        args = [_emit(a)[0] for a in node.args]
        # A call whose arguments are all constant is a constant. The search emits
        # these constantly -- abs(abs(sign(b))), max(-.942,-1.1), round(round(-1.4)) --
        # and printing them verbatim inflates every byte count with dead weight.
        # abs and sign are idempotent, and the search stacks them
        while fn in ("abs", "sign") and len(args) == 1 and args[0].startswith(f"{fn}("):
            args = [args[0][len(fn) + 1 : -1]]
        if all(NUMBER.fullmatch(a) for a in args):
            value = (
                EVAL_FUNCTIONS[fn](*(float(a) for a in args))
                if fn in EVAL_FUNCTIONS
                else None
            )
            if value is not None:
                return format_number(float(value)), PREC_ATOM
        # CSS round() takes an explicit step; Julia's takes one argument
        if fn == "round" and len(args) == 1:
            args.append("1")
        return f"{fn}({','.join(args)})", PREC_ATOM
    if isinstance(node, ast.BinOp) and isinstance(node.op, (ast.Add, ast.Sub)):
        terms = _flatten_sum(node)
        const = sum(s * c for s, c, f in terms if not f)
        terms = [t for t in terms if t[2]]
        # Collect like terms so that "b - b" cancels instead of being printed. The
        # search produces these often; without this they survive into the stylesheet.
        collected: dict[str, float] = {}
        for sign, coefficient, factors in terms:
            text = _render_product(1.0, factors)
            collected[text] = collected.get(text, 0.0) + sign * coefficient
        chunks = []
        for text, coefficient in collected.items():
            if abs(coefficient) < 1e-12:
                continue
            chunks.append(
                (coefficient < 0, _render_product(abs(coefficient), [_Raw(text)]))
            )
        chunks.sort(key=lambda ch: ch[0])  # positives first, no leading "-"
        if abs(const) > 1e-12 or not chunks:
            chunks.insert(0, (const < 0, format_number(abs(const))))
        neg0, head = chunks[0]
        # An all-negative sum has no positive term to lead with, and calc() has no
        # unary minus: "-b" and "-max(a,b)" are parse errors. Firefox rejects them and
        # takes the whole declaration -- and every light-dark() and palette built on
        # it -- with them; Chrome happens to accept them, so this only shows up there.
        # A leading "-" is only safe when it lands on a number, where it is part of
        # the literal rather than an operator.
        out = head if not neg0 else ("-" + head if NUMBER.match(head) else "-1*" + head)
        for neg, txt in chunks[1:]:
            out += (" - " if neg else " + ") + txt
        return out, PREC_SUM
    if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Mult):
        return _render_product(*_flatten_product(node)), PREC_PRODUCT
    if isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.USub):
        # Python parses "-0.9" as USub applied to 0.9, so without this a negative
        # literal prints as "-1*.9" -- ugly, and it defeats the constant folding above
        # because the argument no longer looks like a number.
        if isinstance(node.operand, ast.Constant) and isinstance(
            node.operand.value, (int, float)
        ):
            return format_number(-float(node.operand.value)), PREC_ATOM
        s, p = _emit(node.operand)
        return "-1*" + (f"({s})" if p < PREC_PRODUCT else s), PREC_PRODUCT
    raise ValueError(f"unsupported node {type(node).__name__}")


def to_css(expr: str) -> str:
    import ast

    try:
        return _emit(ast.parse(expr.strip(), mode="eval").body)[0]
    except Exception:  # noqa: BLE001 -- printing is best-effort; on any surprise
        return expr  # node shape, fall back to what the search produced


# --- scoring ----------------------------------------------------------------
def _css_round(x, step=1):
    """CSS round(x, step) is "nearest multiple of step". numpy's second argument is
    decimal places, so np.round would silently score a different function than the
    one being emitted."""
    return np.round(np.asarray(x, float) / step) * step


EVAL_FUNCTIONS = {
    "min": np.minimum,
    "max": np.maximum,
    "hypot": np.hypot,
    "abs": np.abs,
    "sign": np.sign,
    "round": _css_round,
}


def evaluate(expr, env):
    try:
        v = eval(expr, {"__builtins__": {}, **EVAL_FUNCTIONS}, env)
    except Exception:  # noqa: BLE001 -- evaluating a machine-generated expression
        return None  # can raise almost anything; every failure means "unusable"
    v = np.asarray(v, dtype=float)
    return v if np.all(np.isfinite(v)) else None


def error(expr, env, y, w, scale):
    """weighted RMSE, expressed in dE so every curve shares one budget"""
    v = evaluate(expr, env)
    if v is None:
        return math.inf
    v = np.broadcast_to(v, y.shape)
    return float(np.sqrt(np.sum(w * (v - y) ** 2) / np.sum(w)) * scale)


def shrink(expr, env, y, w, scale, bound):
    """Cut decimal places, smallest-magnitude constants first, while the error stays
    inside the budget. Worth ~1 byte per place per constant, and a constant that
    rounds to 0 or 1 removes a whole term or factor."""
    spans = [(m.start(), m.end()) for m in NUMBER.finditer(expr)]
    vals = [float(expr[s:e]) for s, e in spans]

    def rebuild(vs):
        out, last = [], 0
        for (s0, e0), v in zip(spans, vs):
            out.append(expr[last:s0])
            out.append(repr(v))
            last = e0
        out.append(expr[last:])
        return "".join(out)

    for i in sorted(range(len(vals)), key=lambda i: abs(vals[i])):
        keep = vals[i]
        for places in range(1, 8):
            r = round(keep, places)
            if r == keep:
                break
            vals[i] = r
            if error(rebuild(vals), env, y, w, scale) <= bound:
                break
            vals[i] = keep
    return rebuild(vals)


def least_squares_candidate(env, y, w, names):
    """A closed-form fit over a fixed basis, offered alongside the searched trees.

    Tree search wins where the shape is factored or discontinuous. It loses badly
    where the target is a smooth low-degree curve buried in noise -- which is exactly
    the palette gamut: MCU's cusp comes from a greedy integer tone walk, so it jitters
    by ~12 dE, and no model should chase that. Least squares lands on the trend in
    closed form and sits at that floor; the search wandered 50% above it and spent
    min/max building a staircase.

    On the unit circle a^2 + b^2 = 1, so every trig polynomial of degree d is
    P(b) + a*Q(b) -- 2d+1 monomials, and no trigonometry is needed to evaluate them.
    """
    a, b = env.get("a"), env.get("b")
    if a is None or b is None:
        return None

    labels = ["1"]
    columns = [np.ones_like(y)]
    for degree in range(1, 7):
        labels.append("*".join(["b"] * degree))
        columns.append(b**degree)
    for degree in range(6):
        labels.append("*".join(["a"] + ["b"] * degree))
        columns.append(a * b**degree)
    for extra in ("l", "c", "sl"):  # whatever else this curve was given
        if extra in names:
            for label, column in (
                (extra, env[extra]),
                (f"{extra}*a", env[extra] * a),
                (f"{extra}*b", env[extra] * b),
            ):
                labels.append(label)
                columns.append(column)

    matrix = np.column_stack(columns)
    sqrt_w = np.sqrt(w)

    def solve(keep):
        coef, *_ = np.linalg.lstsq(
            matrix[:, keep] * sqrt_w[:, None], y * sqrt_w, rcond=None
        )
        residual = matrix[:, keep] @ coef - y
        return coef, float(np.sqrt(np.sum(w * residual**2) / np.sum(w)))

    keep = list(range(len(labels)))
    coef, best = solve(keep)
    # Drop terms while the fit stays within a few percent: the tail of a least-squares
    # fit is usually chasing noise, and every term costs bytes.
    while len(keep) > 1:
        contribution = [
            abs(coef[i]) * float(np.std(matrix[:, k])) for i, k in enumerate(keep)
        ]
        drop = int(np.argmin(contribution))
        trial = [k for j, k in enumerate(keep) if j != drop]
        trial_coef, trial_err = solve(trial)
        if trial_err > best * 1.02 + 1e-12:
            break
        keep, coef, best = trial, trial_coef, max(trial_err, best)

    parts = [
        (float(coef[i]), labels[k])
        for i, k in enumerate(keep)
        if abs(float(coef[i])) > 0
    ]
    if not parts:
        return "0"
    return " + ".join(f"{c}" if lab == "1" else f"{c}*{lab}" for c, lab in parts)


def search(curve, iters, maxsize, sub):
    # imported lazily: --check-ops needs none of this, and loading PySR pulls in a
    # Julia runtime that takes a while to start
    from pysr import PySRRegressor

    maxsize = curve.get("maxsize", maxsize)
    env_full = {k: np.array(v) for k, v in curve["vars"].items()}
    y = np.array(curve["y"])
    w = np.array(curve.get("w") or np.ones_like(y))
    # w is a genuine weight, not a 0/1 mask: the generator zeroes samples it knows are
    # unfittable, but hue curves are additionally chroma-weighted, so their weights
    # run around 1e-4..1e-2. Thresholding at 0.5 discarded every sample of every hue
    # curve -- 60 of 178 -- and the search then crashed on an empty array.
    keep = w > 0
    env = {k: v[keep] for k, v in env_full.items()}
    y, w = y[keep], w[keep]
    if len(y) < 8:
        # Too few samples to search. Report the constant's REAL error rather than 0:
        # a fake zero would make an unfittable curve look like the best fit in the set.
        css = format_number(float(np.average(y, weights=w)) if len(y) else 0.0)
        constant_error = error(css, env, y, w, curve["scale"]) if len(y) else 0.0
        return css, constant_error, constant_error
    w = w / w.mean()  # keep the weighted loss on the same scale for every curve
    names = list(env)

    X = np.column_stack([env[k] for k in names])
    if len(y) > sub:  # even stride keeps hue coverage uniform
        idx = np.linspace(0, len(y) - 1, sub).astype(int)
        Xf, yf, wf = X[idx], y[idx], w[idx]
    else:
        Xf, yf, wf = X, y, w

    model = PySRRegressor(
        niterations=iters,
        binary_operators=BINARY_OPERATORS,
        unary_operators=UNARY_OPERATORS,
        maxsize=maxsize,
        populations=int(os.environ.get("POPS", "20")),
        parallelism="serial",
        progress=False,
        verbosity=0,
        temp_equation_file=True,
        # complexity is denominated in the bytes the operator costs to PRINT, so the
        # Pareto front is directly the size/accuracy tradeoff
        complexity_of_variables=1,
        complexity_of_constants=5,
        complexity_of_operators=OPERATOR_BYTES,
    )
    model.fit(Xf, yf, weights=wf, variable_names=names)

    target = curve["target"]
    scale = curve["scale"]
    # re-score the whole front on the FULL sample; it was fitted on a subsample
    scored = [
        (error(str(r["equation"]), env, y, w, scale), str(r["equation"]))
        for _, r in model.equations_.iterrows()
    ]
    lsq = least_squares_candidate(env, y, w, names)
    if lsq:
        scored.append((error(lsq, env, y, w, scale), lsq))
    # Selection is "shortest that is accurate enough", and "enough" cannot be a fixed
    # number: the palette gamut's target sits below the noise in the data itself (MCU's
    # cusp jitters ~12 dE), so an absolute bar was never met and the rule degenerated
    # to "most accurate", which bought a 359-byte expression for noise. Fall back to a
    # margin above the best any candidate achieved, so the bar adapts to the curve.
    reachable = min(e for e, _ in scored) if scored else math.inf
    bound = max(target, reachable * 1.1)

    def finish(expr, budget):
        """render and cut precision. The second to_css is load-bearing: a constant
        that rounds to 0 or 1 folds away, taking a whole term or factor with it."""
        return to_css(shrink(to_css(expr), env, y, w, scale, budget))

    # Shrink every candidate BEFORE choosing, not just the winner after. Rendered
    # losslessly a constant is 13-18 bytes but survives `shrink` at 3-4, so ranking on
    # the unshrunk text charged constant-heavy candidates for bytes nobody pays and
    # systematically picked structure -- which does not shrink at all -- over
    # arithmetic, which does. Every candidate gets the same accuracy budget, so this
    # compares what actually gets emitted.
    ok = [t for t in scored if t[0] <= bound]
    if ok:
        css = min((finish(expr, bound) for _, expr in ok), key=len)
    else:
        worst, expr = min(scored)
        css = finish(expr, max(bound, worst))
    dE = error(css, env, y, w, scale)
    return (
        css,
        (dE if math.isfinite(dE) else 1e9),
        (reachable if math.isfinite(reachable) else 1e9),
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--iters", type=int, default=40)
    ap.add_argument("--maxsize", type=int, default=45)
    ap.add_argument("--sub", type=int, default=400)
    ap.add_argument(
        "--curves", type=int, default=0, help="stop after N (for a smoke test)"
    )
    ap.add_argument("--only", default="", help="substring filter on curve id")
    ap.add_argument(
        "--fits",
        type=Path,
        default=DEFAULT_FITS,
        help="where to read/write fits (default build/livetheme-fits.json)",
    )
    args = ap.parse_args()
    fits_path = args.fits
    fits_path.parent.mkdir(parents=True, exist_ok=True)
    curves = json.loads(CURVES.read_text())
    if args.only:
        curves = [c for c in curves if args.only in c["id"]]

    # Resume: Julia does not release state between fits, so long runs are chunked
    # by an outer driver and every curve is checkpointed as it lands.
    fits = json.loads(fits_path.read_text()) if fits_path.exists() else {}
    todo = [c for c in curves if c["id"] not in fits]
    # --curves caps the chunk, so it has to apply AFTER the already-fitted ones are
    # removed. Capping first meant every invocation re-selected the same leading
    # slice, found it complete, and reported nothing to do -- so the driver saw no
    # progress and stopped after exactly one chunk per pass.
    if args.curves:
        todo = todo[: args.curves]
    print(f"{len(fits)} already fitted, {len(todo)} to go", flush=True)

    t0 = time.time()
    for i, curve in enumerate(todo):
        css, dE, reachable = search(curve, args.iters, args.maxsize, args.sub)
        fits[curve["id"]] = {
            "css": css,
            "dE": dE,
            "target": curve["target"],
            # the best any candidate managed: on a noisy curve this is the real floor,
            # and dE close to it means the fit is as good as the data allows
            "reachable": reachable,
        }
        fits_path.write_text(
            json.dumps(fits, indent=1, sort_keys=True, allow_nan=False)
        )
        flag = "" if dE <= max(curve["target"], reachable * 1.1) else "  OVER"
        print(
            f"[{i + 1}/{len(todo)}] {curve['id']:44} {len(css):4d}B  "
            f"dE {dE:6.2f} (floor {reachable:5.2f}, want {curve['target']:.2f}){flag}   "
            f"{(time.time() - t0) / (i + 1):.1f}s/curve",
            flush=True,
        )

    over = [
        k
        for k, v in fits.items()
        if v["dE"] > max(v["target"], v.get("reachable", 0) * 1.1) + 1e-9
    ]
    print(f"\n{len(fits)} curves fitted, {len(over)} above what the data allows")


if __name__ == "__main__":
    main()
