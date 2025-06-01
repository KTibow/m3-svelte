<!--
@component
@deprecated use LoadingIndicator or one of the Estimate components instead
-->
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let extra: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="m3-container" role="progressbar" {...extra}>
  <div class="percent"></div>
</div>

<style>
  :root {
    --m3-linear-progress-shape: var(--m3-util-rounding-full);
  }
  .m3-container {
    display: inline-flex;
    background-color: rgb(var(--m3-scheme-primary-container));
    height: 0.25rem;
    min-width: 8rem;
    position: relative;
    overflow: hidden;
    border-radius: var(--m3-linear-progress-shape);
  }
  .percent {
    background-color: rgb(var(--m3-scheme-primary));
    animation: progress infinite 1.5s ease-out;
    border-radius: var(--m3-linear-progress-shape);
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
