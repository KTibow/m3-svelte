<script lang="ts">
  import * as _paths from "$lib/misc/shapes";
  import type { HTMLSelectAttributes } from "svelte/elements";
  const paths = _paths as Record<string, string>;

  let { shape = $bindable(), ...extra }: { shape: string } & HTMLSelectAttributes = $props();
</script>

<label>
  <span>Shape</span>
  <select bind:value={shape} {...extra}>
    {#each Object.keys(paths) as key}
      {#snippet content()}
        <svg width="1rem" height="1rem" viewBox="0 0 380 380">
          <path d={paths[key]} fill="var(--m3c-primary)" />
        </svg>
        {key.replace("path", "")}
      {/snippet}
      <option value={key}>
        {@render content()}
      </option>
    {/each}
  </select>
</label>

<style>
  label {
    display: flex;
    position: relative;
    background-color: var(--m3c-surface-container);
    border-radius: var(--m3-shape-small);
    height: auto !important;
  }
  span {
    @apply --m3-body-small;
    position: absolute;
    left: 0.5rem;
    top: 0.125rem;
  }
  select,
  ::picker(select) {
    appearance: base-select;
  }
  select {
    @apply --m3-body-large;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    padding-block: 1rem 0;
    padding-inline: 0.5rem;
    background-color: transparent;
  }
  ::picker(select) {
    border: none;
  }
</style>
