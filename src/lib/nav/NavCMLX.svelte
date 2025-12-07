<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    variant,
    children,
  }: {
    variant: "compact" | "medium" | "large" | "extra-large" | "auto";
    children: Snippet;
  } = $props();
</script>

<nav class="m3-container {variant}">
  {@render children()}
</nav>

<style>
  @mixin --cmlx-compact {
    background-color: var(--m3c-surface-container);
    justify-content: space-evenly;
  }

  @mixin --cmlx-medium {
    background-color: var(--m3c-surface-container);
    justify-content: center;
  }

  @mixin --cmlx-large {
    flex-direction: column;
    gap: 0.25rem;
    width: 6rem;
  }

  @mixin --cmlx-extra-large {
    flex-direction: column;
    padding-block: 1.25rem;
    min-width: 13.75rem;
    max-width: 22.5rem;
  }

  .m3-container {
    display: flex;
    &.compact {
      @apply --cmlx-compact;
    }
    &.medium {
      @apply --cmlx-medium;
    }
    &.large {
      @apply --cmlx-large;
    }
    &.extra-large {
      @apply --cmlx-extra-large;
    }
  }

  .m3-container.auto {
    @media (width < 37.5rem) {
      /* Compact */
      @apply --cmlx-compact;
    }
    @media (37.5rem <= width < 52.5rem) {
      /* Medium */
      @apply --cmlx-medium;
    }
    @media (52.5rem <= width < 100rem) {
      /* Large */
      @apply --cmlx-large;
    }
    @media (100rem <= width) {
      /* Extra large */
      @apply --cmlx-extra-large;
    }
  }
</style>
