<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import Icon from "$lib/misc/_icon.svelte";

  let {
    icon,
    headline,
    buttons,
    children,
    open = $bindable(),
    closeOnEsc = true,
    closeOnClick = true,
    onEsc,
    onClick,
    ...extra
  }: {
    icon?: IconifyIcon | undefined;
    headline: string;
    buttons: Snippet;
    children: Snippet;
    open: boolean;
    closeOnEsc?: boolean;
    closeOnClick?: boolean;
    onEsc?: () => void;
    onClick?: () => void;
  } & HTMLDialogAttributes = $props();

  let dialog: HTMLDialogElement | undefined = $state();
  $effect(() => {
    if (!dialog) return;
    if (open) dialog.showModal();
    else dialog.close();
  });
</script>

<dialog
  class="m3-container"
  oncancel={(e) => {
    if (e.target != e.currentTarget) return;

    if (!closeOnEsc) {
      e.preventDefault();
      return;
    }

    onEsc?.();
    open = false;
  }}
  onclick={(e) => {
    if (e.target != e.currentTarget) return;
    if (closeOnClick) {
      onClick?.();
      open = false;
    }
  }}
  bind:this={dialog}
  {...extra}
>
  <div class="d">
    {#if icon}
      <Icon {icon} width="1.5rem" height="1.5rem" />
    {/if}
    <p class="headline m3-font-headline-small" class:center={icon}>{headline}</p>
    <div class="content m3-font-body-medium">
      {@render children()}
    </div>
    <div class="buttons">
      {@render buttons()}
    </div>
  </div>
</dialog>

<style>
  :root {
    --m3-dialog-shape: var(--m3-util-rounding-extra-large);
  }
  dialog {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface-container-high));
    --m3-util-background: rgb(var(--m3-scheme-surface-container-high));
    border: none;
    border-radius: var(--m3-dialog-shape);
    min-width: 17.5rem;
    max-width: 35rem;
    padding: 0;
    overflow: auto;
  }
  .d {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }
  .d > :global(svg) {
    color: rgb(var(--m3-scheme-secondary));

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
      opacity var(--m3-util-easing-fast),
      visibility var(--m3-util-easing-fast);
  }
  dialog[open] {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    animation:
      dialogIn var(--m3-util-curve-decel) 500ms,
      opacity var(--m3-util-curve-decel) 100ms backwards;
  }
  dialog[open] .headline {
    animation: opacity var(--m3-util-easing-fast);
  }
  dialog[open] .content {
    animation: opacity var(--m3-util-easing-fast) 50ms backwards;
  }
  dialog[open] .buttons {
    animation:
      buttonsIn var(--m3-util-curve-decel) 500ms,
      opacity var(--m3-util-easing-fast) 100ms backwards;
  }
  dialog::backdrop {
    background-color: rgb(var(--m3-scheme-scrim) / 0.3);
    animation: opacity var(--m3-util-curve-decel) 500ms;
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
      position: relative;
      bottom: 100%;
    }
    100% {
      position: relative;
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
