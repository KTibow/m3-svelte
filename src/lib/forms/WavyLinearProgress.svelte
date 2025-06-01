<script lang="ts">
  import { onMount, untrack } from "svelte";
  import { linear, trackOpacity } from "./_wavy";

  let {
    width = 600,
    height = 10,
    thickness = 4,
    percent,
  }: { width?: number; height?: number; thickness?: number; percent: number } = $props();

  let time = $state(0);

  let top = $derived(thickness * 0.5);
  let bottom = $derived(height - thickness * 0.5);
  let left = $derived(thickness * 0.5);
  let right = $derived(width - thickness * 0.5);
  let percentX = $derived((percent / 100) * (right - left) + left);

  const getSMILData = (time: number) => {
    let paths: string[] = [];
    for (let x = 0; x <= 1000; x += 1000 / 30) {
      paths.push(linear(top, bottom, left, percentX, time + x));
    }
    return paths.join(";");
  };

  onMount(() => {
    let mounted = true;
    const start = performance.now();
    const update = () => {
      if (!mounted) return;

      time = performance.now() - start;
      requestAnimationFrame(update);
    };
    update();
    return () => (mounted = false);
  });
</script>

<svg viewBox="0 0 {width} {height}">
  <path
    fill="none"
    stroke="rgb(var(--m3-scheme-primary))"
    stroke-width={thickness}
    stroke-linecap="round"
  >
    <animate
      attributeName="d"
      dur="1s"
      repeatCount="indefinite"
      values={getSMILData(untrack(() => time))}
    />
  </path>
  <line
    fill="none"
    stroke="rgb(var(--m3-scheme-secondary-container))"
    stroke-width={thickness}
    stroke-linecap="round"
    x1={percentX + thickness + 4}
    y1={height / 2}
    x2={right}
    y2={height / 2}
    opacity={trackOpacity(right, percentX + thickness + 4)}
  />
</svg>
