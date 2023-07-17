<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  // Both a nav rail and a nav bar.
  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLElement> = {};
  export let type: "rail" | "bar" | "auto";
</script>

<nav class="m3-container type-{type}" style="display: {display};" {...extraOptions}>
  <div class="layer" />
  <slot />
</nav>

<style>
  .m3-container {
    position: relative;
    flex-grow: 1;
    background-color: rgb(var(--m3-scheme-surface));
    padding: 0.75rem 0.5rem 1rem 0.5rem;
    justify-content: space-evenly;
    gap: 0.5rem;
  }
  .layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-color: rgb(var(--m3-scheme-primary) / 0.05);
  }

  .type-rail {
    flex-direction: column;
    width: 5rem;
    padding: 3.5rem 0;
    justify-content: flex-start;
    gap: 0.75rem;
  }
  .type-rail > .layer {
    display: none;
  }
  @media (min-width: 37.5rem) {
    .type-auto {
      flex-direction: column;
      width: 5rem;
      padding: 3.5rem 0;
      justify-content: flex-start;
      gap: 0.75rem;
    }
    .type-auto > .layer {
      display: none;
    }
  }
</style>
