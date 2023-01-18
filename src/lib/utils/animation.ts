import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
// Heavily inspired by crossfade from svelte/transition
interface transitionOptions {
  delay?: number;
  duration?: number;
  easing?: typeof cubicOut;
}
interface containerOptions {
  fallback?: (
    node: Element,
    params: transitionOptions & containerOptions,
    isLeaving: boolean
  ) => TransitionConfig;
}
interface containerParamOptions {
  key: string;
}
interface inOutOptions {
  start?: "top" | "bottom" | "left" | "right";
}
export const containerTransform = (options: transitionOptions & containerOptions) => {
  const haveStarted = new Map();
  const haveDelivered = new Map();
  const transform = (
    from: DOMRect,
    node: Element,
    params: transitionOptions & containerOptions & containerParamOptions,
    isLeaving: boolean
  ): TransitionConfig => {
    const to = node.getBoundingClientRect();
    const toCenter = [to.left + to.width / 2, to.top + to.height / 2];
    const fromCenter = [from.left + from.width / 2, from.top + from.height / 2];
    const dx = fromCenter[0] - toCenter[0];
    const dy = fromCenter[1] - toCenter[1];

    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    return {
      delay: params.delay || options.delay,
      duration: params.duration || options.duration || 500,
      easing: params.easing || options.easing || cubicOut,
      css: (t: number, u: number) => {
        const currentWidth = to.width * (1 - u) + from.width * u;
        const currentHeight = to.height * (1 - u) + from.height * u;
        const widthOffset = (to.width - currentWidth) / 2;
        const heightOffset = (to.height - currentHeight) / 2;
        return `transform-origin: top-left;
transform: ${transform} translate(${u * dx}px, ${u * dy}px);
clip-path: inset(${heightOffset}px ${widthOffset}px ${heightOffset}px ${widthOffset}px);`;
      },
    };
  };
  const _makeTransition = (
    starting: typeof haveStarted,
    ending: typeof haveDelivered,
    isLeaving: boolean
  ) => {
    return (
      node: Element,
      params: transitionOptions & containerOptions & containerParamOptions
    ) => {
      starting.set(params.key, { rect: node.getBoundingClientRect() });
      return () => {
        if (ending.has(params.key)) {
          const { rect } = ending.get(params.key);
          ending.delete(params.key);
          return transform(rect, node, params, isLeaving);
        }
        starting.delete(params.key);
        const fallback = params.fallback || options.fallback;
        return fallback?.(node, params, isLeaving) || {}; // TODO: satisfy ts
      };
    };
  };
  return [
    _makeTransition(haveStarted, haveDelivered, true),
    _makeTransition(haveDelivered, haveStarted, false),
  ];
};
export const enterExit = (_: Element, options: transitionOptions & inOutOptions) => {
  options.start ||= "top";
  const scaleDir = ["top", "bottom"].includes(options.start) ? "Y" : "X";
  const getClipPath = (n: string) => {
    if (options.start == "top") return `0 0 ${n} 0`;
    else if (options.start == "bottom") return `${n} 0 0 0`;
    else if (options.start == "left") return `0 ${n} 0 0`;
    else if (options.start == "right") return `0 0 0 ${n}`;
  };
  const getTransform = (n: number) => {
    if (options.start == "top") return `translateY(${-n}rem)`;
    else if (options.start == "bottom") return `translateY(${n}rem)`;
    else if (options.start == "left") return `translateX(${-n}rem)`;
    else if (options.start == "right") return `translateX(${n}rem)`;
  };
  return {
    delay: options.delay,
    duration: options.duration || 300,
    easing: options.easing || cubicOut,
    css: (t: number, u: number) =>
      `clip-path: inset(${getClipPath(u * 100 + "%")} round 1rem);
transform-origin: ${options.start};
transform: scale${scaleDir}(${(t * 0.3 + 0.7) * 100}%) ${getTransform(u * 2)};`,
  };
};

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
]); /* css versions:
with limited overshoot:
https://cdn.discordapp.com/attachments/1058124584286683237/1064238491904524308/w9blD3eMKQBwAAAABJRU5ErkJggg.png
cubic-bezier(0.254, 0.029, 0, 1.2) is preferred, it is the most accurate to the acceleration
cubic-bezier(0.356, 0.701, 0, 1.004) is the most accurate to the deceleration
cubic-bezier(0.291, 0.281, 0, 1.2) has no weighting
unlimited overshoot:
https://cdn.discordapp.com/attachments/1058124584286683237/1064238129306927124/H47ZvYKwT8COjeuQXsI8AE4554luCbtMqAAqAJubZ9I2452QBcREREJgab5REREREKgZEpEREQkBEqmREREREKgZEpEREQkBEqmREREREKgZEpEREQkBEqmREREREKgZEpEREQkBP8PcBLo5kfHxSYAAAAASUVORK5CYII.png
cubic-bezier(0.271, -0.011, 0, 1.449) is the most accurate to the acceleration (but has a large overshoot)
the deceleration is the same as before
cubic-bezier(0.278, 0.195, 0, 1.251) has no weighting
the m3 docs randomly mention 0.2, 0, 0, 1 but that seems off
*/
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
