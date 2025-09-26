<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLDialogAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import Icon from "$lib/misc/Icon.svelte";

  let {
    icon,
    headline,
    buttons,
    children,
    open = $bindable(),
    closedby = "any",
    ...extra
  }: {
    icon?: IconifyIcon | undefined;
    headline: string;
    buttons: Snippet;
    children: Snippet;
    open: boolean;
    /** @deprecated use closedby instead */
    closeOnEsc?: boolean;
    /** @deprecated use closedby instead */
    closeOnClick?: boolean;
    /** @deprecated listen to `open` state changes instead of onEsc */
    onEsc?: () => void;
    /** @deprecated listen to `open` state changes instead of onClick */
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
  ontoggle={(e) => {
    open = e.newState == "open";
  }}
  oncancel={(e) => {
    if (e.target != e.currentTarget) return;
    if (extra.closeOnEsc && extra.onEsc) {
      extra.onEsc();
    }
  }}
  onclick={(e) => {
    if (e.target != e.currentTarget) return;
    if (extra.closeOnClick && extra.onClick) {
      extra.onClick();
    }
  }}
  bind:this={dialog}
  closedby={closedby ||
    (extra.closeOnClick == false && extra.closeOnEsc == false
      ? "none"
      : extra.closeOnClick == false
        ? "closerequest"
        : "any")}
  role="alertdialog"
  {...extra}
>
  {#if icon}
    <Icon {icon} width="1.5rem" height="1.5rem" />
  {/if}
  <p class="headline m3-font-headline-small" class:center={icon}>{headline}</p>
  <div class="content m3-font-body-medium">
    {@render children()}
  </div>
  <form method="dialog" class="buttons">
    {@render buttons()}
  </form>
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
    padding: 1.5rem;
    overflow: auto;
    > :global(svg) {
      color: rgb(var(--m3-scheme-secondary));

      flex-shrink: 0;
      align-self: center;
      margin-bottom: 1rem;
    }
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
