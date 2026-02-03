<script lang="ts">
  import type { LabelledAria } from "$lib/misc/typing-utils";

  let {
    percent,
    height = 4,
    ...extra
  }: { percent: number; height?: number } & LabelledAria = $props();
</script>

<div class="m3-container" role="progressbar" style:height="{height / 16}rem" {...extra}>
  <div class="percent" style:width="{percent}%"></div>
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
    transition: var(--m3-easing-fast);
  }
  .track {
    background-color: var(--m3c-secondary-container);
    border-radius: var(--m3-shape-full);
    flex-grow: 1;
  }
</style>
