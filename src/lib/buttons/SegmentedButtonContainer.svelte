<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
</script>

<div class="m3-container" style="display: {display};" {...extraOptions}>
  <slot />
</div>

<style>
  .m3-container {
    border: 0.0625rem solid rgb(var(--m3-scheme-outline));
    height: 2.5rem;
    border-radius: 2.5rem;
    overflow: hidden;
  }
  .m3-container > :global(input) {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>
