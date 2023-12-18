<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLButtonAttributes } from "svelte/elements";

  export let selected: boolean;
  export let extraOptions: HTMLButtonAttributes = {};
  export let icon: IconifyIcon;
</script>

<button class="destination" class:selected on:click {...extraOptions}>
  <div class="layer" />
  <Icon {icon} />
  <span class="m3-font-label-large"><slot /></span>
</button>

<style>
  .destination {
    height: 3.5rem;
    border: none;
    border-radius: 1.75rem;
    padding: 0 1.5rem 0 1rem;

    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    overflow: hidden;

    background-color: transparent;
    --text: var(--m3-scheme-on-surface-variant);
    color: rgb(var(--text));
    transition: background-color 300ms;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  .layer {
    position: absolute;
    inset: 0;
    transition: all 200ms;
  }
  .destination :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (hover: hover) {
    .destination:hover {
      --text: var(--m3-scheme-on-surface);
    }
    .destination:hover .layer {
      background-color: rgb(var(--text) / 0.08);
    }
  }
  .destination:focus-visible .layer,
  .destination:active .layer {
    background-color: rgb(var(--text) / 0.12);
  }

  .destination.selected {
    background-color: rgb(var(--m3-scheme-secondary-container));
    --text: var(--m3-scheme-on-secondary-container);
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
