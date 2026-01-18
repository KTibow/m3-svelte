/* eslint-disable no-loss-of-precision */

export type EaseFn = (n: number) => number;

interface LinearizeOptions {
  /** Max |approx(x) - ease(x)| over x∈[0,1]. Default: 1e-3 */
  tolerance?: number;

  /** Reference sampling resolution for error checks. Default: 2049 */
  sampleCount?: number;

  /** Hard cap for generated linear() points. Default: 80 */
  maxStops?: number;

  /** Max points per “implicit run” between explicit anchors (>=2). Default: 14 */
  maxSubdiv?: number;

  /** Allow leaving intermediate inputs implicit (shorter linear(...)). Default: true */
  allowImplicit?: boolean;

  /** Allow `y x1% x2%` compression for equal outputs. Default: true */
  allowDoublePercentStops?: boolean;

  /** Clamp easing samples to [0,1] before fitting. Default: false */
  clamp?: boolean;

  /** Force endpoints to (0,0) and (1,1) regardless of easing output. Default: false */
  forceEndpoints?: boolean;

  /** Formatting/minification search */
  maxYDecimals?: number; // default 6
  maxPercentDecimals?: number; // default 2

  /**
   * If true, throws when tolerance cannot be met under maxStops.
   * Default: false
   */
  strictTolerance?: boolean;
}

interface LinearizeResult {
  css: string;
  maxError: number;
  metTolerance: boolean;
  points: number;
  explicitAnchors: number;
}

type Plan = {
  anchors: number[]; // increasing, includes 0 and 1
  subdiv: number[]; // length anchors.length-1, each >=2
};

type Point = { x: number; y: number; isAnchor: boolean };

export function easingToLinearCSS(ease: EaseFn, options: LinearizeOptions = {}): LinearizeResult {
  const tol = options.tolerance ?? 1e-3;
  const sampleCount = options.sampleCount ?? 2049;
  const maxStops = options.maxStops ?? 80;
  const maxSubdiv = Math.max(2, options.maxSubdiv ?? 14);
  const allowImplicit = options.allowImplicit ?? true;
  const allowDouble = options.allowDoublePercentStops ?? true;
  const clamp = options.clamp ?? false;
  const forceEndpoints = options.forceEndpoints ?? false;
  const maxYDecimals = options.maxYDecimals ?? 6;
  const maxPDecimals = options.maxPercentDecimals ?? 2;
  const strictTolerance = options.strictTolerance ?? false;

  if (sampleCount < 17) throw new Error("sampleCount too small");
  if (maxStops < 2) throw new Error("maxStops must be >= 2");

  // ----- Reference samples (for error measurement) -----
  const refX = new Float64Array(sampleCount);
  const refY = new Float64Array(sampleCount);
  for (let i = 0; i < sampleCount; i++) {
    const x = i / (sampleCount - 1);
    let y = ease(x);
    if (!Number.isFinite(y)) throw new Error(`ease(${x}) is not finite`);
    if (clamp) y = clamp01(y);
    refX[i] = x;
    refY[i] = y;
  }
  if (forceEndpoints) {
    refY[0] = 0;
    refY[sampleCount - 1] = 1;
  }

  // Memoize ease evaluations used for non-reference x
  const easeMemo = new Map<number, number>();
  const evalEase = (x: number): number => {
    const k = Math.round(x * 1e12) / 1e12;
    const hit = easeMemo.get(k);
    if (hit !== undefined) return hit;

    let y = ease(x);
    if (!Number.isFinite(y)) throw new Error(`ease(${x}) is not finite`);
    if (clamp) y = clamp01(y);
    if (forceEndpoints) {
      if (x === 0) y = 0;
      if (x === 1) y = 1;
    }
    easeMemo.set(k, y);
    return y;
  };

  // ----- Candidate plans -----
  const candidates: Plan[] = [];

  // 1) Uniform implicit-x only
  candidates.push(findBestUniformPlan(refX, refY, evalEase, tol, maxStops));

  // 2) Adaptive explicit anchors
  const explicitPlan = fitAdaptiveExplicitPlan(refX, refY, tol, maxStops);
  candidates.push(explicitPlan);

  // 3) DP hybrid plan
  if (allowImplicit) {
    candidates.push(buildHybridDP(explicitPlan, refX, refY, evalEase, tol, maxStops, maxSubdiv));
  }

  // Normalize/dedupe
  let refinedPlans = dedupePlans(
    candidates.map((p) => normalizeAndMergePlan(p, maxStops, maxSubdiv)),
  );

  // Evaluate/serialize: prefer solutions that meet tol; otherwise best-effort (min error).
  let bestMet: LinearizeResult | null = null;
  let bestUnmet: LinearizeResult | null = null;

  for (const plan of refinedPlans) {
    const basePoints = buildPointsFromPlan(plan, evalEase);
    if (basePoints.length > maxStops) continue;

    const baseErr = maxErrorAgainstRef(basePoints, refX, refY).err;
    const meets = baseErr <= tol;

    // If we already meet tol: minification must keep <= tol.
    // If we don't meet tol: minification must not worsen beyond baseErr (prevents “garbage” rounding).
    const errLimit = meets ? tol : baseErr;

    const res = bestCssForPlan(plan, basePoints, errLimit, refX, refY, evalEase, {
      tolerance: tol,
      maxStops,
      maxYDecimals,
      maxPercentDecimals: maxPDecimals,
      allowImplicit,
      allowDoublePercentStops: allowDouble,
    });

    if (!res) continue;

    if (res.metTolerance) {
      if (
        !bestMet ||
        res.css.length < bestMet.css.length ||
        (res.css.length === bestMet.css.length && res.points < bestMet.points) ||
        (res.css.length === bestMet.css.length &&
          res.points === bestMet.points &&
          res.maxError < bestMet.maxError)
      ) {
        bestMet = res;
      }
    } else {
      if (
        !bestUnmet ||
        res.maxError < bestUnmet.maxError ||
        (res.maxError === bestUnmet.maxError && res.css.length < bestUnmet.css.length)
      ) {
        bestUnmet = res;
      }
    }
  }

  const best = bestMet ?? bestUnmet;
  if (!best) throw new Error("Failed to build any linear() output");

  if (strictTolerance && !best.metTolerance) {
    throw new Error(
      `Could not meet tolerance ${tol} within maxStops=${maxStops}. Best maxError=${best.maxError}`,
    );
  }

  return best;
}

// ----------------------- Plan building -----------------------

function findBestUniformPlan(
  refX: Float64Array,
  refY: Float64Array,
  evalEase: (x: number) => number,
  tol: number,
  maxStops: number,
): Plan {
  const test = (n: number): number => {
    const pts = buildUniformPoints(evalEase, n);
    return maxErrorAgainstRef(pts, refX, refY).err;
  };

  let lo = 2;
  let hi = 2;
  let err = test(hi);

  while (err > tol && hi < maxStops) {
    lo = hi;
    hi = Math.min(maxStops, hi * 2);
    err = test(hi);
    if (hi === lo) break;
  }

  if (err > tol && hi === maxStops) {
    return { anchors: [0, 1], subdiv: [maxStops] };
  }

  let left = lo;
  let right = hi;
  while (left + 1 < right) {
    const mid = (left + right) >> 1;
    if (test(mid) <= tol) right = mid;
    else left = mid;
  }

  return { anchors: [0, 1], subdiv: [right] };
}

function fitAdaptiveExplicitPlan(
  refX: Float64Array,
  refY: Float64Array,
  tol: number,
  maxStops: number,
): Plan {
  const n = refX.length;
  const anchorIdx: number[] = [0, n - 1];

  const computeWorstInSegment = (a: number, b: number) => {
    const xA = refX[a],
      yA = refY[a];
    const xB = refX[b],
      yB = refY[b];
    const dx = xB - xA;

    let worstErr = -1;
    let worstIdx = -1;

    for (let i = a + 1; i < b; i++) {
      const t = dx === 0 ? 0 : (refX[i] - xA) / dx;
      const yLin = yA + t * (yB - yA);
      const e = Math.abs(yLin - refY[i]);
      if (e > worstErr) {
        worstErr = e;
        worstIdx = i;
      }
    }
    return { worstErr, worstIdx };
  };

  while (anchorIdx.length < maxStops) {
    let bestSeg = -1;
    let bestErr = -1;
    let bestInsert = -1;

    for (let s = 0; s < anchorIdx.length - 1; s++) {
      const a = anchorIdx[s];
      const b = anchorIdx[s + 1];
      const { worstErr, worstIdx } = computeWorstInSegment(a, b);
      if (worstErr > bestErr) {
        bestErr = worstErr;
        bestSeg = s;
        bestInsert = worstIdx;
      }
    }

    if (bestErr <= tol || bestInsert < 0) break;
    anchorIdx.splice(bestSeg + 1, 0, bestInsert);
  }

  const anchors = anchorIdx.map((i) => refX[i]);
  const subdiv = new Array(anchors.length - 1).fill(2);
  return { anchors, subdiv };
}

function buildHybridDP(
  explicitPlan: Plan,
  refX: Float64Array,
  refY: Float64Array,
  evalEase: (x: number) => number,
  tol: number,
  maxStops: number,
  maxSubdiv: number,
): Plan {
  const candAnchors = downsampleAnchors(explicitPlan.anchors, 40);
  const m = candAnchors.length;
  if (m < 2) return { anchors: [0, 1], subdiv: [2] };

  const idxOfX = (x: number) => Math.round(x * (refX.length - 1));
  const candIdx = candAnchors.map(idxOfX);

  const maxJump = 20;
  const minSubdiv: number[][] = Array.from({ length: m }, () => new Array(m).fill(Infinity));

  for (let i = 0; i < m - 1; i++) {
    for (let j = i + 1; j < Math.min(m, i + 1 + maxJump); j++) {
      const a = candAnchors[i];
      const b = candAnchors[j];
      const aIdx = candIdx[i];
      const bIdx = candIdx[j];

      for (let s = 2; s <= maxSubdiv; s++) {
        const pts = buildIntervalPoints(evalEase, a, b, s, true);
        const err = maxErrorAgainstRef(pts, refX, refY, aIdx, bIdx).err;
        if (err <= tol) {
          minSubdiv[i][j] = s;
          break;
        }
      }
    }
  }

  const INF = 1e18;
  const dp: Float64Array[] = Array.from({ length: m }, () =>
    new Float64Array(maxStops + 1).fill(INF),
  );
  const prevI: Int16Array[] = Array.from({ length: m }, () =>
    new Int16Array(maxStops + 1).fill(-1),
  );
  const prevP: Int16Array[] = Array.from({ length: m }, () =>
    new Int16Array(maxStops + 1).fill(-1),
  );
  const prevS: Uint8Array[] = Array.from({ length: m }, () => new Uint8Array(maxStops + 1));

  const wPoint = 1.0;
  const wExplicit = 0.75;

  dp[0][1] = 0;

  for (let i = 0; i < m - 1; i++) {
    for (let p = 1; p <= maxStops; p++) {
      const base = dp[i][p];
      if (base >= INF) continue;

      for (let j = i + 1; j < Math.min(m, i + 1 + maxJump); j++) {
        const s = minSubdiv[i][j];
        if (!Number.isFinite(s)) continue;

        const addPoints = s - 1;
        const np = p + addPoints;
        if (np > maxStops) continue;

        const isInteriorBoundary = j !== m - 1;
        const addExplicit = isInteriorBoundary ? 1 : 0;

        const score = base + wPoint * addPoints + wExplicit * addExplicit;
        if (score < dp[j][np]) {
          dp[j][np] = score;
          prevI[j][np] = i;
          prevP[j][np] = p;
          prevS[j][np] = s;
        }
      }
    }
  }

  let bestP = -1;
  let bestScore = INF;
  for (let p = 2; p <= maxStops; p++) {
    const s = dp[m - 1][p];
    if (s < bestScore) {
      bestScore = s;
      bestP = p;
    }
  }
  if (bestP < 0 || bestScore >= INF) return explicitPlan;

  const intervals: { i: number; j: number; s: number }[] = [];
  let j = m - 1;
  let p = bestP;
  while (j > 0) {
    const i = prevI[j][p];
    const pp = prevP[j][p];
    const s = prevS[j][p];
    if (i < 0 || pp < 0 || s < 2) break;
    intervals.push({ i, j, s });
    j = i;
    p = pp;
  }
  intervals.reverse();

  const anchors: number[] = [candAnchors[0]];
  const subdiv: number[] = [];
  for (const it of intervals) {
    anchors.push(candAnchors[it.j]);
    subdiv.push(it.s);
  }

  if (anchors.length < 2) return explicitPlan;
  return { anchors, subdiv };
}

// ----------------------- Normalization / merging redundant anchors -----------------------

function normalizeAndMergePlan(plan: Plan, maxStops: number, maxSubdiv: number): Plan {
  return mergeRedundantAnchors(normalizePlan(plan, maxStops, maxSubdiv));
}

function normalizePlan(plan: Plan, maxStops: number, maxSubdiv: number): Plan {
  const anchors = plan.anchors.slice().sort((a, b) => a - b);
  anchors[0] = 0;
  anchors[anchors.length - 1] = 1;

  const outA: number[] = [anchors[0]];
  for (let i = 1; i < anchors.length; i++) {
    const x = anchors[i];
    if (x - outA[outA.length - 1] > 1e-8) outA.push(x);
  }
  if (outA[outA.length - 1] !== 1) outA.push(1);

  const outS = new Array(outA.length - 1).fill(2);
  for (let i = 0; i < Math.min(outS.length, plan.subdiv.length); i++) {
    outS[i] = Math.max(2, Math.min(maxSubdiv, plan.subdiv[i] | 0));
  }

  let pts = 1 + outS.reduce((acc, s) => acc + (s - 1), 0);
  while (pts > maxStops) {
    let k = -1;
    for (let i = 0; i < outS.length; i++) if (outS[i] > 2 && (k < 0 || outS[i] > outS[k])) k = i;
    if (k < 0) break;
    outS[k]--;
    pts--;
  }

  return { anchors: outA, subdiv: outS };
}

/**
 * If two adjacent implicit runs have identical step sizes, the boundary anchor is redundant.
 * We can remove it and keep the same x-grid.
 */
function mergeRedundantAnchors(plan: Plan): Plan {
  const anchors = plan.anchors.slice();
  const subdiv = plan.subdiv.slice();
  const eps = 1e-12;

  let i = 1;
  while (i < anchors.length - 1) {
    const a = anchors[i - 1];
    const b = anchors[i];
    const c = anchors[i + 1];

    const s1 = subdiv[i - 1] - 1;
    const s2 = subdiv[i] - 1;
    if (s1 <= 0 || s2 <= 0) {
      i++;
      continue;
    }

    const step1 = (b - a) / s1;
    const step2 = (c - b) / s2;

    if (Math.abs(step1 - step2) <= eps) {
      anchors.splice(i, 1);
      subdiv.splice(i - 1, 2, s1 + s2 + 1); // new points count
      continue;
    }

    i++;
  }

  anchors[0] = 0;
  anchors[anchors.length - 1] = 1;
  return { anchors, subdiv };
}

function dedupePlans(plans: Plan[]): Plan[] {
  const out: Plan[] = [];
  const seen = new Set<string>();
  for (const p of plans) {
    const key = p.anchors.map((a) => a.toFixed(12)).join("|") + ";" + p.subdiv.join(",");
    if (!seen.has(key)) {
      seen.add(key);
      out.push(p);
    }
  }
  return out;
}

// ----------------------- Formatting search + per-point minify -----------------------

function bestCssForPlan(
  plan: Plan,
  basePoints: Point[],
  errLimit: number,
  refX: Float64Array,
  refY: Float64Array,
  evalEase: (x: number) => number,
  cfg: {
    tolerance: number;
    maxStops: number;
    maxYDecimals: number;
    maxPercentDecimals: number;
    allowImplicit: boolean;
    allowDoublePercentStops: boolean;
  },
): LinearizeResult | null {
  let best: LinearizeResult | null = null;

  const isUniformNoExplicitX = plan.anchors.length === 2;
  const percentDecCandidates = isUniformNoExplicitX
    ? [0]
    : uniqueInts([
        ...range(0, cfg.maxPercentDecimals),
        // fallback precision so we don't accidentally eliminate good anchor placements
        3,
        4,
        5,
        6,
      ]);

  for (const pDec of percentDecCandidates) {
    const quant = quantizePlanAnchors(plan, pDec);
    if (!quant) continue;

    const pts = buildPointsFromPlan(quant, evalEase);
    if (pts.length > cfg.maxStops) continue;

    const e0 = maxErrorAgainstRef(pts, refX, refY).err;
    if (e0 > errLimit + 1e-15) continue;

    const minPts = pts.map((p) => ({ ...p }));
    minifyPointYs(minPts, refX, refY, errLimit, cfg.maxYDecimals);

    const e1 = maxErrorAgainstRef(minPts, refX, refY).err;
    if (e1 > errLimit + 1e-15) continue;

    const css = pointsToLinearCSS(minPts, {
      allowImplicit: cfg.allowImplicit,
      allowDoublePercentStops: cfg.allowDoublePercentStops,
      pDec,
    });

    const explicitAnchors = Math.max(0, quant.anchors.length - 2);
    const res: LinearizeResult = {
      css,
      maxError: e1,
      metTolerance: e1 <= cfg.tolerance + 1e-15,
      points: minPts.length,
      explicitAnchors,
    };

    if (!best) {
      best = res;
      continue;
    }

    // Prefer meeting tolerance, then shortest string, then fewer points, then smaller error.
    if (res.metTolerance && !best.metTolerance) {
      best = res;
      continue;
    }
    if (res.metTolerance === best.metTolerance) {
      if (
        res.css.length < best.css.length ||
        (res.css.length === best.css.length && res.points < best.points) ||
        (res.css.length === best.css.length &&
          res.points === best.points &&
          res.maxError < best.maxError)
      ) {
        best = res;
      }
    }
  }

  return best;
}

function quantizePlanAnchors(plan: Plan, percentDecimals: number): Plan | null {
  if (plan.anchors.length < 2) return null;

  const q = plan.anchors.slice();
  q[0] = 0;
  q[q.length - 1] = 1;

  const scale = Math.pow(10, percentDecimals);
  for (let i = 1; i < q.length - 1; i++) {
    const p = q[i] * 100;
    const qp = Math.round(p * scale) / scale;
    q[i] = qp / 100;
  }

  for (let i = 1; i < q.length; i++) {
    if (!(q[i] > q[i - 1] + 1e-8)) return null;
  }

  return mergeRedundantAnchors({ anchors: q, subdiv: plan.subdiv.slice() });
}

/**
 * Per-point Y minifier.
 * IMPORTANT: This allows overshoot/undershoot (values outside [0,1]).
 * It tries:
 * - rounding to 0..maxDecimals
 * - snapping to nice fractions (k/den) and (1 + k/den) which is great for overshoot near 1
 * - snapping to nice decimal steps like 0.05, 0.02, 0.01, 0.005
 */
function minifyPointYs(
  points: Point[],
  refX: Float64Array,
  refY: Float64Array,
  errLimit: number,
  maxDecimals: number,
) {
  const snapDenoms = [2, 4, 5, 8, 10, 16, 20, 25, 32, 50, 64, 100, 128, 256];
  const niceSteps = [1, 0.5, 0.25, 0.2, 0.1, 0.05, 0.02, 0.01, 0.005, 0.002, 0.001];

  const printLen = (y: number) => fmtNumber(y, 12).length;

  // NEW: forbid interior values that would *print* as 0 or 1
  const printsAs01 = (y: number) => {
    const s = fmtNumber(y, 12); // must match pointsToLinearCSS formatting
    return s === "0" || s === "1";
  };

  for (let pass = 0; pass < 4; pass++) {
    let changed = false;

    for (let i = 0; i < points.length; i++) {
      const isEndpoint = i === 0 || i === points.length - 1;

      const orig = points[i].y;
      const origLen = printLen(orig);

      const candSet = new Map<number, number>();
      const add = (v: number) => {
        if (!Number.isFinite(v)) return;
        if (Math.abs(v) > 1e6) return;

        // NEW: don't allow interior points to become "0" or "1"
        if (!isEndpoint && printsAs01(v)) return;

        const k = Math.round(v * 1e12) / 1e12;
        candSet.set(k, v);
      };

      add(orig);

      // decimals
      for (let d = 0; d <= maxDecimals; d++) add(roundTo(orig, d));

      // nice step snapping (helps get 1.05, 1.1, 0.95, etc)
      for (const step of niceSteps) {
        add(Math.round(orig / step) * step);
        add(1 + Math.round((orig - 1) / step) * step);
      }

      // rational snapping around 0 and around 1
      for (const den of snapDenoms) {
        add(Math.round(orig * den) / den);
        add(1 + Math.round((orig - 1) * den) / den);
      }

      const cands = Array.from(candSet.values());
      cands.sort((a, b) => {
        const la = printLen(a) - printLen(b);
        if (la) return la;
        return Math.abs(a - orig) - Math.abs(b - orig);
      });

      let bestY = orig;
      let bestYLen = origLen;

      for (const y of cands) {
        const len = printLen(y);
        if (len > bestYLen) break;

        points[i].y = y;
        const err = maxErrorAgainstRef(points, refX, refY).err;
        if (err <= errLimit + 1e-15) {
          bestY = y;
          bestYLen = len;
          if (bestYLen < origLen) {
            changed = true;
            break;
          }
        }
      }

      points[i].y = bestY;
    }

    if (!changed) break;
  }
}

// ----------------------- CSS construction -----------------------

function pointsToLinearCSS(
  points: Point[],
  cfg: { allowImplicit: boolean; allowDoublePercentStops: boolean; pDec: number },
): string {
  const percent = (x: number) => fmtPercent(x, cfg.pDec);

  const printed: { y: string; x?: string; x2?: string }[] = [];
  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const yStr = fmtNumber(pt.y, 12);
    const isFirst = i === 0;
    const isLast = i === points.length - 1;

    if (!cfg.allowImplicit) {
      printed.push({ y: yStr, x: percent(pt.x) });
      continue;
    }

    if (pt.isAnchor && !isFirst && !isLast) printed.push({ y: yStr, x: percent(pt.x) });
    else printed.push({ y: yStr });
  }

  if (cfg.allowDoublePercentStops) {
    const out: typeof printed = [];
    for (let i = 0; i < printed.length; i++) {
      const a = printed[i];
      const b = printed[i + 1];
      if (b && a.x && b.x && a.y === b.y) {
        out.push({ y: a.y, x: a.x, x2: b.x });
        i++;
        continue;
      }
      out.push(a);
    }
    return (
      "linear(" +
      out.map((s) => (s.x2 ? `${s.y} ${s.x} ${s.x2}` : s.x ? `${s.y} ${s.x}` : s.y)).join(",") +
      ")"
    );
  }

  return "linear(" + printed.map((s) => (s.x ? `${s.y} ${s.x}` : s.y)).join(",") + ")";
}

// ----------------------- Geometry / evaluation -----------------------

function buildUniformPoints(evalEase: (x: number) => number, n: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    const x = i / (n - 1);
    // Not anchors => no explicit % printed for uniform plan.
    pts.push({ x, y: evalEase(x), isAnchor: false });
  }
  return pts;
}

function buildIntervalPoints(
  evalEase: (x: number) => number,
  a: number,
  b: number,
  n: number,
  anchorEnds: boolean,
): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const x = a + t * (b - a);
    const isEnd = i === 0 || i === n - 1;
    pts.push({ x, y: evalEase(x), isAnchor: anchorEnds && isEnd });
  }
  return pts;
}

function buildPointsFromPlan(plan: Plan, evalEase: (x: number) => number): Point[] {
  const anchors = plan.anchors;
  const subdiv = plan.subdiv;
  const pts: Point[] = [];

  for (let k = 0; k < anchors.length - 1; k++) {
    const a = anchors[k];
    const b = anchors[k + 1];
    const s = subdiv[k] | 0;

    for (let i = 0; i < s; i++) {
      if (k > 0 && i === 0) continue; // avoid duplicate boundary
      const t = i / (s - 1);
      const x = a + t * (b - a);
      const isAnchor = i === 0 || i === s - 1;
      pts.push({ x, y: evalEase(x), isAnchor });
    }
  }

  if (pts.length) {
    pts[0].isAnchor = true;
    pts[pts.length - 1].isAnchor = true;
  }
  return pts;
}

function maxErrorAgainstRef(
  points: { x: number; y: number }[],
  refX: Float64Array,
  refY: Float64Array,
  startIdx = 0,
  endIdx = refX.length - 1,
) {
  let seg = 0;
  while (seg + 1 < points.length && points[seg + 1].x <= refX[startIdx]) seg++;

  let worst = -1;
  let worstIndex = startIdx;

  for (let i = startIdx; i <= endIdx; i++) {
    const x = refX[i];
    while (seg + 1 < points.length - 1 && points[seg + 1].x < x) seg++;

    const a = points[seg];
    const b = points[Math.min(seg + 1, points.length - 1)];

    let yHat: number;
    if (b.x === a.x) yHat = b.y;
    else {
      const t = (x - a.x) / (b.x - a.x);
      yHat = a.y + t * (b.y - a.y);
    }

    const e = Math.abs(yHat - refY[i]);
    if (e > worst) {
      worst = e;
      worstIndex = i;
    }
  }

  return { err: worst, worstIndex };
}

// ----------------------- Helpers -----------------------

function downsampleAnchors(anchors: number[], maxKeep: number): number[] {
  if (anchors.length <= maxKeep) return anchors.slice();
  const out: number[] = [];
  const n = anchors.length;
  for (let k = 0; k < maxKeep; k++) {
    const t = k / (maxKeep - 1);
    const idx = Math.round(t * (n - 1));
    out.push(anchors[idx]);
  }
  const uniq: number[] = [out[0]];
  for (let i = 1; i < out.length; i++) {
    if (out[i] > uniq[uniq.length - 1] + 1e-10) uniq.push(out[i]);
  }
  uniq[0] = 0;
  uniq[uniq.length - 1] = 1;
  return uniq;
}

function range(a: number, b: number): number[] {
  const out: number[] = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}

function uniqueInts(xs: number[]) {
  return Array.from(new Set(xs)).sort((a, b) => a - b);
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function roundTo(x: number, decimals: number): number {
  const s = Math.pow(10, decimals);
  return Math.round(x * s) / s;
}

function fmtNumber(x: number, decimals: number): string {
  if (Object.is(x, -0)) x = 0;
  if (decimals === 0) return String(Math.round(x));

  let s = x.toFixed(decimals);
  if (s.indexOf(".") >= 0) {
    s = s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  s = s.replace(/^(-?)0\./, "$1.");
  return s;
}

function fmtPercent(x: number, percentDecimals: number): string {
  const p = x * 100;
  let s = percentDecimals === 0 ? String(Math.round(p)) : p.toFixed(percentDecimals);
  if (s.indexOf(".") >= 0) {
    s = s.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  return s + "%";
}
