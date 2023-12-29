<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { TransitionConfig } from "svelte/transition";
  import Icon from "$lib/misc/_icon.svelte";
  import iconCalendar from "@ktibow/iconset-material-symbols/calendar-today-outline";

  import DatePickerDocked from "$lib/forms/DatePickerDocked.svelte";
  import { easeEmphasized } from "$lib/misc/easing";

  export let name: string;
  export let date = "";
  export let required = false;
  export let disabled = false;
  export let extraOptions: HTMLInputAttributes = {};

  const id = crypto.randomUUID();
  let hasJs = false;
  onMount(() => {
    hasJs = true;
  });

  let picker = false;
  let container: HTMLDivElement;
  const clickOutside = (_node: Node) => {
    const handleClick = (event: Event) => {
      if (!container.contains(event.target as Node)) {
        picker = false;
      }
    };
    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  };
  const enterExit = (_node: Node): TransitionConfig => {
    return {
      duration: 400,
      easing: easeEmphasized,
      css: (t, u) => `clip-path: inset(-100% 0 ${u * 100}% 0 round 1rem);
transform-origin: top;
transform: scaleY(${(t * 0.3 + 0.7) * 100}%);
opacity: ${Math.min(t * 3, 1)};`,
    };
  };
</script>

<div class="m3-container" class:has-js={hasJs} class:disabled bind:this={container}>
  <input
    type="date"
    class="m3-font-body-large"
    {disabled}
    {required}
    {id}
    bind:value={date}
    {...extraOptions}
  />
  <label class="m3-font-body-small" for={id}>{name}</label>
  <button type="button" {disabled} on:click={() => (picker = !picker)}>
    <Icon icon={iconCalendar} />
  </button>
  {#if picker}
    <div class="picker" use:clickOutside transition:enterExit>
      <DatePickerDocked
        clearable={!required}
        bind:date
        on:close={() => (picker = false)}
        on:setDate={(e) => (date = e.detail)}
      />
    </div>
  {/if}
</div>

<style>
  :root {
    --m3-datefield-shape: var(--m3-util-rounding-extra-small);
  }
  .m3-container {
    position: relative;
    height: 3.5rem;
    min-width: 15rem;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    border-radius: var(--m3-datefield-shape) var(--m3-datefield-shape) 0 0;
    border-bottom: solid 0.0625rem rgb(var(--m3-scheme-on-surface-variant));
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1.5rem 1rem 0.5rem 1rem;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));
  }
  label {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    pointer-events: none;
  }
  input {
    padding-left: 0.875rem;
  }
  @supports (-moz-appearance: none) {
    input {
      padding-left: 0.75rem;
    }
  }

  button {
    display: none;
    position: absolute;
    width: 3.5rem;
    height: 100%;
    right: 0;

    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface-variant));
    border-top-right-radius: var(--m3-datefield-shape);

    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }

  .m3-container.disabled {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.04);
    border-bottom-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled,
  input:disabled + label {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  button:disabled {
    color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
    cursor: auto;
  }

  button > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .picker {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1;
  }

  @media (hover: hover) {
    button:enabled:hover {
      background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.08);
    }
  }
  button:enabled:focus-visible,
  button:enabled:active {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.12);
  }
  @media (min-width: 37.5rem) {
    .has-js button {
      display: flex;
    }
    .has-js input {
      clip-path: inset(0 3.5rem 0 0);
    }
  }
</style>
