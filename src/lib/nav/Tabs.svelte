<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";

  export let display = "flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let style: "primary" | "secondary";
  export let items: {
    primaryIcon?: IconifyIcon;
    name: string;
  }[];
  export let activeItem: number;
  const name = crypto.randomUUID();
</script>

<div class="m3-container {style}" style="display: {display};" {...extraWrapperOptions}>
  {#each items as item, i}
    {@const id = crypto.randomUUID()}
    <input type="radio" {name} {id} value={i} bind:group={activeItem} {...extraInputOptions} />
    <label class="item" class:icon={item.primaryIcon} for={id}>
      <div class="layer" />
      {#if item.primaryIcon}
        <Icon icon={item.primaryIcon} />
      {/if}
      <span class="m3-font-title-small">{item.name}</span>
    </label>
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
    border-bottom: 1px solid rgb(var(--m3-scheme-surface-variant));
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
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
    background-color: rgb(var(--m3-scheme-surface));
    --text: var(--m3-scheme-on-surface-variant);
    color: rgb(var(--text));
    border: none;
    padding: 0 1rem;
    cursor: pointer;
    transition: all 200ms;
    -webkit-tap-highlight-color: transparent;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 200ms;
  }
  .item.icon {
    height: 4rem;
  }
  .item :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  input:focus-visible + .item {
    --text: var(--m3-scheme-on-surface);
  }
  @media (hover: hover) {
    .item:hover {
      --text: var(--m3-scheme-on-surface);
    }
    .item:hover > .layer {
      background-color: rgb(var(--text) / 0.08);
    }
  }
  input:focus-visible + .item > .layer,
  .item:active > .layer {
    background-color: rgb(var(--text) / 0.12);
  }
  input:checked + .item {
    --text: var(--m3-scheme-primary);
  }
  .secondary > .item {
    --text: var(--m3-scheme-on-surface);
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .secondary > input:checked + .item {
    color: rgb(var(--text));
  }

  .indicatorSpace {
    position: absolute;
    bottom: 0;
    transition: all 200ms;
  }
  .primary .indicator {
    margin: auto;
    width: 3rem;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background-color: rgb(var(--m3-scheme-primary));
  }
  .secondary .indicator {
    width: 100%;
    height: 2px;
    background-color: rgb(var(--m3-scheme-primary));
  }
</style>
