<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon, { type IconifyIcon } from "@iconify/svelte";

  export let display = "flex";
  export let style: "primary" | "secondary";
  export let items: {
    primaryIcon?: IconifyIcon;
    name: string;
  }[];
  export let activeItem: number;
  const dispatch = createEventDispatcher();
</script>

<div class="m3-container {style}" style="display: {display};">
  {#each items as item, i}
    <button class="item" class:icon={item.primaryIcon} class:active={i == activeItem}>
      <div class="layer" />
      {#if item.primaryIcon}
        <Icon icon={item.primaryIcon} />
      {/if}
      <span class="md-title-small">{item.name}</span>
    </button>
  {/each}
  <div
    class="indicatorSpace"
    style="left: {(100 / items.length) * activeItem}%; width: {100 / items.length}%;"
  >
    <div class="indicator" />
  </div>
</div>

<style>
  .m3-container {
    position: relative;
    border-bottom: 1px solid rgb(var(--md-sys-color-surface-variant));
  }
  .item {
    min-width: 5rem;
    height: 3rem;
    flex: 1 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    background-color: rgb(var(--md-sys-color-surface));
    --text: var(--md-sys-color-on-surface-variant);
    color: rgb(var(--text));
    border: none;
    padding: 0 1rem;
    cursor: pointer;
    transition: all 150ms;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
  }
  .item.icon {
    height: 4rem;
  }
  .item :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .item:hover {
    --text: var(--md-sys-color-on-surface);
  }
  .item:hover > .layer {
    background-color: rgb(var(--text) / 0.08);
  }
  .item:focus-visible > .layer,
  .item:active > .layer {
    background-color: rgb(var(--text) / 0.12);
  }
  .item.active {
    --text: var(--md-sys-color-primary);
  }
  .secondary > .item {
    --text: var(--md-sys-color-on-surface);
    color: rgb(var(--md-sys-color-on-surface-variant));
  }
  .secondary > .item.active {
    color: rgb(var(--text));
  }

  .indicatorSpace {
    position: absolute;
    bottom: 0;
  }
  .primary .indicator {
    margin: auto;
    width: 3rem;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background-color: rgb(var(--md-sys-color-primary));
  }
  .secondary .indicator {
    width: 100%;
    height: 2px;
    background-color: rgb(var(--md-sys-color-primary));
  }
</style>
