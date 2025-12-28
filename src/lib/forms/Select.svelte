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
  <select style:--width={width} bind:value {id} {...extra}>
    {#each options as { icon, text, ...extra }, i (i)}
      <option {...extra}>
        <Layer />
        {#if icon}
          <Icon {icon} size={24} />
        {/if}
        {@render render(text)}
      </option>
    {/each}
  </select>
  <label for={id}>
    {label}
  </label>
</div>

<style>
  @layer tokens {
    :root {
      --m3-menu-shape: var(--m3-shape-extra-small);
      --m3-field-filled-shape: var(--m3-shape-extra-small);
    }
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    position: relative;
    --secondary-color: var(--m3c-on-surface-variant);
    &.enabled {
      &:hover {
        --secondary-color: var(--m3c-on-surface);
      }
      &:focus-within {
        --secondary-color: var(--m3c-primary);
        select {
          box-shadow: inset 0px -2px var(--secondary-color);
        }
      }
    }
  }
  label {
    @apply --m3-body-small;
    position: absolute;
    top: 0.5rem;
    inset-inline: 1rem;
    color: var(--secondary-color);
    pointer-events: none;
    transition: color var(--m3-easing-fast);
  }

  select {
    appearance: none;
  }
  select,
  ::picker(select) {
    appearance: base-select;
  }

  select {
    @apply --m3-body-large;
    display: flex;
    align-items: center;
    height: --m3-density(3.5rem);
    padding-top: 1rem;
    padding-inline: 1rem;

    border-radius: var(--m3-field-filled-shape) var(--m3-field-filled-shape) 0 0;
    background-color: var(--m3c-surface-container-highest);
    transition:
      background-color var(--m3-easing-fast),
      box-shadow var(--m3-easing-fast);

    border: none;
    position: relative;

    &:enabled {
      cursor: pointer;
      &:hover,
      &:open {
        background-color: color-mix(
          in oklab,
          var(--m3c-surface-container-highest),
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
      color var(--m3-easing-fast),
      rotate var(--m3-easing-fast);
  }
  select:open::picker-icon {
    rotate: 180deg;
  }

  ::picker(select) {
    background-color: var(--m3c-surface-container);
    box-shadow: var(--m3-elevation-2);
    border-radius: var(--m3-menu-shape);

    box-sizing: border-box;
    height: 0;
    min-height: 0;
    interpolate-size: allow-keywords;
    overflow: hidden;
    transition:
      width var(--m3-easing-fast),
      height var(--m3-easing-fast),
      display var(--m3-duration-fast) allow-discrete,
      overlay var(--m3-duration-fast) allow-discrete;

    border: none;
    cursor: auto;
  }
  select:open::picker(select) {
    width: var(--width);
    height: auto;
    transition:
      width 500ms linear,
      height 500ms var(--m3-timing-function-emphasized-decel),
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
    @apply --m3-focus-inward;
    display: grid;
    grid-template-columns: auto 1fr;
    padding-inline: 1rem;
    padding-block: calc((--m3-density(3rem) - 1lh) / 2);
    &:first-child {
      margin-top: 0.5rem;
    }
    &:last-child {
      margin-bottom: 0.5rem;
    }

    background-color: transparent;
    &:checked {
      background-color: var(--m3c-primary-container);
      color: var(--m3c-on-primary-container);
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
        color: var(--m3c-on-surface-variant);
      }
      &:checked > :global(svg) {
        opacity: 0.8;
      }
      &::checkmark {
        grid-column: 3;
      }
    }

    transition:
      background-color var(--m3-easing-fast),
      color var(--m3-easing-fast);

    position: relative;
    cursor: pointer;
  }
</style>
