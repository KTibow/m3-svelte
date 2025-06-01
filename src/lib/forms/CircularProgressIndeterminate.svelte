<!--
@component
@deprecated use LoadingIndicator or one of the Estimate components instead
-->
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let extra: HTMLAttributes<SVGElement> = $props();
</script>

<svg
  viewBox="0 0 48 48"
  xmlns="http://www.w3.org/2000/svg"
  class="m3-container"
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
    animation: progressRotate 2.2s infinite linear;
  }
  circle {
    transition: var(--m3-util-easing-fast);
    animation: progressSize 2.2s infinite linear;
  }
  @keyframes progressRotate {
    0% {
      transform: rotate(0deg);
    }
    40% {
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
    40% {
      stroke-dashoffset: 62.83;
    }
    100% {
      stroke-dashoffset: 125.66;
    }
  }
</style>
