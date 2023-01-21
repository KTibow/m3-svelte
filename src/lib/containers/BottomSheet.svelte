<script lang="ts">
  import { heightTransition } from "$lib/utils/animation";
  import { createEventDispatcher } from "svelte";
  import Sheet from "./_Sheet.svelte";

  export let height = 80;
  export let showHandle = true;
  // export let isDialog = true; TODO
  export let closeOnMinimize = true;

  const dispatch = createEventDispatcher();
  let sheet: HTMLDivElement | null;
  $: if (sheet) height = Math.min(height, sheet.offsetHeight);
  $: if (height < 48) {
    if (closeOnMinimize) dispatch("close", "minimized");
    else height = 48;
  }

  let isDragging = false;
  let startY: number;
  const handleMouseMove = (e: { clientY: number }) => {
    if (!isDragging) return;
    const distance = e.clientY - startY;
    height -= distance;
    startY = e.clientY;
  };
</script>

<svelte:window
  on:mousemove={handleMouseMove}
  on:touchmove={(e) => handleMouseMove(e.touches[0])}
  on:mouseup={() => (isDragging = false)}
  on:touchend={() => (isDragging = false)}
/>
<div
  class="m3-container"
  class:no-drag={!isDragging}
  style="max-height: {height}px;"
  on:wheel|preventDefault={(e) => (height += e.deltaY)}
  on:touchstart|preventDefault={(e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
  }}
  transition:heightTransition={{ height }}
>
  <Sheet bind:container={sheet}>
    {#if showHandle}
      <div
        class="handleContainer"
        on:mousedown|preventDefault={(e) => {
          isDragging = true;
          startY = e.clientY;
        }}
      >
        <div />
      </div>
    {/if}
    <slot />
  </Sheet>
</div>

<style>
  .m3-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    max-width: 40rem;

    background-color: rgb(var(--md-sys-color-surface));
    color: rgb(var(--md-sys-color-on-surface));
    overflow: hidden;
    border-radius: 1.75rem 1.75rem 0 0;
    z-index: 1;
  }
  .no-drag {
    transition: all 150ms;
  }
  :global(.navBarOffset) .m3-container {
    bottom: 5rem;
  }
  .handleContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    width: 100%;
    height: 3rem;
  }
  .handleContainer > div {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.4);
    width: 2rem;
    height: 0.25rem;
    border-radius: 0.25rem;
  }
</style>
