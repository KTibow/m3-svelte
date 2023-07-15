<script lang="ts">
  export let display = "flex";
</script>

<div class="m3-container" style="display: {display};">
  <div class="layer" />
  <slot />
</div>

<style>
  .m3-container {
    position: relative;
    overflow: hidden;
    flex-direction: column;
    padding: 0.5rem 0;
    border-radius: 0.25rem;
    min-width: 7rem;
    max-width: 17.5rem;
    background-color: rgb(var(--m3-scheme-surface));
    z-index: 2;
    box-shadow: var(--m3-util-elevation-2);
  }
  .layer {
    position: absolute;
    inset: 0;
    background-color: rgb(var(--m3-scheme-primary) / 0.05);
    pointer-events: none;
  }
</style>
