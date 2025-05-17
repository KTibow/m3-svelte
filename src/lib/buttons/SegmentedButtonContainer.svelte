<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let { children, ...extra }: { children: Snippet } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="m3-container" {...extra}>
  {@render children()}
</div>

<style>
  :root {
    --m3-segmented-button-shape: var(--m3-util-rounding-full);
  }

  .m3-container {
    display: inline-flex;
    border: 0.0625rem solid rgb(var(--m3-scheme-outline));
    height: 2.5rem;
    border-radius: var(--m3-segmented-button-shape);
    overflow: hidden;
  }
  .m3-container > :global(input) {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>
