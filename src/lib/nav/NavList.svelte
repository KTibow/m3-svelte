<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    variant,
    children,
  }: {
    variant: "rail" | "bar" | "auto";
    children: Snippet;
  } = $props();
</script>

<nav class="m3-container {variant}">
  {@render children()}
</nav>

<style>
  .m3-container {
    display: flex;
    position: relative;
    flex-grow: 1;
    background-color: rgb(var(--m3-scheme-surface-container));
    padding: 0.75rem 0.5rem 1rem 0.5rem;
    justify-content: space-evenly;
    gap: 0.5rem;
  }

  .rail {
    background-color: rgb(var(--m3-scheme-surface));
    flex-direction: column;
    width: 5rem;
    padding: 3.5rem 0;
    justify-content: flex-start;
    gap: 0.75rem;
  }
  @media (min-width: 37.5rem) {
    .auto {
      background-color: rgb(var(--m3-scheme-surface));
      flex-direction: column;
      width: 5rem;
      padding: 3.5rem 0;
      justify-content: flex-start;
      gap: 0.75rem;
    }
  }
</style>
