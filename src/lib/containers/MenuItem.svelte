<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  let {
    icon,
    disabled = false,
    onclick,
    children,
  }: {
    icon?: IconifyIcon | "space" | undefined;
    disabled?: boolean;
    onclick: () => void;
    children: Snippet;
  } = $props();
</script>

<button type="button" class="item m3-font-label-large" {disabled} {onclick}>
  <Layer />
  {#if icon == "space"}
    <span class="icon"></span>
  {:else if icon}
    <span class="icon">
      <Icon {icon} />
    </span>
  {/if}
  {@render children()}
</button>

<style>
  .item {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 0.75rem;
    white-space: nowrap;

    border: none;
    position: relative;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));

    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
  }
  .icon > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
  }

  .item:disabled {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: auto;
  }
  .item:disabled > .icon > :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
</style>
