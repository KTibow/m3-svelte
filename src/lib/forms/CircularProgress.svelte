<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<SVGElement> = {};
  export let percent: number;
</script>

<svg
  viewBox="0 0 48 48"
  xmlns="http://www.w3.org/2000/svg"
  class="m3-container"
  class:indeterminate={percent === null}
  style="display: {display}; --percent: {percent}px;"
  role="progressbar"
  {...extraOptions}
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
