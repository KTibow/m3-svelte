<script lang="ts">
  import type { Snippet } from "svelte";
  import iconCode from "@ktibow/iconset-material-symbols/code";
  import Icon from "$lib/misc/Icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  let {
    title,
    children,
    demo,
    showCode,
  }: {
    title: string;
    children?: Snippet;
    demo: Snippet;
    showCode: () => void;
  } = $props();

  let id = $derived(`${title.toLowerCase().replaceAll(" ", "-")}-demo`);
</script>

<div class="container">
  {#if children}
    <a href={`#${id}`}>
      <h2 class="m3-font-headline-medium" {id}>
        {title}
      </h2>
    </a>
    <div class="controls">
      <div>
        {@render children()}
      </div>
      <button onclick={showCode}>
        <Layer />
        <Icon icon={iconCode} size={24} />
      </button>
    </div>
  {:else}
    <button class="name m3-font-headline-medium" onclick={showCode}>
      <Layer />
      {title}
      <Icon icon={iconCode} size={24} />
    </button>
  {/if}
  {@render demo()}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  a {
    display: contents;
    color: currentColor;
  }

  h2 {
    display: flex;
    justify-content: space-between;

    background-color: var(--color-surface-container-low);
    border-start-start-radius: 1.5rem;
    border-start-end-radius: 1.5rem;
    border-end-start-radius: 0.5rem;
    border-end-end-radius: 0.5rem;

    padding: 0.75rem;
    line-height: 1.1;
    margin: 0;
    margin-bottom: 0.5rem;
    flex-grow: 1;
  }
  h2:target {
    color: var(--color-primary);
  }
  .controls {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .controls > div {
    display: flex;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border-end-start-radius: 1.5rem;
    background-color: var(--color-surface-container-low);
    color: var(--color-on-surface);
    flex-grow: 1;
    flex-wrap: wrap;

    :global(label:not([for])) {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      height: 2rem;
    }
  }
  .controls > button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border-end-end-radius: 1.5rem;
    background-color: var(--color-surface-container-low);
    color: var(--color-primary);

    min-width: 3rem;
    min-height: 3rem;
    flex-grow: 0;
    position: relative;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  .name {
    display: flex;
    flex-direction: column;
    text-align: left;
    border-radius: 1.5rem;
    padding: 0.75rem;
    background-color: var(--color-surface-container-low);
    color: var(--color-primary);

    flex-grow: 1;
    margin-bottom: 1.5rem;

    position: relative;
    border: none;
    cursor: pointer;
  }
  .name > :global(svg) {
    margin: auto 0 0 auto;
  }
</style>
