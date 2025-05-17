<script lang="ts">
  import { self } from "svelte/legacy";

  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import { createEventDispatcher } from "svelte";
  import type { HTMLDialogAttributes } from "svelte/elements";

  interface Props {
    display?: string;
    extraOptions?: HTMLDialogAttributes;
    icon?: IconifyIcon | undefined;
    headline: string;
    open: boolean;
    closeOnEsc?: boolean;
    closeOnClick?: boolean;
    children?: import("svelte").Snippet;
    buttons?: import("svelte").Snippet;
  }

  let {
    display = "flex",
    extraOptions = {},
    icon = undefined,
    headline,
    open = $bindable(),
    closeOnEsc = true,
    closeOnClick = true,
    children,
    buttons,
  }: Props = $props();

  const dispatch = createEventDispatcher();
  let dialog: HTMLDialogElement = $state();
  $effect(() => {
    if (!dialog) return;
    if (open) dialog.showModal();
    else dialog.close();
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  oncancel={(e) => {
    if (closeOnEsc) {
      dispatch("closedByEsc");
      open = false;
    } else {
      e.preventDefault();
    }
  }}
  onclick={self(() => {
    if (closeOnClick) {
      dispatch("closedByClick");
      open = false;
    }
  })}
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
      {@render children?.()}
    </div>
    <div class="buttons">
      {@render buttons?.()}
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

    flex-shrink: 0;
    align-self: center;
    margin-bottom: 1rem;
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
      dialogIn 500ms var(--m3-easing-decel),
      opacity 100ms var(--m3-easing-decel);
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
      buttonsIn 500ms var(--m3-easing-decel),
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
