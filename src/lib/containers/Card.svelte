<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";

  type ActionProps =
    | ({ click: () => void } & Omit<HTMLButtonAttributes, "type">)
    | HTMLAttributes<HTMLDivElement>;

  let props: {
    type: "elevated" | "filled" | "outlined";
    children: Snippet;
  } & ActionProps = $props();
</script>

{#if "click" in props}
  {@const { type, click, children, ...extra } = props}
  <button class="m3-container type-{type}" {...extra}>
    <Layer />
    {@render children()}
  </button>
{:else}
  {@const { type, children, ...extra } = props}
  <div class="m3-container type-{type}" {...extra}>
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
