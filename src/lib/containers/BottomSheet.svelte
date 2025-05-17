<script lang="ts">
  import { run, preventDefault, self } from "svelte/legacy";

  import { createEventDispatcher } from "svelte";
  import type { TransitionConfig } from "svelte/transition";
  import { easeEmphasizedAccel, easeEmphasizedDecel } from "$lib/misc/easing";
  import { outroClass } from "$lib/misc/animation";
  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  let height = $state(480);
  let container: HTMLDivElement = $state();
  let isDragging = $state(false),
    startY = $state(0);

  const dispatch = createEventDispatcher();
  const open = (node: HTMLDialogElement) => node.showModal();
  const heightAnim = (
    node: HTMLDialogElement,
    options: Record<string, unknown> = {},
  ): TransitionConfig => {
    if (node.clientHeight < height) height = node.clientHeight;
    return {
      duration: 400,
      easing: easeEmphasizedDecel,
      ...options,
      css: (t) => `max-height: ${t * height}px`,
    };
  };

  const moveWheel = (e: WheelEvent) => {
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
  run(() => {
    if (height < 48) dispatch("close", "low");
  });
</script>

<svelte:window
  onmousemove={moveMouse}
  onmouseup={() => (isDragging = false)}
  ontouchmove={(e) => moveMouse(e.touches[0])}
  ontouchend={() => (isDragging = false)}
/>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  class="m3-container"
  style="max-height: {height}px"
  use:open
  use:outroClass
  oncancel={preventDefault(() => {
    dispatch("close", "browser");
  })}
  onmousedown={self(() => {
    dispatch("close", "click");
  })}
  onwheel={preventDefault(moveWheel)}
  in:heightAnim
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
      onmousedown={preventDefault((e) => {
        isDragging = true;
        startY = e.clientY;
      })}
    >
      <div class="handle"></div>
    </div>
    {@render children?.()}
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
