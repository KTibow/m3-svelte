<script lang="ts">
  export let container: HTMLDivElement | null = null;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="m3-container"
  bind:this={container}
  on:wheel|preventDefault
  on:touchstart|preventDefault
  on:mousedown|stopPropagation
>
  <slot />
</div>

<style>
  .m3-container {
    background-color: rgb(var(--m3-scheme-primary) / 0.05);
    min-height: 100%;
    padding: 0 1rem;
  }
</style>
