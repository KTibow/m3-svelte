<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/_icon.svelte";
  import { Spring } from "svelte/motion";

  let {
    value = $bindable(),
    min = 0,
    max = 100,
    step = "any",
    disabled = false,
    showValue = true,
    size = "m",
    leadingIcon,
    trailingIcon,
    ticks = false,
    endStops = true,
    format = (n: number) => {
      return n.toFixed(0);
    },
    ...extra
  } = $props<{
    value: number;
    min?: number;
    max?: number;
    step?: number | "any";
    disabled?: boolean;
    showValue?: boolean;
    size?: "xs" | "s" | "m" | "l" | "xl";
    leadingIcon?: IconifyIcon;
    trailingIcon?: IconifyIcon;
    ticks?: boolean;
    endStops?: boolean;
    format?: (n: number) => string;
  } & HTMLInputAttributes>();
  let container = $state<HTMLDivElement>();

  const valueDisplayed = new Spring(value, { stiffness: 0.3, damping: 1 });
  const updateValue = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value);
    e.preventDefault();
    value = newValue;
    valueDisplayed.target = newValue;
  };
  
  const range = $derived(max - min);
  const percent = $derived((valueDisplayed.current - min) / range);
  const tickList = $derived.by(() => {
    const ticksList = [];
    
    for (let i = 0; i <= range; i += step) ticksList.push((i / range) * 100);
        
    return ticksList;
  });
</script>

<div class="m3-container {size}" style:--percent="{percent * 100}%" bind:this={container}>
  <!-- strange hack to update the step attribute -->
  {#key step}
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
  {/key}
  
  <div class="track"></div>
  {#if leadingIcon}
    <Icon icon={leadingIcon} class="leading{(container.offsetWidth * percent) < (size === 'xl' ? 48 : 40) ? ' pop' : ''}" />
  {/if}
  {#if trailingIcon}
    <Icon icon={trailingIcon} class="trailing{container.offsetWidth - (container.offsetWidth * percent) < (size === 'xl' ? 48 : 40) ? ' pop' : ''}" />
  {/if}
  {#if ticks}
    {#each tickList as tick}
      <div
        class="tick"
        class:hidden={Math.abs(tick / 100 - (min < 0 ? Math.abs(min) + valueDisplayed.current : valueDisplayed.current) / range) < 0.01}
        class:inactive={tick / 100 > (min < 0 ? Math.abs(min) + valueDisplayed.current : valueDisplayed.current) / range}
        style:--x={tick / 100 - 0.5}
      ></div>
    {/each}
  {:else if endStops && !trailingIcon}
      <div class="end" class:hidden={(container?.offsetWidth ?? 0) - ((container?.offsetWidth ?? 0) * percent) < 14}></div>
  {/if}
  <div class="handle"></div>
  {#if showValue}
    <div class="value m3-font-label-large"><span>{format(value)}</span></div>
  {/if}
</div>

<style>
  :root {
    --m3-slider-track-out-shape: 0.5rem;
    --m3-slider-track-in-shape: 0.125rem;
    --m3-slider-handle-shape: var(--m3-util-rounding-full);
  }
  
  .m3-container {
    position: relative;
    height: var(--handle-height);
    min-width: 10rem;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  
  .m3-container.xs {
    --track-height: 1rem;
    --handle-height: 2.75rem;
    --track-radius: var(--m3-util-rounding-small);
    --icon-size: 0;
  }
  
  .m3-container.s {
    --track-height: 1.5rem;
    --handle-height: 2.75rem;
    --track-radius: var(--m3-util-rounding-small);
    --icon-size: 0;
  }
  
  .m3-container.m {
    --track-height: 2.5rem;
    --handle-height: 3.25rem;
    --track-radius: var(--m3-util-rounding-medium);
    --icon-size: 1.5rem;
  }
  
  .m3-container.l {
    --track-height: 3.5rem;
    --handle-height: 4.25rem;
    --track-radius: var(--m3-util-rounding-large);
    --icon-size: 1.5rem;
  }
  
  .m3-container.xl {
    --track-height: 6rem;
    --handle-height: 6.75rem;
    --track-radius: var(--m3-util-rounding-extra-large);
    --icon-size: 2rem;
  }
  
  :global(.leading) {
    position: absolute;
    width: var(--icon-size);
    height: var(--icon-size);
    top: 50%;
    left: .25rem;
    translate: 0 -50%;
    pointer-events: none;
    color: rgb(var(--m3-scheme-secondary-container));
  }
  
  :global(.leading.pop) {
    left: var(--percent);
    margin-left: .625rem;
    color: rgb(var(--m3-scheme-primary));
  }
  
  :global(.trailing) {
    position: absolute;
    width: var(--icon-size);
    height: var(--icon-size);
    top: 50%;
    right: .25rem;
    translate: 0 -50%;
    pointer-events: none;
    color: rgb(var(--m3-scheme-primary));
  }
  
  :global(.trailing.pop) {
    right: abs(100% - var(--percent));
    margin-right: .625rem;
    color: rgb(var(--m3-scheme-secondary-container));
  }
  
  .end {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: var(--m3-util-rounding-full);
    top: 50%;
    right: 2px;
    translate: -50% -50%;
    background-color: rgb(var(--m3-scheme-primary));
    pointer-events: none;
  }
  
  .end.hidden {
    display: none;
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
    height: var(--track-height);
    pointer-events: none;

    background-color: rgb(var(--m3-scheme-primary));
    border-start-start-radius: var(--track-radius);
    border-end-start-radius: var(--track-radius);
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
    height: var(--track-height);
    pointer-events: none;

    background-color: rgb(var(--m3-scheme-secondary-container));
    border-start-start-radius: var(--m3-slider-track-in-shape);
    border-end-start-radius: var(--m3-slider-track-in-shape);
    border-start-end-radius: var(--track-radius);
    border-end-end-radius: var(--track-radius);
  }
  
  .tick {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: var(--m3-util-rounding-full);
    top: 50%;
    left: calc(50% + (100% - 0.75rem) * var(--x));
    translate: -50% -50%;
    background-color: rgb(var(--m3-scheme-secondary-container));
    pointer-events: none;
  }
  
  .tick.hidden {
    display: none;
  }
  
  .tick.inactive {
    background-color: rgb(var(--m3-scheme-primary));
  }
  
  :global(.leading) ~ .tick:nth-child(1 of div.tick) {
    display: none;
  }
  
  :global(.trailing) ~ .tick:nth-last-child(1 of div.tick) {
    display: none;
  }

  .handle {
    position: absolute;
    left: var(--percent);
    translate: -50%;
    width: 0.25rem;
    height: var(--handle-height);
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
    border-radius: var(--m3-slider-handle-shape);

    left: var(--percent);
    top: -3rem;
    translate: -50% 0;

    opacity: 0;
    pointer-events: none;
    transition: opacity var(--m3-util-easing);
  }

  input:focus-visible ~ .handle {
    outline: auto;
    outline-offset: 0.5rem;
  }
  input:focus-visible ~ .handle,
  input:enabled:active ~ .handle {
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
  input:disabled ~ .handle {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .tick {
    background-color: rgb(var(--m3-scheme-inverse-on-surface) / 0.66);
  }
  input:disabled ~ .tick.inactive {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  
  @media screen and (forced-colors: active) {
    .track::before {
      background-color: selecteditem;
    }
    .track::after {
      background-color: canvastext;
    }
    .handle {
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
    input:disabled ~ .handle {
      background-color: graytext;
    }
  }
</style>
