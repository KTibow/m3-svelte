<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";

  import Layer from "$lib/misc/Layer.svelte";
  import Icon from "$lib/misc/Icon.svelte";

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
    align-items: start;
    cursor: pointer;
    gap: 4px;
    user-select: none;
    width: max-content;
    position: relative;
    font-family: var(--m3-font-body, var(--m3-font));
    animation: none !important;
    color: var(--m3c-on-surface-variant);
    interpolate-size: allow-keywords;
    transition: width var(--m3-easing-fast), border var(--m3-easing-slow);
    max-width: fit-content;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 56px;
      height: 32px;
      border-radius: var(--m3-shape-full);
      transition: all var(--m3-easing-slow);
      interpolate-size: allow-keywords;
    }
    
    &.active::before {
      background: var(--m3c-secondary-container);
    }
    
    > span {
      z-index: 1;
      text-align: center;
    }
    
    > :global(.ripple-container),
    > :global(.tint) {
      border-radius: var(--m3-shape-full);
    }
  }

  .icon {
    position: relative;
    
    > :global(svg) {
      width: 24px;
      height: 24px;
      color: var(--m3c-on-secondary-container);
      position: relative;
    }
  }
  
  :global(.rail.open > .items) .m3-container {
    animation: 3s open;
    
    &::before {
      width: 100%;
      height: 56px;
    }
  }

  :global(.rail:not(.open) > .items) .m3-container {
    font-size: var(--m3-font-label-medium-size, 0.75rem);
    line-height: var(--m3-font-label-medium-height, 1.333);
    letter-spacing: var(--m3-font-label-medium-tracking, 0.031rem);
    font-weight: var(--m3-font-label-medium-weight, 500);
    border-radius: var(--m3-shape-full);
    margin: auto;
    margin-inline-start: 20px;
    width: calc(100% - 40px);
    text-align: center;
  }

  :global(.rail:not(.open) > .items) .m3-container.active > .icon {
    color: var(--m3c-secondary);
  }

  :global(.rail:not(.open) > .items) .m3-container:not(.active):hover::before {
    background: color-mix(in oklab, currentColor 8%, transparent);
  }

  :global(.rail:not(.open) > .items) :is(button, a):focus-visible > .m3-container:not(.active) > .icon,
  :global(.rail:not(.open) > .items) .m3-container:not(.active):active > .icon {
    background-color: color-mix(in oklab, currentColor 12%, transparent);
  }

  :global(.rail:not(.open) > .items) :is(button, a):focus-visible .icon {
    outline: solid;
    outline-color: var(--m3c-on-secondary-container);
    outline-width: 3px;
    outline-offset: 2px;
  }

  :global(.rail:not(.open) > .items) .icon {
    border-radius: var(--m3-shape-full);
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
    transition: width var(--m3-easing-spatial), opacity var(--m3-easing-fast);
  }

  :global(.rail.open > .items) .m3-container::before {
    border-radius: var(--m3-shape-full);
  }

  :global(.rail.open > .items) .m3-container:not(.active):hover::before {
    background: color-mix(in oklab, currentColor 8%, transparent);
  }

  :global(.rail.open > .items) :is(button, a):focus-visible > .m3-container:not(.active)::before,
  :global(.rail.open > .items) .m3-container:not(.active):active::before {
    background-color: color-mix(in oklab, currentColor 12%, transparent);
  }

  :global(.rail.open > .items) :is(button, a):focus-visible > .m3-container {
    border-radius: var(--m3-shape-full);
    outline: solid;
    outline-color: var(--m3c-on-secondary-container);
    outline-width: 3px;
    outline-offset: 2px;
  }

  :global(.rail.open > .items) .icon {
    width: 24px;
    height: 24px;
  }
  
  @keyframes open {
    0% {
      width: max-content;
      
      &::before {
        background-color: var(--m3c-secondary-container);
        color: var(--m3c-on-secondary-container);
        overflow: hidden;
      }
    }
    
    100% {
      display: none;
    }
  }
</style>
