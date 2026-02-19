<script lang="ts">
  import type { Snippet } from "svelte";
  import type { TransitionConfig } from "svelte/transition";
  import { easeEmphasizedAccel, easeEmphasizedDecel } from "$lib/misc/easing";
  import { outroClass } from "$lib/misc/animation";

  // todo/deprecated: remove "click" and "esc" and onmousedown, switch to closedby="any" and "cancel"
  // Waiting on webkit support: https://bugs.webkit.org/show_bug.cgi?id=284592
  let {
    children,
    close,
    handle,
    modal
  }: {
    children: Snippet;
    close: (reason: "esc" | "click" | "low") => void;
    handle?: boolean;
    modal?: boolean;
  } = $props();

  handle ??= true;
  modal ??= false;

  let height = $state(480);
  let container: HTMLDivElement | undefined = $state();
  let isDragging = $state(false),
    startY = $state(0);

  const open = (node: HTMLDialogElement) => {
    node.showModal();

    return outroClass(node).destroy;
  };

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
  class:modal
  style:max-height="{height}px"
  {@attach open}
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
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="container"
    bind:this={container}
    ontouchstart={(e) => {
      isDragging = true;
      startY = e.touches[0].clientY;
    }}
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    {#if handle}
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
    {/if}

    {@render children()}
  </div>
</dialog>

<style>
  @layer tokens {
    :root {
      --m3-bottom-sheet-shape: var(--m3-shape-extra-large);
    }
  }

  .m3-container {
    margin-bottom: 0;
    width: 100%;
    max-width: 40rem;
    overflow: hidden;
    touch-action: none;

    background-color: var(--m3c-surface-container-low);
    color: var(--m3c-on-surface);
    border-radius: var(--m3-bottom-sheet-shape) var(--m3-bottom-sheet-shape) 0 0;
    border: none;
    padding: 0 1.5rem;
  }
  .m3-container:not(.modal) {
    box-shadow: var(--m3-elevation-3);
  }
  .m3-container.modal::backdrop {
    background-color: --translucent(var(--m3c-scrim), 0.5);
    animation: backdrop 400ms;
  }
  .m3-container.modal:global(.leaving)::backdrop {
    background-color: transparent;
    animation: backdropReverse 400ms;
  }
  .m3-container:not(:has(.handle-container)) {
    padding-block-start: 1.5rem;
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
    background-color: --translucent(var(--m3c-on-surface-variant), 0.4);
    width: 2rem;
    height: 0.25rem;
    border-radius: 0.25rem;
  }
  @keyframes backdrop {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: --translucent(var(--m3c-scrim), 0.5);
    }
  }
  @keyframes backdropReverse {
    0% {
      background-color: --translucent(var(--m3c-scrim), 0.5);
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
