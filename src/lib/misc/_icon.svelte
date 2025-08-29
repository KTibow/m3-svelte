<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";

  let {
    icon,
    width = "1em",
    height = "1em",
    class: clazz,
    ...extra
  }: {
    icon: IconifyIcon;
    width?: string;
    height?: string;
    class?: string;
  } & Partial<{ "aria-label": string; "aria-labelledby": string }> = $props();
</script>

<svg
  {width}
  {height}
  class={clazz}
  viewBox="0 0 {icon.width} {icon.height}"
  aria-hidden={!extra["aria-label"] && !extra["aria-labelledby"]}
  data-badge={icon.body.includes("<!--badge-->") ? "" : undefined}
  {...extra}
>
  {@html icon.body}
</svg>

<style>
  /* deprecated: eventually want to just do this for all icons */
  svg[data-badge] {
    overflow: visible;
  }
</style>
