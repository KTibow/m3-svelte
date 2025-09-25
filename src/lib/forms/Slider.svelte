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
    size = "xs",
    leadingIcon,
    trailingIcon,
    stops: _stops = false,
    endStops = true,
    format = (n: number) => {
      return n.toFixed(0);
    },
    ...extra
  }: {
    value: number;
    min?: number;
    max?: number;
    step?: number | "any";
    disabled?: boolean;
    showValue?: boolean;
    size?: "xs" | "s" | "m" | "l" | "xl";
    leadingIcon?: IconifyIcon;
    trailingIcon?: IconifyIcon;
    stops?: boolean;
    endStops?: boolean;
    format?: (n: number) => string;
  } & Omit<HTMLInputAttributes, "size"> = $props();
  // @ts-expect-error deprecated backwards compatibility with ticks
  let stops = $derived(extra.ticks ? true : _stops);
  let containerWidth = $state(600);

  const valueDisplayed = new Spring(value, { stiffness: 0.3, damping: 1 });
  const updateValue = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value);
    e.preventDefault();
    value = newValue;
    valueDisplayed.target = newValue;
  };

  const range = $derived(max - min);
  const handle = $derived((valueDisplayed.current - min) / range);
  const stopList = $derived.by(() => {
    const output: number[] = [];
    const add = (stop: number) => {
      if (leadingIcon && stop == 0) return;
      if (trailingIcon && stop == 1) return;
      output.push(stop);
    };

    if (stops && typeof step == "number") {
      for (let i = 0; i <= range; i += step) add(i / range);
    }
    if (endStops && !output.includes(1)) {
      add(1);
    }

    return output;
  });
</script>

<div class="m3-container {size}" style:--handle={handle - 0.5} bind:offsetWidth={containerWidth}>
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
  <div class="track-1">
    {#each stopList as stop}
      <div class="stop" style:--x={stop - 0.5}></div>
    {/each}
  </div>
  <div class="track-2">
    {#each stopList as stop}
      <div class="stop" style:--x={stop - 0.5}></div>
    {/each}
  </div>
  {#if leadingIcon}
    <Icon
      icon={leadingIcon}
      class={"leading" + (containerWidth * handle < (size == "xl" ? 48 : 40) ? " pop" : "")}
    />
  {/if}
  {#if trailingIcon}
    <Icon
      icon={trailingIcon}
      class={"trailing" + (containerWidth * (1 - handle) < (size == "xl" ? 48 : 40) ? " pop" : "")}
    />
  {/if}
  <div class="handle"></div>
  {#if showValue}
    <div class="value m3-font-label-large">{format(value)}</div>
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

    --functional-width: calc(100% - 2 * (0.25rem + 0.125rem));
    --handle-left: calc(50% + var(--functional-width) * var(--handle) - 0.125rem - 0.375rem);
    --handle-center: calc(50% + var(--functional-width) * var(--handle));
    --handle-right: calc(50% + var(--functional-width) * var(--handle) + 0.125rem + 0.375rem);
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

  .m3-container :global(.leading) {
    position: absolute;
    width: var(--icon-size);
    height: var(--icon-size);
    top: 50%;
    inset-inline-start: 0;
    margin-inline-start: 0.25rem;
    translate: 0 -50%;
    pointer-events: none;
    color: rgb(var(--m3-scheme-secondary-container));
  }

  .m3-container :global(.leading.pop) {
    inset-inline-start: var(--handle-right);
    color: rgb(var(--m3-scheme-primary));
  }

  .m3-container :global(.trailing) {
    position: absolute;
    width: var(--icon-size);
    height: var(--icon-size);
    top: 50%;
    inset-inline-end: 0;
    margin-inline-end: 0.25rem;
    translate: 0 -50%;
    pointer-events: none;
    color: rgb(var(--m3-scheme-primary));
  }

  .m3-container :global(.trailing.pop) {
    inset-inline-end: calc(100% - var(--handle-left));
    color: rgb(var(--m3-scheme-secondary-container));
  }

  input {
    position: absolute;
    width: calc(var(--functional-width) + 1rem);
    left: 50%;
    translate: -50% 0;
    height: 100%;

    opacity: 0;
    appearance: none;
    margin: 0;

    &:enabled {
      cursor: pointer;
    }
  }

  .track-1,
  .track-2 {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    translate: 0 -50%;
    height: var(--track-height);
    pointer-events: none;
  }
  .track-1 {
    background-color: rgb(var(--m3-scheme-primary));
    clip-path: inset(
      0 calc(100% - var(--handle-left)) 0 0 round var(--track-radius)
        var(--m3-slider-track-in-shape) var(--m3-slider-track-in-shape) var(--track-radius)
    );
    &:dir(rtl) {
      clip-path: inset(
        0 0 0 calc(100% - var(--handle-left)) round var(--m3-slider-track-in-shape)
          var(--track-radius) var(--track-radius) var(--m3-slider-track-in-shape)
      );
    }

    @media screen and (forced-colors: active) {
      background-color: selecteditem;
    }
    &:is(input:disabled ~ .track-1) {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
      @media screen and (forced-colors: active) {
        background-color: canvastext;
      }
    }
  }
  .track-2 {
    background-color: rgb(var(--m3-scheme-secondary-container));
    clip-path: inset(
      0 0 0 var(--handle-right) round var(--m3-slider-track-in-shape) var(--track-radius)
        var(--track-radius) var(--m3-slider-track-in-shape)
    );
    &:dir(rtl) {
      clip-path: inset(
        0 var(--handle-right) 0 0 round var(--track-radius) var(--m3-slider-track-in-shape)
          var(--m3-slider-track-in-shape) var(--track-radius)
      );
    }

    @media screen and (forced-colors: active) {
      background-color: canvastext;
    }
    &:is(input:disabled ~ .track-2) {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
      @media screen and (forced-colors: active) {
        background-color: graytext;
      }
    }
  }
  .stop {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: var(--m3-util-rounding-full);
    top: 50%;
    inset-inline-start: calc(50% + (100% - 0.5rem - 0.25rem) * var(--x));
    translate: -50% -50%;
    &:dir(rtl) {
      translate: 50% -50%;
    }
    &:is(.track-1 > .stop) {
      background-color: rgb(var(--m3-scheme-on-primary));
      &:is(input:disabled ~ .track-1 > .stop) {
        background-color: rgb(var(--m3-scheme-inverse-on-surface));
      }
    }
    &:is(.track-2 > .stop) {
      background-color: rgb(var(--m3-scheme-primary));
      &:is(input:disabled ~ .track-2 > .stop) {
        background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
      }
    }
    pointer-events: none;
  }

  .handle {
    position: absolute;
    inset-inline-start: var(--handle-center);
    translate: -50% 0;
    &:dir(rtl) {
      translate: 50% 0;
    }
    width: 0.25rem;
    height: var(--handle-height);
    border-radius: 1.25rem;
    background-color: rgb(var(--m3-scheme-primary));

    pointer-events: none;
    transition: width var(--m3-util-easing);

    @media screen and (forced-colors: active) {
      background-color: selecteditem;
    }
    &:is(input:disabled ~ .handle) {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
      @media screen and (forced-colors: active) {
        background-color: graytext;
      }
    }
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

    inset-inline-start: var(--handle-center);
    bottom: calc(var(--handle-height) + 4px);
    translate: -50% 0;
    &:dir(rtl) {
      translate: 50% 0;
    }

    opacity: 0;
    pointer-events: none;
    transition: opacity var(--m3-util-easing);
    z-index: 1;
    @media screen and (forced-colors: active) {
      border: 2px solid selecteditem;
      overflow: hidden;
    }
  }

  input:focus-visible ~ .handle {
    outline: solid;
    outline-color: rgb(var(--m3-scheme-on-secondary-container));
    outline-width: 4px;
    outline-offset: 5px;
    z-index: 2;
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
</style>
