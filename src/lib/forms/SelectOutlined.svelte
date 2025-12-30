<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLOptionAttributes, HTMLSelectAttributes } from "svelte/elements";
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
      <option {...extra} class="m3-layer">
        {#if icon}
          <Icon {icon} size={24} />
        {/if}
        {@render render(text)}
      </option>
    {/each}
  </select>
  <div class="layer"></div>
  <label for={id}>
    {label}
  </label>
</div>

<style>
  /*
  want to customize the label's background?
  do this: <SelectOutlined --m3v-background="var(--m3c-surface-container)" />
  */
  @layer tokens {
    :root {
      --m3-menu-shape: var(--m3-shape-extra-small);
      --m3-field-outlined-shape: var(--m3-shape-extra-small);
    }
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    position: relative;
    --secondary-color: var(--m3c-on-surface-variant);
    --outline-color: var(--m3c-outline);
    &.enabled {
      &:hover {
        --secondary-color: var(--m3c-on-surface);
        --outline-color: var(--m3c-on-surface);
      }
      &:focus-within {
        --secondary-color: var(--m3c-primary);
        --outline-color: var(--m3c-primary);
        .layer {
          border-width: 0.125rem;
        }
      }
    }
  }
  .layer {
    position: absolute;
    inset: 0;
    border: 1px solid var(--outline-color);
    border-radius: var(--m3-field-outlined-shape);
    pointer-events: none;
    transition: all 100ms;
  }
  label {
    @apply --m3-body-small;
    position: absolute;
    top: 0;
    inset-inline-start: 0.75rem;
    translate: 0 -50%;
    color: var(--secondary-color);
    background-color: var(--m3v-background);
    padding: 0 0.25rem;
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
    padding-inline: 1rem;

    border-radius: var(--m3-field-outlined-shape);
    background-color: transparent;
    color: var(--m3c-on-surface);

    border: none;

    &:enabled {
      cursor: pointer;
    }
  }

  select::picker-icon {
    scale: 1 0.6;
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
