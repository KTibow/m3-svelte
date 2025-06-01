<script lang="ts">
  let {
    sToHalfway = 1,
    size = 48,
    thickness = 2,
  }: {
    sToHalfway?: number;
    size?: number;
    thickness?: number;
  } = $props();

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
    animation: grow
      linear(
        0,
        0.08 1.5%,
        0.15 2.93%,
        0.22 4.48%,
        0.29 6.18%,
        0.35 7.77%,
        0.41 9.52%,
        0.47 11.45%,
        0.52 13.24%,
        0.57 15.22%,
        0.61 16.98%,
        0.65 18.93%,
        0.69 21.12%,
        0.73 23.61%,
        0.76 25.74%,
        0.79 28.14%,
        0.82 30.92%,
        0.84 33.05%,
        0.86 35.46%,
        0.88 38.24%,
        0.9 41.52%,
        0.92 45.55%,
        0.93 47.96%,
        0.95 54.02%,
        0.96 58.05%,
        0.97 63.24%,
        0.98 70.55%,
        0.99 83.05%,
        1
      )
      var(--speed) both;
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
