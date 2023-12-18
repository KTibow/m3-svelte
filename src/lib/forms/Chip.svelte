<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";

  export let display = "inline-flex";
  export let extraOptions: HTMLButtonAttributes = {};
  /**
   * general is filter/suggestion since they're the same.
   * | name       | use              | example                       | phrasing           |
   * |------------|------------------|-------------------------------|--------------------|
   * | input      | information item | like a person in the to field | user-entered thing |
   * | assist     | smart actions    | like add to calendar          | start with a verb  |
   * | filter     | selection        | like in a search page         | category           |
   * | suggestion | smart actions    | like a chat response          | query/message      |
   */
  export let type: "input" | "assist" | "general";
  export let icon: IconifyIcon | null = null;
  export let trailingIcon: IconifyIcon | null = null;
  export let elevated = false;
  export let disabled = false;
  export let selected = false;
</script>

<button
  class="m3-container type-{type}"
  style="display: {display}"
  class:elevated
  class:selected
  {disabled}
  on:click
  {...extraOptions}
>
  <div class="layer" />
  {#if icon}
    <Icon {icon} class="leading" />
  {/if}
  <span class="m3-font-label-large"><slot /></span>
  {#if trailingIcon}
    <Icon icon={trailingIcon} class="trailing" />
  {/if}
</button>

<style>
  :root {
    --m3-chip-shape: var(--m3-util-rounding-small);
  }
  .m3-container {
    height: 2rem;
    border-radius: var(--m3-chip-shape);
    padding: 0 1rem;
    gap: 0.5rem;
    align-items: center;

    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface-variant));
    border: solid 0.0625rem rgb(var(--m3-scheme-outline));
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: all 200ms;
  }
  .layer {
    position: absolute;
    inset: -0.0625rem;
    border-radius: var(--m3-chip-shape);
    transition: all 200ms;
  }

  .m3-container > :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }
  .m3-container:enabled:not(.type-input):not(.selected) > :global(.leading) {
    color: rgb(var(--m3-scheme-primary));
  }
  .m3-container > :global(.leading) {
    margin-left: -0.5rem;
  }
  .m3-container > :global(.trailing) {
    margin-right: -0.5rem;
  }
  .type-input > :global(.leading) {
    margin-left: -0.25rem;
  }
  .type-input > :global(.trailing) {
    margin-right: -0.25rem;
  }

  .type-assist {
    color: rgb(var(--m3-scheme-on-surface));
  }
  .type-input {
    padding: 0 0.75rem;
  }
  .elevated {
    border-color: transparent;
    background-color: rgb(var(--m3-scheme-surface-container-low));
    box-shadow: var(--m3-util-elevation-1);
  }
  .selected {
    border-color: transparent;
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
  }

  .layer {
    background-color: currentColor;
    opacity: 0;
  }
  @media (hover: hover) {
    .selected:hover:enabled {
      box-shadow: var(--m3-util-elevation-1);
    }
    .elevated:hover:enabled {
      box-shadow: var(--m3-util-elevation-2);
    }
    .m3-container:hover:enabled > .layer {
      opacity: 0.08;
    }
  }
  .m3-container:focus-visible:enabled > .layer {
    opacity: 0.08;
  }
  .m3-container:active:enabled > .layer {
    opacity: 0.12;
  }

  .m3-container:disabled {
    cursor: auto;
    box-shadow: none;
    border-color: rgb(var(--m3-scheme-on-surface) / 0.12);
    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  .selected:disabled,
  .elevated:disabled {
    border-color: transparent;
  }
  .selected:disabled,
  .elevated:disabled {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .selected {
      background-color: selecteditem !important;
    }
    .m3-container.disabled {
      opacity: 0.38;
    }
  }
</style>
