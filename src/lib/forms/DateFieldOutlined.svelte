<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { TransitionConfig } from "svelte/transition";
  import iconCalendar from "@ktibow/iconset-material-symbols/calendar-today-outline";
  import Icon from "$lib/misc/Icon.svelte";
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

<div
  class="m3-container"
  class:has-js={hasJs}
  class:disabled
  class:error
  use:clickOutside
  style:--anchor-name="--{id}"
>
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
  <!-- TODO/deprecated: once https://github.com/sveltejs/svelte/pull/16481 is finished, remove the defaultvalue thing -->
  <div class="layer"></div>
  <label class="m3-font-body-small" for={id}>{label}</label>
  <button type="button" {disabled} title={datePickerTitle} onclick={() => (picker = !picker)}>
    <Layer />
    <Icon icon={iconCalendar} size={24} />
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
  @position-try --picker-bottom-right {
    position-area: bottom center;
    justify-self: end;
    margin-block-start: 1rem;
  }
  @position-try --picker-top-left {
    position-area: top center;
    justify-self: start;
    margin-block-end: 1rem;
  }
  @position-try --picker-top-right {
    position-area: top center;
    justify-self: end;
    margin-block-end: 1rem;
  }

  /*
  want to customize the label's background?
  do this: <DateFieldOutlined --m3-util-background="var(--color-surface-container)" />
  */
  :root {
    --m3-datefield-outlined-shape: var(--m3-util-rounding-extra-small);
  }
  .m3-container {
    display: inline-flex;
    position: relative;
    height: calc(3.5rem + var(--m3-util-density-term));
    min-width: 15rem;
    anchor-name: var(--anchor-name);
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;

    padding: 1rem;
    padding-inline-start: 0.875rem;
    @supports (-moz-appearance: none) {
      padding-inline-start: 0.75rem;
    }

    &:dir(rtl) {
      text-align: right; /* work around chromium bug 41489719 */
    }

    border-radius: var(--m3-datefield-outlined-shape);
    background-color: transparent;
    color: var(--color-on-surface);
  }
  label {
    position: absolute;
    inset-inline-start: 0.75rem;
    top: 0;
    translate: 0 -50%;
    color: var(--error, var(--color-on-surface-variant));
    background-color: var(--m3-util-background, var(--color-surface));
    padding: 0 0.25rem;
    &:is(input:hover ~ label) {
      color: var(--error, var(--color-on-surface));
    }
    &:is(input:focus ~ label) {
      color: var(--error, var(--color-primary));
    }
    &:is(input:disabled ~ label) {
      color: --translucent(var(--color-on-surface), 0.38);
    }
    pointer-events: none;
    transition: color 100ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    border: 1px solid var(--error, var(--color-outline));
    border-radius: var(--m3-datefield-outlined-shape);
    pointer-events: none;
    transition: all 100ms;
    &:is(input:hover ~ .layer) {
      border-color: var(--error, var(--color-on-surface));
    }
    &:is(input:focus ~ .layer) {
      border-color: var(--error, var(--color-primary));
      border-width: 0.125rem;
    }
    &:is(input:disabled ~ .layer) {
      border-color: --translucent(var(--color-on-surface), 0.38);
    }
  }

  button {
    display: none;
    position: absolute;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 100%;
    inset-inline-end: 0;

    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: var(--color-on-surface-variant);
    border-top-right-radius: var(--m3-datefield-outlined-shape);

    cursor: pointer;
  }

  @media (hover: hover) {
    button:hover {
      background-color: --translucent(var(--color-on-surface-variant), 0.08);
    }
  }
  button:focus-visible,
  button:active {
    background-color: --translucent(var(--color-on-surface-variant), 0.12);
  }

  .error {
    --error: var(--color-error);
  }
  .error > input:hover ~ label,
  .error > input:hover ~ .layer {
    --error: var(--color-on-error-container);
  }

  .m3-container.disabled {
    opacity: 0.38;
  }
  input:disabled {
    color: --translucent(var(--color-on-surface), 0.38);
  }
  button:disabled {
    color: --translucent(var(--color-on-surface-variant), 0.38);
    cursor: auto;
  }

  .picker {
    @supports not (anchor-name: --a) {
      position: absolute;
      top: calc(100% + 1rem);
      right: 0;
    }
    @supports (anchor-name: --a) {
      position: fixed;
      position-anchor: var(--anchor-name);
      /* Default */
      position-area: bottom center;
      justify-self: start;
      margin-block-start: 1rem;
      /* Alternatives */
      position-try-fallbacks: --picker-bottom-right, --picker-top-left, --picker-top-right;
    }
    z-index: 1;
  }

  @media (min-width: 37.5rem) {
    .has-js button {
      display: flex;
    }
    .has-js input {
      @supports selector(::-webkit-calendar-picker-indicator) {
        &::-webkit-calendar-picker-indicator {
          display: none;
        }
      }
      @supports not selector(::-webkit-calendar-picker-indicator) {
        clip-path: inset(0 3.5rem 0 0);
        &:dir(rtl) {
          clip-path: inset(0 0 0 3.5rem);
        }
      }
    }
  }
</style>
