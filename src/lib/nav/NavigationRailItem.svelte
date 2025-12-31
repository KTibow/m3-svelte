<script lang="ts">
  import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";
  
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
  <a class:m3-container={true} class:active role="menuitem" {...props}>
    {@render item()}
  </a>
{:else}
  <button class:m3-container={true} class:active role="menuitem" type="button" {...props}>
    {@render item()}
  </button>
{/if}

{#snippet item()}
  <div class="m3-layer"></div>

  <div class="icon">
    <Icon {icon} />
  </div>
  
  <span>{label}</span>
  <span>{label}</span> 
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
    gap: 8px;
    cursor: pointer;
    user-select: none;
    width: fit-content;
    position: relative;
    font-family: var(--m3-font-body, var(--m3-font));
    animation: none !important;
    color: var(--m3c-on-surface-variant);
    interpolate-size: allow-keywords;
    transition:
      width var(--m3-easing),
      padding-block var(--m3-easing-slow),
      padding-inline-end var(--m3-easing-slow),
      margin var(--m3-easing-slow);
    height: 56px;
    max-width: fit-content;

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 56px;
      height: 32px;
      border-radius: var(--m3-shape-full);
      transition: all var(--m3-easing-slow-spatial);
      interpolate-size: allow-keywords;
    }

    &.active::before {
      background: var(--m3c-secondary-container);
    }

    span:first-of-type {
      @apply --m3-label-large;
      align-self: center;
      justify-self: center;
      interpolate-size: allow-keywords;
      width: fit-content;
      opacity: 0;
      z-index: 1;
      transition: opacity var(--m3-easing);
    }
    
    span:last-of-type {
      @apply --m3-label-medium;
      position: absolute;
      top: 36px;
      left: 0;
      width: 56px;
      transition: opacity var(--m3-easing);
    }
  }

  .icon {
    height: 32px;
    z-index: 1;
    transition: padding-inline-end 0s 300ms;
    
    > :global(svg) {
      transition: margin var(--m3-easing);
      width: 24px;
      height: 24px;
      color: var(--m3c-on-secondary-container);
      position: relative;
    }
  }
  
  .m3-layer {
    position: absolute;
    inset: 0;
    z-index: 9;
    border-radius: var(--m3-shape-full);
    
    &::before,
    &::after {
      transition: all var(--m3-easing-spatial);
    }
  }
  
  :global(.rail.open > .items),
  :global(.rail.icon > .items) {
    .m3-container {
      margin-inline: 20px;
      padding: 16px 16px;
      
      &:focus-visible {
        border-radius: var(--m3-shape-full);
        outline: solid;
        outline-color: var(--m3c-on-secondary-container);
        outline-width: 3px;
        outline-offset: 2px;
      }
      
      &::before {
        border-radius: var(--m3-shape-full);
        width: 100%;
        height: 56px;
      }
      
      &:not(.active) {
        &:hover::before {
          background: color-mix(in oklab, currentColor 8%, transparent);
        }
        
        &:focus-visible,
        &:active {
          &::before {
            background-color: color-mix(in oklab, currentColor 12%, transparent);
          }
        }
      }
    }
    
    span:first-of-type {
      opacity: 1;
    }
    
    span:last-of-type {
      opacity: 0;
    }
    
    .icon {
      width: 24px;
      height: 24px;
    }
  }

  :global(.rail:not(.open):not(.icon) > .items) {
    .m3-container {
      margin-inline-end: auto;
      margin-inline-start: 20px;
      width: calc(100% - 40px);
      
      &:focus-visible .icon {
        outline: solid;
        outline-color: var(--m3c-on-secondary-container);
        outline-width: 3px;
        outline-offset: 2px;
      }
      
      &:not(.active) {
        &:hover::before {
          background: color-mix(in oklab, currentColor 8%, transparent);
        }
        
        &:focus-visible,
        &:active {
          .icon {
            background-color: color-mix(in oklab, currentColor 12%, transparent);
          }
        }
      }
    }
    
    .m3-layer::before,
    .m3-layer::after,
    .m3-layer :global(svg) {
      width: 56px !important;
      height: 32px !important;
    }
    
    .icon {
      border-radius: var(--m3-shape-full);
      padding: 0px 16px;
      
      > :global(svg) {
        margin: 4px 0px;
      }
    }
    
    .active > .icon {
      color: var(--m3c-secondary);
    }
  }
  
  :global(.rail.icon:not(.open) > .items) {
    .m3-container {
      width: 56px;
    }
    
    span:first-of-type {
      opacity: 0;
    }
  }
</style>
