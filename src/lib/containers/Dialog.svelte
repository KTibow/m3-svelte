<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import { createEventDispatcher } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  export let display = "flex";
  export let extraOptions: HTMLDialogAttributes = {};
  export let icon: IconifyIcon | undefined = undefined;
  export let headline: string;
  export let open: boolean;
  export let closeOnEsc = true;
  export let closeOnClick = true;

  const dispatch = createEventDispatcher();
  let dialog: HTMLDialogElement;
  $: {
    if (!dialog) break $;
    if (open) dialog.showModal();
    else dialog.close();
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  on:cancel={(e) => {
    if (closeOnEsc) {
      dispatch("closedByEsc");
      open = false;
    } else {
      e.preventDefault();
    }
  }}
  on:click|self={() => {
    if (closeOnClick) {
      dispatch("closedByClick");
      open = false;
    }
  }}
  bind:this={dialog}
  style="display: {display};"
  {...extraOptions}
>
  <div class="m3-container">
    {#if icon}
      <Icon {icon} />
    {/if}
    <p class="headline m3-font-headline-small" class:center={icon}>{headline}</p>
    <div class="content m3-font-body-medium">
      <slot />
    </div>
    <div class="buttons">
      <slot name="buttons" />
    </div>
  </div>
</dialog>

<style>
  :root {
    --m3-dialog-shape: var(--m3-util-rounding-extra-large);
  }
  dialog {
    background-color: rgb(var(--m3-scheme-surface-container-high));
    border: none;
    border-radius: var(--m3-dialog-shape);
    min-width: 17.5rem;
    max-width: 35rem;
    padding: 0;
    overflow: auto;
  }
  .m3-container {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    width: 100%;
  }

  .m3-container > :global(svg) {
    color: rgb(var(--m3-scheme-secondary));
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 auto 1rem auto;
  }
  .headline {
    color: rgb(var(--m3-scheme-on-surface));
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .headline.center {
    text-align: center;
  }
  .content {
    color: rgb(var(--m3-scheme-on-surface-variant));
    margin-bottom: 1.5rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  dialog {
    position: fixed;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 200ms,
      visibility 200ms;
  }
  dialog[open] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    animation:
      dialogIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1),
      opacity 100ms cubic-bezier(0.05, 0.7, 0.1, 1);
  }
  dialog[open] .headline {
    animation: opacity 150ms;
  }
  dialog[open] .content {
    animation: opacity 200ms;
  }
  dialog[open] .buttons {
    position: relative;
    animation:
      buttonsIn 0.5s cubic-bezier(0.05, 0.7, 0.1, 1),
      opacity 200ms 100ms backwards;
  }
  dialog::backdrop {
    background-color: rgb(var(--m3-scheme-scrim) / 0.3);
    animation: opacity 400ms;
  }
  @keyframes dialogIn {
    0% {
      transform: translateY(-3rem) scaleY(90%);
      clip-path: inset(0 0 100% 0 round var(--m3-dialog-shape));
    }
    100% {
      transform: translateY(0) scaleY(100%);
      clip-path: inset(0 0 0 0 round var(--m3-dialog-shape));
    }
  }
  @keyframes buttonsIn {
    0% {
      bottom: 100%;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media print, (forced-colors: active) {
    dialog {
      outline: solid 0.125rem canvastext;
    }
  }
</style>
