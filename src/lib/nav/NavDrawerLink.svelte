<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  let {
    selected,
    icon,
    children,
    href,
    ...extra
  }: {
    selected: boolean;
    icon: IconifyIcon;
    children: Snippet;
    href: string;
  } & HTMLAnchorAttributes = $props();
</script>

<a {href} class="destination" class:selected {...extra}>
  <Layer />
  <Icon {icon} />
  <span class="m3-font-label-large">{@render children?.()}</span>
</a>

<style>
  .destination {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;

    height: 3.5rem;
    border-radius: 1.75rem;
    padding: 0 1.5rem 0 1rem;

    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface-variant));
    transition: all 300ms;
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
