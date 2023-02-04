<script lang="ts">
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  /**
   * | name       | use              | example                       | phrasing           |
   * |------------|------------------|-------------------------------|--------------------|
   * | assist     | smart actions    | like add to calendar          | start with a verb  |
   * | filter     | selection        | like in a search page         | category           |
   * | input      | information item | like a person in the to field | user-entered thing |
   * | suggestion | smart actions    | like a chat response          | query/message      |
   */
  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraButtonOptions: HTMLButtonAttributes = {};
  export let type: "assist" | "filter" | "input" | "suggestion";
  export let icon: IconifyIcon | null = null;
  export let trailingIcon: IconifyIcon | null = null;
  export let elevated = false;
  export let disabled = false;
  export let selected = false;
  /**
   * if this is false then the border will be transparent instead of gone, which may look weird with elevated
   * i *could* use a different method for the border or for the background to make it consistent but idk
   * as always, prs are welcome */
  export let inconsistentWidthOk = elevated;
</script>

<div
  class="m3-container type-{type}"
  class:elevated
  class:disabled
  class:selected
  class:fully-remove-border={inconsistentWidthOk}
  style="display: {display}"
  {...extraWrapperOptions}
>
  <div class="layer tonal" />
  <button
    class="content"
    {disabled}
    class:icon
    class:trailing-pad={trailingIcon}
    on:click
    {...extraButtonOptions}
  >
    <div class="layer state" />
    {#if icon}
      <Icon {icon} />
    {/if}
    <span class="m3-font-label-large"><slot /></span>
  </button>
  {#if trailingIcon}
    <button class="trailing" {disabled}>
      <div class="layer state" />
      <Icon icon={trailingIcon} />
    </button>
  {/if}
</div>

<style>
  .m3-container {
    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface-variant));
    height: 2rem;
    border-radius: 0.5rem;
    position: relative;
    overflow: hidden;
    border: solid 1px rgb(var(--m3-scheme-outline));
    transition: all 200ms;
  }
  button {
    display: inline-flex;
    align-items: center;
    position: relative;
    background-color: transparent;
    color: inherit;
    border: none;
    cursor: pointer;
  }
  .content {
    padding: 0 1rem;
    gap: 0.5rem;
  }
  .m3-container :global(svg) {
    width: 18px;
    height: 18px;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: all 200ms;
  }

  .type-assist {
    color: rgb(var(--m3-scheme-on-surface));
  }
  .type-assist:not(.disabled) :global(svg) {
    color: rgb(var(--m3-scheme-primary));
  }
  .type-input .content {
    padding: 0 0.75rem;
  }

  .elevated {
    border-color: transparent;
    box-shadow: var(--m3-util-elevation-1);
  }
  .fully-remove-border.elevated {
    border-width: 0;
  }
  .elevated:not(.selected) .layer.tonal {
    opacity: 0.05;
    background-color: rgb(var(--m3-scheme-primary));
  }
  .selected {
    border-color: transparent;
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
  }
  .fully-remove-border.selected {
    border-width: 0;
  }

  .selected:hover:not(.disabled) {
    box-shadow: var(--m3-util-elevation-1);
  }
  .elevated:hover:not(.disabled) {
    box-shadow: var(--m3-util-elevation-2);
  }
  button:is(:hover, :focus-visible):enabled > .layer.state {
    background-color: currentColor;
    opacity: 0.08;
  }
  button:active:enabled > .layer.state {
    background-color: currentColor;
    opacity: 0.12;
  }
  button:disabled {
    cursor: auto;
  }
  .m3-container.disabled {
    box-shadow: none;
    border-color: rgb(var(--m3-scheme-on-surface) / 0.12);
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  :is(.elevated, .selected).disabled .layer.tonal {
    opacity: 0.12;
    background-color: rgb(var(--m3-scheme-on-surface));
  }
  .selected.disabled {
    background-color: rgb(var(--m3-scheme-surface));
  }

  .content.icon {
    padding-left: 0.5rem;
  }
  .content.trailing-pad {
    padding-right: 0;
  }
  .trailing {
    padding: 0 0.5rem;
  }
</style>
