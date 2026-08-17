"""Asks the installed browsers which CSS math functions they will actually evaluate on
relative-colour channel keywords, and prints the intersection. That intersection is
hardcoded as BINARY/UNARY in livetheme-search.py; run this if an engine ships new maths
and you want to widen the operator set.

Why it cannot be answered from a spec or from CSS.supports():

  * "does Firefox support sqrt()" is the wrong question. It does, in calc()
    generally -- but not when the argument is a channel keyword inside a relative
    colour, which is the only place this project uses it.
  * CSS.supports() reports true either way. It validates the grammar.
  * So does reading back the inline style: because these values contain var(), the
    declaration is ALWAYS accepted at parse time and only fails later, at
    computed-value time.

The signal is the COMPUTED value. An expression that never resolves leaves
background-color at its initial value, transparent. The expected number is checked
too, so an operator that resolves to the wrong answer is reported rather than
counted as working.
"""

import json
import math
import re
import shutil
import subprocess
import tempfile
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

L, A, B = 0.6, 0.1, 0.05
# label, expression over channel keywords, expected value
CASES = [
    ("baseline l", "l", L),
    ("min", "min(l,.5)", min(L, 0.5)),
    ("max", "max(l,.5)", max(L, 0.5)),
    ("clamp", "clamp(0,l,.5)", min(max(0, L), 0.5)),
    ("abs", "abs(l - .8)", abs(L - 0.8)),
    ("sign", "sign(l - .8)", math.copysign(1, L - 0.8)),
    ("round", "round(l*10,1)", round(L * 10)),
    ("mod", "mod(l*10,4)", (L * 10) % 4),
    ("rem", "rem(l*10,4)", math.fmod(L * 10, 4)),
    ("hypot", "hypot(a,b)", math.hypot(A, B)),
    # hypot takes arbitrary sub-expressions, not just bare channel keywords, which is
    # what makes it usable as a search operator. Note it is NOT a general sqrt: it
    # gives sqrt(u^2 + v^2), so it can only root a quantity already shaped as a sum of
    # squares. sqrt(x) for an arbitrary x needs u with u^2 = x, which is circular.
    ("hypot of expressions", "hypot(a*2,b)*3", math.hypot(A * 2, B) * 3),
    ("sqrt", "sqrt(l)", math.sqrt(L)),
    ("pow", "pow(l,2)", L**2),
    ("exp", "exp(l) - 1", math.exp(L) - 1),
    ("log", "log(l + 1)", math.log(L + 1)),
    ("sin", "sin(l*1rad)", math.sin(L)),
    ("cos", "cos(l*1rad)", math.cos(L)),
    ("tan", "tan(l*1rad)", math.tan(L)),
    ("asin", "asin(l)/1rad", math.asin(L)),
    ("acos", "acos(l)/1rad", math.acos(L)),
    ("atan", "atan(l)/1rad", math.atan(L)),
    ("atan2", "atan2(b,a)/1rad", math.atan2(B, A)),
]

PAGE = """<!doctype html><meta charset=utf8><title>relative-colour operators</title>
<style>:root{--src:oklab(0.6 0.1 0.05)}</style><body><script>
const out = {};
for (const [name, expr] of __CASES__) {
  const d = document.createElement("div");
  d.style.backgroundColor = `oklab(from var(--src) calc(${expr}) 0 0)`;
  document.body.appendChild(d);
  out[name] = getComputedStyle(d).backgroundColor;
}
fetch("/report", {method: "POST", body: JSON.stringify(out)});
</script></body>""".replace(
    "__CASES__", json.dumps([[n, e] for n, e, _ in CASES])
).encode()


def drive(browser):
    """launch one engine at a throwaway profile and collect what it reports back"""
    if browser == "chromium":
        found = sorted(
            Path.home().glob(
                ".cache/ms-playwright/chromium*/chrome-linux/headless_shell"
            )
        )
        exe = (
            str(found[0])
            if found
            else (shutil.which("chromium") or shutil.which("google-chrome"))
        )
        argv = [exe, "--headless", "--no-sandbox", "--disable-gpu"] if exe else None
    else:
        exe = shutil.which("firefox")
        argv = [exe, "--headless"] if exe else None
    if not argv:
        return None

    got, done = {}, threading.Event()

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, format: str, *args: object) -> None:
            pass  # the default handler logs every request to stderr

        def do_GET(self):
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            self.wfile.write(PAGE)

        def do_POST(self):
            got.update(json.loads(self.rfile.read(int(self.headers["Content-Length"]))))
            self.send_response(204)
            self.end_headers()
            done.set()

    srv = HTTPServer(("127.0.0.1", 0), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    with tempfile.TemporaryDirectory() as prof:
        argv = argv + (
            ["--profile", prof] if browser == "firefox" else [f"--user-data-dir={prof}"]
        )
        proc = subprocess.Popen(
            argv + [f"http://127.0.0.1:{srv.server_port}/"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        ok = done.wait(90)
        proc.terminate()
    srv.shutdown()
    return got if ok else None


def main():
    engines = ["chromium", "firefox"]
    table = {}
    for e in engines:
        table[e] = drive(e) or {}
        if not table[e]:
            print(f"{e}: not found or timed out")

    w = max(len(n) for n, _, _ in CASES)
    print(f"\n{'operator':{w}}  " + "  ".join(f"{e:>10}" for e in engines))
    print("-" * (w + 2 + 13 * len(engines)))
    usable = {e: set() for e in engines}
    for name, _, want in CASES:
        row = []
        for e in engines:
            m = re.match(r"oklab\(([-\d.eE]+)", table[e].get(name) or "")
            if not m:
                row.append("rejected")  # transparent: never resolved
            elif abs(float(m.group(1)) - max(0.0, min(1.0, want))) > 5e-4:
                row.append("WRONG")  # resolved, but not to the right value
            else:
                row.append("ok")
                usable[e].add(name)
        print(f"{name:{w}}  " + "  ".join(f"{c:>10}" for c in row))

    if all(usable.values()):
        print(
            "\nusable everywhere: "
            + " ".join(sorted(set.intersection(*usable.values())))
        )


if __name__ == "__main__":
    main()
