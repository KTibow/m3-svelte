<script lang="ts">
  export let container: HTMLDivElement | null = null;
</script>

<div class="m3-container" bind:this={container}>
  <slot />
</div>

<style>
  .m3-container {
    background-color: rgb(var(--md-sys-color-primary) / 0.05);
    min-height: 100%;
    padding: 0 1rem;
  }
</style>
