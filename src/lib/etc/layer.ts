import "./layer.css";

const activePointerRipples: (() => void)[] = [];
const activeKeyboardRipples: (() => void)[] = [];

const isEnabled = (node: Element): boolean => {
  if (node instanceof HTMLButtonElement && node.disabled) return false;
  if (node instanceof HTMLInputElement && node.disabled) return false;

  if (node instanceof HTMLLabelElement) {
    const control = node.control;
    if (control instanceof HTMLInputElement && control.disabled) return false;
  }

  return true;
};

const createRippleSvg = (
  node: Element,
  x: number,
  y: number,
  width: number,
  height: number,
): (() => void) | null => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  const size = Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) * 2.5;
  const speed = Math.max(Math.min(Math.log(size) * 50, 600), 200);

  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
  gradient.id = `ripple-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const stops = [
    { offset: "0%", opacity: "0.12" },
    { offset: "70%", opacity: "0.12" },
    { offset: "100%", opacity: "0" },
  ];

  for (const { offset, opacity } of stops) {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", "currentColor");
    stop.setAttribute("stop-opacity", opacity);
    gradient.appendChild(stop);
  }

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", `${x}`);
  circle.setAttribute("cy", `${y}`);
  circle.setAttribute("r", "0");
  circle.setAttribute("fill", `url(#${gradient.id})`);

  const expand = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  expand.setAttribute("attributeName", "r");
  expand.setAttribute("from", "0");
  expand.setAttribute("to", `${size / 2}`);
  expand.setAttribute("dur", `${speed}ms`);
  expand.setAttribute("fill", "freeze");
  expand.setAttribute("calcMode", "spline");
  expand.setAttribute("keySplines", "0.4 0, 0.2 1");

  circle.appendChild(expand);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("active-ripple");
  svg.style.cssText = [
    "position: absolute",
    "inset: 0",
    "width: 100%",
    "height: 100%",
    "overflow: hidden",
    "border-radius: inherit",
    "pointer-events: none",
  ].join(";");
  svg.appendChild(gradient);
  svg.appendChild(circle);

  const ua = navigator.userAgent;
  const isFirefox = ua.includes("Firefox");
  const isTrulySafari = !ua.includes("Chrome") && ua.includes("Safari");
  if (!isFirefox && !isTrulySafari && size > 100) {
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.id = `noise-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const turb = document.createElementNS("http://www.w3.org/2000/svg", "feTurbulence");
    turb.setAttribute("type", "fractalNoise");
    turb.setAttribute("baseFrequency", "0.6");
    turb.setAttribute("seed", Math.random().toString());

    const blur = document.createElementNS("http://www.w3.org/2000/svg", "feDisplacementMap");
    blur.setAttribute("in", "SourceGraphic");
    blur.setAttribute("in2", "turbulence");
    blur.setAttribute("scale", `${size ** 2 * 0.0002}`);
    blur.setAttribute("xChannelSelector", "R");
    blur.setAttribute("yChannelSelector", "B");

    filter.appendChild(turb);
    filter.appendChild(blur);

    circle.setAttribute("filter", `url(#${filter.id})`);
    svg.appendChild(filter);
  }

  node.appendChild(svg);

  return () => {
    const fade = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    fade.setAttribute("attributeName", "opacity");
    fade.setAttribute("from", "1");
    fade.setAttribute("to", "0");
    fade.setAttribute("dur", "800ms");
    fade.setAttribute("fill", "freeze");
    fade.setAttribute("calcMode", "spline");
    fade.setAttribute("keySplines", "0.4 0, 0.2 1");
    circle.appendChild(fade);
    fade.beginElement();
    setTimeout(() => svg.remove(), 800);
  };
};

if (typeof document != "undefined") {
  document.documentElement.classList.add("js");

  // Pointer events
  document.addEventListener("pointerdown", (e) => {
    if (e.button != 0) return;

    const layer = (e.target as Element).closest(".m3-layer");
    if (!layer || !isEnabled(layer)) return;

    const rect = layer.getBoundingClientRect();
    const cancel = createRippleSvg(
      layer,
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height,
    );

    if (cancel) {
      activePointerRipples.push(cancel);
    }
  });
  const cancelPointerRipples = () => {
    for (const cancel of activePointerRipples) cancel();
    activePointerRipples.length = 0;
  };
  document.addEventListener("pointerup", cancelPointerRipples);
  document.addEventListener("dragend", cancelPointerRipples);

  // Keyboard events
  document.addEventListener("keydown", (e) => {
    if (e.repeat) return;

    const target = e.target as Element;
    const layer = target.closest(".m3-layer");
    if (!layer || !isEnabled(layer)) return;

    const isActivate = e.key == "Enter" || (e.key == " " && layer.tagName == "BUTTON");
    if (!isActivate) return;

    const rect = layer.getBoundingClientRect();
    const cancel = createRippleSvg(layer, rect.width / 2, rect.height / 2, rect.width, rect.height);

    if (cancel) {
      activeKeyboardRipples.push(cancel);
    }
  });
  document.addEventListener("keyup", () => {
    for (const cancel of activeKeyboardRipples) cancel();
    activeKeyboardRipples.length = 0;
  });
}
