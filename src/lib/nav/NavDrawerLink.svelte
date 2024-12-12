<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLAnchorAttributes } from "svelte/elements";

  export let href: string;
  export let selected: boolean;
  export let extraOptions: HTMLAnchorAttributes = {};
  export let icon: IconifyIcon;
</script>

<a {href} class="destination" class:selected {...extraOptions}>
  <Layer />
  <Icon {icon} />
  <span class="m3-font-label-large"><slot /></span>
</a>

<style>
  .destination {
    height: 3.5rem;
    border-radius: 1.75rem;
    padding: 0 1.5rem 0 1rem;

    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;

    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface-variant));
    transition: background-color 300ms;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  .destination :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (hover: hover) {
    .destination:hover {
      color: rgb(var(--m3-scheme-on-surface));
    }
  }

  .destination.selected {
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
  }

  .destination {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .destination.selected {
      background-color: selecteditem;
    }
  }
</style>
