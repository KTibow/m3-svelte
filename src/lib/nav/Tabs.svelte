<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  export let display = "flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: HTMLInputAttributes = {};
  export let secondary = false;
  export let tab: string;
  export let items: {
    icon?: IconifyIcon;
    name: string;
    value: string;
  }[];
  const name = crypto.randomUUID();
</script>

<div
  class="m3-container"
  class:primary={!secondary}
  style="display: {display}; --items: {items.length};"
  {...extraWrapperOptions}
>
  <div class="divider" />
  {#each items as item}
    {@const id = name + item.value}
    <input type="radio" {name} {id} value={item.value} bind:group={tab} {...extraOptions} />
    <label for={id} class:tall={item.icon}>
      {#if item.icon}
        <Icon icon={item.icon} />
      {/if}
      <span class="m3-font-title-small">{item.name}</span>
    </label>
  {/each}
  <div class="bar" />
</div>

<style>
  .m3-container {
    position: relative;
    background-color: rgb(var(--m3-scheme-surface));
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .divider {
    position: absolute;
    inset: auto 0 0 0;
    height: 0.0625rem;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
  }
  label {
    flex: 1 0;
    height: 3rem;
    min-width: 5rem;
    white-space: nowrap;
    padding: 0 1rem;

    position: relative;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    color: rgb(var(--text));
    --text: var(--m3-scheme-on-surface-variant);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  label > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (hover: hover) {
    label:hover {
      --text: var(--m3-scheme-on-surface);
      background-color: rgb(var(--text) / 0.08);
    }
  }
  input:focus-visible + label,
  input:active + label {
    --text: var(--m3-scheme-on-surface);
    background-color: rgb(var(--text) / 0.12);
  }
  input:checked + label {
    --text: var(--m3-scheme-on-surface);
  }

  .bar {
    position: absolute;
    background-color: rgb(var(--m3-scheme-primary));
    width: calc(100% / var(--items));
    height: 0;
    bottom: 0;
    pointer-events: none;
    transition: all 200ms;
  }
  input:checked:nth-of-type(1) ~ .bar {
    left: 0;
  }
  input:checked:nth-of-type(2) ~ .bar {
    left: calc(100% / var(--items));
  }
  input:checked:nth-of-type(3) ~ .bar {
    left: calc(100% / var(--items) * 2);
  }
  input:checked:nth-of-type(4) ~ .bar {
    left: calc(100% / var(--items) * 3);
  }
  input:checked:nth-of-type(5) ~ .bar {
    left: calc(100% / var(--items) * 4);
  }
  input:checked:nth-of-type(-n + 5) ~ .bar {
    height: 0.125rem;
  }

  .primary > label {
    flex-direction: column;
    gap: 0;
  }
  .primary > label.tall {
    height: 4rem;
  }
  .primary > label > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .primary > input:checked + label {
    --text: var(--m3-scheme-primary);
  }
  .primary > .bar {
    width: 3rem;
    border-radius: 0.1875rem 0.1875rem 0 0;
    margin-left: calc(50% / var(--items));
    transform: translateX(-50%);
  }

  .bar {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .bar {
      background-color: selecteditem;
    }
  }
</style>
