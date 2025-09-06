<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";

  import Layer from "$lib/misc/Layer.svelte";
  import Icon from "$lib/misc/_icon.svelte";

  let {
    label,
    icon,
    active = false,
    ...props
  }: {
    label: string;
    icon: IconifyIcon;
    active?: boolean;
  } & (({ href: string } & HTMLAnchorAttributes) | HTMLButtonAttributes) = $props();
</script>

{#if "href" in props}
  <a role="menuitem" {...props}>
    {@render item()}
  </a>
{:else}
  <button role="menuitem" type="button" {...props}>
    {@render item()}
  </button>
{/if}

{#snippet item()}
  <div class="m3-container" class:active>
    <Layer />

    <div class="icon">
      <Icon {icon} />
    </div>

    <span>{label}</span>
  </div>
{/snippet}

<style>
  button,
  a {
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    animation: none !important;
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    user-select: none;
    width: fit-content;
    position: relative;
    font-family: var(--m3-font-body, var(--m3-font));
    animation: none !important;
    color: rgb(var(--m3-scheme-on-surface-variant));
    transition: width var(--m3-util-easing-fast);
  }

  .m3-container::before {
    content: "";
    position: absolute;
    inset: 0;
    transition: all var(--m3-util-easing);
  }

  .icon {
    position: relative;
  }

  .icon > :global(svg) {
    width: 24px;
    height: 24px;
    color: rgb(var(--m3-scheme-on-secondary-container));
    position: relative;
  }

  .m3-container > span {
    z-index: 1;
  }

  :global(.rail:not(.open) > .items) .m3-container {
    font-size: var(--m3-font-label-medium-size, 0.75rem);
    line-height: var(--m3-font-label-medium-height, 1.333);
    letter-spacing: var(--m3-font-label-medium-tracking, 0.031rem);
    font-weight: var(--m3-font-label-medium-weight, 500);
    border-radius: var(--m3-util-rounding-full);
    margin: auto;
    margin-inline-start: 20px;
    width: 56px;
    text-align: center;
  }

  :global(.rail:not(.open) > .items) .m3-container::before {
    width: 56px;
    height: 32px;
    border-radius: var(--m3-util-rounding-full);
  }

  :global(.rail:not(.open) > .items) .m3-container.active::before {
    background: rgb(var(--m3-scheme-secondary-container));
  }

  :global(.rail:not(.open) > .items) .m3-container.active > .icon {
    color: rgb(var(--m3-scheme-secondary));
  }

  :global(.rail:not(.open) > .items) .m3-container:not(.active):hover::before {
    background: color-mix(in oklab, currentColor 8%, transparent);
  }

  :global(.rail:not(.open) > .items)
    :is(button, a):focus-visible
    > .m3-container:not(.active)
    > .icon,
  :global(.rail:not(.open) > .items) .m3-container:not(.active):active > .icon {
    background-color: color-mix(in oklab, currentColor 12%, transparent);
  }

  :global(.rail:not(.open) > .items) :is(button, a):focus-visible .icon {
    outline: solid;
    outline-color: rgb(var(--m3-scheme-on-secondary-container));
    outline-width: 3px;
    outline-offset: 2px;
  }

  :global(.rail:not(.open) > .items) .icon {
    padding: 0px 16px;
    height: 32px;
  }

  :global(.rail:not(.open) > .items) .icon > :global(svg) {
    margin: 4px 0px;
  }

  :global(.rail:not(.open) > .items) .m3-container > :global(.ripple-container),
  :global(.rail:not(.open) > .items) .m3-container > :global(.tint) {
    z-index: 1;
    width: 56px;
    height: 32px;
    border-radius: var(--m3-util-rounding-full);
  }

  :global(.rail.open > .items) .m3-container {
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-inline: 20px;
    gap: 12px;
    padding: 0px 16px;
    height: 56px;
    font-size: var(--m3-font-label-large-size, 0.875rem);
    line-height: var(--m3-font-label-large-height, 1.429);
    letter-spacing: var(--m3-font-label-large-tracking, 0.006rem);
    font-weight: var(--m3-font-label-large-weight, 500);
    transition:
      width var(--m3-util-easing-spatial),
      gap var(--m3-util-easing-spatial),
      opacity var(--m3-util-easing-fast);
  }

  :global(.rail.open > .items) .m3-container::before {
    border-radius: var(--m3-util-rounding-full);
  }

  :global(.rail.open > .items) .m3-container.active::before {
    background: rgb(var(--m3-scheme-secondary-container));
  }

  :global(.rail.open > .items) .m3-container.active {
    color: rgb(var(--m3-scheme-on-secondary-container));
    width: max-content;
    overflow: hidden;
  }

  :global(.rail.open > .items) .m3-container:not(.active):hover {
    background: color-mix(in oklab, currentColor 8%, transparent);
  }

  :global(.rail.open > .items) :is(button, a):focus-visible > .m3-container:not(.active),
  :global(.rail.open > .items) .m3-container:not(.active):active {
    background-color: color-mix(in oklab, currentColor 12%, transparent);
  }

  :global(.rail.open > .items) :is(button, a):focus-visible > .m3-container {
    outline: solid;
    outline-color: rgb(var(--m3-scheme-on-secondary-container));
    outline-width: 3px;
    outline-offset: 2px;
  }

  :global(.rail.open > .items) .icon {
    width: 24px;
    height: 24px;
  }

  @keyframes expand {
    0% {
    }

    100% {
    }
  }
</style>
