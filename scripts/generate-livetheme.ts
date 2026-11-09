/**
 * Emit a stylesheet that reproduces a Material Color Utilities scheme entirely in
 * CSS, computed live from one `--m3v-source` custom property. No JS at runtime, no
 * trigonometry, so it runs in both Firefox and Chromium.
 *
 *   node scripts/generate-livetheme.ts <variants> --dump
 *   uv run scripts/livetheme-search.py            # fits the dumped curves
 *   node scripts/generate-livetheme.ts <variants>
 *
 * <variants> is a space-separated list, and blank means all of them -- the same
 * spelling the CI workflow takes. More than one runs a child process each.
 *
 * The search is slow and memory-hungry, so in practice CI runs it (see
 * .github/workflows/oklch-theme.yaml) and publishes the fits as an artifact. To emit
 * from a downloaded copy without re-running anything:
 *
 *   node scripts/generate-livetheme.ts <variant> \
 *     --fits ~/Downloads/livetheme-fits.json
 *
 * The dump/search/emit cycle repeats until `--dump` reports nothing left: curves
 * come in layers, and each layer has to be fitted against what CSS will really
 * compute for the layer above it rather than against MCU's exact value. Getting
 * that backwards silently bakes in an error the next layer cannot see.
 *
 * This file doesn't search for formulas: those come from livetheme-search.py. What is
 * left here is the part that is structure rather than curve, like MCU's piecewise hue
 * rotations, which are lookup tables rather than functions, and the final trimming of
 * each fitted formula against the same data.
 *
 * Load-bearing details, each one a bug that actually happened:
 *  - Hues are angles. Every mean, spread and comparison goes through cos/sin; plain
 *    arithmetic on wrapped degrees destroys anything near +-180.
 *  - MCU's hue tables are indexed on HCT hue, but CSS only exposes the OK hue. Which
 *    model applies and where it steps are HCT questions; the value emitted per
 *    segment is an OK-hue question. Conflating them pins a near-grey palette to one
 *    fixed tint.
 *  - A relative colour inherits its origin's alpha, so the final colour resets it.
 */
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import {
  DynamicScheme,
  Hct,
  Variant,
  type DynamicColor,
} from "@ktibow/material-color-utilities-nightly";
import { colors } from "../src/lib/etc/colors.ts";

const VARIANTS: Record<string, [Variant, "2021" | "2025"]> = {
  tonalspot2021: [Variant.TONAL_SPOT, "2021"],
  tonalspot2025: [Variant.TONAL_SPOT, "2025"],
  vibrant2021: [Variant.VIBRANT, "2021"],
  vibrant2025: [Variant.VIBRANT, "2025"],
  expressive2021: [Variant.EXPRESSIVE, "2021"],
  expressive2025: [Variant.EXPRESSIVE, "2025"],
  rainbow2021: [Variant.RAINBOW, "2021"],
  fruitsalad2021: [Variant.FRUIT_SALAD, "2021"],
  neutral2021: [Variant.NEUTRAL, "2021"],
  neutral2025: [Variant.NEUTRAL, "2025"],
};

// Positional args are variant names, everything else is a flag. Walking the list
// beats find()+indexOf, which resolved a repeated token to its first occurrence.
const names: string[] = [];
const flags: string[] = [];
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === "--fits") flags.push(a, process.argv[++i] ?? "");
  else if (a.startsWith("--")) flags.push(a);
  else names.push(a);
}
// So the CI matrix can fan out over the variants without keeping its own copy of the
// list; adding one here is then the only edit needed.
if (flags.includes("--list")) {
  console.log(Object.keys(VARIANTS).join(" "));
  process.exit(0);
}
const dumping = flags.includes("--dump");
// No variants named means all of them, same as the CI's blank `variants` input.
const requested = names.length ? names : Object.keys(VARIANTS);
const unknown = requested.filter((v) => !(v in VARIANTS));
if (unknown.length) {
  console.error(
    `unknown variant${unknown.length > 1 ? "s" : ""} ${unknown.join(" ")}; ` +
      `known: ${Object.keys(VARIANTS).join(" ")}`,
  );
  process.exit(1);
}

// One child process per variant rather than a loop in here: palInfo, entries, curves
// and HOIST are module-level and accumulate, so a second variant in the same process
// would hoist its expressions against the first one's. A child also keeps a variant
// that exits nonzero from taking the rest of the run with it.
if (requested.length > 1) {
  const { spawnSync } = await import("node:child_process");
  const CURVES = new URL("../build/livetheme-curves.json", import.meta.url);
  const merged: any[] = [];
  const failed: string[] = [];
  for (const v of requested) {
    const r = spawnSync(process.execPath, [...process.execArgv, process.argv[1], v, ...flags], {
      stdio: "inherit",
    });
    if (r.status !== 0) {
      failed.push(v);
      continue;
    }
    // Each child writes the dump with only its own curves, so collect before the next
    // one overwrites it. Ids are namespaced by variant, so the merge is just a concat.
    if (dumping) merged.push(...JSON.parse(await readFile(CURVES, "utf8")));
  }
  if (dumping) {
    await mkdir(new URL("../build/", import.meta.url), { recursive: true });
    await writeFile(CURVES, JSON.stringify(merged));
    console.log(`${merged.length} curves to fit across ${requested.length - failed.length}`);
  }
  if (failed.length) {
    console.error(`failed: ${failed.join(" ")}`);
    process.exit(1);
  }
  process.exit(0);
}
const variant = requested[0];
const [VAR, SPEC] = VARIANTS[variant];
const scheme = (hct: Hct, isDark: boolean) =>
  new DynamicScheme({
    sourceColorHct: hct,
    variant: VAR,
    contrastLevel: 0,
    isDark,
    specVersion: SPEC,
  });

const ROLES = colors.filter(
  (c) => !c.name.includes("dim") && !c.name.includes("bright") && !c.name.includes("fixed"),
);

const DEG_TO_RAD = Math.PI / 180;
const PRECISION = 4;

// --- numbers and angles ------------------------------------------------------
/** A fitted angle whose cosine prints as ".9999" is carrying rounding noise. */
const n = (x: number) => {
  const r = Math.round(x);
  if (Math.abs(x - r) < 0.5 * 10 ** -PRECISION) x = r;
  return (+x.toFixed(PRECISION)).toString().replace(/^0\./, ".").replace(/^-0\./, "-.");
};
const mul = (k: number, expr: string) => {
  const t = n(k);
  return t === "0" ? "0" : t === "1" ? expr : t === "-1" ? `-1*${expr}` : `${t}*${expr}`;
};
/** the two channel expressions of a 2-D rotation by `deg`, unit factors folded */
const rot = (deg: number): [string, string] => {
  const c = Math.cos(deg * DEG_TO_RAD),
    s = Math.sin(deg * DEG_TO_RAD);
  const half = (kc: number, ks: number, x: string, y: string, sign: number) => {
    const l = mul(kc, x),
      r = mul(ks, y);
    if (r === "0") return l;
    if (l === "0") return sign < 0 ? `-1*${r}` : r;
    return `${l} ${sign < 0 ? "-" : "+"} ${r}`;
  };
  return [half(c, s, "a", "b", -1), half(s, c, "a", "b", +1)];
};
const circularDiff = (a: number, b: number) => ((((a - b) % 360) + 540) % 360) - 180;
const circularMean = (arr: number[]) => {
  let c = 0,
    s = 0;
  for (const v of arr) {
    c += Math.cos(v * DEG_TO_RAD);
    s += Math.sin(v * DEG_TO_RAD);
  }
  return Math.atan2(s, c) / DEG_TO_RAD;
};
/** length of the shortest arc containing every sample */
const circularSpread = (arr: number[]) => {
  if (!arr.length) return 0;
  const m = circularMean(arr);
  let lo = 0,
    hi = 0;
  for (const v of arr) {
    const d = circularDiff(v, m);
    lo = Math.min(lo, d);
    hi = Math.max(hi, d);
  }
  return hi - lo;
};

// --- colour ------------------------------------------------------------------
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const argbToOklch = (argb: number): [number, number, number] => {
  const R = lin(((argb >> 16) & 255) / 255),
    G = lin(((argb >> 8) & 255) / 255),
    B = lin((argb & 255) / 255);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const Bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, Bb), (Math.atan2(Bb, A) / DEG_TO_RAD + 360) % 360];
};

// --- evaluating a fitted expression -----------------------------------------
// Each layer is fitted against what CSS will really compute for the layer above it,
// which means evaluating the previous layer's expression HERE, in JS, with exactly
// CSS's semantics. Two traps: the CSS names are bare (`min`, not `Math.min`), and
// CSS round(x, step) is "nearest multiple of step" while a naive port rounds to
// decimal places. Getting either wrong silently fits the next layer against a
// function the browser will never produce.
const CSS_FNS = {
  min: Math.min,
  max: Math.max,
  abs: Math.abs,
  sign: Math.sign,
  hypot: Math.hypot,
  round: (x: number, step = 1) => Math.round(x / step) * step,
  clamp: (lo: number, v: number, hi: number) => Math.min(Math.max(v, lo), hi),
};
const evalCss = (expr: string, names: string[]) => {
  const fns = Object.keys(CSS_FNS);
  const fn = new Function(...fns, ...names, `return ${expr}`);
  const impls = fns.map((k) => (CSS_FNS as any)[k]);
  return (...vals: number[]) => fn(...impls, ...vals) as number;
};

// --- piecewise hue as arcs on the unit circle --------------------------------
/** m bounds -> m arcs; the first and last segments are one wrapped arc */
const toArcs = (bounds: number[], val: number[]) => {
  const m = bounds.length;
  if (m === 0) return [{ v: val[0], all: true } as const];
  const arcs = [{ lo: bounds[m - 1], hi: bounds[0], v: circularMean([val[0], val[m]]) }];
  for (let i = 0; i < m - 1; i++) arcs.push({ lo: bounds[i], hi: bounds[i + 1], v: val[i + 1] });
  if (arcs.length === 1 || circularSpread(arcs.map((a) => a.v)) < 2)
    return [{ v: circularMean(arcs.map((a) => a.v)), all: true } as const];
  return arcs;
};
/** the arcs must tile the circle exactly once, or a swatch gets two rotations */
const checkPartition = (arcs: any[], label: string) => {
  if (arcs.length === 1 && (arcs[0] as any).all) return;
  let worst = 0;
  for (let h = 0; h < 360; h += 0.5) {
    const side = (t: number) => {
      const d = (((h - t) % 360) + 360) % 360;
      return d > 0 && d < 180 ? 1 : 0;
    };
    const box = (lo: number, hi: number) => Math.max(0, Math.min(1, side(lo) - side(hi)));
    let sum = 0;
    for (const a of arcs) {
      const len = (((a.hi - a.lo) % 360) + 360) % 360;
      if (len <= 170) sum += box(a.lo, a.hi);
      else {
        const mid = (a.lo + len / 2) % 360;
        sum += box(a.lo, mid) + box(mid, a.hi);
      }
    }
    worst = Math.max(worst, Math.abs(sum - 1));
  }
  if (worst > 0.01) console.warn(`  !! ${label}: arcs sum to 1 +- ${worst.toFixed(2)}`);
};

// --- sampling ----------------------------------------------------------------
const PALETTES = [
  "primaryPalette",
  "secondaryPalette",
  "tertiaryPalette",
  "neutralPalette",
  "neutralVariantPalette",
  "errorPalette",
] as const;
/** readable half of a curve id, e.g. "primary" in ".../palette/primary/light/gamut" */
const PALETTE_NAME: Record<string, string> = {
  primaryPalette: "primary",
  secondaryPalette: "secondary",
  tertiaryPalette: "tertiary",
  neutralPalette: "neutral",
  neutralVariantPalette: "neutral-variant",
  errorPalette: "error",
};
// The one place brevity is worth having: this ends up in the emitted custom property
// name (--hpl and friends), repeated once per role, so it is paying for itself.
const CSS_KEY: Record<string, string> = {
  primaryPalette: "p",
  secondaryPalette: "s",
  tertiaryPalette: "t",
  neutralPalette: "n",
  neutralVariantPalette: "v",
  errorPalette: "e",
};

const SOURCES: { hct: Hct; hctH: number; okL: number; okC: number; okH: number }[] = [];
for (let h = 0; h < 360; h += 2)
  for (const [c, t] of [
    [15, 50],
    [30, 45],
    [45, 50],
    [65, 55],
    [90, 50],
    [45, 70],
  ]) {
    const hct = Hct.from(h, c, t);
    if (Math.abs(circularDiff(hct.hue, h)) > 1.5) continue;
    const ok = argbToOklch(hct.toInt());
    SOURCES.push({ hct, hctH: hct.hue, okL: ok[0], okC: ok[1], okH: ok[2] });
  }
// A hue-ordered spine for locating breakpoints. The pooled SOURCES array is ordered by
// (hue, chroma, tone), so consecutive entries jump around in OK hue.
const SPINE = Array.from({ length: 1440 }, (_, i) => {
  const hct = Hct.from((i * 360) / 1440, 50, 50);
  return { hct, hctH: hct.hue, okH: argbToOklch(hct.toInt())[2] };
});
const SCHEMES = {
  light: SOURCES.map((s) => scheme(s.hct, false)),
  dark: SOURCES.map((s) => scheme(s.hct, true)),
};
const SPINE_SCHEMES = {
  light: SPINE.map((s) => scheme(s.hct, false)),
  dark: SPINE.map((s) => scheme(s.hct, true)),
};

/**
 * Circular moving average in hue: for each sample, the mean of every sample within
 * `halfWidth` degrees of it. Wrap-aware, and it does not assume the samples arrive in
 * hue order (they arrive ordered by hue, then chroma, then tone).
 */
const smoothOverHue = (values: number[], hues: number[], halfWidth: number) => {
  const order = hues.map((h, i) => [h, i] as const).sort((x, y) => x[0] - y[0]);
  const sortedHues = order.map((o) => o[0]);
  const sortedValues = order.map((o) => values[o[1]]);
  const n = order.length;
  const out = new Array<number>(n);
  for (let k = 0; k < n; k++) {
    let sum = 0,
      count = 0;
    for (let d = -1; d <= 1; d += 2)
      for (let step = d < 0 ? 0 : 1; ; step++) {
        const j = (((k + d * step) % n) + n) % n;
        if (step > 0 && Math.abs(circularDiff(sortedHues[j], sortedHues[k])) > halfWidth) break;
        sum += sortedValues[j];
        count++;
        if (step > n / 2) break;
      }
    out[order[k][1]] = sum / count;
  }
  return out;
};

/** the cusp: OkLab L of the most colourful tone still reaching `chroma` */
const tMaxCL = (hue: number, chroma: number) => {
  let tone = 100,
    best = Hct.from(hue, chroma, tone);
  while (best.chroma < chroma && tone > 0) {
    tone -= 1;
    const c = Hct.from(hue, chroma, tone);
    if (best.chroma < c.chroma) best = c;
  }
  return argbToOklch(best.toInt())[0];
};

// --- fits --------------------------------------------------------------------
type Fit = { css: string; dE: number; target: number };
// The fits are a build output, not a source: they are produced by CI (see
// .github/workflows/livetheme.yaml) and published as an artifact. Point --fits at a
// downloaded copy to emit locally, e.g. --fits ~/Downloads/livetheme-fits.json.
const fitsArg = process.argv.indexOf("--fits");
const fitsPath =
  fitsArg !== -1 && process.argv[fitsArg + 1]
    ? new URL(process.argv[fitsArg + 1], `file://${process.cwd()}/`)
    : new URL("../build/livetheme-fits.json", import.meta.url);
const FITS: Record<string, Fit> = JSON.parse(await readFile(fitsPath, "utf8").catch(() => "{}"));

// --- simplifying fits --------------------------------------------------------
// The search stops at the first expression meeting its target, which leaves terms and
// digits that aren't earning their bytes. Each role curve is hill-climbed here: drop
// the weakest terms of a sum, refit what remains, then shorten every number, keeping
// a move only while the error stays within TOLERANCE of the original fit.
// How much worse a curve's error may get, in the fits' dE units (OKLab x 1000). Chosen
// by sweeping it against MCU in the browsers: past this, each byte costs more accuracy.
const TOLERANCE = 4.8;
const NUMBER = String.raw`-?(?:\d+\.?\d*|\.\d+)`;
const solve = (m: number[][], v: number[]) => {
  const n = v.length;
  const a = m.map((row, i) => [...row, v[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r;
    [a[c], a[p]] = [a[p], a[c]];
    if (Math.abs(a[c][c]) < 1e-14) return null;
    for (let r = c + 1; r < n; r++) {
      const f = a[r][c] / a[c][c];
      for (let k = c; k <= n; k++) a[r][k] -= f * a[c][k];
    }
  }
  const x = new Array<number>(n).fill(0);
  for (let c = n - 1; c >= 0; c--) {
    let t = a[c][n];
    for (let k = c + 1; k < n; k++) t -= a[c][k] * x[k];
    x[c] = t / a[c][c];
  }
  return x;
};
const splitSum = (s: string) => {
  const parts: { sign: number; text: string }[] = [];
  let depth = 0,
    start = 0,
    sign = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "(") depth++;
    else if (s[i] == ")") depth--;
    else if (depth == 0 && (s.startsWith(" + ", i) || s.startsWith(" - ", i))) {
      parts.push({ sign, text: s.slice(start, i) });
      sign = s[i + 1] == "+" ? 1 : -1;
      i += 2;
      start = i + 1;
    }
  }
  parts.push({ sign, text: s.slice(start) });
  return parts;
};
const shortNum = (x: number, digits: number) =>
  (+x.toFixed(digits)).toString().replace(/^0\./, ".").replace(/^-0\./, "-.");
const joinSum = (terms: { coef: number; rest: string; digits: number }[]) => {
  const text = (t: (typeof terms)[number], abs: boolean) => {
    const num = shortNum(abs ? Math.abs(t.coef) : t.coef, t.digits);
    if (!t.rest) return num;
    if (num == "1") return t.rest;
    return `${num == "-1" ? "-1" : num}*${t.rest}`;
  };
  const live = terms.filter((t) => +t.coef.toFixed(t.digits) != 0);
  if (!live.length) return "0";
  const ordered = [...live.filter((t) => t.coef > 0), ...live.filter((t) => t.coef < 0)];
  return ordered
    .map((t, i) => (i == 0 ? text(t, false) : `${t.coef < 0 ? "- " : "+ "}${text(t, true)}`))
    .join(" ");
};
const simplify = (
  css: string,
  vars: Record<string, number[]>,
  y: number[],
  w: number[],
  scale: number,
) => {
  const names = Object.keys(vars);
  const columns = names.map((k) => vars[k]);
  const run = (expr: string) => {
    const f = evalCss(expr, names);
    return y.map((_, i) => f(...columns.map((c) => c[i])));
  };
  const totalW = w.reduce((t, x) => t + x, 0);
  const meanW = totalW / w.length;
  const measure = (p: number[]) => {
    let sq = 0,
      worst = 0;
    for (let i = 0; i < y.length; i++) {
      const d = p[i] - y[i];
      if (!Number.isFinite(d)) return [Infinity, Infinity];
      sq += w[i] * d * d;
      worst = Math.max(worst, Math.abs(d) * Math.sqrt(w[i] / meanW) * scale);
    }
    return [Math.sqrt(sq / totalW) * scale, worst];
  };
  const [rmse0, worst0] = measure(run(css));
  if (!Number.isFinite(rmse0)) return css;
  const okAt = (share: number) => (p: number[]) => {
    const [r, m] = measure(p);
    return r <= rmse0 + TOLERANCE * share && m <= worst0 + 3 * TOLERANCE * share;
  };
  const ok = okAt(1);

  const parts = splitSum(css);
  const number = new RegExp(`^(${NUMBER})$`);
  const scaled = new RegExp(`^(${NUMBER})\\*(.+)$`);
  let best = css;
  if (parts.length >= 2) {
    const terms = parts.map(({ sign, text }) => {
      const c = text.match(number);
      if (c) return { coef: sign * +c[1], rest: "" };
      const m = text.match(scaled);
      return m ? { coef: sign * +m[1], rest: m[2] } : { coef: sign, rest: text };
    });
    const basis = terms.map((t) => (t.rest ? run(t.rest) : y.map(() => 1)));
    if (basis.every((b) => b.every(Number.isFinite))) {
      const k = terms.length;
      const gram = basis.map((p) =>
        basis.map((q) => p.reduce((t, x, i) => t + w[i] * x * q[i], 0)),
      );
      const rhs = basis.map((p) => p.reduce((t, x, i) => t + w[i] * x * y[i], 0));
      const fit = (keep: number[]) =>
        solve(
          keep.map((i) => keep.map((j) => gram[i][j] + (i == j ? 1e-12 : 0))),
          keep.map((i) => rhs[i]),
        );
      const predict = (keep: number[], c: number[]) =>
        y.map((_, s) => keep.reduce((t, j, n) => t + c[n] * basis[j][s], 0));
      let keep = terms.map((_, i) => i);
      let coef = fit(keep) ?? terms.map((t) => t.coef);
      const dropping = okAt(0.6);
      for (;;) {
        let pick: { keep: number[]; c: number[]; r: number } | undefined;
        for (const out of keep) {
          const next = keep.filter((i) => i != out);
          if (!next.length) continue;
          const c = fit(next);
          if (!c) continue;
          const p = predict(next, c);
          if (!dropping(p)) continue;
          const r = measure(p)[0];
          if (!pick || r < pick.r) pick = { keep: next, c, r };
        }
        if (!pick) break;
        keep = pick.keep;
        coef = pick.c;
      }
      if (ok(predict(keep, coef))) {
        const live = keep.map((j, n) => ({ coef: coef[n], rest: terms[j].rest, digits: 8, j }));
        const value = () =>
          y.map((_, s) => live.reduce((t, l) => t + +l.coef.toFixed(l.digits) * basis[l.j][s], 0));
        // biggest numbers lose digits first, because they have the most to give up
        for (const l of [...live].sort((p, q) => Math.abs(q.coef) - Math.abs(p.coef))) {
          for (let d = 0; d < 8; d++) {
            const before = l.digits;
            l.digits = d;
            if (ok(value())) break;
            l.digits = before;
          }
        }
        const candidate = joinSum(live);
        if (candidate.length <= best.length && ok(run(candidate))) best = candidate;
      }
    }
  }
  // Anything else (min, max, hypot, products) can still shed digits.
  const literal = /(?<![\w.])\d*\.\d+/g;
  const literals = [...best.matchAll(literal)].map((m) => m[0]);
  for (const text of new Set(literals.sort((p, q) => q.length - p.length))) {
    for (let d = 0; d < 6; d++) {
      const short = shortNum(+text, d);
      if (short.length >= text.length) break;
      const next = best.replaceAll(
        new RegExp(`(?<![\\w.])${text.replace(".", "\\.")}(?![\\d])`, "g"),
        short,
      );
      if (ok(run(next))) {
        best = next;
        break;
      }
    }
  }
  return best;
};
let usesH = false;
const HUE_DIGITS = 1;
const curves: any[] = [];
/** record a curve for the search, or return the expression already found for it */
const curve = (
  id: string,
  vars: Record<string, number[]>,
  y: number[],
  w: number[],
  scale: number,
  target: number,
  maxsize: number,
) => {
  const key = `${variant}/${id}`;
  if (FITS[key])
    return id.startsWith("role/") ? simplify(FITS[key].css, vars, y, w, scale) : FITS[key].css;
  curves.push({ id: key, vars, y, w, scale, target, maxsize });
  return null;
};
// Byte budgets differ by layer because the expressions are emitted a different
// number of times: 12 palette expressions in a stylesheet against ~120 role ones, so
// a palette curve can afford to be longer. It is not larger still because PySR runs
// every candidate through sympy, which recurses per node and blows the stack well
// before 120 -- and the long smooth palette curves are served by the least-squares
// candidate anyway, which is built outside the search and is not bound by this.
const PALETTE_SIZE = 60;
const ROLE_SIZE = 45;
// How accurate a role curve has to be before the search takes the shortest answer.
const ROLE_TARGET = +(process.env.ROLE_TARGET ?? 6);

// --- palettes ----------------------------------------------------------------
// MCU's rotations are piecewise-constant in HCT hue. Rather than transcribe the
// tables (they move between spec versions and a stale copy fails silently), recover
// them by scanning the spine and cutting wherever the rotation steps.
const palInfo = new Map<string, any>();
for (const mode of ["light", "dark"] as const) {
  for (const p of PALETTES) {
    const key = `${CSS_KEY[p]}${mode[0]}`;
    const curveName = `${PALETTE_NAME[p]}/${mode}`;
    const palOkSpine = SPINE_SCHEMES[mode].map(
      (s) => argbToOklch((s as any)[p].keyColor.toInt())[2],
    );
    const palHctSpine = SPINE_SCHEMES[mode].map((s) => (s as any)[p].hue as number);
    const relHct = palHctSpine.map((v, i) => circularDiff(v, SPINE[i].hctH));
    const relOk = palOkSpine.map((v, i) => circularDiff(v, SPINE[i].okH));

    // WHICH model, and WHERE it steps, are HCT questions -- that is where MCU
    // defines the table. Deciding this in OK hue fails for a near-grey palette:
    // neutral is chroma 6, so its key colour's OK hue is erratic and the comparison
    // picks "fixed hue", pinning every source to one tint.
    const absolute = circularSpread(palHctSpine) < circularSpread(relHct);
    const stepSeries = absolute ? palHctSpine : relHct;
    // ...but the VALUE emitted per segment is what CSS evaluates, so it is measured
    // in OK hue. Residual drift inside a segment is what the correction is for.
    const emitSeries = absolute ? palOkSpine : relOk;

    const cuts: number[] = [];
    for (let i = 1; i < SPINE.length; i++)
      if (Math.abs(circularDiff(stepSeries[i], stepSeries[i - 1])) > 4) cuts.push(i);
    const bounds = cuts.map((i) => SPINE[i].okH);
    const hctBounds = cuts.map((i) => SPINE[i].hctH);
    const segs: number[] = [];
    {
      const edges = [0, ...cuts, SPINE.length];
      for (let b = 0; b < edges.length - 1; b++)
        segs.push(circularMean(emitSeries.slice(edges[b], edges[b + 1])));
    }

    const arcs = toArcs(bounds, segs);
    checkPartition(arcs as any, `${variant} ${key}`);
    // Read the value back out of the ARCS, not out of bounds/segs. Those two are not
    // the same function: toArcs merges the first and last segment into one wrapped arc
    // carrying their circular mean, because SPINE's OK hue wraps partway through (HCT
    // 0 is OK 359.4). A plain ascending scan over bounds returns the two ends as
    // separate values, so the hue the fit targets would not be the hue the emitted
    // arcs compute -- fitting one model and shipping another.
    const arcIndex = (h: number) => {
      for (let i = 0; i < arcs.length; i++) {
        const a = arcs[i] as any;
        if (a.all) return i;
        // inside [lo, hi) going anticlockwise, measured as a wrapped offset
        const span = (((a.hi - a.lo) % 360) + 360) % 360;
        const off = (((h - a.lo) % 360) + 360) % 360;
        if (off < span) return i;
      }
      return 0;
    };
    const arcValue = (h: number) => (arcs[arcIndex(h)] as any).v as number;
    let hueCss = SOURCES.map((s) => (absolute ? arcValue(s.okH) : s.okH + arcValue(s.okH)));
    // A sample whose OK hue lands in a different arc than its HCT hue does is off by a
    // whole rotation. Nothing downstream can repair it, so keep it out of the fits.
    const hctArcs = toArcs(hctBounds, segs);
    const hctIndex = (h: number) => {
      for (let i = 0; i < hctArcs.length; i++) {
        const a = hctArcs[i] as any;
        if (a.all) return i;
        const span = (((a.hi - a.lo) % 360) + 360) % 360;
        const off = (((h - a.lo) % 360) + 360) % 360;
        if (off < span) return i;
      }
      return 0;
    };
    const wPal = SOURCES.map((s) =>
      bounds.length === 0 || arcIndex(s.okH) === hctIndex(s.hctH) ? 1 : 0,
    );

    const palOk = SCHEMES[mode].map((s) => argbToOklch((s as any)[p].keyColor.toInt())[2]);
    const unit = {
      a: hueCss.map((h) => Math.cos(h * DEG_TO_RAD)),
      b: hueCss.map((h) => Math.sin(h * DEG_TO_RAD)),
    };

    // correction: the smooth part of the residual, as a function of the source's own
    // chroma and lightness, both of which the relative-colour context exposes
    let corrCss: string | null = null;
    const d = SOURCES.map((_, i) => circularDiff(palOk[i], hueCss[i]));
    if (circularSpread(d) < 45) {
      corrCss = curve(
        `palette/${curveName}/correction`,
        { ...unit, c: SOURCES.map((s) => s.okC), sl: SOURCES.map((s) => s.okL) },
        d,
        wPal.map((x, i) => (Math.abs(d[i]) > 20 ? 0 : x)),
        0.1 * DEG_TO_RAD * 1000,
        0.6,
        PALETTE_SIZE,
      );
      if (corrCss) {
        const f = evalCss(corrCss, ["a", "b", "c", "sl"]);
        hueCss = hueCss.map((h, i) => h + f(unit.a[i], unit.b[i], SOURCES[i].okC, SOURCES[i].okL));
      }
    }

    // the gamut cusp, packed into the palette colour's L channel and read back by
    // every role drawn from this palette
    const hu = {
      a: hueCss.map((h) => Math.cos(h * DEG_TO_RAD)),
      b: hueCss.map((h) => Math.sin(h * DEG_TO_RAD)),
    };
    // Smooth the cusp before fitting it. tMaxC is a greedy integer walk down the tone
    // scale, so its output jitters by ~12 dE between neighbouring hues -- noise from
    // the search procedure, not a property of the gamut. Fitting it raw meant no model
    // could get near the stated target, because the target was below the noise in the
    // data; it also fed that jitter to every role as their `l` input. This value is a
    // FEATURE, never emitted as a colour, so the trend is all anyone wants from it.
    const gamRawJittery = SCHEMES[mode].map((s) => tMaxCL((s as any)[p].hue, (s as any)[p].chroma));
    const gamRaw = smoothOverHue(gamRawJittery, hueCss, 6);
    // The target here is advisory, not a quality bar. This value is never emitted as
    // a colour: it is packed into the palette colour's L channel so that every role
    // expression has a cusp-shaped signal to read, and the roles below are then
    // fitted against WHAT THIS EXPRESSION PRODUCES rather than against MCU's exact
    // cusp. So a loose fit costs accuracy only insofar as it discards information the
    // roles needed; it does not add error of its own. Judge it by the final dE.
    const gamCss = curve(`palette/${curveName}/gamut`, hu, gamRaw, wPal, 1000, 8, PALETTE_SIZE);
    // roles must see what CSS will really compute, not MCU's exact cusp
    let gamutCss: number[] | null = null;
    if (gamCss) {
      const f = evalCss(gamCss, ["a", "b"]);
      gamutCss = hu.a.map((_, i) => f(hu.a[i], hu.b[i]));
    }
    palInfo.set(key, { p, mode, hueCss, hu, gamutCss, gamCss, corrCss, arcs, absolute, wPal });
  }
}

// --- roles -------------------------------------------------------------------
const entries: any[] = [];
for (const mode of ["light", "dark"] as const) {
  for (const role of ROLES as DynamicColor[]) {
    const roleName = role.name.replaceAll("_", "-");
    const argbs = SCHEMES[mode].map((s) => role.getArgb(s));
    // A role that ignores --m3v-source costs nothing to emit exactly: shadow and scrim
    // are always black, and the 2021 error palette is a fixed hue, so a third of all
    // roles land here. Testing the rendered argb needs no per-variant table.
    if (argbs.every((v) => v === argbs[0])) {
      entries.push({
        role: roleName,
        mode,
        literal: "#" + (argbs[0] & 0xffffff).toString(16).padStart(6, "0"),
      });
      continue;
    }
    const p = PALETTES.find((x) => (SCHEMES[mode][0] as any)[x] === role.palette(SCHEMES[mode][0]));
    if (!p) continue;
    const key = `${CSS_KEY[p]}${mode[0]}`;
    const palette = palInfo.get(key);
    if (!palette.gamutCss) continue; // palette layer not fitted yet; nothing to dump against
    const out = argbs.map((v) => argbToOklch(v));
    const vars = { a: palette.hu.a, b: palette.hu.b, l: palette.gamutCss };
    const meanC = out.reduce((t, o) => t + o[1], 0) / out.length;
    // dE per unit of residual: L and C are oklab channels, so 1000x. A hue offset is
    // in degrees and matters only in proportion to how colourful the role is.
    const L = curve(
      `role/${roleName}/${mode}/lightness`,
      vars,
      out.map((o) => o[0]),
      palette.wPal,
      1000,
      ROLE_TARGET,
      ROLE_SIZE,
    );
    const C = curve(
      `role/${roleName}/${mode}/chroma`,
      vars,
      out.map((o) => o[1]),
      palette.wPal,
      1000,
      ROLE_TARGET,
      ROLE_SIZE,
    );
    const H = curve(
      `role/${roleName}/${mode}/hue`,
      vars,
      out.map((o, i) => circularDiff(o[2], palette.hueCss[i])),
      palette.wPal.map((x: number, i: number) => x * Math.max(out[i][1], 1e-4) ** 2),
      Math.max(meanC, 1e-3) * DEG_TO_RAD * 1000,
      ROLE_TARGET,
      ROLE_SIZE,
    );
    if (L && C && H) entries.push({ role: roleName, mode, key, L, C, H });
  }
}

// --- dump mode ---------------------------------------------------------------
if (dumping) {
  // The dump is a couple of MB and fully regenerable, so it goes to build/ (already
  // gitignored) rather than beside the source. Only the fits are worth keeping.
  await mkdir(new URL("../build/", import.meta.url), { recursive: true });
  await writeFile(
    new URL("../build/livetheme-curves.json", import.meta.url),
    JSON.stringify(curves),
  );
  const layers = new Set(curves.map((c) => (c.id.includes("/palette/") ? "palette" : "role")));
  console.log(
    `${variant}: ${curves.length} curves to fit${curves.length ? ` (${[...layers].join(" + ")})` : ""}`,
  );
  if (curves.length === 0) console.log("  nothing left -- run without --dump to emit");
  process.exit(0);
}
if (curves.length) {
  console.error(
    `${variant}: ${curves.length} curves still unfitted; run --dump then livetheme-search.py`,
  );
  process.exit(1);
}

// --- hoisting ----------------------------------------------------------------
// A custom property substitutes as raw tokens, so a var() can carry a FRAGMENT of a
// calc() -- including the channel keywords a/b/l, which resolve where they are USED,
// inside the relative colour. That makes it safe to name any repeated subexpression
// once. Verified byte-identical to the inline form in both engines.
const HOIST: string[] = [];
const hoistable = (s: string) => {
  HOIST.push(s);
  return s;
};
const hoistPass = (decls: string[]) => {
  const seg = [decls.map((x) => `  ${x}`).join(";\n")];
  let i = 0;
  for (const expr of [...new Set(HOIST)].sort((a, b) => b.length - a.length)) {
    let uses = 0;
    for (const s of seg) uses += s.split(expr).length - 1;
    if (uses < 2) continue;
    const name = `--z${i.toString(36)}`,
      ref = `var(${name})`;
    if (name.length + expr.length + 2 + uses * ref.length >= uses * expr.length) continue;
    for (let k = 0; k < seg.length; k++) seg[k] = seg[k].split(expr).join(ref);
    seg.push(`  ${name}: ${expr}`);
    i++;
  }
  return seg.length > 1 ? seg.slice(1).join(";\n") + ";\n" + seg[0] : seg[0];
};

// --- emit --------------------------------------------------------------------
const usedKeys = new Set(entries.filter((e) => !e.literal).map((e) => e.key));
const CE = hoistable("max(hypot(a,b),.00001)");
const pd: string[] = [];
// --u carries: L = source lightness, (a,b) = unit hue vector, alpha = source chroma
pd.push(`--u:oklab(from var(--m3v-source) l calc(a/${CE}) calc(b/${CE}) / calc(${CE}))`);
for (const [key, palette] of palInfo) {
  if (!usedKeys.has(key)) continue;
  let base = "var(--u)";
  if (!(palette.arcs.length === 1 && palette.arcs[0].all)) {
    // Piecewise-constant in hue, so a sum of steps on h. Only clamp() and arithmetic
    // touch the channel here, which every engine with relative colours accepts.
    // Chromium reports hue in (-180,180] here where Firefox uses [0,360), hence --H.
    usesH = true;
    const lo = (x: number) => ((x % 360) + 360) % 360;
    const round = (x: number) => +x.toFixed(HUE_DIGITS);
    const sorted = [...palette.arcs].sort((x: any, y: any) => lo(x.lo) - lo(y.lo));
    const values = sorted.map((r: any) => round(r.v));
    const start = values.at(-1)!;
    const steps = values.map(
      (v: number, i: number) =>
        `${n(round(circularDiff(v, i ? values[i - 1] : start)))}*clamp(0,(var(--H) - ${n(round(lo(sorted[i].lo)))})*1000,1)`,
    );
    const hue = [palette.absolute ? n(start) : `h + ${n(start)}`, ...steps]
      .join(" + ")
      .replaceAll("+ -", "- ");
    base = `oklch(from var(--u) l c calc(${hue}))`;
  } else if (palette.absolute) {
    base = `oklab(from var(--u) l ${n(Math.cos(palette.arcs[0].v * DEG_TO_RAD))} ${n(Math.sin(palette.arcs[0].v * DEG_TO_RAD))})`;
  } else if (Math.abs(palette.arcs[0].v) >= 0.5) {
    const [ra, rb] = rot(palette.arcs[0].v);
    base = `oklab(from var(--u) l calc(${ra}) calc(${rb}))`;
  }
  if (palette.corrCss) {
    // The correction rides on the rotation and cannot be folded into it: it was
    // fitted against the PALETTE hue, so it must be evaluated on the already-rotated
    // vector. A first-order rotation also stretches the vector by sqrt(1+T*T), which
    // the series 1 - T*T/2 takes back out without needing a stage of its own.
    const T = hoistable(
      `((${palette.corrCss.replaceAll("sl", "l").replaceAll(/\bc\b/g, "alpha")})*.01745)`,
    );
    const NRM = hoistable(`(1 - .5*${T}*${T})`);
    base = `oklab(from ${base} l calc((a - b*${T})*${NRM}) calc((b + a*${T})*${NRM}))`;
  }
  pd.push(`--h${key}:oklab(from ${base} calc(${palette.gamCss}) a b)`);
}
const byRole: Record<string, any> = {};
for (const e of entries) (byRole[e.role] ??= {})[e.mode] = e;
const backing: string[] = [];
const aliases = Object.entries(byRole).map(([rn, m]: [string, any], i) => {
  const one = (e: any) => {
    if (e.literal) return e.literal;
    // C and D are each used twice (once per output channel), so they are always
    // worth naming; hoistPass decides from their measured length.
    const C = hoistable(`(${e.C})`);
    const D = hoistable(`(${e.H})*.01745`);
    // small-angle rotation by the fitted hue offset; alpha must be reset because --u
    // carries the source chroma there and a relative colour inherits it
    return `oklab(from var(--h${e.key}) calc(${e.L}) calc(${C}*(a - b*${D})) calc(${C}*(b + a*${D})) / 1)`;
  };
  const l = one(m.light),
    d = one(m.dark);
  // Literals have nothing to compute, so only fitted colours get a registered backing.
  const back = (e: any, expr: string, suffix: string) => {
    if (e.literal) return expr;
    const name = `--r${i.toString(36)}${suffix}`;
    backing.push(`${name}:${expr}`);
    return `var(${name})`;
  };
  if (l === d) return `--m3c-${rn}: ${back(m.light, l, "")}`;
  return `--m3c-${rn}: light-dark(${back(m.light, l, "l")},${back(m.dark, d, "d")})`;
});

// Unregistered, a custom property substitutes as tokens, so every var(--m3c-*) would
// re-expand and re-evaluate kilobytes of maths on every element that uses it. A
// registered <color> is computed once where it is declared and inherited as a colour.
//
// --m3c-* themselves must stay unregistered: a registered light-dark() resolves where
// it is declared, which would break a nested color-scheme. Hence one registered colour
// per mode, with light-dark() choosing between them at the use site.
//
// The registered colours stay out of @layer tokens because token-shaker renames what it
// finds there, which would orphan the @property rules.
const registered = [...pd, ...backing].map((x) => x.slice(0, x.indexOf(":")));
const css = `${registered
  .map((x) => `@property ${x}{syntax:"<color>";inherits:true;initial-value:#000}`)
  .join("\n")}
:root {
  color-scheme: light dark;
}
@layer tokens {
  :root {
    --m3v-source: AccentColor;
  }
  :root, .m3-theme {
    ${aliases.join(";\n    ")};
  }
}
:root, .m3-theme {
${usesH ? "  --H:(h + 360*clamp(0,-1000*h,1));\n" : ""}${hoistPass([...pd, ...backing])}
}
`;
// Alongside the library's other stylesheets, so svelte-package ships it and it is
// imported the same way they are. scripts/generate-tailwind.ts writes into the same
// directory for the same reason.
const out = new URL(`../src/lib/etc/livetheme/${variant}.css`, import.meta.url);
await mkdir(new URL("../src/lib/etc/livetheme/", import.meta.url), { recursive: true });
await writeFile(out, css);
console.log(
  `${variant}: ${ROLES.length} roles -> src/lib/etc/livetheme/${variant}.css` +
    `  ${(css.length / 1024).toFixed(1)} KB raw, ${gzipSync(css).length} B gzip`,
);
