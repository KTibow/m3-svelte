<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { TransitionConfig } from "svelte/transition";
  import iconCalendar from "@ktibow/iconset-material-symbols/calendar-today-outline";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  import DatePickerDocked from "$lib/forms/DatePickerDocked.svelte";
  import { easeEmphasized } from "$lib/misc/easing";

  let {
    label,
    value = $bindable(),
    required = false,
    disabled = false,
    error = false,
    datePickerTitle = "Pick date",
    ...extra
  }: {
    label: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    datePickerTitle?: string;
  } & HTMLInputAttributes = $props();

  const id = $props.id();
  let hasJs = $state(false);
  onMount(() => {
    hasJs = true;
  });

  let picker = $state(false);
  const clickOutside = (container: Node) => {
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
  const enterExit = (_: Node): TransitionConfig => {
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

<div class="m3-container" class:has-js={hasJs} class:disabled class:error use:clickOutside>
  <input
    type="date"
    class="focus-none m3-font-body-large"
    {disabled}
    {required}
    {id}
    bind:value
    {...extra}
    defaultValue={extra.defaultValue}
  />
  <!-- TODO: once https://github.com/sveltejs/svelte/pull/16481 is finished, remove the defaultvalue thing -->
  <div class="layer"></div>
  <label class="m3-font-body-small" for={id}>{label}</label>
  <button type="button" {disabled} title={datePickerTitle} onclick={() => (picker = !picker)}>
    <Layer />
    <Icon icon={iconCalendar} width="1.5rem" height="1.5rem" />
  </button>
  {#if picker}
    <div class="picker" transition:enterExit>
      <DatePickerDocked
        date={value}
        clearable={!required}
        close={() => (picker = false)}
        setDate={(d) => (value = d)}
      />
    </div>
  {/if}
</div>

<style>
  /*
  want to customize the label's background?
  do this: <DateFieldOutlined --m3-util-background="rgb(var(--m3-scheme-surface-container))" />
  */
  :root {
    --m3-datefield-outlined-shape: var(--m3-util-rounding-extra-small);
  }
  .m3-container {
    display: inline-flex;
    position: relative;
    height: 3.5rem;
    min-width: 15rem;
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1rem;
    border-radius: var(--m3-datefield-outlined-shape);
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));
  }
  label {
    position: absolute;
    left: 0.75rem;
    top: calc(var(--m3-font-body-small-height, 1rem) * -0.5);
    color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    background-color: var(--m3-util-background, rgb(var(--m3-scheme-surface)));
    padding: 0 0.25rem;
    &:is(input:hover ~ label) {
      color: rgb(var(--error, var(--m3-scheme-on-surface)));
    }
    &:is(input:focus ~ label) {
      color: rgb(var(--error, var(--m3-scheme-primary)));
    }
    &:is(input:disabled ~ label) {
      color: rgb(var(--m3-scheme-on-surface) / 0.38);
    }
    pointer-events: none;
    transition: color 100ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    border: 1px solid rgb(var(--error, var(--m3-scheme-outline)));
    border-radius: var(--m3-datefield-outlined-shape);
    pointer-events: none;
    transition: all 100ms;
    &:is(input:hover ~ .layer) {
      border-color: rgb(var(--error, var(--m3-scheme-on-surface)));
    }
    &:is(input:focus ~ .layer) {
      border-color: rgb(var(--error, var(--m3-scheme-primary)));
      border-width: 0.125rem;
    }
    &:is(input:disabled ~ .layer) {
      border-color: rgb(var(--m3-scheme-on-surface) / 0.38);
    }
  }

  button {
    display: none;
    position: absolute;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 100%;
    right: 0;

    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface-variant));
    border-top-right-radius: var(--m3-datefield-outlined-shape);

    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  input {
    padding-left: 0.875rem;
  }
  @supports (-moz-appearance: none) {
    input {
      padding-left: 0.75rem;
    }
  }

  @media (hover: hover) {
    button:hover {
      background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.08);
    }
  }
  button:focus-visible,
  button:active {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.12);
  }

  .error {
    --error: var(--m3-scheme-error);
  }
  .error > input:hover ~ label,
  .error > input:hover ~ .layer {
    --error: var(--m3-scheme-on-error-container);
  }

  .m3-container.disabled {
    opacity: 0.38;
  }
  input:disabled {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  button:disabled {
    color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
    cursor: auto;
  }

  .picker {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1;
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
