<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLElement> = {};
</script>

<nav class="m3-container" style="display: {display};" {...extraOptions}>
  <slot />
</nav>

<style>
  .m3-container {
    flex-direction: column;
    width: 22.5rem;
    padding: 1rem 0.75rem 0 0.75rem;
    background-color: rgb(var(--m3-scheme-surface));
  }
</style>
