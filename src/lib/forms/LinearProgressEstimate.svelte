<script lang="ts">
  let { sToHalfway = 1, height = 4 }: { sToHalfway?: number; height?: number } = $props();
  /*
  Easing calculated with
  // 1) define the original mapping f(y)=time-%, capped at 100% for y=1
  const whenReached = (y) => Math.log(1 - y) / Math.log(0.5);
  const makePoints = () => {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      const v = i / 100;
      const t = (whenReached(v) * 100) / 8;
      pts.push([v, t]);
    }
    // add the final point (1, 100)
    pts.push([1, 100]);
    return pts;
  };

  // 2) helper: compute perpendicular distance from pt to line (p0→p1)
  const perpDist = (pt, p0, p1) => {
    const [x, y] = pt;
    const [x1, y1] = p0;
    const [x2, y2] = p1;
    const num = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
    const den = Math.hypot(y2 - y1, x2 - x1);
    return den === 0 ? 0 : num / den;
  };

  // 3) RDP (recursive)
  function rdp(points, eps) {
    if (points.length < 3) return points;
    let maxD = 0,
      idx = 0;
    for (let i = 1; i < points.length - 1; i++) {
      const d = perpDist(points[i], points[0], points[points.length - 1]);
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (maxD > eps) {
      const left = rdp(points.slice(0, idx + 1), eps);
      const right = rdp(points.slice(idx), eps);
      return left.slice(0, -1).concat(right);
    }
    return [points[0], points[points.length - 1]];
  }

  // 4) round x to 2 decimals (keep trailing zeros); round y to 2 decimals (cap tiny negatives to 0)
  const fmt = (v, t) => {
    const xv = v.toFixed(2);
    let tv = Math.round(t * 100) / 100; // round to 2 decimals
    if (Math.abs(tv) < 1e-8) tv = 0; // avoid "-0.00"
    return `${xv} ${tv.toFixed(2)}%`;
  };

  // 5) put it all together
  function buildCompressedLinear(tolerance) {
    const raw = makePoints();
    const reduced = rdp(raw, tolerance);
    return `linear(${reduced.map(([v, t]) => fmt(v, t)).join(", ")})`;
  }

  // 6) example result
  const compressed = buildCompressedLinear(0.001);
  console.log(compressed);
  */
</script>

<div
  class="m3-container"
  role="progressbar"
  style:height="{height / 16}rem"
  style:--speed="{sToHalfway * 8}s"
>
  <div class="percent"></div>
  <div class="track"></div>
</div>

<style>
  .m3-container {
    display: flex;
    gap: 0.25rem;
  }
  .percent {
    background-color: rgb(var(--m3-scheme-primary));
    border-radius: var(--m3-util-rounding-full);
    flex-shrink: 0;
    animation: grow
      linear(
        0,
        0.08 1.5%,
        0.15 2.93%,
        0.22 4.48%,
        0.29 6.18%,
        0.35 7.77%,
        0.41 9.52%,
        0.47 11.45%,
        0.52 13.24%,
        0.57 15.22%,
        0.61 16.98%,
        0.65 18.93%,
        0.69 21.12%,
        0.73 23.61%,
        0.76 25.74%,
        0.79 28.14%,
        0.82 30.92%,
        0.84 33.05%,
        0.86 35.46%,
        0.88 38.24%,
        0.9 41.52%,
        0.92 45.55%,
        0.93 47.96%,
        0.95 54.02%,
        0.96 58.05%,
        0.97 63.24%,
        0.98 70.55%,
        0.99 83.05%,
        1
      )
      var(--speed) both;
  }
  @keyframes grow {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  .track {
    background-color: rgb(var(--m3-scheme-secondary-container));
    border-radius: var(--m3-util-rounding-full);
    flex-grow: 1;
  }
</style>
