<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  export let display = "inline-flex";
  export let elevated = false;
  export let selected = false;
  export let disabled = false;
  export let icon: IconifyIcon | null = null;
  export let trailingIcon: IconifyIcon | null = null;
  export let text: string;
  /**
   * | name       | use              | example                       | phrasing           |
   * |------------|------------------|-------------------------------|--------------------|
   * | assist     | smart actions    | like add to calendar          | start with a verb  |
   * | filter     | selection        | like in a search page         | category           |
   * | input      | information item | like a person in the to field | user-entered thing |
   * | suggestion | smart actions    | like a chat response          | query/message      |
   */
  export let type: "assist" | "filter" | "input" | "suggestion";
  const dispatch = createEventDispatcher();
</script>

<button
  class="container type-{type}"
  class:elevated
  class:selected
  class:has-icon={icon}
  class:has-trailing-icon={trailingIcon}
  {disabled}
  style="display: {display};"
  on:click
  {...$$props}
>
  <div class="layer" />
  {#if icon}
    <Icon {icon} />
  {/if}
  <span class="md-label-large">{text}</span>
  {#if trailingIcon}
    <Button type="text" on:click={() => dispatch("trailing")}>
      <Icon icon={trailingIcon} />
    </Button>
  {/if}
</button>

<style>
  .container {
    height: 2rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: transparent;
    border: solid 1px rgb(var(--md-sys-color-outline));
    --text-color: var(--md-sys-color-on-surface-variant);
    color: rgb(var(--text-color));
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
  .elevated {
    border: none;
    box-shadow: var(--md-sys-elevation-1);
  }
  .has-icon {
    padding-left: 0;
  }
  .has-trailing-icon {
    padding-right: 0;
  }
  .container > :global(svg) {
    margin: 0 0.5rem;
    width: 1.125rem;
    height: 1.125rem;
  }
  .container:enabled > :global(svg) {
    color: rgb(var(--md-sys-color-primary));
  }
  .container:disabled {
    border-color: rgb(var(--md-sys-color-on-surface) / 0.12);
    color: rgb(var(--md-sys-color-on-surface) / 0.38);
    box-shadow: none;
    cursor: auto;
  }
  .selected:disabled,
  .elevated:disabled {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }

  .container:enabled:hover .layer {
    background-color: rgb(var(--text-color) / 0.08);
  }
  .elevated:enabled:hover {
    box-shadow: var(--md-sys-elevation-2);
  }
  .container:enabled:focus-visible .layer {
    background-color: rgb(var(--text-color) / 0.12);
  }
  .elevated:enabled:focus-visible {
    border-color: rgb(var(--text-color));
  }
  .type-assist {
    --text-color: var(--md-sys-color-on-surface);
  }
  .selected {
    background-color: rgb(var(--md-sys-color-secondary-container));
    --text-color: var(--md-sys-color-on-secondary-container);
    border: none;
  }
</style>
