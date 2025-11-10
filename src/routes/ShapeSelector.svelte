<script lang="ts">
  import * as _paths from "$lib/misc/shapes";
  import type { HTMLSelectAttributes } from "svelte/elements";
  const paths = _paths as Record<string, string>;

  let { shape = $bindable(), ...extra }: { shape: string } & HTMLSelectAttributes = $props();
</script>

<select bind:value={shape} {...extra}>
  {#each Object.keys(paths) as key}
    {#snippet content()}
      <svg width="1rem" height="1rem" viewBox="0 0 380 380">
        <path d={paths[key]} fill="rgb(var(--m3-scheme-primary))" />
      </svg>
      {key.replace("path", "")}
    {/snippet}
    <option value={key}>
      {@render content()}
    </option>
  {/each}
</select>

<style>
  select,
  ::picker(select) {
    appearance: base-select;
  }
  select {
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    padding: 0 1rem;
    border-radius: var(--m3-util-rounding-small);
  }
  ::picker(select) {
    border: none;
  }
</style>
