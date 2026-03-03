<script lang="ts">
  import type { Snippet } from "svelte";
  import type { DivAttrs } from "$lib/misc/typing-utils";

  let {
    round = false,
    children,
    ...extra
  }: { round?: boolean; children: Snippet } & DivAttrs = $props();
</script>

<div class="m3-container" class:round {...extra}>
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
