<script lang="ts">
  export let percent: number | null = null;
  export let display = "inline-flex";
</script>

<div class="m3-container" style="display: {display};" role="progressbar" {...$$props}>
  <div class="percent" class:indeterminate={percent === null} style="width: {percent}%;" />
</div>

<style>
  .m3-container {
    background-color: rgb(var(--md-sys-color-surface-variant));
    height: 0.25rem;
    min-width: 8rem;
    position: relative;
    overflow: hidden;
  }
  .percent {
    background-color: rgb(var(--md-sys-color-primary));
    transition: all 150ms;
  }
  .indeterminate {
    animation: progress infinite 1s ease-out;
    width: 50%;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  @keyframes progress {
    0% {
      left: -50%;
    }
    100% {
      left: 100%;
    }
  }
</style>
