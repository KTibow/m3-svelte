<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import { spring } from "svelte/motion";

  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: HTMLInputAttributes = {};
  export let value: number;
  export let min = 0;
  export let max = 100;
  export let step: number | "any" = "any";
  export let disabled = false;
  export let showValue = true;
  export let format = (n: number) => {
    return n.toFixed(0);
  };

  const valueDisplayed = spring(value, { stiffness: 0.3, damping: 1 });
  const updateValue = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value);
    e.preventDefault();
    value = newValue;
    $valueDisplayed = newValue;
  };

  let range: number, percent: number;
  $: {
    range = max - min;
    percent = ($valueDisplayed - min) / range;
  }
</script>

<div class="m3-container" style="--percent: {percent * 100}%;" {...extraWrapperOptions}>
  <input
    type="range"
    on:input={updateValue}
    value={$valueDisplayed}
    {min}
    {max}
    {step}
    {disabled}
    {...extraOptions}
  />
  <div class="track" />
  <div class="thumb" />
  {#if showValue}
    <div class="value m3-font-label-large"><span>{format(value)}</span></div>
  {/if}
</div>

<style>
  :root {
    --m3-slider-track-out-shape: 0.5rem;
    --m3-slider-track-in-shape: 0.125rem;
    --m3-slider-thumb-shape: var(--m3-util-rounding-full);
  }
  .m3-container {
    position: relative;
    height: 2.75rem;
    min-width: 10rem;
  }
  input {
    position: absolute;
    left: -0.5rem;
    right: -0.5rem;
    width: calc(100% + 1rem);
    height: 100%;

    opacity: 0;
    appearance: none;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  .track::before {
    position: absolute;
    content: " ";
    left: 0;
    top: 50%;
    translate: 0 -50%;
    width: calc(var(--percent) - 0.375rem);
    height: 1rem;
    pointer-events: none;

    background-color: rgb(var(--m3-scheme-primary));
    border-start-start-radius: var(--m3-slider-track-out-shape);
    border-end-start-radius: var(--m3-slider-track-out-shape);
    border-start-end-radius: var(--m3-slider-track-in-shape);
    border-end-end-radius: var(--m3-slider-track-in-shape);
  }
  .track::after {
    position: absolute;
    content: " ";
    right: 0;
    top: 50%;
    translate: 0 -50%;
    width: calc(100% - var(--percent) - 0.375rem);
    height: 1rem;
    pointer-events: none;

    background-color: rgb(var(--m3-scheme-primary-container));
    border-start-start-radius: var(--m3-slider-track-in-shape);
    border-end-start-radius: var(--m3-slider-track-in-shape);
    border-start-end-radius: var(--m3-slider-track-out-shape);
    border-end-end-radius: var(--m3-slider-track-out-shape);
  }

  .thumb {
    position: absolute;
    left: var(--percent);
    translate: -50% 0;
    width: 0.25rem;
    height: 2.75rem;
    border-radius: 1.25rem;
    background-color: rgb(var(--m3-scheme-primary));

    pointer-events: none;
    transition: width 200ms;
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    background-color: rgb(var(--m3-scheme-inverse-surface));
    color: rgb(var(--m3-scheme-inverse-on-surface));
    width: 3rem;
    padding: 0.75rem 1rem;
    border-radius: var(--m3-slider-thumb-shape);

    left: var(--percent);
    top: -3rem;
    translate: -50% 0;

    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms;
  }

  input:focus-visible ~ .thumb {
    outline: auto;
    outline-offset: 0.5rem;
  }
  input:focus-visible ~ .thumb,
  input:enabled:active ~ .thumb {
    width: 0.125rem;
  }
  input:enabled:hover ~ .value,
  input:enabled:focus-visible ~ .value,
  input:enabled:active ~ .value {
    opacity: 1;
  }

  input:disabled {
    cursor: auto;
  }
  input:disabled ~ .track::before {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .track::after {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  input:disabled ~ .thumb {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .track::before {
      background-color: selecteditem;
    }
    .track::after {
      background-color: canvastext;
    }
    .thumb {
      background-color: selecteditem;
    }
    .value {
      border: 2px solid selecteditem;
      overflow: hidden;
    }
    input:disabled + .track::before {
      background-color: canvastext;
    }
    input:disabled + .track::after {
      background-color: graytext;
    }
    input:disabled ~ .thumb {
      background-color: graytext;
    }
  }
</style>
