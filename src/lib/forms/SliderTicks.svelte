<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import { tweened } from "svelte/motion";
  import { easeEmphasized } from "$lib/misc/easing";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: HTMLInputAttributes = {};
  export let value: number;
  export let min = 0;
  export let max = 100;
  export let step: number;
  export let disabled = false;
  export let showValue = true;
  export let format = (n: number) => {
    return n.toFixed(0);
  };

  const valueDisplayed = tweened(value, { duration: 200, easing: easeEmphasized });
  const updateValue = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value);
    e.preventDefault();
    value = newValue;
    $valueDisplayed = newValue;
  };

  let range: number, percent: number, ticks: number[];
  $: {
    range = max - min;
    percent = ($valueDisplayed - min) / range;
  }
  $: {
    ticks = [];
    for (let i = 0; i <= range; i += step) {
      ticks.push((i / range) * 100);
    }
  }
</script>

<div
  class="m3-container"
  style="display: {display}; --percent: {percent * 100}%;"
  {...extraWrapperOptions}
>
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
  {#each ticks as tick}
    <div
      class="tick"
      class:active={tick / 100 < $valueDisplayed / range}
      style="left: calc({tick}% - {(tick / 100) * 4}px + 1px);"
    />
  {/each}
  <div class="thumb" />
  {#if showValue}
    <div class="value m3-font-label-medium"><span>{format(value)}</span></div>
  {/if}
</div>

<style>
  :root {
    --m3-slider-track-shape: var(--m3-util-rounding-full);
    --m3-slider-thumb-shape: var(--m3-util-rounding-full);
  }
  .m3-container {
    position: relative;
    align-items: center;
    height: 2.5rem;
    min-width: 10rem;
  }
  input {
    position: absolute;
    left: -0.5rem;
    right: -0.5rem;
    width: calc(100% + 1rem);
    margin: 0;
    height: 100%;

    opacity: 0;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  .track {
    width: 100%;
    border-radius: var(--m3-slider-track-shape);
    height: 0.25rem;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    position: relative;
    overflow: hidden;
    pointer-events: none;
  }
  .track::before {
    display: inline-block;
    content: " ";
    position: absolute;
    width: var(--percent);
    height: var(--m3-slider-track-shape);
    border-radius: 0.25rem;
    background-color: rgb(var(--m3-scheme-primary));
  }
  .tick {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: var(--m3-util-rounding-full);
    top: 50%;
    transform: translate(0, -50%);
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
  }
  .tick.active {
    background-color: rgb(var(--m3-scheme-on-primary) / 0.38);
  }
  .thumb {
    position: absolute;
    left: calc(var(--percent) - 0.625rem);
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--m3-slider-thumb-shape);
    background-color: rgb(var(--m3-scheme-primary));
    box-shadow: var(--m3-util-elevation-1);
    pointer-events: none;
  }
  .thumb::before {
    display: inline-block;
    content: " ";
    position: absolute;
    inset: -0.625rem;
    border-radius: var(--m3-util-rounding-full);
    transition: background-color 200ms;
  }
  .value {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    left: calc(var(--percent) - 0.875rem);
    top: -1.75rem;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--m3-util-rounding-full) var(--m3-util-rounding-full) 0
      var(--m3-util-rounding-full);
    transform: rotate(45deg);

    background-color: rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-on-primary));
    opacity: 0;
    transition: opacity 200ms;
    pointer-events: none;
  }
  .value > span {
    display: inline-block;
    transform: rotate(-45deg);
  }

  @media (hover: hover) {
    input:hover ~ .thumb::before {
      background-color: rgb(var(--m3-scheme-primary) / 0.08);
    }
  }
  input:focus-visible ~ .thumb::before,
  input:active ~ .thumb::before {
    background-color: rgb(var(--m3-scheme-primary) / 0.12);
  }
  input:hover ~ .value,
  input:focus-visible ~ .value,
  input:active ~ .value {
    opacity: 1;
  }
  input:disabled {
    cursor: auto;
  }
  input:disabled + .track {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  input:disabled + .track::before {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .tick {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .thumb {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
    backdrop-filter: blur(1rem);
    box-shadow: none;
  }
  input:disabled ~ .thumb::before {
    display: none;
  }
  input:disabled ~ .value {
    display: none;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .thumb {
      background-color: selecteditem;
    }
    .track {
      background-color: canvastext;
    }
    .track::before {
      background-color: selecteditem;
    }
    .value {
      border: 2px solid selecteditem;
      overflow: hidden;
    }
    input:disabled + .track {
      background-color: graytext;
      opacity: 0.38;
    }
    input:disabled + .track::before {
      background-color: canvastext;
    }
    input:disabled ~ .thumb {
      background-color: graytext;
    }
  }
</style>
