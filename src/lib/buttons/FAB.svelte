<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";

  export let display = "inline-flex";
  export let extraOptions: HTMLButtonAttributes = {};
  export let color: "primary" | "surface" | "secondary" | "tertiary" = "primary";
  export let size: "small" | "normal" | "large" = "normal";
  export let elevation: "normal" | "lowered" | "none" = "normal";
  export let icon: IconifyIcon | undefined = undefined;
  export let text: string | undefined = undefined;
  $: {
    if (!icon && !text) console.warn("you need at least something in a FAB");
    if (size != "normal" && text) console.warn("extended fabs are supposed to use size normal");
  }
</script>

<button
  on:click
  class="m3-container m3-font-label-large color-{color} size-{size} elevation-{elevation}"
  style="display: {display};"
  {...extraOptions}
>
  <div class="layer" />
  {#if icon}
    <Icon {icon} />
  {/if}
  {#if text}
    {text}
  {/if}
</button>

<style>
  :root {
    --m3-fab-small-shape: var(--m3-util-rounding-small);
    --m3-fab-normal-shape: var(--m3-util-rounding-large);
    --m3-fab-large-shape: var(--m3-util-rounding-extra-large);
  }
  button {
    border: none;
    position: relative;
    overflow: hidden;

    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 200ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    transition: all 200ms;
    opacity: 0;
  }

  .elevation-normal {
    box-shadow: var(--m3-util-elevation-3);
  }
  .elevation-lowered {
    box-shadow: var(--m3-util-elevation-1);
  }

  .size-small {
    height: 2.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
    border-radius: var(--m3-fab-small-shape);
  }
  .size-normal {
    height: 3.5rem;
    padding: 1rem;
    gap: 0.75rem;
    border-radius: var(--m3-fab-normal-shape);
  }
  .size-large {
    height: 6rem;
    padding: 1.875rem;
    gap: 1.875rem;
    border-radius: var(--m3-fab-large-shape);
  }
  .size-small > :global(svg),
  .size-normal > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .size-large > :global(svg) {
    width: 2.25rem;
    height: 2.25rem;
  }

  .color-primary {
    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
  }
  .color-primary > .layer {
    background-color: rgb(var(--m3-scheme-on-primary-container));
  }
  .color-surface {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-primary));
  }
  .color-surface.elevation-normal {
    background-color: rgb(var(--m3-scheme-surface-container-high));
  }
  .color-surface > .layer {
    background-color: rgb(var(--m3-scheme-primary));
  }
  .color-secondary {
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
  }
  .color-secondary > .layer {
    background-color: rgb(var(--m3-scheme-on-secondary-container));
  }
  .color-tertiary {
    background-color: rgb(var(--m3-scheme-tertiary-container));
    color: rgb(var(--m3-scheme-on-tertiary-container));
  }
  .color-tertiary > .layer {
    background-color: rgb(var(--m3-scheme-on-tertiary-container));
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    button:hover > .layer {
      opacity: 0.08;
    }
    .elevation-normal:hover {
      box-shadow: var(--m3-util-elevation-4);
    }
    .elevation-lowered:hover {
      box-shadow: var(--m3-util-elevation-2);
    }
  }
  button:focus-visible > .layer,
  button:active > .layer {
    opacity: 0.12;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    button {
      outline: solid 0.25rem;
    }
  }
</style>
