<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  export let display = "inline-flex";
  /**
   * | name       | use              | example                       | phrasing           |
   * |------------|------------------|-------------------------------|--------------------|
   * | assist     | smart actions    | like add to calendar          | start with a verb  |
   * | filter     | selection        | like in a search page         | category           |
   * | input      | information item | like a person in the to field | user-entered thing |
   * | suggestion | smart actions    | like a chat response          | query/message      |
   *
   * note that the only difference this makes is when you specify assist
   * anyway try to use the right type for stuff and dont set stuff
   * on types that shouldn't support them (eg selected on assist)
   */
  export let type: "assist" | "filter" | "input" | "suggestion";
  export let icon: IconifyIcon | null = null;
  export let trailingIcon: IconifyIcon | null = null;
  export let selected = false;
  export let elevated = false;
  export let disabled = false;
  const dispatch = createEventDispatcher();
</script>

<button
  class="m3-container type-{type}"
  class:selected
  class:elevated
  class:icon-left={icon}
  class:icon-right={trailingIcon}
  {disabled}
  style="display: {display};"
  on:click
  {...$$props}
>
  <div class="layer tonal" />
  <div class="layer state" />
  {#if icon}
    <Icon {icon} />
  {/if}
  <span class="md-label-large"><slot /></span>
  {#if trailingIcon}
    <Button
      type="text"
      iconType="full"
      on:click={() => dispatch("trailingClicked")}
      extraOptions={{ style: "display: inline-flex; color: var(--text-for-icon) !important;" }}
    >
      <Icon icon={trailingIcon} />
    </Button>
  {/if}
</button>

<style>
  .m3-container {
    height: 2rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    align-items: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;

    background-color: transparent;
    --text: var(--md-sys-color-on-surface-variant);
    border: solid 1px rgb(var(--md-sys-color-outline));
    color: rgb(var(--text));
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
  .m3-container > :global(svg) {
    margin: 0 0.5rem;
    width: 1.125rem;
    height: 1.125rem;
  }
  .icon-left {
    padding-left: 0;
  }
  .icon-right {
    padding-right: 0;
    --text-for-icon: var(--md-sys-color-on-surface-variant);
  }

  .elevated {
    border: none;
    box-shadow: var(--md-sys-elevation-1);
    background-color: rgb(var(--md-sys-color-surface));
  }
  .elevated > .layer.tonal {
    background-color: rgb(var(--md-sys-color-primary) / 0.05);
  }
  .selected {
    border-color: transparent;
    background-color: rgb(var(--md-sys-color-secondary-container));
    --text: var(--md-sys-color-on-secondary-container);
  }
  .selected > .layer.tonal {
    background-color: transparent;
  }
  .type-assist {
    --text: var(--md-sys-color-on-surface);
  }
  .type-assist > :global(svg) {
    color: rgb(var(--md-sys-color-primary));
  }
  :disabled {
    border-color: rgb(var(--md-sys-color-on-surface) / 0.12);
    color: rgb(var(--md-sys-color-on-surface) / 0.38);
    box-shadow: none;
    cursor: auto;
  }
  .selected:disabled,
  .elevated:disabled {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  :disabled > .layer {
    display: none;
  }

  .m3-container:enabled:hover > .layer.state {
    background-color: rgb(var(--text) / 0.08);
  }
  .elevated:enabled:hover {
    box-shadow: var(--md-sys-elevation-2);
  }
  .m3-container:enabled:focus-visible > .layer.state {
    background-color: rgb(var(--text) / 0.12);
  }
</style>
