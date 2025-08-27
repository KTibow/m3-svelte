<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";

  import Layer from "$lib/misc/Layer.svelte";
  import Icon from "$lib/misc/_icon.svelte";

  let {
    label,
    icon,
    active = false,
    badge,
    ...props
  }: {
    label: string;
    icon: IconifyIcon;
    active?: boolean;
    badge?: string | boolean;
  } & (({ href: string } & HTMLAnchorAttributes) | HTMLButtonAttributes) = $props();
</script>

{#if 'href' in props}
  <a role="menuitem" {...props}>
    {@render item()}
  </a>
{:else}
  <button role="menuitem" type="button" {...props}>
    {@render item()}
  </button>
{/if}

{#snippet item()}
  <div class="m3-container" id="m3-menubutton" class:active>
    <Layer />

    <div class="icon">
      <Icon {icon} />

      {#if typeof badge === "string" || badge === true}
        <span class="badge m3-font-label-small" class:small={badge === true}>
          {typeof badge === "string" ? badge : ""}
        </span>
      {/if}
    </div>

    {label}
  </div>
{/snippet}

<style>
  button, a {
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
    margin-inline: 20px;
    user-select: none;
    width: fit-content;
    position: relative;
    font-family: var(--m3-font-body, var(--m3-font));
    animation: none !important;
    color: rgb(var(--m3-scheme-on-surface-variant));
    transition: width var(--m3-util-easing-spatial);
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

  .icon > .badge {
    border-radius: var(--m3-util-rounding-full);
    background: rgb(var(--m3-scheme-error));
    color: rgb(var(--m3-scheme-on-error));
    width: 16px;
    height: 16px;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon > .badge.small {
    width: 6px;
    height: 6px;
    font-size: 0px;
  }

  @container items (width <= 96px) {
    .m3-container {
      font-size: var(--m3-font-label-medium-size, 0.75rem);
      line-height: var(--m3-font-label-medium-height, 1.333);
      letter-spacing: var(--m3-font-label-medium-tracking, 0.031rem);
      font-weight: var(--m3-font-label-medium-weight, 500);
    }
    
    .m3-container.active > .icon {
      background: rgb(var(--m3-scheme-secondary-container));
      color: rgb(var(--m3-scheme-secondary));
    }

    .m3-container:not(.active):hover > .icon {
      background: color-mix(in oklab, currentColor 8%, transparent);
    }

    :is(button, a):focus-visible > .m3-container:not(.active) > .icon,
    .m3-container:not(.active):active > .icon {
      background-color: color-mix(in oklab, currentColor 12%, transparent);
    }
    
    :is(button, a):focus-visible .icon {
      outline: solid;
      outline-color: rgb(var(--m3-scheme-on-secondary-container));
      outline-width: 3px;
      outline-offset: 2px;
    }

    .icon {
      border-radius: var(--m3-util-rounding-full);
      padding: 0px 16px;
      height: 32px;
    }

    .icon > :global(svg) {
      margin: 4px 0px;
    }

    .icon > .badge {
      margin-block-start: 2px;
      margin-inline-start: 12px;
    }

    .icon > .badge.small {
      margin-inline-start: 20px;
      margin-block-start: 4px;
    }

    .m3-container > :global(.ripple-container),
    .m3-container > :global(.tint) {
      z-index: 1;
      width: 56px;
      height: 32px;
      border-radius: var(--m3-util-rounding-full);
    }
  }

  @container items (width > 96px) {
    .m3-container {
      flex-direction: row;
      align-items: center;
      justify-content: start;
      gap: 12px;
      padding: 0px 16px;
      border-radius: var(--m3-util-rounding-full);
      height: 56px;
      font-size: var(--m3-font-label-large-size, 0.875rem);
      line-height: var(--m3-font-label-large-height, 1.429);
      letter-spacing: var(--m3-font-label-large-tracking, 0.006rem);
      font-weight: var(--m3-font-label-large-weight, 500);
      transition: background-color var(--m3-util-easing);
    }

    .m3-container.active {
      background: rgb(var(--m3-scheme-secondary-container));
      color: rgb(var(--m3-scheme-on-secondary-container));
    }

    .m3-container:not(.active):hover {
      background: color-mix(in oklab, currentColor 8%, transparent);
    }

    :is(button, a):focus-visible > .m3-container:not(.active),
    .m3-container:not(.active):active {
      background-color: color-mix(in oklab, currentColor 12%, transparent);
    }
    
    :is(button, a):focus-visible > .m3-container {
      outline: solid;
      outline-color: rgb(var(--m3-scheme-on-secondary-container));
      outline-width: 3px;
      outline-offset: 2px;
    }
    
    .icon {
      width: 24px;
      height: 24px;
    }

    .icon > .badge {
      margin-block-start: -2px;
      margin-inline-start: 12px;
    }

    .icon > .badge.small {
      margin-inline-start: 20px;
      margin-block-start: 0px;
    }
  }
</style>
