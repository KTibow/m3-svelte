<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/Icon.svelte";
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
    stops = false,
    endStops = true,
    vertical = false,
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
    vertical?: boolean;
    format?: (n: number) => string;
  } & Omit<HTMLInputAttributes, "size"> = $props();
  let offsetWidth = $state(600);
  let offsetHeight = $state(600);
  let inlineSize = $derived(vertical ? offsetHeight : offsetWidth);

  const valueDisplayed = new Spring(value, { stiffness: 0.3, damping: 1 });
  const updateValue = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newValue = Number(e.currentTarget.value);
    e.preventDefault();
    value = newValue;
  };
  $effect(() => (valueDisplayed.target = value));

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

<div
  class="m3-container {size} {vertical ? 'vertical' : ''}"
  style:--handle={handle - 0.5}
  bind:offsetWidth
  bind:offsetHeight
>
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
      class={"leading" + (inlineSize * handle < (size == "xl" ? 48 : 40) ? " pop" : "")}
    />
  {/if}
  {#if trailingIcon}
    <Icon
      icon={trailingIcon}
      class={"trailing" + (inlineSize * (1 - handle) < (size == "xl" ? 48 : 40) ? " pop" : "")}
    />
  {/if}
  <div class="handle"></div>
  {#if showValue}
    <div class="value">{format(value)}</div>
  {/if}
</div>

<style>
  @layer tokens {
    :root {
      --m3-slider-track-out-shape: 0.5rem;
      --m3-slider-track-in-shape: 0.125rem;
      --m3-slider-handle-shape: var(--m3-shape-full);
    }
  }

  .m3-container {
    position: relative;
    block-size: var(--handle-height);
    min-inline-size: 10rem;
    print-color-adjust: exact;

    --functional-width: calc(100% - 2 * (0.25rem + 0.125rem));
    --handle-left: calc(50% + var(--functional-width) * var(--handle) - 0.125rem - 0.375rem);
    --handle-center: calc(50% + var(--functional-width) * var(--handle));
    --handle-right: calc(50% + var(--functional-width) * var(--handle) + 0.125rem + 0.375rem);
  }

  .m3-container.vertical {
    writing-mode: sideways-lr;
  }

  .m3-container.xs {
    --track-height: 1rem;
    --handle-height: 2.75rem;
    --track-radius: var(--m3-shape-small);
    --icon-size: 0;
  }

  .m3-container.s {
    --track-height: 1.5rem;
    --handle-height: 2.75rem;
    --track-radius: var(--m3-shape-small);
    --icon-size: 0;
  }

  .m3-container.m {
    --track-height: 2.5rem;
    --handle-height: 3.25rem;
    --track-radius: var(--m3-shape-medium);
    --icon-size: 1.5rem;
  }

  .m3-container.l {
    --track-height: 3.5rem;
    --handle-height: 4.25rem;
    --track-radius: var(--m3-shape-large);
    --icon-size: 1.5rem;
  }

  .m3-container.xl {
    --track-height: 6rem;
    --handle-height: 6.75rem;
    --track-radius: var(--m3-shape-extra-large);
    --icon-size: 2rem;
  }

  .m3-container :global(.leading) {
    position: absolute;
    width: var(--icon-size);
    height: var(--icon-size);
    inset-block-start: 50%;
    inset-inline-start: 0;
    margin-inline-start: 0.25rem;
    translate: 0 -50%;
    pointer-events: none;
    color: var(--m3c-secondary-container);

    .vertical & {
      translate: -50% 0;
    }
  }

  .m3-container :global(.leading.pop) {
    inset-inline-start: var(--handle-right);
    color: var(--m3c-primary);
  }

  .m3-container :global(.trailing) {
    position: absolute;
    width: var(--icon-size);
    height: var(--icon-size);
    inset-block-start: 50%;
    inset-inline-end: 0;
    margin-inline-end: 0.25rem;
    translate: 0 -50%;
    pointer-events: none;
    color: var(--m3c-primary);

    .vertical & {
      translate: -50% 0;
    }
  }

  .m3-container :global(.trailing.pop) {
    inset-inline-end: calc(100% - var(--handle-left));
    color: var(--m3c-secondary-container);
  }

  input {
    position: absolute;
    inline-size: calc(var(--functional-width) + 1rem);
    inset-inline-start: 50%;
    translate: -50% 0;
    block-size: 100%;

    opacity: 0;
    appearance: none;
    margin: 0;

    &:enabled {
      cursor: pointer;
    }

    .vertical & {
      translate: 0 50%;
    }
  }

  .track-1,
  .track-2 {
    position: absolute;
    inset-inline: 0;
    inset-block: calc((var(--handle-height) - var(--track-height)) / 2);
    pointer-events: none;
  }
  .track-1 {
    background-color: var(--m3c-primary);
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
    .vertical & {
      clip-path: inset(
        calc(100% - var(--handle-left)) 0 0 0 round var(--m3-slider-track-in-shape)
          var(--m3-slider-track-in-shape) var(--track-radius) var(--track-radius)
      );
    }

    @media screen and (forced-colors: active) {
      background-color: selecteditem;
    }
    input:disabled ~ & {
      background-color: --translucent(var(--m3c-on-surface), 0.38);
      @media screen and (forced-colors: active) {
        background-color: canvastext;
      }
    }
  }
  .track-2 {
    background-color: var(--m3c-secondary-container);
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
    .vertical & {
      clip-path: inset(
        0 0 var(--handle-right) 0 round var(--track-radius) var(--track-radius)
          var(--m3-slider-track-in-shape) var(--m3-slider-track-in-shape)
      );
    }

    @media screen and (forced-colors: active) {
      background-color: canvastext;
    }
    input:disabled ~ & {
      background-color: --translucent(var(--m3c-on-surface), 0.12);
      @media screen and (forced-colors: active) {
        background-color: graytext;
      }
    }
  }
  .stop {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: var(--m3-shape-full);
    inset-block-start: 50%;
    inset-inline-start: calc(50% + (100% - 0.5rem - 0.25rem) * var(--x));
    translate: -50% -50%;
    &:dir(rtl) {
      translate: 50% -50%;
    }
    .vertical & {
      translate: -50% 50%;
    }
    .track-1 > & {
      background-color: var(--m3c-on-primary);
      input:disabled ~ .track-1 > & {
        background-color: var(--m3c-inverse-on-surface);
      }
    }
    .track-2 > & {
      background-color: var(--m3c-primary);
      input:disabled ~ .track-2 > & {
        background-color: --translucent(var(--m3c-on-surface), 0.38);
      }
    }
    pointer-events: none;
  }

  .handle {
    position: absolute;
    inset-inline-start: var(--handle-center);
    inset-block: 0;
    inline-size: 0.25rem;
    translate: -50% 0;
    &:dir(rtl) {
      translate: 50% 0;
    }
    .vertical & {
      translate: 0 50%;
    }
    border-radius: 1.25rem;
    background-color: var(--m3c-primary);

    pointer-events: none;
    transition: inline-size var(--m3-easing);

    @media screen and (forced-colors: active) {
      background-color: selecteditem;
    }
    input:disabled ~ & {
      background-color: --translucent(var(--m3c-on-surface), 0.38);
      @media screen and (forced-colors: active) {
        background-color: graytext;
      }
    }
  }

  .value {
    @apply --m3-label-large;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;

    background-color: var(--m3c-inverse-surface);
    color: var(--m3c-inverse-on-surface);
    min-width: 3rem;
    padding: 0.75rem 1rem;
    border-radius: var(--m3-slider-handle-shape);

    inset-inline-start: var(--handle-center);
    inset-block-end: calc(var(--handle-height) + 4px);
    translate: -50% 0;
    &:dir(rtl) {
      translate: 50% 0;
    }

    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: opacity var(--m3-easing);
    z-index: 1;
    @media screen and (forced-colors: active) {
      border: 2px solid selecteditem;
      overflow: hidden;
    }

    .vertical & {
      translate: 0 50%;
      rotate: 90deg;
    }
  }

  input:focus-visible ~ .handle {
    outline: solid;
    outline-color: var(--m3c-on-secondary-container);
    outline-width: 4px;
    outline-offset: 5px;
    z-index: 2;
  }
  input:focus-visible ~ .handle,
  input:enabled:active ~ .handle {
    inline-size: 0.125rem;
  }
  input:enabled:hover ~ .value,
  input:enabled:focus-visible ~ .value,
  input:enabled:active ~ .value {
    opacity: 1;
  }
</style>
