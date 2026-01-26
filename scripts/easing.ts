/**
 * generate-m3-motion-css.ts
 * npx ts-node generate-m3-motion-css.ts
 *
 * Outputs:
 *  --m3-timing-function-emphasized
 *  --m3-timing-function-zeno
 *  --m3-timing-function{-fast,-fast-spatial,,-spatial,-slow,-slow-spatial}
 *  --m3-duration{-fast,-fast-spatial,,-spatial,-slow,-slow-spatial}
 *  --m3-easing{-fast,-fast-spatial,,-spatial,-slow,-slow-spatial}
 */

import { type EaseFn, easingToLinearCSS } from "./easing-lib.ts";

type EasingFn = (x: number) => number;

function clamp01(x: number) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

/* -------------------- emphasized target (2 cubic segments) -------------------- */

type Pt = readonly [number, number];

function cubic1(p0: number, p1: number, p2: number, p3: number, t: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}
function cubicBezierXY(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): [number, number] {
  return [cubic1(p0[0], p1[0], p2[0], p3[0], t), cubic1(p0[1], p1[1], p2[1], p3[1], t)];
}
function cubicBezierYforX(p0: Pt, p1: Pt, p2: Pt, p3: Pt, x: number, iters = 44): number {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < iters; i++) {
    const mid = (lo + hi) * 0.5;
    const [mx] = cubicBezierXY(p0, p1, p2, p3, mid);
    if (mx < x) lo = mid;
    else hi = mid;
  }
  const [, y] = cubicBezierXY(p0, p1, p2, p3, (lo + hi) * 0.5);
  return y;
}

const emphasizedSegment1: readonly [Pt, Pt, Pt, Pt] = [
  [0, 0],
  [0.05, 0],
  [0.133, 0.06],
  [0.166, 0.4],
] as const;

const emphasizedSegment2: readonly [Pt, Pt, Pt, Pt] = [
  [0.166, 0.4],
  [0.208, 0.82],
  [0.25, 1],
  [1, 1],
] as const;

function emphasizedExact(x: number): number {
  x = clamp01(x);
  const splitX = emphasizedSegment1[3][0];
  if (x <= splitX) return cubicBezierYforX(...emphasizedSegment1, x);
  return cubicBezierYforX(...emphasizedSegment2, x);
}

/* -------------------- zeno target (continuous pow, normalized) -------------------- */

function zenoPow8(x: number): number {
  x = clamp01(x);
  const a = Math.pow(2, -8 * x);
  const end = Math.pow(2, -8);
  // (1 - 2^-8x) / (1 - 2^-8)
  return (1 - a) / (1 - end);
}

/* -------------------- springs (Android SpringForce math) -------------------- */

type SpringSpec = { damping: number; stiffness: number };

function springPositionVelocityAtTime(
  tSec: number,
  dampingRatio: number,
  stiffness: number,
): { x: number; v: number } {
  const w0 = Math.sqrt(stiffness);
  const z = dampingRatio;

  const finalPos = 1;
  const x0 = 0;
  const v0 = 0;
  const d0 = x0 - finalPos; // -1

  if (tSec <= 0) return { x: x0, v: v0 };

  if (z > 1) {
    const zp = -z * w0 + w0 * Math.sqrt(z * z - 1);
    const zm = -z * w0 - w0 * Math.sqrt(z * z - 1);

    const coeffA = d0 - (zm * d0 - v0) / (zm - zp);
    const coeffB = (zm * d0 - v0) / (zm - zp);

    const em = Math.exp(zm * tSec);
    const ep = Math.exp(zp * tSec);

    const disp = coeffA * em + coeffB * ep;
    const vel = coeffA * zm * em + coeffB * zp * ep;
    return { x: disp + finalPos, v: vel };
  }

  if (Math.abs(z - 1) < 1e-9) {
    const coeffA = d0;
    const coeffB = v0 + w0 * d0;

    const e = Math.exp(-w0 * tSec);
    const disp = (coeffA + coeffB * tSec) * e;
    const vel = (coeffB - w0 * (coeffA + coeffB * tSec)) * e;
    return { x: disp + finalPos, v: vel };
  }

  const wd = w0 * Math.sqrt(1 - z * z);
  const cosCoeff = d0;
  const sinCoeff = (1 / wd) * (z * w0 * d0 + v0);

  const e = Math.exp(-z * w0 * tSec);
  const c = Math.cos(wd * tSec);
  const s = Math.sin(wd * tSec);

  const disp = e * (cosCoeff * c + sinCoeff * s);
  const vel = disp * -w0 * z + e * (-wd * cosCoeff * s + wd * sinCoeff * c);

  return { x: disp + finalPos, v: vel };
}

function settleDurationSeconds(spec: SpringSpec, valueThreshold = 0.001): number {
  const velocityThreshold = valueThreshold * (1000 / 16);
  const dt = 1 / 60;
  const maxT = 10;
  let t = 0;
  while (t < maxT) {
    t += dt;
    const { x, v } = springPositionVelocityAtTime(t, spec.damping, spec.stiffness);
    if (Math.abs(x - 1) < valueThreshold && Math.abs(v) < velocityThreshold) return t;
  }
  return maxT;
}

function makeSpringEasing(spec: SpringSpec, durationSec: number): EasingFn {
  const end = springPositionVelocityAtTime(durationSec, spec.damping, spec.stiffness).x;
  const scale = end === 0 ? 1 : 1 / end;

  return (x: number) => {
    x = clamp01(x);
    if (x === 0) return 0;
    if (x === 1) return 1;
    return springPositionVelocityAtTime(x * durationSec, spec.damping, spec.stiffness).x * scale;
  };
}

function ms(sec: number) {
  return Math.round(sec * 1000);
}

type VariantKey = "fast" | "fast-spatial" | "" | "spatial" | "slow" | "slow-spatial";
function suffix(k: VariantKey) {
  return k === "" ? "" : `-${k}`;
}

const springVariants: Record<VariantKey, SpringSpec> = {
  "fast-spatial": { damping: 0.6, stiffness: 800 },
  spatial: { damping: 0.8, stiffness: 380 },
  "slow-spatial": { damping: 0.8, stiffness: 200 },

  fast: { damping: 1, stiffness: 3800 },
  "": { damping: 1, stiffness: 1600 },
  slow: { damping: 1, stiffness: 800 },
};

/* -------------------- generate CSS -------------------- */

function generate() {
  const out: string[] = [];
  const dbg: string[] = [];

  const emphasizedResult = easingToLinearCSS(emphasizedExact as EaseFn, {
    tolerance: 0.005,
  });

  const zenoResult = easingToLinearCSS(zenoPow8 as EaseFn, {
    tolerance: 0.005,
  });

  dbg.push(
    `[debug] emphasized: len=${emphasizedResult.css.length}, stops=${emphasizedResult.points}, err≈${emphasizedResult.maxError}`,
  );
  dbg.push(
    `[debug] zeno:       len=${zenoResult.css.length}, stops=${zenoResult.points}, err≈${zenoResult.maxError}`,
  );

  out.push(`:root {`);
  out.push(`  --m3-timing-function-emphasized:${emphasizedResult.css};`);
  out.push(`  --m3-timing-function-zeno:${zenoResult.css};`);

  for (const [k, spec] of Object.entries(springVariants)) {
    const durationSec = settleDurationSeconds(spec, 0.001);
    const easing = makeSpringEasing(spec, durationSec);

    const result = easingToLinearCSS(easing as EaseFn, {
      tolerance: 0.005,
    });

    const sfx = suffix(k as VariantKey);
    out.push(`  --m3-timing-function${sfx}:${result.css};`);
    out.push(`  --m3-duration${sfx}:${ms(durationSec)}ms;`);
    out.push(`  --m3-easing${sfx}:var(--m3-timing-function${sfx}) var(--m3-duration${sfx});`);

    dbg.push(
      `[debug] spring${sfx || "(default)"}: len=${result.css.length}, stops=${result.points}, err≈${result.maxError}, duration=${ms(durationSec)}ms`,
    );
  }

  out.push(`}`);

  process.stderr.write(dbg.join("\n") + "\n");
  process.stdout.write(out.join("\n") + "\n");
}

generate();
