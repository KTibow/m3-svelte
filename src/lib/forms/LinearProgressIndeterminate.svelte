<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
</script>

<div class="m3-container" style="display: {display};" role="progressbar" {...extraOptions}>
  <div class="percent" />
</div>

<style>
  :root {
    --m3-linear-progress-track-shape: var(--m3-util-rounding-none);
    --m3-linear-progress-indicator-shape: var(--m3-util-rounding-none);
  }
  .m3-container {
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    height: 0.25rem;
    min-width: 8rem;
    position: relative;
    overflow: hidden;
    border-radius: var(--m3-linear-progress-track-shape);
  }
  .percent {
    background-color: rgb(var(--m3-scheme-primary));
    animation: progress infinite 1.5s ease-out;
    border-radius: var(--m3-linear-progress-indicator-shape);
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
      left: 125%;
    }
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .percent {
      background-color: selecteditem;
    }
  }
</style>
