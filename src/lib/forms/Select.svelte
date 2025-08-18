<script lang="ts">
  import Layer from "$lib/misc/Layer.svelte";
  import type { HTMLSelectAttributes } from "svelte/elements";

  type Option = { text: string; value: string };
  let {
    options,
    width = "auto",
    value = $bindable(),
    ...extra
  }: {
    options: Option[];
    width?: string;
    value: string;
  } & HTMLSelectAttributes = $props();
</script>

<select
  class="m3-container m3-font-body-large"
  style:--width={width}
  style:align-self={width == "auto" ? "start" : undefined}
  bind:value
  {...extra}
>
  {#each options as { text, value }, i (i)}
    <option class="focus-inset" {value}>
      <Layer />
      {text}
    </option>
  {/each}
</select>

<style>
  :root {
    --m3-menu-shape: var(--m3-util-rounding-extra-small);
  }

  select {
    appearance: none;
  }
  select,
  ::picker(select) {
    appearance: base-select;
  }

  select {
    display: flex;
    align-items: center;
    height: calc(3.5rem + var(--m3-util-density-term));
    padding-inline: 1rem;

    border-radius: var(--m3-textfield-filled-shape) var(--m3-textfield-filled-shape) 0 0;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    transition:
      background-color var(--m3-util-easing-fast),
      box-shadow var(--m3-util-easing-fast);

    border: none;
    position: relative;

    &:enabled {
      cursor: pointer;
      &:hover,
      &:open {
        background-color: color-mix(
          in oklab,
          rgb(var(--m3-scheme-surface-container-highest)),
          currentColor 8%
        );
      }
      &:active {
        background-color: color-mix(
          in oklab,
          rgb(var(--m3-scheme-surface-container-highest)),
          currentColor 12%
        );
      }
    }

    --secondary-color: rgb(var(--m3-scheme-on-surface-variant));
    box-shadow: inset 0px -1px var(--secondary-color);
    &:focus,
    &:open {
      --secondary-color: rgb(var(--m3-scheme-primary));
      box-shadow: inset 0px -2px var(--secondary-color);
    }
  }

  select::picker-icon {
    scale: 1 0.6; /* yes we are squashing the arrow, surely you don't have a problem with that */
    color: var(--secondary-color);
    transition:
      color var(--m3-util-easing-fast),
      rotate var(--m3-util-easing-fast);
  }
  select:open::picker-icon {
    rotate: 180deg;
  }

  ::picker(select) {
    background-color: rgb(var(--m3-scheme-surface-container));
    box-shadow: var(--m3-util-elevation-2);
    border-radius: var(--m3-menu-shape);

    box-sizing: border-box;
    height: 0;
    min-height: 0;
    interpolate-size: allow-keywords;
    overflow: hidden;
    transition:
      width var(--m3-util-easing-fast),
      height var(--m3-util-easing-fast),
      display var(--m3-util-duration-fast) allow-discrete,
      overlay var(--m3-util-duration-fast) allow-discrete;

    border: none;
    cursor: auto;
  }
  select:open::picker(select) {
    width: var(--width);
    height: auto;
    transition:
      width 500ms linear,
      height 500ms var(--m3-util-timing-function-emphasized-decel),
      display 500ms allow-discrete,
      overlay 500ms allow-discrete;
  }
  @starting-style {
    select:open::picker(select) {
      width: calc-size(var(--width), size - 0.001px);
      height: 0;
    }
  }

  option {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    padding-inline: 1rem;
    padding-block: calc(
      (
          3rem + var(--m3-util-density-term) -
            (var(--m3-font-body-large-size, 1rem) * var(--m3-font-body-large-height, 1.5))
        ) /
        2
    );
    &:first-child {
      margin-top: 0.5rem;
    }
    &:last-child {
      margin-bottom: 0.5rem;
    }

    background-color: transparent;
    &:checked {
      background-color: rgb(var(--m3-scheme-primary-container));
      color: rgb(var(--m3-scheme-on-primary-container));
    }
    &::checkmark {
      opacity: 0;
    }

    position: relative;
    cursor: pointer;
  }
</style>
