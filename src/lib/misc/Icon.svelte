<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";

  let {
    icon,
    width = "1em",
    height = "1em",
    class: clazz,
  }: {
    icon: IconifyIcon;
    width?: string;
    height?: string;
    class?: string;
  } = $props();
</script>

<svg
  {width}
  {height}
  class={clazz}
  data-badge={icon.body.includes("<!--badge-->") ? "" : undefined}
  viewBox="0 0 {icon.width} {icon.height}"
>
  {@html icon.body}
</svg>

<style>
  /* deprecated: eventually want to just do this for all icons */
  svg[data-badge] {
    overflow: visible;
  }
</style>
