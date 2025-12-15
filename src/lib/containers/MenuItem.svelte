<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/Icon.svelte";
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

<button type="button" class="item focus-inset" role="menuitem" {disabled} {onclick}>
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
    @apply --m3-label-large;
    display: flex;
    align-items: center;
    height: --m3-density(3rem);
    padding: 0 0.75rem;
    gap: 0.75rem;
    white-space: nowrap;

    border: none;
    position: relative;
    background-color: transparent;
    color: var(--m3c-on-surface);

    cursor: pointer;
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
  .icon > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--m3c-on-surface-variant);
  }

  .item:disabled {
    color: --translucent(var(--m3c-on-surface), 0.38);
    cursor: auto;
  }
  .item:disabled > .icon > :global(svg) {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
</style>
