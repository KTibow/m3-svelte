<script lang="ts">
  import type { Snippet } from "svelte";
  import { fly, type TransitionConfig } from "svelte/transition";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import { easeEmphasized, easeEmphasizedAccel, easeEmphasizedDecel } from "$lib/misc/easing";
  import { outroClass } from "$lib/misc/animation";
  import Button from "$lib/buttons/Button.svelte";
  import Icon from "$lib/misc/Icon.svelte";

  // todo/deprecated: remove "click" and "esc" and onmousedown, switch to closedby="any" and "cancel"
  // Waiting on webkit support: https://bugs.webkit.org/show_bug.cgi?id=284592
  let {
    children,
    close,
    footer,
    headline,
    back,
    modal,
  }: {
    children: Snippet;
    close: (reason: "esc" | "click") => void;
    footer?: Snippet;
    headline: string;
    modal?: boolean;
    back?: boolean;
  } = $props();

  modal ??= false;

  let height = $state(480);

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
</script>

{#snippet sheet()}
  <div class="header">
    <div>
      <span>{headline}</span>
    </div>

    <Button variant="text" iconType="full" size="m" onclick={() => close("click")}>
      <Icon icon={iconX} />
    </Button>
  </div>

  <div class="content">
    {@render children()}
  </div>

  {#if footer}
    <div class="footer">
      {@render footer()}
    </div>
  {/if}
{/snippet}

{#if modal}
  <dialog
    class="m3-container"
    class:modal
    {@attach open}
    oncancel={(e) => {
      e.preventDefault();
      close("esc");
    }}
    onmousedown={(e) => {
      if (e.target != e.currentTarget) return;
      close("click");
    }}
    in:fly|global={{ easing: easeEmphasized, x: 400, opacity: 0.8 }}
    out:fly|global={{ easing: easeEmphasizedAccel, x: 400, opacity: 0.8 }}
  >
    {@render sheet()}
  </dialog>
{:else}
  <div class="m3-container">
    {@render sheet()}
  </div>
{/if}

<style>
  @layer tokens {
    :root {
      --m3-side-sheet-shape: var(--m3-shape-large);
    }
  }

  .m3-container {
    margin-bottom: 0;
    min-width: 20rem;
    max-width: 25rem;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    background-color: var(--m3c-surface-container-low);
    color: var(--m3c-on-surface);
    border: none;
    padding: 0;
    margin: 0;
    margin-inline-start: auto;
  }

  .m3-container.modal {
    border-start-start-radius: var(--m3-side-sheet-shape);
    border-end-start-radius: var(--m3-side-sheet-shape);
    position: fixed;
    top: 0;
    left: 0;
  }

  .m3-container.modal::backdrop {
    background-color: --translucent(var(--m3c-scrim), 0.5);
    animation: backdrop 400ms;
  }

  .m3-container.modal:global(.leaving)::backdrop {
    background-color: transparent;
    animation: backdropReverse 400ms;
  }

  .m3-container:not(.modal) {
    border-inline-start: solid 1px var(--m3c-outline-variant);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 10px;
    color: var(--m3c-on-surface-variant);
  }

  .header > div {
    flex: auto;
    margin-inline-start: 16px;
  }

  .header > :global(button.m3-container) {
    color: var(--m3c-on-surface-variant) !important;
  }

  .header span {
    @apply --m3-title-large;
  }

  .content {
    padding: 0 1.5rem;
    flex: auto;
    overflow: auto;
  }

  .footer {
    border-block-start: solid 1px var(--m3c-outline-variant);
    display: flex;
    gap: 8px;
    padding: 24px;
    padding-block-start: 20px;
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
</style>
