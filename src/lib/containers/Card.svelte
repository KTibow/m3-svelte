<script lang="ts">
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> & HTMLButtonAttributes = {};
  export let type: "elevated" | "filled" | "outlined";
</script>

<div class="m3-container type-{type}" style="display: {display};" {...extraOptions}>
  <div class="layer tonal" />
  <slot />
</div>

<style>
  .m3-container {
    flex-direction: column;
    position: relative;
    overflow: hidden;
    padding: 1rem; /* protip: use margin: -1rem (adjust as needed) to make images stretch to the end */
    border: none;
    border-radius: 0.75rem;
    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface));
    transition: all 200ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .type-elevated > .layer.tonal {
    background-color: rgb(var(--m3-scheme-primary) / 0.05);
  }
  .type-outlined {
    border: solid 0.0625rem rgb(var(--m3-scheme-outline));
  }
  .type-filled {
    background-color: rgb(var(--m3-scheme-surface-variant));
  }

  .type-elevated {
    box-shadow: var(--m3-util-elevation-1);
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
