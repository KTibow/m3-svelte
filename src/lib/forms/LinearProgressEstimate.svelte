<script lang="ts">
  let { sToHalfway = 1, height = 4 }: { sToHalfway?: number; height?: number } = $props();
</script>

<div
  class="m3-container"
  role="progressbar"
  style:height="{height / 16}rem"
  style:--speed="{sToHalfway * 8}s"
>
  <div class="percent"></div>
  <div class="track"></div>
</div>

<style>
  .m3-container {
    display: flex;
    gap: 0.25rem;
  }
  .percent {
    background-color: var(--m3c-primary);
    border-radius: var(--m3-shape-full);
    flex-shrink: 0;
    animation: grow var(--m3-timing-function-zeno) var(--speed) both;
  }
  @keyframes grow {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
  .track {
    background-color: var(--m3c-secondary-container);
    border-radius: var(--m3-shape-full);
    flex-grow: 1;
  }
</style>
