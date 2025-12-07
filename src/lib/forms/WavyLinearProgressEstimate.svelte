<script lang="ts">
  import { linear, trackOpacity } from "./_wavy";

  let {
    sToHalfway = 1,
    width = 600,
    height = 10,
    thickness = 4,
  }: { sToHalfway?: number; width?: number; height?: number; thickness?: number } = $props();

  let left = $derived(thickness * 0.5);
  let right = $derived(width - thickness * 0.5);
  let endTime = $derived(sToHalfway * 8);

  const expressiveSMIL = $derived.by(() => {
    let paths: string[] = [];

    for (let time = 0; time < endTime; time += 1 / 30) {
      let value = 1 - Math.pow(0.5, time / sToHalfway);
      if (value == 0) value = 0.001;
      const ms = time * 1000;
      paths.push(
        linear(
          height / 2 - thickness / 2,
          height / 2,
          left,
          right,
          ms,
          value * (right - left) + left,
        ),
      );
    }
    return paths.join(";");
  });
  const infiniteSMIL = $derived.by(() => {
    let paths: string[] = [];
    for (let time = 0; time <= 1; time += 1 / 30) {
      paths.push(linear(height / 2 - thickness / 2, height / 2, left, right, time * 1000));
    }
    return paths.join(";");
  });
  let { trackSMIL, opacitySMIL } = $derived.by(() => {
    let xs: number[] = [];
    let opacities: number[] = [];

    for (let time = 0; time < endTime; time += 1 / 30) {
      const value = 1 - Math.pow(0.5, time / sToHalfway);
      const percentX = value * (right - left) + left;
      const x = percentX + thickness + 4;
      xs.push(x);

      opacities.push(trackOpacity(right, x));
    }
    return {
      trackSMIL: xs.join(";"),
      opacitySMIL: opacities.join(";"),
    };
  });
</script>

<svg viewBox="0 0 {width} {height}">
  <path fill="none" stroke="var(--m3c-primary)" stroke-width={thickness} stroke-linecap="round">
    <animate attributeName="d" dur="{endTime}s" values={expressiveSMIL} />
    <animate
      attributeName="d"
      dur="1s"
      begin="{endTime}s"
      repeatCount="indefinite"
      values={infiniteSMIL}
    />
  </path>
  <line
    fill="none"
    stroke="var(--m3c-secondary-container)"
    stroke-width={thickness}
    stroke-linecap="round"
    y1={height / 2}
    x2={right}
    y2={height / 2}
  >
    <animate attributeName="x1" dur="{endTime}s" values={trackSMIL} />
    <animate attributeName="opacity" dur="{endTime}s" values={opacitySMIL} fill="freeze" />
  </line>
</svg>
