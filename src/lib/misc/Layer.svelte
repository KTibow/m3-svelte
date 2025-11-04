<script lang="ts">
  type Ripples = (() => void)[];
  let pointerRipples: Ripples = $state([]);
  let keyboardRipples: Ripples = $state([]);

  const createRipple = (node: HTMLDivElement) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.remove("broken");

    const parent = node.parentElement!;

    const isEnabled = () => {
      if (parent instanceof HTMLButtonElement) {
        if (parent.disabled) return false;
      }
      if (parent instanceof HTMLLabelElement) {
        const control = parent.control;
        if (control instanceof HTMLInputElement && control.disabled) return false;
      }
      if (parent.classList.contains("layer-container")) {
        const input = parent.previousElementSibling;
        if (input instanceof HTMLInputElement && input.disabled) return false;
      }
      return true;
    };
    const ripple = (x: number, y: number, width: number, height: number) => {
      const size = Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) * 2.5;
      const speed = Math.max(Math.min(Math.log(size) * 50, 600), 200);

      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
      gradient.id = `ripple-${Date.now()}`;

      const stops = [
        { offset: "0%", opacity: "0.12" },
        { offset: "70%", opacity: "0.12" },
        { offset: "100%", opacity: "0" },
      ];

      stops.forEach(({ offset, opacity }) => {
        const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop.setAttribute("offset", offset);
        stop.setAttribute("stop-color", "currentColor");
        stop.setAttribute("stop-opacity", opacity);
        gradient.appendChild(stop);
      });

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", `${size / 2}`);
      circle.setAttribute("cy", `${size / 2}`);
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
      svg.style.cssText = `
        position: absolute;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        overflow: visible;
      `;
      svg.appendChild(gradient);
      svg.appendChild(circle);

      const ua = navigator.userAgent;
      const isFirefox = ua.includes("Firefox");
      const isTrulySafari = !ua.includes("Chrome") && ua.includes("Safari");
      if (!isFirefox && !isTrulySafari && size > 100) {
        const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.id = `noise-${Date.now()}`;

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
    const pointerdown = (e: PointerEvent) => {
      if (!isEnabled()) return;
      if (e.button != 0) return;

      const rect = parent.getBoundingClientRect();
      const cancel = ripple(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
      pointerRipples.push(cancel);
    };
    const keydown = (e: KeyboardEvent) => {
      if (!isEnabled()) return;
      if (e.repeat) return;

      const isActivate = e.key == "Enter" || (e.key == " " && parent.tagName == "BUTTON");
      if (!isActivate) return;

      const rect = parent.getBoundingClientRect();
      const cancel = ripple(rect.width / 2, rect.height / 2, rect.width, rect.height);
      keyboardRipples.push(cancel);
    };

    parent.addEventListener("pointerdown", pointerdown);
    parent.addEventListener("keydown", keydown);

    return {
      destroy() {
        parent.removeEventListener("pointerdown", pointerdown);
        parent.removeEventListener("keydown", keydown);
      },
    };
  };
</script>

<svelte:window
  onpointerup={() => {
    pointerRipples.forEach((cancel) => cancel());
    pointerRipples = [];
  }}
  ondragend={() => {
    pointerRipples.forEach((cancel) => cancel());
    pointerRipples = [];
  }}
  onkeyup={() => {
    keyboardRipples.forEach((cancel) => cancel());
    keyboardRipples = [];
  }}
/>

<div class="hitbox"></div>
<div class="ripple-container broken" use:createRipple></div>
<div class="tint"></div>

<style>
  .hitbox {
    position: absolute;
    inset: 0;
  }
  .ripple-container {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    overflow: hidden;
  }
  .tint {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    background-color: currentColor;
    opacity: 0;
    transition: opacity var(--m3-util-easing-fast);

    &:not(
      :global(input:disabled + label) > .tint,
      :global(input:disabled + .layer-container) > .tint,
      :global(:disabled) > .tint
    ) {
      @media (hover: hover) {
        &:is(:global(:hover) > .tint, :global(:active) > .tint) {
          opacity: 0.08;
        }
      }
      &:is(:global(input:focus-visible + label) > .tint),
      &:is(:global(:focus-visible) > .tint),
      &:is(.ripple-container.broken + .tint):is(:global(:active) > .tint) {
        opacity: 0.12;
      }
    }
  }
</style>
