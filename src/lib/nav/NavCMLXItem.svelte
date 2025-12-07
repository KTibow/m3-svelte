<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { AnchorAttrs } from "$lib/misc/typing-utils";
  import Icon from "$lib/misc/Icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  type ActionProps = AnchorAttrs | HTMLButtonAttributes;
  let {
    variant,
    icon,
    text,
    selected,
    ...props
  }: {
    variant: "compact" | "medium" | "large" | "extra-large" | "auto";
    icon: IconifyIcon;
    text: string;
    selected: boolean;
  } & ActionProps = $props();
</script>

{#if "href" in props}
  <a class="m3-container {variant}" {...props}>
    <div class="content" class:selected>
      <Layer />
      <div class="icon">
        <Icon {icon} size={24} />
      </div>
      {text}
    </div>
  </a>
{:else}
  <button type="button" class="m3-container {variant}" disabled={selected} {...props}>
    <div class="content" class:selected>
      <Layer />
      <div class="icon">
        <Icon {icon} size={24} />
      </div>
      {text}
    </div>
  </button>
{/if}

<style>
  @mixin --cmlxi-compact {
    height: 4rem;
    padding-block: 0.375rem;
  }

  @mixin --cmlxi-horizontal {
    .content {
      padding-inline: 1rem;
      border-radius: var(--m3-shape-full);
    }
    .content.selected {
      background-color: var(--m3c-secondary-container);
      color: var(--m3c-on-secondary-container);
    }
  }

  @mixin --cmlxi-vertical {
    flex-direction: column;
    .content {
      flex-direction: column;
      text-align: center;

      &:hover {
        > .icon {
          background-color: --translucent(currentColor, 0.08);
        }
      }

      &:focus-visible,
      &:active {
        > .icon {
          background-color: --translucent(currentColor, 0.12);
        }
      }

      > .icon {
        width: 3.5rem;
        height: 2rem;
      }

      > :global(:is(.ripple-container, .tint)) {
        display: none;
      }
    }

    .content.selected {
      color: var(--m3c-secondary);
      > .icon {
        color: var(--m3c-on-secondary-container);
      }
      > .icon::before {
        opacity: 1;
        width: 100%;
        inset: 0;
        transition:
          width var(--m3-easing-fast-spatial),
          inset var(--m3-easing-fast-spatial);
      }
    }
  }

  @mixin --cmlxi-medium {
    height: 4rem;
    padding-block: 0.75rem;
  }

  @mixin --cmlxi-large {
    height: 4rem;
    .content {
      padding-block: 0.375rem;
    }
  }

  @mixin --cmlxi-extra-large {
    @apply --m3-label-large;
    height: 3.5rem;
    padding-inline: 1.25rem;

    .content {
      gap: 0.75rem;
    }
  }

  .m3-container {
    @apply --m3-label-medium;
    display: flex;

    &:is(button) {
      background: none;
      border: none;
      cursor: pointer;
    }

    .content {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      position: relative;
      color: var(--m3c-on-surface-variant);
      transition: var(--m3-easing);
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--m3-shape-full);
      position: relative;
      transition: var(--m3-easing);
    }
    .icon > :global(svg) {
      z-index: 1;
    }

    .icon::before {
      position: absolute;
      display: block;
      content: " ";
      background-color: var(--m3c-secondary-container);

      opacity: 0;
      inset: 0 50%;
      width: 0;
      border-radius: 2rem;
      transition:
        opacity var(--m3-easing),
        inset 0ms 500ms,
        width 0ms 500ms;
    }

    &.compact {
      @apply --cmlxi-compact;
      @apply --cmlxi-vertical;
    }
    &.medium {
      @apply --cmlxi-medium;
      @apply --cmlxi-horizontal;
    }
    &.large {
      @apply --cmlxi-large;
      @apply --cmlxi-vertical;
    }
    &.extra-large {
      @apply --cmlxi-extra-large;
      @apply --cmlxi-horizontal;
    }
  }
  .m3-container.auto {
    @media (width < 37.5rem) {
      /* Compact */
      @apply --cmlxi-compact;
      @apply --cmlxi-vertical;
    }
    @media (37.5rem <= width < 52.5rem) {
      /* Medium */
      @apply --cmlxi-medium;
      @apply --cmlxi-horizontal;
    }
    @media (52.5rem <= width < 100rem) {
      /* Large */
      @apply --cmlxi-large;
      @apply --cmlxi-vertical;
    }
    @media (100rem <= width) {
      /* Extra large */
      @apply --cmlxi-extra-large;
      @apply --cmlxi-horizontal;
    }
  }
</style>
