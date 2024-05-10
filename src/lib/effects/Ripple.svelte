<script lang="ts">
  import { onMount } from "svelte";

  let rippleEl: HTMLDivElement;
  let rippleContainer: HTMLDivElement;
  export let color: "primary" | "surface" | "secondary" | "tertiary" = "primary";

  const ripple = async (e: MouseEvent) => {
    const clone = rippleEl.cloneNode(true) as HTMLDivElement;
    rippleEl.parentElement!.appendChild(clone);
    const hover = () => {
      clone.style.display = "";
    };
    const leave = () => {
      clone.style.display = "none";
    };
    const svg = clone.querySelector("svg")!;
    const bounds = rippleEl.getBoundingClientRect();
    if (bounds.width > bounds.height) {
      clone.style.height = "100%";
      clone.style.width = clone.offsetHeight + "px";
    } else {
      clone.style.width = "100%";
      clone.style.height = clone.offsetWidth + "px";
    }
    svg.style.width = clone.offsetWidth * 2 + "px";
    svg.style.height = clone.offsetHeight * 2 + "px";
    clone.style.transform = `translate(${e.clientX - bounds.left}px, ${e.clientY - bounds.top}px)`;
    clone.style.opacity = "0.1";
    svg.animate(
      [
        {
          opacity: 0.75,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 750,
        delay: 250,
        easing: "ease-out",
        fill: "forwards",
      },
    );
    clone.animate(
      [
        {
          opacity: 0.1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: "ease-in",
        fill: "forwards",
        delay: 250,
      },
    );

    clone.parentElement?.addEventListener("mouseenter", hover);
    clone.parentElement?.addEventListener("mouseleave", leave);
    clone.parentElement?.parentElement?.addEventListener("mouseenter", hover);
    clone.parentElement?.parentElement?.addEventListener("mouseleave", leave);
    await clone.animate(
      [
        {
          width: 0,
          height: 0,
        },
        {
          width: clone.offsetWidth * 2 + "px",
          height: clone.offsetHeight * 2 + "px",
        },
      ],
      {
        duration: 1250,
        easing: "cubic-bezier(.05,.7,.1,1)",
        fill: "forwards",
      },
    ).finished;
    clone.remove();
  };

  onMount(() => {
    rippleContainer.parentElement?.addEventListener("mousedown", ripple);
    return () => {
      rippleContainer.parentElement?.removeEventListener("mousedown", ripple);
    };
  });
</script>

<div class="rippleContainer" bind:this={rippleContainer}>
  <div
    style="background: radial-gradient(circle, rgb(var(--m3-scheme-on-{color}-container)) 20%, transparent 80%);"
    bind:this={rippleEl}
    class="ripple color-{color}"
  >
    <div class="maskable-noise">
      <svg
        class="rippleSvg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 700 700"
        width="700"
        height="700"
        style="--col: rgb(var(--m3-scheme-{color}));width: 700px; height: 700px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
        ><defs
          ><filter
            id="noise"
            x="0"
            y="0"
            width="700"
            height="700"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.4"
              numOctaves="2"
              seed="2"
              stitchTiles="stitch"
              x="0"
              y="0"
              width="700"
              height="700"
              result="turbulence"
            ></feTurbulence>
            <feColorMatrix
              type="saturate"
              values="0"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="turbulence"
              result="colormatrix"
            ></feColorMatrix>
            <feComponentTransfer
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="colormatrix"
              result="componentTransfer"
            >
              <feFuncR type="linear" slope="3"></feFuncR>
              <feFuncG type="linear" slope="3"></feFuncG>
              <feFuncB type="linear" slope="3"></feFuncB>
            </feComponentTransfer>
            <feColorMatrix
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="componentTransfer"
              result="colormatrix2"
              type="matrix"
              values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 18 -10"
            ></feColorMatrix>
          </filter></defs
        ><g
          ><rect width="700" height="700" fill="black"></rect><rect
            width="700"
            height="700"
            fill="black"
            filter="url(#noise)"
            opacity="1"
          ></rect></g
        ></svg
      >
    </div>
  </div>
</div>

<style>
  .rippleContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .ripple {
    border-radius: 50%;
    position: absolute;
    pointer-events: none;
    overflow: hidden;
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .maskable-noise {
    mask-image: radial-gradient(circle, transparent 10%, black 100%);
    -webkit-mask-image: radial-gradient(circle, transparent 10%, black 100%);
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
    width: 100%;
    height: 100%;
  }

  .rippleSvg {
    fill: var(--col);
    opacity: 0.75;
  }
</style>
