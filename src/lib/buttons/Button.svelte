<script lang="ts">
  import type {
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
    HTMLLabelAttributes,
  } from "svelte/elements";
  import type { Snippet } from "svelte";
  import Layer from "$lib/misc/Layer.svelte";

  // If you want a toggle button, use `for` with a checkbox input.
  type ActionProps =
    | ({ for: string } & HTMLLabelAttributes)
    | ({ href: string } & HTMLAnchorAttributes)
    | HTMLButtonAttributes;
  type Props = {
    variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
    square?: boolean;
    iconType?: "none" | "left" | "full";
    children: Snippet;
  } & ActionProps;

  let props: Props = $props();
</script>

{#if "for" in props}
  {@const {
    variant = "filled",
    for: forItem,
    square = false,
    iconType = "none",
    children,
    ...extra
  } = props}
  <label
    for={forItem}
    class="m3-container m3-font-label-large {variant} icon-{iconType}"
    class:square
    {...extra}
  >
    <Layer />
    {@render children()}
  </label>
{:else if "href" in props}
  {@const {
    variant = "filled",
    href,
    square = false,
    iconType = "none",
    children,
    ...extra
  } = props}
  <a
    {href}
    class="m3-container m3-font-label-large {variant} icon-{iconType}"
    class:square
    {...extra}
  >
    <Layer />
    {@render children()}
  </a>
{:else}
  {@const { variant = "filled", square = false, iconType = "none", children, ...extra } = props}
  <button
    class="m3-container m3-font-label-large {variant} icon-{iconType}"
    class:square
    {...extra}
  >
    <Layer />
    {@render children()}
  </button>
{/if}

<style>
  :root {
    --m3-button-shape: 1.25rem;
  }

  .m3-container {
    display: inline-flex;
    border: none;
    height: 2.5rem;
    gap: 0.5rem;
    padding: 0 1rem;
    border-radius: var(--m3-button-shape);
    transition:
      border-radius var(--m3-util-easing-fast-spatial),
      box-shadow var(--m3-util-easing-fast),
      background-color var(--m3-util-easing-fast),
      color var(--m3-util-easing-fast);

    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
    user-select: none;
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;

    &:disabled,
    &:is(:global(input:disabled) + label) {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
      color: rgb(var(--m3-scheme-on-surface) / 0.38);
      cursor: auto;
    }

    &.elevated:not(:disabled, :global(input:disabled) + label) {
      background-color: rgb(var(--m3-scheme-surface-container-low));
      color: rgb(var(--m3-scheme-primary));
      box-shadow: var(--m3-util-elevation-1);
      &:is(:global(input:checked) + .m3-container) {
        background-color: rgb(var(--m3-scheme-primary));
        color: rgb(var(--m3-scheme-on-primary));
      }
      @media (hover: hover) {
        &:hover {
          box-shadow: var(--m3-util-elevation-2);
        }
      }
    }
    &.filled:not(:disabled, :global(input:disabled) + label) {
      background-color: rgb(var(--m3-scheme-primary));
      color: rgb(var(--m3-scheme-on-primary));
      &:is(:global(input:is([type="checkbox"], [type="radio"]):not(:checked)) + label) {
        background-color: rgb(var(--m3-scheme-surface-container));
        color: rgb(var(--m3-scheme-on-surface-variant));
      }
    }
    &.tonal:not(:disabled, :global(input:disabled) + label) {
      background-color: rgb(var(--m3-scheme-secondary-container));
      color: rgb(var(--m3-scheme-on-secondary-container));
      &:is(:global(input:checked) + label) {
        background-color: rgb(var(--m3-scheme-secondary));
        color: rgb(var(--m3-scheme-on-secondary));
      }
    }
    &.outlined {
      outline: 1px solid rgb(var(--m3-scheme-outline-variant));
      outline-offset: -1px;
    }
    &.outlined:not(:disabled, :global(input:disabled) + label) {
      outline-color: rgb(var(--m3-scheme-outline-variant));
      color: rgb(var(--m3-scheme-on-surface-variant));
      &:is(:global(input:checked) + label) {
        outline-color: rgb(var(--m3-scheme-inverse-surface));
        background-color: rgb(var(--m3-scheme-inverse-surface));
        color: rgb(var(--m3-scheme-inverse-on-surface));
      }
    }
    &.outlined:is(:disabled, :global(input:disabled) + label) {
      outline-color: rgb(var(--m3-scheme-on-surface) / 0.12);
      background-color: transparent;
    }
    &.text:not(:disabled, :global(input:disabled) + label) {
      color: rgb(var(--m3-scheme-primary));
    }
    @media (hover: hover) {
      &:is(.filled, .tonal):not(:disabled, label):hover {
        box-shadow: var(--m3-util-elevation-1);
      }
    }

    &.square:not(:global(input:checked) + label),
    &:is(:global(input:checked) + label):not(.square) {
      border-radius: var(--m3-util-rounding-medium);
    }
    &:active:not(:disabled, :global(input:disabled) + label) {
      border-radius: var(--m3-util-rounding-small) !important;
    }
  }

  .m3-container > :global(*) {
    flex-shrink: 0;
  }
  .icon-left > :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }
  .icon-full {
    width: 2.5rem;
    padding: 0;
  }
  .icon-full > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .m3-container:is(.elevated, .filled, .tonal) {
      background-color: transparent;
      border: 1px solid;
    }
    .m3-container:disabled {
      opacity: 0.38;
    }
  }
</style>
