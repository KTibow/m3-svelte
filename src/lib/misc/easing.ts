// TODO: update for Expressive
const createBezierLUT = (points: [number, number][], pointCount = 100) => {
  const lut = [];
  for (let t = 0; t < 1; t += 1 / pointCount) {
    const a = (1 - t) * (1 - t) * (1 - t);
    const b = (1 - t) * (1 - t) * t;
    const c = (1 - t) * t * t;
    const d = t * t * t;
    const x = a * points[0][0] + 3 * b * points[1][0] + 3 * c * points[2][0] + d * points[3][0];
    const y = a * points[0][1] + 3 * b * points[1][1] + 3 * c * points[2][1] + d * points[3][1];
    lut.push([x, y]);
  }
  return lut;
};
const createEase = (lutOptions: [number, number][][]) => {
  let lut: ReturnType<typeof createBezierLUT>;
  return (t: number) => {
    if (!lut) lut = lutOptions.map((args) => createBezierLUT(args)).flat();
    const closestPoint = lut.find((p) => p[0] >= t);
    const closestY = closestPoint ? closestPoint[1] : 1;
    return closestY;
  };
};
export const easeEmphasized = createEase([
  [
    [0, 0],
    [0.05, 0],
    [0.133, 0.06],
    [0.166, 0.4],
  ],
  [
    [0.166, 0.4],
    [0.208, 0.82],
    [0.25, 1],
    [1, 1],
  ],
]);
export const easeEmphasizedDecel = createEase([
  [
    [0, 0],
    [0.05, 0.7],
    [0.1, 1],
    [1, 1],
  ],
]);
export const easeEmphasizedAccel = createEase([
  [
    [0, 0],
    [0.3, 0],
    [0.8, 0.15],
    [1, 1],
  ],
]);
export const easeStandard = createEase([
  [
    [0, 0],
    [0.2, 0],
    [0, 1],
    [1, 1],
  ],
]);
export const easeStandardDecel = createEase([
  [
    [0, 0],
    [0, 0],
    [0, 1],
    [1, 1],
  ],
]);
export const easeStandardAccel = createEase([
  [
    [0, 0],
    [0.3, 0],
    [1, 1],
    [1, 1],
  ],
]);
