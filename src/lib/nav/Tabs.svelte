<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLInputAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  let {
    secondary = false,
    tab = $bindable(),
    items,
    ...extra
  }: {
    secondary?: boolean;
    tab: string;
    items: {
      icon?: IconifyIcon;
      name: string;
      value: string;
    }[];
  } & HTMLInputAttributes = $props();
  const name = $props.id();
</script>

<div class="m3-container" class:primary={!secondary} style:--items={items.length}>
  <div class="divider"></div>
  {#each items as item}
    {@const id = name + item.value}
    <input type="radio" {name} {id} value={item.value} bind:group={tab} {...extra} />
    <label for={id} class:tall={item.icon}>
      <Layer />
      {#if item.icon}
        <Icon icon={item.icon} />
      {/if}
      <span class="m3-font-title-small">{item.name}</span>
    </label>
  {/each}
  <div class="bar"></div>
</div>

<style>
  .m3-container {
    display: flex;
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
    height: 1px;
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

    color: rgb(var(--m3-scheme-on-surface-variant));
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: color var(--m3-util-easing-fast);
  }
  label > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (hover: hover) {
    label:hover {
      color: rgb(var(--m3-scheme-on-surface));
    }
  }
  input:focus-visible + label,
  input:active + label,
  input:checked + label {
    color: rgb(var(--m3-scheme-on-surface));
  }

  .bar {
    position: absolute;
    background-color: rgb(var(--m3-scheme-primary));
    width: calc(100% / var(--items));
    height: 0;
    bottom: 0;
    pointer-events: none;
    transition: var(--m3-util-easing-fast-spatial);
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
    color: rgb(var(--m3-scheme-primary));
  }
  .primary > .bar {
    width: 3rem;
    height: 0.1875rem;
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
