<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { Spring } from "svelte/motion";

  let {
    value = $bindable(),
    min = 0,
    max = 100,
    step,
    disabled = false,
    showValue = true,
    format = (n: number) => {
      return n.toFixed(0);
    },
    ...extra
  }: {
    value: number;
    min?: number;
    max?: number;
    step: number;
    disabled?: boolean;
    showValue?: boolean;
    format?: (n: number) => string;
  } & HTMLInputAttributes = $props();

  const valueDisplayed = new Spring(value, { stiffness: 0.3, damping: 1 });
  const updateValue = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value);
    e.preventDefault();
    value = newValue;
    valueDisplayed.target = newValue;
  };

  const range = $derived(max - min);
  const percent = $derived((valueDisplayed.current - min) / range);
  const ticks = $derived.by(() => {
    const ticksList = [];
    for (let i = 0; i <= range; i += step) {
      ticksList.push((i / range) * 100);
    }
    return ticksList;
  });
</script>

<div class="m3-container" style:--percent="{percent * 100}%">
  <input
    type="range"
    oninput={updateValue}
    value={valueDisplayed.current}
    {min}
    {max}
    {step}
    {disabled}
    {...extra}
  />
  <div class="track"></div>
  {#each ticks as tick}
    <div
      class="tick"
      class:hidden={Math.abs(tick / 100 - valueDisplayed.current / range) < 0.01}
      class:inactive={tick / 100 > valueDisplayed.current / range}
      style:--x={tick / 100 - 0.5}
    ></div>
  {/each}
  <div class="thumb"></div>
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

  .tick {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: var(--m3-util-rounding-full);
    top: 50%;
    left: calc(50% + (100% - 0.75rem) * var(--x));
    translate: -50% -50%;
    background-color: rgb(var(--m3-scheme-primary-container));
    pointer-events: none;
  }
  .tick.hidden {
    display: none;
  }
  .tick.inactive {
    background-color: rgb(var(--m3-scheme-primary));
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
    transition: width var(--m3-util-easing);
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
    transition: opacity var(--m3-util-easing);
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
  input:disabled ~ .tick {
    background-color: rgb(var(--m3-scheme-inverse-on-surface) / 0.66);
  }
  input:disabled ~ .tick.inactive {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
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
