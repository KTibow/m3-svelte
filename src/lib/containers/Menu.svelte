<script lang="ts">
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  interface Item {
    icon?: IconifyIcon | "space";
    label: string;
  }
  export let display = "flex";
  export let items: Item[];
  const dispatch = createEventDispatcher();
</script>

<div class="m3-container" style="display: {display};">
  <div class="layer" />
  {#each items as item}
    <button class="item m3-font-label-large" on:click={() => dispatch("chosen", item)}>
      {#if item.icon == "space"}
        <span class="icon" />
      {:else if item.icon}
        <span class="icon">
          <Icon icon={item.icon} />
        </span>
      {/if}
      {item.label}
    </button>
  {/each}
</div>

<style>
  .m3-container {
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface));
    padding: 0.5rem 0;
    border-radius: 0.25rem;
    min-width: 7rem;
    max-width: 17.5rem;
    box-shadow: var(--m3-util-elevation-2);
    position: relative;
    overflow: hidden;
    z-index: 2;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(var(--m3-scheme-primary) / 0.05);
    pointer-events: none;
  }
  .item {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 0.75rem;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));
    transition: all 200ms;
    border: none;
    cursor: pointer;
  }
  @media (hover: hover) {
    .item:hover {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
    }
  }
  .item:active,
  .item:focus-visible {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  .icon,
  .icon > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .icon {
    margin-right: 0.75rem;
  }
</style>
