<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let { percent, ...extra }: { percent: number } & HTMLAttributes<SVGElement> = $props();
</script>

<svg
  viewBox="0 0 48 48"
  xmlns="http://www.w3.org/2000/svg"
  class="m3-container"
  style:--percent="{percent}px"
  role="progressbar"
  {...extra}
>
  <circle
    cx="24"
    cy="24"
    r="20"
    stroke="rgb(var(--m3-scheme-primary))"
    stroke-width="4"
    stroke-dasharray="125.66 125.66"
    stroke-linecap="round"
    fill="none"
  />
</svg>

<style>
  svg {
    width: 3rem;
    height: 3rem;
    transform: rotate(-90deg);
  }
  circle {
    stroke-dashoffset: calc((var(--percent) / -100 + 1px) * 125.66);
    transition: all 200ms;
  }
</style>
