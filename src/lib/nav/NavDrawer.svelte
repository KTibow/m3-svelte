<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";

  export let display = "flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraButtonOptions: HTMLButtonAttributes = {};
  export let destinations: { selected: boolean; icon: IconifyIcon; label: string }[];
  const dispatch = createEventDispatcher();
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  {#each destinations as destination}
    <button
      class="destination"
      class:selected={destination.selected}
      on:click={(event) => dispatch("chosen", { name: "item", data: destination, event })}
      {...extraButtonOptions}
    >
      <div class="layer" />
      <Icon icon={destination.icon} />
      <span class="m3-font-label-large">{destination.label}</span>
    </button>
  {/each}
</div>

<style>
  .m3-container {
    flex-direction: column;
    width: 22.5rem;
    padding: 1rem 0.75rem 0 0.75rem;
    background-color: rgb(var(--m3-scheme-surface));
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 200ms;
  }
  .m3-container :global(svg) {
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
    --text: var(--m3-scheme-on-surface-variant);
    color: rgb(var(--text));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .destination.selected {
    background-color: rgb(var(--m3-scheme-secondary-container));
    --text: var(--m3-scheme-on-secondary-container);
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
</style>
