<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let {
    percent,
    ...extra
  }: {
    percent: number;
  } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="m3-container" role="progressbar" {...extra}>
  <div class="percent" style:width="{percent}%"></div>
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
    overflow: hidden;
    border-radius: var(--m3-linear-progress-shape);
  }
  .percent {
    background-color: rgb(var(--m3-scheme-primary));
    transition: all 200ms;
    border-radius: var(--m3-linear-progress-shape);
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
