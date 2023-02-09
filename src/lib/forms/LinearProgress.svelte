<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  export let percent: number | null = null;
</script>

<div class="m3-container" style="display: {display};" role="progressbar" {...extraOptions}>
  <div class="percent" class:indeterminate={percent == null} style="width: {percent}%;" />
</div>

<style>
  .m3-container {
    background-color: rgb(var(--m3-scheme-surface-variant));
    height: 0.25rem;
    min-width: 8rem;
    position: relative;
    overflow: hidden;
  }
  .percent {
    background-color: rgb(var(--m3-scheme-primary));
    transition: all 200ms;
  }
  .indeterminate {
    animation: progress infinite 1.5s ease-out;
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
  @media (forced-colors: active) {
    .percent {
      background-color: selecteditem;
    }
  }
</style>
