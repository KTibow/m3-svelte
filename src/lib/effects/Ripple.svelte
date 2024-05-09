<script lang="ts">
  let rippleEl: HTMLDivElement;
  export let color: "primary" | "surface" | "secondary" | "tertiary" = "primary";

  export const ripple = async (e: MouseEvent) => {
    const clone = rippleEl.cloneNode() as HTMLDivElement;
    rippleEl.parentElement!.appendChild(clone);
    const bounds = rippleEl.getBoundingClientRect();
    if (bounds.width > bounds.height) {
      clone.style.height = "100%";
      clone.style.width = clone.offsetHeight + "px";
    } else {
      clone.style.width = "100%";
      clone.style.height = clone.offsetWidth + "px";
    }
    // center it at the mouse
    clone.style.left = e.clientX - bounds.left - clone.offsetWidth / 2 + "px";
    clone.style.top = e.clientY - bounds.top - clone.offsetHeight / 2 + "px";
    await clone.animate(
      [
        {
          transform: "scale(0.25)",
          opacity: 0.25,
        },
        {
          transform: "scale(4)",
          opacity: 0,
        },
      ],
      {
        duration: 650,
        easing: "ease-out",
      },
    ).finished;
    clone.remove();
  };
</script>

<div
  style="background-color: rgb(var(--m3-scheme-on-{color}-container))"
  bind:this={rippleEl}
  class="ripple color-{color}"
/>

<style>
  .ripple {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
  }
</style>
