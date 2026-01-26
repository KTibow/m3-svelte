<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAttributes, HTMLLabelAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import type { AnchorAttrs, NotLink } from "$lib/misc/typing-utils";
  import "$lib/etc/layer.js";

  // If you want a toggle button, use `for` with a checkbox input.
  type ActionProps =
    | AnchorAttrs
    | (NotLink<HTMLLabelAttributes> & { label: true })
    | (NotLink<HTMLAttributes<HTMLElement>> & { summary: true })
    | NotLink<HTMLButtonAttributes>;
  type Props = {
    variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
    square?: boolean;
    iconType?: "none" | "left" | "full";
    size?: "xs" | "s" | "m" | "l" | "xl";
    children: Snippet;
  } & ActionProps;

  let {
    variant = "filled",
    square = false,
    iconType = "none",
    size = "s",
    children,
    ...props
  }: Props = $props();
</script>

{#if props.href != undefined}
  <a class="m3-container m3-layer {variant} {size} icon-{iconType}" class:square {...props}>
    {@render children()}
  </a>
{:else if "label" in props}
  {@const { label: _, ...extra } = props}
  <label class="m3-container m3-layer {variant} {size} icon-{iconType}" class:square {...extra}>
    {@render children()}
  </label>
{:else if "summary" in props}
  {@const { summary: _, ...extra } = props}
  <summary class="m3-container m3-layer {variant} {size} icon-{iconType}" class:square {...extra}>
    {@render children()}
  </summary>
{:else}
  <button
    type={props.onclick ? "button" : "submit"}
    class="m3-container m3-layer {variant} {size} icon-{iconType}"
    class:square
    {...props}
  >
    {@render children()}
  </button>
{/if}

<style>
  .m3-container.xs {
    @apply --m3-label-large;
    height: --m3-density(2rem);
    padding: 0 0.75rem;
    gap: 0.5rem;
    --shape: 1rem;
    --square-shape: var(--m3-shape-medium);
    --pressed-shape: var(--m3-shape-small);

    &.icon-full {
      width: 2rem;
      padding: 0;
    }
  }

  .m3-container.s {
    @apply --m3-label-large;
    height: --m3-density(2.5rem);
    padding: 0 1rem;
    gap: 0.5rem;
    --shape: 1.25rem;
    --square-shape: var(--m3-shape-medium);
    --pressed-shape: var(--m3-shape-small);

    &.icon-full {
      width: 2.5rem;
      padding: 0;
    }
  }

  .m3-container.m {
    @apply --m3-title-medium;
    height: --m3-density(3.5rem);
    padding: 0 1.5rem;
    gap: 0.5rem;
    --shape: 1.75rem;
    --square-shape: var(--m3-shape-large);
    --pressed-shape: var(--m3-shape-medium);

    &.icon-left > :global(svg) {
      width: 1.5rem;
      height: 1.5rem;
    }
    &.icon-full {
      width: 3.5rem;
      padding: 0;
      > :global(svg) {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  .m3-container.l {
    @apply --m3-headline-small;
    height: --m3-density(6rem);
    padding: 0 3rem;
    gap: 0.75rem;
    --shape: 3rem;
    --square-shape: var(--m3-shape-extra-large);
    --pressed-shape: var(--m3-shape-large);

    &.icon-left > :global(svg) {
      width: 2rem;
      height: 2rem;
    }
    &.icon-full {
      width: 6rem;
      padding: 0;
      > :global(svg) {
        width: 2rem;
        height: 2rem;
      }
    }
  }

  .m3-container.xl {
    @apply --m3-headline-large;
    height: --m3-density(8.5rem);
    padding: 0 4rem;
    gap: 1rem;
    --shape: 4.25rem;
    --square-shape: var(--m3-shape-extra-large);
    --pressed-shape: var(--m3-shape-large);

    &.icon-left > :global(svg) {
      width: 2.5rem;
      height: 2.5rem;
    }
    &.icon-full {
      width: 8.5rem;
      padding: 0;
      > :global(svg) {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }

  .m3-container {
    display: inline-flex;
    border: none;
    border-radius: var(--shape);
    transition:
      border-radius var(--m3-easing-fast-spatial),
      box-shadow var(--m3-easing-fast),
      background-color var(--m3-easing-fast),
      color var(--m3-easing-fast);

    align-items: center;
    justify-content: center;
    background-color: transparent;
    cursor: pointer;
    user-select: none;

    &:disabled,
    &:has(> :global(input:disabled)) {
      background-color: --translucent(var(--m3c-on-surface), 0.12);
      color: --translucent(var(--m3c-on-surface), 0.38);
      cursor: auto;
    }

    &.elevated:not(:disabled, :has(> :global(input:disabled))) {
      background-color: var(--m3c-surface-container-low);
      color: var(--m3c-primary);
      box-shadow: var(--m3-elevation-1);
      &:has(> :global(input:checked)) {
        background-color: var(--m3c-primary);
        color: var(--m3c-on-primary);
      }
      @media (hover: hover) {
        &:hover {
          box-shadow: var(--m3-elevation-2);
        }
      }
    }
    &.filled:not(:disabled, :has(> :global(input:disabled))) {
      background-color: var(--m3c-primary);
      color: var(--m3c-on-primary);
      &:has(> :global(input:is([type="checkbox"], [type="radio"]):not(:checked))) {
        background-color: var(--m3c-surface-container);
        color: var(--m3c-on-surface-variant);
      }
    }
    &.tonal:not(:disabled, :has(> :global(input:disabled))) {
      background-color: var(--m3c-secondary-container);
      color: var(--m3c-on-secondary-container);
      &:has(> :global(input:checked)) {
        background-color: var(--m3c-secondary);
        color: var(--m3c-on-secondary);
      }
    }
    &.outlined {
      outline: 1px solid var(--m3c-outline-variant);
      outline-offset: -1px;
    }
    &.outlined.l {
      outline-width: 2px;
      outline-offset: -2px;
    }
    &.outlined.xl {
      outline-width: 3px;
      outline-offset: -3px;
    }
    &.outlined:not(:disabled, :has(> :global(input:disabled))) {
      outline-color: var(--m3c-outline-variant);
      color: var(--m3c-on-surface-variant);
      &:has(> :global(input:checked)) {
        outline-color: var(--m3c-inverse-surface);
        background-color: var(--m3c-inverse-surface);
        color: var(--m3c-inverse-on-surface);
      }
    }
    &.outlined:has(> :global(input:disabled)) {
      outline-color: --translucent(var(--m3c-on-surface), 0.12);
      background-color: transparent;
    }
    &.text:not(:disabled, :has(> :global(input:disabled))) {
      color: var(--m3c-primary);
    }
    @media (hover: hover) {
      &:is(.filled, .tonal):not(:disabled, label):hover {
        box-shadow: var(--m3-elevation-1);
      }
    }

    &.square:not(:has(> :global(input:checked)), :global(:open) > summary),
    &:not(.square):is(:has(> :global(input:checked)), :global(:open) > summary) {
      border-radius: var(--square-shape);
    }
    &:active:not(:disabled, :has(> :global(input:disabled))) {
      border-radius: var(--pressed-shape) !important;
    }
  }

  .m3-container > :global(*) {
    flex-shrink: 0;
  }
  .m3-container > :global(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }
  .m3-container > :global(input) {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  .m3-container {
    print-color-adjust: exact;
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
