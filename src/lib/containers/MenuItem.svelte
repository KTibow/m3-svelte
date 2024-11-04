<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import type { IconifyIcon } from "@iconify/types";

  export let icon: IconifyIcon | "space" | undefined = undefined;
  export let disabled = false;
</script>

<button class="item m3-font-label-large" {disabled} on:click>
  <Layer />
  {#if icon == "space"}
    <span class="icon"></span>
  {:else if icon}
    <span class="icon">
      <Icon {icon} />
    </span>
  {/if}
  <slot />
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
    transition: all 200ms;
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
