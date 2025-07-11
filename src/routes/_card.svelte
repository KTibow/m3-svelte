<script lang="ts">
  import type { Snippet } from "svelte";
  import iconCode from "@ktibow/iconset-material-symbols/code";
  import Icon from "$lib/misc/_icon.svelte";
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
</script>

<div class="container">
  {#if children}
    <h2 class="m3-font-headline-medium">
      {title}
    </h2>
    <div class="controls">
      <div>
        {@render children()}
      </div>
      <button onclick={showCode}>
        <Layer />
        <Icon icon={iconCode} width="1.5rem" height="1.5rem" />
      </button>
    </div>
  {:else}
    <button class="name m3-font-headline-medium" onclick={showCode}>
      <Layer />
      {title}
      <Icon icon={iconCode} width="1.5rem" height="1.5rem" />
    </button>
  {/if}
  {@render demo()}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  h2 {
    display: flex;
    justify-content: space-between;

    background-color: rgb(var(--m3-scheme-surface-container-low));
    border-radius: 1.5rem 1.5rem 0.5rem 0.5rem;

    padding: 0.75rem;
    line-height: 1.1;
    margin: 0;
    margin-bottom: 0.5rem;
    flex-grow: 1;
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
    border-radius: 0.5rem 0.5rem 0.5rem 1.5rem;
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-on-surface));
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
    border-radius: 0.5rem 0.5rem 1.5rem 1.5rem;
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-primary));

    min-width: 3rem;
    min-height: 3rem;
    flex-grow: 1;
    position: relative;
    padding: 0;
    border: none;
    cursor: pointer;
  }
  .controls > div + button {
    flex-grow: 0;
    border-radius: 0.5rem 0.5rem 1.5rem 0.5rem;
  }

  .name {
    display: flex;
    flex-direction: column;
    text-align: left;
    border-radius: 1.5rem;
    padding: 0.75rem;
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-primary));

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
