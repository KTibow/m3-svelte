<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  interface Props {
    display?: string;
    extraOptions?: HTMLAttributes<HTMLDivElement>;
    children?: import("svelte").Snippet;
  }

  let { display = "inline-flex", extraOptions = {}, children }: Props = $props();
</script>

<div class="m3-container" style="display: {display};" {...extraOptions}>
  {@render children?.()}
</div>

<style>
  :root {
    --m3-segmented-button-shape: var(--m3-util-rounding-full);
  }

  .m3-container {
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
