<script lang="ts">
  import iconExpand from "@ktibow/iconset-material-symbols/keyboard-arrow-down";
  import type { Snippet } from "svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import Icon from "$lib/misc/Icon.svelte";
  import type { ButtonAttrs } from "$lib/misc/typing-utils";

  let {
    variant,
    x = "inner",
    y = "down",
    children,
    menu,
    ...extra
  }: {
    variant: "elevated" | "filled" | "tonal" | "outlined";
    x?: "inner" | "right";
    y?: "down" | "up";
    children: Snippet;
    menu: Snippet;
  } & ButtonAttrs = $props();

  const autoclose = (node: HTMLDetailsElement) => {
    const close = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("summary")) return;

      node.open = false;
    };
    window.addEventListener("click", close);
    return {
      destroy() {
        window.removeEventListener("click", close);
      },
    };
  };
</script>

<div class="m3-container {variant}">
  <button type="button" class="split m3-font-label-large" {...extra}>
    <Layer />
    {@render children()}
  </button>
  <details class="align-{x} align-{y}" use:autoclose>
    <summary class="split">
      <Layer />
      <Icon icon={iconExpand} size={22} />
    </summary>
    {@render menu()}
  </details>
</div>

<style>
  @layer tokens {
    :root {
      --m3-split-button-outer-shape: 1.25rem;
      --m3-split-button-half-shape: var(--m3-util-rounding-medium);
      --m3-split-button-inner-shape: var(--m3-util-rounding-extra-small);
    }
  }

  .m3-container {
    display: inline-grid;
    grid-template-columns: 1fr auto;
    gap: 0.125rem;

    &.elevated .split {
      background-color: rgb(var(--m3-scheme-surface-container-low));
      color: rgb(var(--m3-scheme-primary));
      box-shadow: var(--m3-util-elevation-1);
      &:hover {
        box-shadow: var(--m3-util-elevation-2);
      }
    }

    &.filled .split {
      background-color: rgb(var(--m3-scheme-primary));
      color: rgb(var(--m3-scheme-on-primary));
    }

    &.tonal .split {
      background-color: rgb(var(--m3-scheme-secondary-container));
      color: rgb(var(--m3-scheme-on-secondary-container));
    }

    &.outlined .split {
      outline: 1px solid rgb(var(--m3-scheme-outline-variant));
      outline-offset: -1px;
      color: rgb(var(--m3-scheme-on-surface-variant));
    }
  }

  .split {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(2.5rem + var(--m3-util-density-term));
    gap: 0.5rem;

    cursor: pointer;
    background-color: transparent;
    border: none;

    position: relative;
    transition:
      box-shadow var(--m3-util-easing-fast),
      border-radius var(--m3-util-easing-fast);
  }

  button {
    padding-inline-start: 1rem;
    padding-inline-end: 0.75rem;
    border-start-start-radius: var(--m3-split-button-outer-shape);
    border-end-start-radius: var(--m3-split-button-outer-shape);
    border-start-end-radius: var(--m3-split-button-inner-shape);
    border-end-end-radius: var(--m3-split-button-inner-shape);
    &:hover,
    &:active {
      border-start-end-radius: var(--m3-split-button-half-shape);
      border-end-end-radius: var(--m3-split-button-half-shape);
    }

    > :global(svg) {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  details {
    display: flex;
    position: relative;
  }
  summary {
    width: 3rem;

    --inner-shape: var(--m3-split-button-inner-shape);
    --outer-shape: var(--m3-split-button-outer-shape);
    border-start-start-radius: var(--inner-shape);
    border-end-start-radius: var(--inner-shape);
    border-start-end-radius: var(--outer-shape);
    border-end-end-radius: var(--outer-shape);

    &:hover,
    &:active {
      --inner-shape: var(--m3-split-button-half-shape);
    }
    &:is(details[open] summary) {
      --inner-shape: var(--m3-split-button-outer-shape);
      > :global(.tint) {
        opacity: 0.08;
      }
      > :global(svg) {
        rotate: 180deg;
      }
    }
    > :global(svg) {
      /* Push away from the most rounded side */
      --shape-delta: calc(var(--inner-shape) - var(--outer-shape));
      --correction: calc(var(--m3-util-optical-centering-coefficient) * var(--shape-delta));
      translate: var(--correction) 0;
      transition:
        rotate var(--m3-util-easing-fast),
        translate var(--m3-util-easing-fast);
    }
  }
  details > :global(:not(summary)) :global {
    position: absolute !important;
    &:is(details.align-inner > *) {
      left: 0;
    }
    &:is(details.align-right > *) {
      right: 0;
    }
    &:is(details.align-down > *) {
      top: 100%;
    }
    &:is(details.align-up > *) {
      bottom: 100%;
    }
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
</style>
