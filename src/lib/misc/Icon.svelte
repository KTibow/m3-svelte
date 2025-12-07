<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { SVGAttributes } from "svelte/elements";

  let {
    icon,
    size,
    ...extra
  }: {
    icon: IconifyIcon;
    size?: number;
  } & Omit<SVGAttributes<SVGElement>, "width" | "height"> = $props();
</script>

<svg
  width={size || "1em"}
  height={size || "1em"}
  viewBox="0 0 {icon.width} {icon.height}"
  {...extra}
>
  {@html icon.body}
</svg>

<style>
  svg {
    flex-shrink: 0;
    overflow: visible;
  }
</style>
