<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";

  export let icon: IconifyIcon | "space" | undefined = undefined;
  export let disabled = false;
</script>

<button class="item m3-font-label-large" {disabled} on:click>
  {#if icon == "space"}
    <span class="icon" />
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

  @media (hover: hover) {
    .item:enabled:hover {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
    }
  }
  .item:enabled:active,
  .item:enabled:focus-visible {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  .item:disabled {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: auto;
  }
  .item:disabled > .icon > :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
</style>
