<script lang="ts">
  import type { LabelledAria } from "$lib/misc/typing-utils";

  let {
    percent,
    height = 4,
    ...props
  }: { percent: number; height?: number } & LabelledAria = $props();
</script>

<div
  class="m3-container"
  role="progressbar"
  aria-valuenow={percent}
  style:height="{height / 16}rem"
  {...props}
>
  <div class="percent" style:width="{percent}%"></div>
  <div class="track"></div>
</div>

<style>
  .m3-container {
    display: flex;
    gap: 0.25rem;
  }
  .percent {
    background-color: rgb(var(--m3-scheme-primary));
    border-radius: var(--m3-util-rounding-full);
    flex-shrink: 0;
    transition: var(--m3-util-easing-fast);
  }
  .track {
    background-color: rgb(var(--m3-scheme-secondary-container));
    border-radius: var(--m3-util-rounding-full);
    flex-grow: 1;
  }
</style>
