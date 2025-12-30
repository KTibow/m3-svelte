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
    transition:
      width var(--m3-easing-fast),
      border var(--m3-easing-slow);
    max-width: fit-content;
    height: 56px;
    margin-block: 0;

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

    span {
      z-index: 1;
      width: 100%;
      text-align: center;
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
  
  .m3-layer {
    position: absolute;
    inset: 0;
    z-index: 9;
    border-radius: var(--m3-shape-full);
  }
  
  :global(.rail.open > .items) {
    .m3-container {
      @apply --m3-label-large;
      flex-direction: row;
      align-items: center;
      justify-content: start;
      margin-inline: 20px;
      gap: 12px;
      padding: 0px 16px;
      height: 56px;
      transition:
        width var(--m3-easing-spatial),
        opacity var(--m3-easing-fast);
      
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
    
    .icon {
      width: 24px;
      height: 24px;
    }
  }

  :global(.rail:not(.open) > .items) {
    .m3-container {
      @apply --m3-label-medium;
      border-radius: var(--m3-shape-full);
      margin-inline-end: auto;
      margin-inline-start: 20px;
      width: calc(100% - 40px);
      text-align: center;
      
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
      
      .m3-layer::before,
      .m3-layer::after,
      .m3-layer :global(svg) {
        width: 56px !important;
        height: 32px !important;
      }
    }
    
    .icon {
      border-radius: var(--m3-shape-full);
      padding: 0px 16px;
      height: 32px;
      
      > :global(svg) {
        margin: 4px 0px;
      }
    }
    
    .active > .icon {
      color: var(--m3c-secondary);
    }
  }
</style>
