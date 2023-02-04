<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { heightTransition, outroClass } from "$lib/utils/animation";
  import { easeEmphasizedDecel, easeEmphasizedAccel } from "$lib/utils/easing";
  import Sheet from "./_Sheet.svelte";

  export let height = 160;
  export let showHandle = true;
  export let isDialog = true;
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
  let goingUp = true;
  const moveSheet = (e: MouseEvent) => {
    if (!sheet) return;
    if (e.detail) return;
    if (height == sheet.offsetHeight) goingUp = false;
    if (height == 48) goingUp = true;
    if (goingUp) height = height + 160;
    else height = Math.max(height - 160, 48);
  };
  const open = (node: HTMLDialogElement) => node.showModal();
</script>

<svelte:window
  on:mousemove={handleMouseMove}
  on:touchmove={(e) => handleMouseMove(e.touches[0])}
  on:mouseup={() => (isDragging = false)}
  on:touchend={() => (isDragging = false)}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
  this={isDialog ? "dialog" : "div"}
  class="m3-container"
  class:no-drag={!isDragging}
  style="max-height: {height}px;"
  use:open
  use:outroClass
  in:heightTransition={{ height, duration: 400, easing: easeEmphasizedDecel }}
  out:heightTransition={{ height, duration: 200, easing: easeEmphasizedAccel }}
  on:cancel|preventDefault={() => {
    dispatch("close", "browser");
  }}
  on:mousedown={() => {
    if (isDialog) dispatch("close", "click");
  }}
>
  <Sheet
    bind:container={sheet}
    on:wheel={(e) => (height += e.deltaY)}
    on:touchstart={(e) => {
      isDragging = true;
      startY = e.touches[0].clientY;
    }}
  >
    {#if showHandle}
      <div
        class="handleContainer"
        on:mousedown|preventDefault={(e) => {
          isDragging = true;
          startY = e.clientY;
        }}
      >
        <button on:click={moveSheet} />
      </div>
    {/if}
    <slot />
  </Sheet>
</svelte:element>

<style>
  .m3-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    max-width: 40rem;

    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface));
    overflow: hidden;
    border-radius: 1.75rem 1.75rem 0 0;
    z-index: 1;
  }
  dialog.m3-container {
    bottom: 0;
    left: 0;
    transform: none;
    margin-bottom: 0;
    padding: 0;
    border: none;
  }

  dialog::backdrop {
    background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    animation: backdropIn 400ms;
  }
  :global(.leaving)::backdrop {
    animation: backdropOut 400ms !important;
  }
  @keyframes backdropIn {
    0% {
      background-color: rgb(var(--m3-scheme-scrim) / 0);
    }
    100% {
      background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    }
  }
  @keyframes backdropOut {
    0% {
      background-color: rgb(var(--m3-scheme-scrim) / 0.5);
    }
    100% {
      background-color: rgb(var(--m3-scheme-scrim) / 0);
    }
  }
  .no-drag {
    transition: all 200ms;
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
  .handleContainer > button {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.4);
    width: 2rem;
    height: 0.25rem;
    padding: 0;
    border: none;
    border-radius: 0.25rem;
    cursor: inherit;
  }
  .handleContainer > button:focus-visible {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.5);
  }
  .handleContainer > button:active {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.6);
  }
</style>
