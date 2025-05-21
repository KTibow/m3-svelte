<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    variant,
    children,
  }: {
    variant: "compact" | "medium" | "large" | "expanded" | "auto";
    children: Snippet;
  } = $props();
</script>

<nav class="m3-container {variant}">
  {@render children()}
</nav>

<style>
  .m3-container {
    display: flex;
    &.compact,
    &.medium {
      background-color: rgb(var(--m3-scheme-surface-container));
    }
    &.compact {
      justify-content: space-evenly;
    }
    &.medium {
      justify-content: center;
    }
    &.large,
    &.expanded {
      flex-direction: column;
    }
    &.large {
      width: 6rem;
      gap: 0.25rem;
    }
    &.expanded {
      padding-block: 1.25rem;
      min-width: 13.75rem;
      max-width: 22.5rem;
    }
  }
  .m3-container.auto {
    @media (width < 37.5rem) {
      /* Compact */
      background-color: rgb(var(--m3-scheme-surface-container));
      justify-content: space-evenly;
    }
    @media (37.5rem <= width < 52.5rem) {
      /* Medium */
      background-color: rgb(var(--m3-scheme-surface-container));
      justify-content: center;
    }
    @media (52.5rem <= width < 100rem) {
      /* Large */
      gap: 0.25rem;
      flex-direction: column;
      width: 6rem;
    }
    @media (100rem <= width) {
      /* Expanded */
      flex-direction: column;
      padding-block: 1.25rem;
      min-width: 13.75rem;
      max-width: 22.5rem;
    }
  }
</style>
