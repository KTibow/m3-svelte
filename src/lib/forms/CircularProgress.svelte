<script lang="ts">
  import type { LabelledAria } from "$lib/misc/typing-utils";

  let {
    percent,
    size = 48,
    thickness = 4,
    ...extra
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
  aria-valuenow={percent}
  {...extra}
>
  <circle
    cx={size / 2}
    cy={size / 2}
    {r}
    stroke="var(--m3c-secondary-container)"
    stroke-width={thickness}
    fill="none"
  />
  <circle
    cx={size / 2}
    cy={size / 2}
    {r}
    stroke="var(--m3c-primary)"
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
    transition: var(--m3-easing-fast);
  }
</style>
