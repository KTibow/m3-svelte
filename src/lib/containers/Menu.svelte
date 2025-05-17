<script lang="ts">
  interface Props {
    display?: string;
    children?: import("svelte").Snippet;
  }

  let { display = "flex", children }: Props = $props();
</script>

<div class="m3-container" style="display: {display};">
  {@render children?.()}
</div>

<style>
  :root {
    --m3-menu-shape: var(--m3-util-rounding-extra-small);
  }
  .m3-container {
    position: relative;
    overflow: hidden;
    flex-direction: column;
    padding: 0.5rem 0;
    border-radius: var(--m3-menu-shape);
    min-width: 7rem;
    max-width: 17.5rem;
    background-color: rgb(var(--m3-scheme-surface-container));
    z-index: 2;
    box-shadow: var(--m3-util-elevation-2);
  }
</style>
