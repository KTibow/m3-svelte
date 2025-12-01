<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLOptionAttributes, HTMLSelectAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";
  import Icon from "$lib/misc/Icon.svelte";

  type Option = { icon?: IconifyIcon; text: string; value: string } & HTMLOptionAttributes;
  let {
    label,
    options,
    width = "auto",
    value = $bindable(),
    ...extra
  }: {
    label: string;
    options: Option[];
    width?: string;
    value: string;
  } & HTMLSelectAttributes = $props();
  const id = $props.id();
</script>

{#snippet render(text: string)}
  <span>{text}</span>
{/snippet}
<div
  class="m3-container"
  class:enabled={!extra.disabled}
  style:align-self={width == "auto" ? "start" : undefined}
>
  <select class="m3-font-body-large" style:--width={width} bind:value {id} {...extra}>
    {#each options as { icon, text, ...extra }, i (i)}
      <option class="focus-inset" {...extra}>
        <Layer />
        {#if icon}
          <Icon {icon} size={24} />
        {/if}
        {@render render(text)}
      </option>
    {/each}
  </select>
  <label for={id} class="m3-font-body-small">
    {label}
  </label>
</div>

<style>
  @layer tokens {
    :root {
      --m3-menu-shape: var(--m3-util-rounding-extra-small);
      --m3-field-filled-shape: var(--m3-util-rounding-extra-small);
    }
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    position: relative;
    --secondary-color: rgb(var(--m3-scheme-on-surface-variant));
    &.enabled {
      &:hover {
        --secondary-color: rgb(var(--m3-scheme-on-surface));
      }
      &:focus-within {
        --secondary-color: rgb(var(--m3-scheme-primary));
        select {
          box-shadow: inset 0px -2px var(--secondary-color);
        }
      }
    }
  }
  label {
    position: absolute;
    top: 0.5rem;
    inset-inline: 1rem;
    color: var(--secondary-color);
    pointer-events: none;
    transition: color var(--m3-util-easing-fast);
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
    padding-top: calc(var(--m3-font-body-small-size) * var(--m3-font-body-small-height));
    padding-inline: 1rem;

    border-radius: var(--m3-field-filled-shape) var(--m3-field-filled-shape) 0 0;
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
    }

    box-shadow: inset 0px -1px var(--secondary-color);
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
    display: grid;
    grid-template-columns: auto 1fr;
    padding-inline: 1rem;
    padding-block: calc(
      (
          3rem + var(--m3-util-density-term) -
            (var(--m3-font-body-large-size) * var(--m3-font-body-large-height))
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

    > *,
    > :global(svg) {
      grid-row: 1;
    }
    &::checkmark {
      opacity: 0;
      grid-column: 2;
    }
    &:has(> :global(svg)) {
      grid-template-columns: auto auto 1fr;
      > :global(svg) {
        margin-right: 0.5rem;
      }
      &:not(:checked) > :global(svg) {
        color: rgb(var(--m3-scheme-on-surface-variant));
      }
      &:checked > :global(svg) {
        opacity: 0.8;
      }
      &::checkmark {
        grid-column: 3;
      }
    }

    transition:
      background-color var(--m3-util-easing-fast),
      color var(--m3-util-easing-fast);

    position: relative;
    cursor: pointer;
  }
</style>
