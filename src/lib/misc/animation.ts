import type { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import { easeEmphasized } from "./easing";
import { parseSize } from "./utils";

interface transitionOptions {
  delay?: number;
  duration?: number;
  easing?: typeof cubicOut;
}
interface containerOptions {
  fallback?: (
    node: Element,
    params: transitionOptions & containerOptions & containerParamOptions,
    intro: boolean,
  ) => TransitionConfig;
  bgContainerZ?: number;
  fgContainerZ?: number;
}
interface containerParamOptions {
  key: string;
}
type ClientRectMap = Map<string, { rect: DOMRect; node: Element }>;
const getBackgroundColor = (node: Element, defaultColor?: string): string => {
  if (!defaultColor) {
    const tmp = document.createElement("div");
    document.body.appendChild(tmp);
    defaultColor = getComputedStyle(tmp).backgroundColor;
    tmp.remove();
  }
  const color = getComputedStyle(node).backgroundColor;
  if (color != defaultColor) return color;
  if (node.parentElement) return getBackgroundColor(node.parentElement, defaultColor);
  return defaultColor;
};
const parseColor = (color: string) => {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    const [r, g, b, opacity = 1.0] = match.slice(1, 5).map((val) => val && parseFloat(val));
    if (
      typeof r != "number" ||
      typeof g != "number" ||
      typeof b != "number" ||
      typeof opacity != "number"
    ) {
      console.log(color, match, r, g, b, opacity);
      throw new Error("something went down in the color parser, see previous info");
    }
    return [r, g, b, opacity];
  }
  return [0, 0, 0, 0];
};

export const containerTransform = ({
  fallback,
  ...defaults
}: transitionOptions & containerOptions) => {
  /* This code is based on the crossfade function from Svelte. Svelte is under the MIT license.
  https://github.com/sveltejs/svelte/blob/master/src/runtime/transition/index.ts
  If you have an idea for cleaning up this mess of code, please make a PR. */
  const to_receive: ClientRectMap = new Map();
  const to_send: ClientRectMap = new Map();

  function calcTransition(
    from: DOMRect,
    fromNode: Element,
    node: Element,
    params: transitionOptions & containerOptions,
  ): TransitionConfig {
    const to = node.getBoundingClientRect();
    const isEntering = from.width * from.height < to.width * to.height;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top - to.top;

    const style = getComputedStyle(node);
    const transform = style.transform == "none" ? "" : style.transform;
    const opacity = +style.opacity;
    const bgContainerZ = params.bgContainerZ || defaults.bgContainerZ || 4;
    const fgContainerZ = params.fgContainerZ || defaults.fgContainerZ || 5;
    let container: {
      backwards?: boolean;
      e?: HTMLDivElement;
      fromColor: ReturnType<typeof parseColor>;
      fromRadius: number;
      fromBorderWidth: number;
      fromBorderColor: ReturnType<typeof parseColor>;
      toColor: ReturnType<typeof parseColor>;
      toRadius: number;
      toBorderWidth: number;
      toBorderColor: ReturnType<typeof parseColor>;
    } | null = {
      fromColor: parseColor(getBackgroundColor(node)),
      fromRadius: parseSize(style.borderRadius),
      fromBorderWidth: parseSize(style.borderLeftWidth),
      fromBorderColor: parseColor(style.borderLeftColor),
      toColor: parseColor(getBackgroundColor(fromNode)),
      toRadius: parseSize(getComputedStyle(fromNode).borderRadius),
      toBorderWidth: parseSize(getComputedStyle(fromNode).borderLeftWidth),
      toBorderColor: parseColor(getComputedStyle(fromNode).borderLeftColor),
    };

    return {
      delay: params.delay || defaults.delay || 0,
      duration: params.duration || defaults.duration || 500,
      easing: params.easing || defaults.easing || easeEmphasized,
      css: (t, u) => {
        const dw = t + u * (from.width / to.width);
        const dh = t + u * (from.height / to.height);
        const tOpacity = (isEntering ? (10 * t - 3) / 7 : (-10 / 3) * u + 1) * opacity;
        const tScale = isEntering ? Math.max(dw, dh) : Math.min(dw, dh);
        const horizontalTrim = ((tScale - dw) * to.width) / tScale / 2;
        const verticalTrim = ((tScale - dh) * to.height) / tScale;
        return `
          opacity: ${tOpacity};
          transform-origin: top center;
          transform: ${transform} translate(${u * dx}px, ${u * dy}px) scale(${tScale});
          clip-path: inset(0 ${horizontalTrim}px ${verticalTrim}px ${horizontalTrim}px);
          z-index: ${fgContainerZ};
          ${t < 0.98 ? "background-color: transparent;" : ""}
          border-color: transparent;
          pointer-events: none;
        `;
      },
      tick: (t, u) => {
        if (!isEntering || !container) return;
        if (container.backwards == null) container.backwards = Boolean(t);
        if (!container.e) {
          container.e = document.createElement("div");
          container.e.style.position = "fixed";
          container.e.style.zIndex = bgContainerZ.toString();
          container.e.style.boxSizing = "border-box";
          container.e.style.borderStyle = "solid";
          document.body.appendChild(container.e);
        } else if (t == (container.backwards ? 0 : 1)) {
          document.body.removeChild(container.e);
          return (container = null);
        }
        container.e.style.top = (u * from.top + t * to.top).toFixed(1) + "px";
        container.e.style.left = (u * from.left + t * to.left).toFixed(1) + "px";
        container.e.style.width = (u * from.width + t * to.width).toFixed(1) + "px";
        container.e.style.height = (u * from.height + t * to.height).toFixed(1) + "px";

        const {
          fromColor,
          fromRadius,
          fromBorderWidth,
          fromBorderColor,
          toColor,
          toRadius,
          toBorderWidth,
          toBorderColor,
        } = container;

        const interpColor = [0, 0, 0, 0].map((_, i) =>
          Math.trunc(t * fromColor[i] + u * toColor[i]),
        );
        container.e.style.backgroundColor = `rgba(${interpColor.join(",")})`;
        container.e.style.borderRadius = (t * fromRadius + u * toRadius).toFixed(1) + "px";
        container.e.style.borderWidth = (t * fromBorderWidth + u * toBorderWidth).toFixed(1) + "px";
        const interpBorder = [0, 0, 0, 0].map((_, i) =>
          Math.trunc(t * fromBorderColor[i] + u * toBorderColor[i]),
        );
        container.e.style.borderColor = `rgba(${interpBorder.join(",")})`;
      },
    };
  }

  function makeTransition(items: ClientRectMap, counterparts: ClientRectMap, intro: boolean) {
    return (
      node: Element,
      params: transitionOptions & containerOptions & containerParamOptions,
    ) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect(),
        node,
      });
      return () => {
        const counterpart = counterparts.get(params.key);
        if (counterpart) {
          counterparts.delete(params.key);
          return calcTransition(counterpart.rect, counterpart.node, node, params);
        }

        // if the node is disappearing altogether
        // (i.e. wasn't claimed by the other list)
        // then we need to supply an outro
        items.delete(params.key);
        return fallback ? fallback(node, params, intro) : {};
      };
    };
  }

  return [makeTransition(to_send, to_receive, false), makeTransition(to_receive, to_send, true)];
};

type sharedAxisOptions =
  | {
      direction: "X" | "Y";
      /**
       * true if this element is on the top/left of things
       * if it's first, then use transition: and set it to true
       * if it's last, then use transition: and set it to false
       * if it's in between, use separate in: and out: statements:
       * > set it to false when it's interacting with the left side, and true when interacting with its right
       * > in order to implement this, try something like using a prevPage variable:
       * > ```
       * > {:else if page == 1}
       * > <div
       * >   in:sharedAxisTransition={{
       * >     direction: "X",
       * >     rightSeam: prevPage > 1, (if we're transitioning from a page on the right, rightseam is true)
       * >   }}
       * >   out:sharedAxisTransition={{
       * >     direction: "X",
       * >     rightSeam: page > 1, (if we're transitioning to a page on the right, rightseam is true)
       * >   }}
       * > >
       * > ```
       *
       * i went insane over figuring this out :)
       */
      rightSeam: boolean;
    }
  | {
      direction: "Z";
      leaving: boolean /* set to true in out:, set to false in in: */;
    };
/* protip: set a background color on the items, and utilize position relative + absolute to let them overlap */
export const sharedAxisTransition = (
  node: Element,
  options: transitionOptions & sharedAxisOptions,
) => {
  return {
    delay: options.delay,
    duration: options.duration || 500,
    easing: options.easing || easeEmphasized,
    css: (t: number, u: number) => {
      const opacity = (t - 0.35) * (1 / 0.35);
      if (options.direction == "Z") {
        const factor = options.leaving ? u * 0.1 + 1 : t * 0.2 + 0.8;
        let css = `transform: scale(${factor.toFixed(3)});`;
        if (!options.leaving) css += `opacity: ${opacity.toFixed(3)};`;
        return css;
      }
      const factor = u * (options.rightSeam ? -30 : 30);
      return (
        `transform: translate${options.direction}(${factor.toFixed(3)}px);` +
        `opacity: ${opacity.toFixed(3)}`
      );
    },
  };
};

export const outroClass = (node: Element) => {
  const addClass = (e: Event) => {
    if (!(e.target instanceof Element)) return;
    e.target.classList.add("leaving");
  };
  const removeClass = (e: Event) => {
    if (!(e.target instanceof Element)) return;
    e.target.classList.remove("leaving");
  };
  node.addEventListener("outrostart", addClass);
  node.addEventListener("outroend", removeClass);
  return {
    destroy() {
      node.removeEventListener("outrostart", addClass);
      node.removeEventListener("outroend", removeClass);
    },
  };
};
