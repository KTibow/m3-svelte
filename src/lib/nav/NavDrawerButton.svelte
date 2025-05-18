<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  let {
    selected,
    icon,
    children,
    click,
    ...extra
  }: {
    selected: boolean;
    icon: IconifyIcon;
    children: Snippet;
    click: () => void;
  } & HTMLButtonAttributes = $props();
</script>

<button class="destination" disabled={selected} onclick={click} {...extra}>
  <Layer />
  <Icon {icon} />
  <span class="m3-font-label-large">{@render children()}</span>
</button>

<style>
  .destination {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;

    height: 3.5rem;
    border: none;
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

  .destination:disabled {
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
    cursor: auto;
  }

  .destination {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .destination:disabled {
      background-color: selecteditem;
    }
  }
</style>
