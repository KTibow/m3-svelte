<script lang="ts">
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> & HTMLButtonAttributes = {};
  export let type: "elevated" | "filled" | "outlined";
</script>

<button
  on:click|stopPropagation
  class="m3-container type-{type}"
  style="display: {display};"
  {...extraOptions}
>
  <Layer />
  <slot />
</button>

<style>
  :root {
    --m3-card-shape: var(--m3-util-rounding-medium);
  }
  .m3-container {
    flex-direction: column;
    position: relative;
    padding: 1rem; /* protip: use margin: -1rem (adjust as needed) to make images stretch to the end */
    border: none;
    border-radius: var(--m3-card-shape);
    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface));
    transition: all 200ms;
  }

  .type-elevated {
    background-color: rgb(var(--m3-scheme-surface-container-low));
  }
  .type-filled {
    background-color: rgb(var(--m3-scheme-surface-container-highest));
  }
  .type-outlined {
    border: solid 0.0625rem rgb(var(--m3-scheme-outline));
  }

  .type-elevated {
    box-shadow: var(--m3-util-elevation-1);
  }

  button {
    text-align: inherit;
    font: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    button:hover {
      box-shadow: var(--m3-util-elevation-1);
    }
    button.type-elevated:hover {
      box-shadow: var(--m3-util-elevation-2);
    }
  }

  @media print, (forced-colors: active) {
    .layer {
      display: none;
    }
    .type-filled {
      outline: solid 0.125rem;
    }
  }
  @media (forced-colors: active) {
    .type-elevated {
      outline: solid 0.125rem;
    }
  }
</style>
