<script lang="ts">
  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";
  import { easeEmphasizedAccel, easeEmphasizedDecel } from "$lib/misc/easing";
  import { outroClass } from "$lib/misc/animation";

  let { children, close }: { children: Snippet; close: (reason: "esc" | "click" | "low") => void } =
    $props();

  let height = $state(480);
  let container: HTMLDivElement | undefined = $state();
  let isDragging = $state(false),
    startY = $state(0);

  const open = (node: HTMLDialogElement) => node.showModal();
  const heightAnim = (
    node: HTMLDialogElement,
    options: { duration: number; easing: typeof easeEmphasizedDecel },
  ): TransitionConfig => {
    if (node.clientHeight < height) height = node.clientHeight;
    return {
      duration: options.duration,
      easing: options.easing,
      css: (t) => `max-height: ${t * height}px`,
    };
  };

  const moveWheel = (e: WheelEvent) => {
    e.preventDefault();
    height += e.deltaY;
    if (container && container.clientHeight < height) height = container.clientHeight;
  };
  const moveMouse = (e: { clientY: number }) => {
    if (isDragging) {
      const distance = e.clientY - startY;
      height -= distance;
      startY = e.clientY;
    }
  };
  $effect(() => {
    if (height < 48) close("low");
  });
</script>

<svelte:window
  onmousemove={moveMouse}
  onmouseup={() => (isDragging = false)}
  ontouchmove={(e) => moveMouse(e.touches[0])}
  ontouchend={() => (isDragging = false)}
/>

<dialog
  class="m3-container"
  style:max-height="{height}px"
  use:open
  use:outroClass
  oncancel={(e) => {
    e.preventDefault();
    close("esc");
  }}
  onmousedown={(e) => {
    if (e.target != e.currentTarget) return;
    close("click");
  }}
  onwheel={moveWheel}
  in:heightAnim={{ easing: easeEmphasizedDecel, duration: 400 }}
  out:heightAnim={{ easing: easeEmphasizedAccel, duration: 300 }}
>
  <div
    class="container"
    bind:this={container}
    ontouchstart={(e) => {
      isDragging = true;
      startY = e.touches[0].clientY;
    }}
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="handle-container"
      onmousedown={(e) => {
        e.preventDefault();
        isDragging = true;
        startY = e.clientY;
      }}
    >
      <div class="handle"></div>
    </div>
    {@render children()}
  </div>
</dialog>

<style>
  :root {
    --m3-bottom-sheet-shape: var(--m3-util-rounding-extra-large);
  }

  .m3-container {
    margin-bottom: 0;
    width: 100%;
    max-width: 40rem;
    overflow: hidden;
    touch-action: none;

    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-on-surface));
    border-radius: var(--m3-bottom-sheet-shape) var(--m3-bottom-sheet-shape) 0 0;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    animation: backdrop 400ms;
  }
  dialog:global(.leaving)::backdrop {
    background-color: transparent;
    animation: backdropReverse 400ms;
  }
  .container {
    padding: 0 1rem;
  }
  .handle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    cursor: grab;
  }
  .handle {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.4);
    width: 2rem;
    height: 0.25rem;
    border-radius: 0.25rem;
  }
  @keyframes backdrop {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    }
  }
  @keyframes backdropReverse {
    0% {
      background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    }
    100% {
      background-color: transparent;
    }
  }
  @media (forced-colors: active) {
    .handle {
      background-color: canvastext;
    }
  }
</style>
