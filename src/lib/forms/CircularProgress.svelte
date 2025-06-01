<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let {
    percent,
    size = 48,
    thickness = 4,
  }: { percent: number; size?: number; thickness?: number } & HTMLAttributes<SVGElement> = $props();

  let r = $derived(size / 2 - thickness / 2);
  let circumference = $derived(Math.PI * r * 2);
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 {size} {size}"
  xmlns="http://www.w3.org/2000/svg"
  class="m3-container"
  role="progressbar"
>
  <circle
    cx={size / 2}
    cy={size / 2}
    {r}
    stroke="rgb(var(--m3-scheme-secondary-container))"
    stroke-width={thickness}
    fill="none"
  />
  <circle
    cx={size / 2}
    cy={size / 2}
    {r}
    stroke="rgb(var(--m3-scheme-primary))"
    stroke-width={thickness}
    stroke-dasharray="{circumference} {circumference}"
    stroke-dashoffset={(percent / -100) * circumference + circumference}
    stroke-linecap="round"
    fill="none"
  />
</svg>

<style>
  svg {
    rotate: -90deg;
  }
  circle {
    transition: var(--m3-util-easing-fast);
  }
</style>
