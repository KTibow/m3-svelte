<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import type { LabelAttrs, AnchorAttrs } from "$lib/misc/typing-utils";
  import Layer from "$lib/misc/Layer.svelte";

  // If you want a toggle button, use `for` with a checkbox input.
  type SummaryAttrs = HTMLAttributes<HTMLElement> & { summary: true };
  type ActionProps = LabelAttrs | AnchorAttrs | SummaryAttrs | HTMLButtonAttributes;
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

{#if "for" in props}
  <label class="m3-container {variant} {size} icon-{iconType}" class:square {...props}>
    <Layer />
    {@render children()}
  </label>
{:else if "href" in props}
  <a class="m3-container {variant} {size} icon-{iconType}" class:square {...props}>
    <Layer />
    {@render children()}
  </a>
{:else if "summary" in props}
  {@const { summary: _, ...extra } = props}
  <summary class="m3-container {variant} {size} icon-{iconType}" class:square {...extra}>
    <Layer />
    {@render children()}
  </summary>
{:else}
  <button
    type={"onclick" in props ? "button" : "submit"}
    class="m3-container {variant} {size} icon-{iconType}"
    class:square
    {...props}
  >
    <Layer />
    {@render children()}
  </button>
{/if}

<style>
  .m3-container.xs {
    height: calc(2rem + var(--m3-util-density-term));
    padding: 0 0.75rem;
    gap: 0.5rem;
    --m3-button-shape: 1rem;
    --m3-button-square-shape: var(--m3-util-rounding-medium);
    --m3-button-pressed-shape: var(--m3-util-rounding-small);
    font-family: var(--m3-font-label, var(--m3-font));
    font-size: var(--m3-font-label-large-size, 0.875rem);
    line-height: var(--m3-font-label-large-height, 1.429);
    letter-spacing: var(--m3-font-label-large-tracking, 0.006rem);
    font-weight: var(--m3-font-label-large-weight, 500);
  }

  .m3-container.s {
    height: calc(2.5rem + var(--m3-util-density-term));
    padding: 0 1rem;
    gap: 0.5rem;
    --m3-button-shape: 1.25rem;
    --m3-button-square-shape: var(--m3-util-rounding-medium);
    --m3-button-pressed-shape: var(--m3-util-rounding-small);
    font-family: var(--m3-font-label, var(--m3-font));
    font-size: var(--m3-font-label-large-size, 0.875rem);
    line-height: var(--m3-font-label-large-height, 1.429);
    letter-spacing: var(--m3-font-label-large-tracking, 0.006rem);
    font-weight: var(--m3-font-label-large-weight, 500);
  }

  .m3-container.m {
    height: calc(3.5rem + var(--m3-util-density-term));
    padding: 0 1.5rem;
    gap: 0.5rem;
    --m3-button-shape: 1.75rem;
    --m3-button-square-shape: var(--m3-util-rounding-large);
    --m3-button-pressed-shape: var(--m3-util-rounding-medium);
    font-family: var(--m3-font-title, var(--m3-font));
    font-size: var(--m3-font-title-medium-size, 1rem);
    line-height: var(--m3-font-title-medium-height, 1.5);
    letter-spacing: var(--m3-font-title-medium-tracking, 0);
    font-weight: var(--m3-font-title-medium-weight, 500);
  }

  .m3-container.l {
    height: calc(6rem + var(--m3-util-density-term));
    padding: 0 3rem;
    gap: 0.75rem;
    --m3-button-shape: 3rem;
    --m3-button-square-shape: var(--m3-util-rounding-extra-large);
    --m3-button-pressed-shape: var(--m3-util-rounding-large);
    font-family: var(--m3-font-headline, var(--m3-font));
    font-size: var(--m3-font-headline-small-size, 1.5rem);
    line-height: var(--m3-font-headline-small-height, 1.333);
    letter-spacing: var(--m3-font-headline-small-tracking, 0);
    font-weight: var(--m3-font-headline-small-weight, 400);
  }

  .m3-container.xl {
    height: calc(8.5rem + var(--m3-util-density-term));
    padding: 0 4rem;
    gap: 1rem;
    --m3-button-shape: 4.25rem;
    --m3-button-square-shape: var(--m3-util-rounding-extra-large);
    --m3-button-pressed-shape: var(--m3-util-rounding-large);
    font-family: var(--m3-font-headline, var(--m3-font));
    font-size: var(--m3-font-headline-large-size, 2rem);
    line-height: var(--m3-font-headline-large-height, 1.25);
    letter-spacing: var(--m3-font-headline-large-tracking, 0);
    font-weight: var(--m3-font-headline-large-weight, 400);
  }

  .m3-container {
    display: inline-flex;
    border: none;
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

    &:disabled,
    &:is(:global(input:disabled) + label) {
      background-color: --translucent(var(--color-on-surface), 0.12);
      color: --translucent(var(--color-on-surface), 0.38);
      cursor: auto;
    }

    &.elevated:not(:disabled, :global(input:disabled) + label) {
      background-color: var(--color-surface-container-low);
      color: var(--color-primary);
      box-shadow: var(--m3-util-elevation-1);
      &:is(:global(input:checked) + .m3-container) {
        background-color: var(--color-primary);
        color: var(--color-on-primary);
      }
      @media (hover: hover) {
        &:hover {
          box-shadow: var(--m3-util-elevation-2);
        }
      }
    }
    &.filled:not(:disabled, :global(input:disabled) + label) {
      background-color: var(--color-primary);
      color: var(--color-on-primary);
      &:is(:global(input:is([type="checkbox"], [type="radio"]):not(:checked)) + label) {
        background-color: var(--color-surface-container);
        color: var(--color-on-surface-variant);
      }
    }
    &.tonal:not(:disabled, :global(input:disabled) + label) {
      background-color: var(--color-secondary-container);
      color: var(--color-on-secondary-container);
      &:is(:global(input:checked) + label) {
        background-color: var(--color-secondary);
        color: var(--color-on-secondary);
      }
    }
    &.outlined {
      outline: 1px solid var(--color-outline-variant);
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
    &.outlined:not(:disabled, :global(input:disabled) + label) {
      outline-color: var(--color-outline-variant);
      color: var(--color-on-surface-variant);
      &:is(:global(input:checked) + label) {
        outline-color: var(--color-inverse-surface);
        background-color: var(--color-inverse-surface);
        color: var(--color-inverse-on-surface);
      }
    }
    &.outlined:is(:disabled, :global(input:disabled) + label) {
      outline-color: --translucent(var(--color-on-surface), 0.12);
      background-color: transparent;
    }
    &.text:not(:disabled, :global(input:disabled) + label) {
      color: var(--color-primary);
    }
    @media (hover: hover) {
      &:is(.filled, .tonal):not(:disabled, label):hover {
        box-shadow: var(--m3-util-elevation-1);
      }
    }

    &.square:not(:is(:global(input:checked) + label, :global(:open) > summary)),
    &:is(:global(input:checked) + label, :global(:open) > summary):not(.square) {
      border-radius: var(--m3-button-square-shape);
    }
    &:active:not(:disabled, :global(input:disabled) + label) {
      border-radius: var(--m3-button-pressed-shape) !important;
    }
  }

  .m3-container > :global(*) {
    flex-shrink: 0;
  }

  .xs.icon-left > :global(svg),
  .s.icon-left > :global(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }
  .m.icon-left > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .l.icon-left > :global(svg) {
    width: 2rem;
    height: 2rem;
  }
  .xl.icon-left > :global(svg) {
    width: 2.5rem;
    height: 2.5rem;
  }

  .xs.icon-full {
    width: 2rem;
    padding: 0;
  }
  .s.icon-full {
    width: 2.5rem;
    padding: 0;
  }
  .m.icon-full {
    width: 3.5rem;
    padding: 0;
  }
  .l.icon-full {
    width: 6rem;
    padding: 0;
  }
  .xl.icon-full {
    width: 8.5rem;
    padding: 0;
  }

  .xs.icon-full > :global(svg),
  .s.icon-full > :global(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }
  .m.icon-full > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .l.icon-full > :global(svg) {
    width: 2rem;
    height: 2rem;
  }
  .xl.icon-full > :global(svg) {
    width: 2.5rem;
    height: 2.5rem;
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
