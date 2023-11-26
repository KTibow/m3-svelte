<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  export let percent: number;
</script>

<div class="m3-container" style="display: {display};" role="progressbar" {...extraOptions}>
  <div class="percent" style="width: {percent}%;" />
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
    transition: all 200ms;
    border-radius: var(--m3-linear-progress-indicator-shape);
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
