<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";

  type ActionProps =
    | ({ click: () => void } & HTMLButtonAttributes)
    | HTMLAttributes<HTMLDivElement>;

  let props: {
    variant: "elevated" | "filled" | "outlined";
    children: Snippet;
  } & ActionProps = $props();
</script>

{#if "click" in props}
  {@const { variant, click, children, ...extra } = props}
  <button class="m3-container {variant}" onclick={click} {...extra}>
    <Layer />
    {@render children()}
  </button>
{:else}
  {@const { variant, children, ...extra } = props}
  <div class="m3-container {variant}" {...extra}>
    {@render children()}
  </div>
{/if}

<style>
  :root {
    --m3-card-shape: var(--m3-util-rounding-medium);
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem; /* protip: use margin: -1rem (adjust as needed) to make images stretch to the end */
    border: none;
    border-radius: var(--m3-card-shape);
    background-color: rgb(var(--m3-scheme-surface));
    --m3-util-background: var(--m3-scheme-surface);
    color: rgb(var(--m3-scheme-on-surface));
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

  .elevated {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    --m3-util-background: var(--m3-scheme-surface-container-low);
    box-shadow: var(--m3-util-elevation-1);
  }
  .filled {
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    --m3-util-background: var(--m3-scheme-surface-container-highest);
  }
  .outlined {
    border: solid 1px rgb(var(--m3-scheme-outline-variant));
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
