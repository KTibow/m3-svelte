<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  interface Props {
    display?: string;
    extraOptions?: HTMLAttributes<HTMLElement>;
    children?: import("svelte").Snippet;
  }

  let { display = "flex", extraOptions = {}, children }: Props = $props();
</script>

<nav class="m3-container" style="display: {display};" {...extraOptions}>
  {@render children?.()}
</nav>

<style>
  .m3-container {
    flex-direction: column;
    width: 22.5rem;
    padding: 1rem 0.75rem 0 0.75rem;
    background-color: rgb(var(--m3-scheme-surface));
  }
</style>
