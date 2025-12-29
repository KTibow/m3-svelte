<script lang="ts">
  import type { Snippet } from "svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import type { ButtonAttrs, DivAttrs } from "$lib/misc/typing-utils";

  type ActionProps = ButtonAttrs | DivAttrs;

  let {
    variant,
    children,
    ...extra
  }: {
    variant: "elevated" | "filled" | "outlined";
    children: Snippet;
  } & ActionProps = $props();
</script>

{#if "onclick" in extra}
  <button type="button" class="m3-container {variant}" {...extra}>
    <Layer />
    {@render children()}
  </button>
{:else}
  <div class="m3-container {variant}" {...extra}>
    {@render children()}
  </div>
{/if}

<style>
  @layer tokens {
    :root {
      --m3-card-shape: var(--m3-shape-medium);
    }
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem; /* protip: use margin: -1rem (adjust as needed) to make images stretch to the end */
    border: none;
    border-radius: var(--m3-card-shape);
    background-color: var(--m3c-surface);
    --m3v-background: var(--m3c-surface);
    color: var(--m3c-on-surface);
  }

  button {
    text-align: inherit;
    font: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    transition: box-shadow var(--m3-easing-fast);
  }
  @media (hover: hover) {
    button:hover {
      box-shadow: var(--m3-elevation-1);
    }
    button.elevated:hover {
      box-shadow: var(--m3-elevation-2);
    }
  }

  .elevated {
    background-color: var(--m3c-surface-container-low);
    --m3v-background: var(--m3c-surface-container-low);
    box-shadow: var(--m3-elevation-1);
  }
  .filled {
    background-color: var(--m3c-surface-container-highest);
    --m3v-background: var(--m3c-surface-container-highest);
  }
  .outlined {
    border: solid 1px var(--m3c-outline-variant);
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
