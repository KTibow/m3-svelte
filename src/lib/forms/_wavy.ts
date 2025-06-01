const frequencyT = (Math.PI * 2) / 1000;
const frequencyX = (Math.PI * 2) / 40;
const round2 = (x: number) => Math.round(x * 100) / 100;
const round1 = (x: number) => Math.round(x * 10) / 10;
export const linear = (
  t: number,
  b: number,
  from: number,
  to: number,
  time: number,
  cutoffTo?: number,
) => {
  time = time * frequencyT;
  time %= Math.PI * 2;

  if (from >= to) return "";

  let path = "";
  for (let xIterator = from; xIterator <= to; xIterator += 0.5) {
    const x = cutoffTo ? Math.min(cutoffTo, xIterator) : xIterator;
    const sinV = (Math.sin(x * frequencyX + time) + 1) * 0.5;
    const y = sinV * (t - b) + b;

    if (x == from) {
      path = `M ${round1(x)} ${round2(y)}`;
    } else {
      path += ` ${round1(x)} ${round2(y)}`;
    }
  }

  return path;
};
export const trackOpacity = (right: number, x: number) => {
  let opacity = right - x;
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;
  opacity = round2(opacity);
  return opacity;
};
