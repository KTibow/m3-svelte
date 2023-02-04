<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<SVGElement> = {};
  export let percent: number | null = null;
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
  .indeterminate {
    animation: progressRotate 2.5s infinite linear;
  }
  .indeterminate circle {
    animation: progressSize 2.5s infinite linear;
  }
  @keyframes progressRotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(1080deg);
    }
  }
  @keyframes progressSize {
    0% {
      stroke-dashoffset: 125.66;
    }
    50% {
      stroke-dashoffset: 62.83;
    }
    100% {
      stroke-dashoffset: 125.66;
    }
  }
</style>
