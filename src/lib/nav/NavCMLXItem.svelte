<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  type ActionProps =
    | ({ click: () => void } & HTMLButtonAttributes)
    | ({ href: string } & HTMLAnchorAttributes);
  let props: {
    variant: "compact" | "medium" | "large" | "expanded" | "auto";
    icon: IconifyIcon;
    text: string;
    selected: boolean;
  } & ActionProps = $props();
</script>

{#if "click" in props}
  {@const { variant, icon, text, selected, click, ...extra } = props}
  <button
    type="button"
    onclick={click}
    class="m3-container m3-font-label-medium {variant}"
    disabled={selected}
    {...extra}
  >
    <div class="content" class:selected>
      <Layer />
      <div class="icon">
        <Icon {icon} width="1.5rem" height="1.5rem" />
      </div>
      {text}
    </div>
  </button>
{:else}
  {@const { variant, icon, text, selected, href, ...extra } = props}
  <a {href} class="m3-container m3-font-label-medium {variant}" {...extra}>
    <div class="content" class:selected>
      <Layer />
      <div class="icon">
        <Icon {icon} width="1.5rem" height="1.5rem" />
      </div>
      {text}
    </div>
  </a>
{/if}

<style>
  .m3-container {
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
      color: rgb(var(--m3-scheme-on-surface-variant));
      transition: var(--m3-util-easing);
      &:is(.compact .content, .large .content) {
        flex-direction: column;
        text-align: center;
        &.selected {
          color: rgb(var(--m3-scheme-secondary));
          > .icon {
            color: rgb(var(--m3-scheme-on-secondary-container));
          }
          > .icon::before {
            opacity: 1;
            width: 100%;
            inset: 0;
            transition:
              width var(--m3-util-easing-fast-spatial),
              inset var(--m3-util-easing-fast-spatial);
          }
        }
        &:hover {
          > .icon {
            background-color: color-mix(in srgb-linear, currentColor 8%, transparent);
          }
        }
        &:focus-visible,
        &:active {
          > .icon {
            background-color: color-mix(in srgb-linear, currentColor 12%, transparent);
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
      &:is(.medium .content, .expanded .content) {
        padding-inline: 1rem;
        border-radius: var(--m3-util-rounding-full);
        &.selected {
          background-color: rgb(var(--m3-scheme-secondary-container));
          color: rgb(var(--m3-scheme-on-secondary-container));
        }
      }
      &:is(.expanded .content) {
        gap: 0.75rem;
      }
    }
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--m3-util-rounding-full);
      position: relative;
      transition: var(--m3-util-easing);
    }
    .icon::before {
      position: absolute;
      display: block;
      content: " ";
      background-color: rgb(var(--m3-scheme-secondary-container));

      opacity: 0;
      inset: 0 50%;
      width: 0;
      border-radius: 2rem;
      transition:
        opacity var(--m3-util-easing),
        inset 0ms 500ms,
        width 0ms 500ms;
    }
    .icon > :global(svg) {
      z-index: 1;
    }
    &.compact {
      flex-direction: column;
      height: 4rem;
      padding-block: 0.375rem;
    }
    &.medium {
      height: 4rem;
      padding-block: 0.75rem;
    }
    &.large {
      flex-direction: column;
      min-height: 4rem;
      padding-block: 0.375rem;
    }
    &.expanded {
      height: 3.5rem;
      padding-inline: 1.25rem;
      font-size: var(--m3-font-label-large-size, 0.875rem);
      line-height: var(--m3-font-label-large-height, 1.429);
      letter-spacing: var(--m3-font-label-large-tracking, 0.006rem);
      font-weight: var(--m3-font-label-large-weight, 500);
    }
  }

  .m3-container.auto {
    @media (width < 37.5rem) {
      /* Compact */
      flex-direction: column;
      height: 4rem;
      padding-block: 0.375rem;

      .content {
        flex-direction: column;
        text-align: center;

        &.selected {
          color: rgb(var(--m3-scheme-secondary));
          > .icon {
            color: rgb(var(--m3-scheme-on-secondary-container));
          }
          > .icon::before {
            opacity: 1;
            width: 100%;
            inset: 0;
            transition:
              width var(--m3-util-easing-fast-spatial),
              inset var(--m3-util-easing-fast-spatial);
          }
        }

        &:hover {
          > .icon {
            background-color: color-mix(in srgb-linear, currentColor 8%, transparent);
          }
        }

        &:focus-visible,
        &:active {
          > .icon {
            background-color: color-mix(in srgb-linear, currentColor 12%, transparent);
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
    }
    @media (37.5rem <= width < 52.5rem) {
      /* Medium */
      height: 4rem;
      padding-block: 0.75rem;

      .content {
        padding-inline: 1rem;
        border-radius: var(--m3-util-rounding-full);

        &.selected {
          background-color: rgb(var(--m3-scheme-secondary-container));
          color: rgb(var(--m3-scheme-on-secondary-container));
        }
      }
    }
    @media (52.5rem <= width < 100rem) {
      /* Large */
      flex-direction: column;
      text-align: center;
      min-height: 4rem;
      padding-block: 0.375rem;

      .content {
        flex-direction: column;

        &.selected {
          color: rgb(var(--m3-scheme-secondary));
          > .icon {
            color: rgb(var(--m3-scheme-on-secondary-container));
          }
          > .icon::before {
            opacity: 1;
            width: 100%;
            inset: 0;
            transition:
              width var(--m3-util-easing-fast-spatial),
              inset var(--m3-util-easing-fast-spatial);
          }
        }

        &:hover {
          > .icon {
            background-color: color-mix(in srgb-linear, currentColor 8%, transparent);
          }
        }

        &:focus-visible,
        &:active {
          > .icon {
            background-color: color-mix(in srgb-linear, currentColor 12%, transparent);
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
    }
    @media (100rem <= width) {
      /* Expanded */
      height: 3.5rem;
      padding-inline: 1.25rem;
      font-size: var(--m3-font-label-large-size, 0.875rem);
      line-height: var(--m3-font-label-large-height, 1.429);
      letter-spacing: var(--m3-font-label-large-tracking, 0.006rem);
      font-weight: var(--m3-font-label-large-weight, 500);

      .content {
        padding-inline: 1rem;
        border-radius: var(--m3-util-rounding-full);
        gap: 0.75rem;

        &.selected {
          background-color: rgb(var(--m3-scheme-secondary-container));
          color: rgb(var(--m3-scheme-on-secondary-container));
        }
      }
    }
  }
</style>
