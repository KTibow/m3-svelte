<script lang="ts">
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

  interface Props {
    display?: string;
    extraOptions?: HTMLAttributes<HTMLDivElement> & HTMLButtonAttributes;
    type: "elevated" | "filled" | "outlined";
    children?: import("svelte").Snippet;
  }

  let { display = "flex", extraOptions = {}, type, children }: Props = $props();
</script>

<div class="m3-container type-{type}" style="display: {display};" {...extraOptions}>
  {@render children?.()}
</div>

<style>
  :root {
    --m3-card-shape: var(--m3-util-rounding-medium);
  }

  .m3-container {
    flex-direction: column;
    position: relative;
    padding: 1rem; /* protip: use margin: -1rem (adjust as needed) to make images stretch to the end */
    border-radius: var(--m3-card-shape);
    background-color: rgb(var(--m3-scheme-surface));
    color: rgb(var(--m3-scheme-on-surface));
  }

  .type-elevated {
    background-color: rgb(var(--m3-scheme-surface-container-low));
  }
  .type-filled {
    background-color: rgb(var(--m3-scheme-surface-container-highest));
  }
  .type-outlined {
    border: solid 0.0625rem rgb(var(--m3-scheme-outline-variant));
  }

  .type-elevated {
    box-shadow: var(--m3-util-elevation-1);
  }

  @media print, (forced-colors: active) {
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
