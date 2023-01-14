<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import iconCalendar from "@iconify-icons/ic/outline-calendar-today";
  export let name: string;
  export let value = "";
  export let supportingText: null | string = null;
  export let clearable = false;
  export let dateValidator: (date: string) => boolean;
  export let clickAction: "disable" | "default" | "auto" = "auto";
  export let showPicker: "disable" | "enable" | "auto" = "auto";
  const dispatch = createEventDispatcher();
  let focused: boolean;
  let windowWidth: number, windowHeight: number;
  $: portrait = windowHeight > windowWidth;
  $: if (dateValidator(value)) value = "";
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />
<div class="m3-container">
  <input
    type="date"
    required={!clearable || showPicker == "enable" || (showPicker == "auto" && !portrait)}
    class:value
    bind:value
    on:focus={() => (focused = true)}
    on:blur={() => (focused = false)}
    on:click={(e) => {
      if (clickAction == "disable" || (clickAction == "auto" && !portrait)) e.preventDefault();
    }}
  />
  {#if showPicker == "enable" || (showPicker == "auto" && !portrait)}
    <button class="showPicker" on:click={() => dispatch("showPicker")}>
      <Icon icon={iconCalendar} />
    </button>
  {/if}
  <fieldset>
    <legend class="md-body-small">{name}</legend>
  </fieldset>
</div>
{#if supportingText}
  <p class="supporting md-body-small">{supportingText}</p>
{/if}

<style>
  .m3-container {
    min-width: 15rem;
    height: 3.5rem;
    position: relative;
    border-radius: 0.25rem;
  }
  fieldset {
    position: absolute;
    left: 0;
    right: 0;
    top: -0.5rem;
    bottom: 0;
    pointer-events: none;
    transition: all 150ms;
    margin: 0;
    padding: 0 15px;
    color: rgb(var(--md-sys-color-outline));
    border: solid 1px currentColor;
    border-radius: inherit;
  }
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: rgb(var(--md-sys-color-on-surface));
    outline: none;
    padding: 0 1rem;
  }
  input::-webkit-calendar-picker-indicator {
    display: none;
  }
  .showPicker {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translate(0, -50%);
    height: 2.75rem;
    width: 2.75rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0;
    border-radius: 3rem;
    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface-variant));
    cursor: pointer;
    transition: all 150ms;
  }
  .showPicker :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .supporting {
    color: rgb(var(--md-sys-color-on-surface-variant));
    margin: 0.25rem 0 0 1rem;
  }

  .m3-container:hover > fieldset {
    color: rgb(var(--md-sys-color-on-surface));
  }
  input:is(:focus, .value) ~ fieldset {
    border-width: 2px;
    padding: 0 14px;
  }
  .m3-container:focus-within > fieldset {
    color: rgb(var(--md-sys-color-primary));
  }
  .showPicker:hover {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.08);
  }
  .showPicker:focus-visible,
  .showPicker:active {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.12);
  }
</style>
