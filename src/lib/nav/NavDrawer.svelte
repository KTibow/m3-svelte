<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<nav class="m3-container">
  {@render children()}
</nav>

<style>
  .m3-container {
    display: flex;
    flex-direction: column;
    width: 22.5rem;
    padding: 1rem 0.75rem 0 0.75rem;
    background-color: rgb(var(--m3-scheme-surface));
  }
</style>
