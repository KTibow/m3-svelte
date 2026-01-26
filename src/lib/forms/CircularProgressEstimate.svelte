<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  let {
    sToHalfway = 1,
    size = 48,
    thickness = 4,
    ...extra
  }: {
    sToHalfway?: number;
    size?: number;
    thickness?: number;
  } & HTMLAttributes<SVGElement> = $props();

  let r = $derived(size / 2 - thickness / 2);
  let circumference = $derived(Math.PI * r * 2);

  /* Easing calculated the same way it was in LinearProgressEstimate */
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 {size} {size}"
  class="m3-container"
  role="progressbar"
  style:--speed="{sToHalfway * 8}s"
  style:--circumference={circumference}
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
    stroke-linecap="round"
    fill="none"
    class="percent"
  />
</svg>

<style>
  .m3-container {
    rotate: -90deg;
  }

  .percent {
    animation: grow var(--m3-timing-function-zeno) var(--speed) both;
  }

  @keyframes grow {
    0% {
      stroke-dashoffset: var(--circumference);
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
</style>
