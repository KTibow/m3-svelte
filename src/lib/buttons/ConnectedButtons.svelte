<script lang="ts">
  import type { Snippet } from "svelte";

  let { round = false, children }: { round?: boolean; children: Snippet } = $props();
</script>

<div class="m3-container" class:round>
  {@render children()}
</div>

<style>
  .m3-container {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 0.125rem;
    border-radius: var(--m3-shape-full);
    overflow: hidden;
  }
</style>
