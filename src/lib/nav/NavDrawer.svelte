<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon, { type IconifyIcon } from "@iconify/svelte";

  export let display = "flex";
  export let destinations: { selected: boolean; icon: IconifyIcon; label: string }[];
  const dispatch = createEventDispatcher();
</script>

<div class="container" style="display: {display};">
  {#each destinations as destination}
    <button
      class="destination"
      class:selected={destination.selected}
      on:click={(event) => dispatch("chosen", { name: "item", data: destination, event })}
    >
      <div class="layer" />
      <Icon icon={destination.icon} />
      <span class="md-label-large">{destination.label}</span>
    </button>
  {/each}
</div>

<style>
  .container {
    flex-direction: column;
    width: 22.5rem;
    padding: 1rem 0.75rem 0 0.75rem;
    background-color: rgb(var(--md-sys-color-surface));
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
  }
  .container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .destination {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 3.5rem;
    padding: 0 1.5rem 0 1rem;
    overflow: hidden;
    position: relative;
    border: none;
    border-radius: 1.75rem;
    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface-variant));
    cursor: pointer;
  }
  .destination.selected {
    background-color: rgb(var(--md-sys-color-secondary-container));
    color: rgb(var(--md-sys-color-on-secondary-container));
  }
  .destination:hover .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .destination.selected:hover .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container) / 0.08);
  }
  .destination:focus .layer,
  .destination:active .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  .destination.selected:focus .layer,
  .destination.selected:active .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container) / 0.12);
  }
</style>