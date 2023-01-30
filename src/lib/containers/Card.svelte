<script lang="ts">
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> & HTMLButtonAttributes = {};
  export let type: "elevated" | "filled" | "outlined";
  export let clickable = false;
</script>

<svelte:element
  this={clickable ? "button" : "div"}
  class="m3-container type-{type}"
  style="display: {display};"
  on:click
  {...extraOptions}
>
  <div class="layer tonal" />
  <div class="layer state" />
  <slot />
</svelte:element>

<style>
  .m3-container {
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding: 1rem; /* protip: use margin: -1rem (adjust as needed) to make images stretch to the end */
    border: none;
    border-radius: 0.75rem;
    background-color: rgb(var(--md-sys-color-surface));
    color: rgb(var(--md-sys-color-on-surface));
    transition: all 200ms;
  }
  button {
    text-align: inherit;
    font: inherit;
    cursor: pointer;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 200ms;
    pointer-events: none;
  }

  .type-elevated > .layer.tonal {
    background-color: rgb(var(--md-sys-color-primary) / 0.05);
  }
  .type-outlined {
    border: solid 1px rgb(var(--md-sys-color-outline));
  }
  .type-filled {
    background-color: rgb(var(--md-sys-color-surface-variant));
  }

  .type-elevated,
  button:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  button.type-elevated:hover {
    box-shadow: var(--md-sys-elevation-2);
  }
  button:hover > .layer.state {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  button:is(:focus-visible, :active) > .layer.state {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
</style>
