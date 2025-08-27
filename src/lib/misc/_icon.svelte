<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";

  let {
    icon,
    width = "1em",
    height = "1em",
    class: clazz,
    ...props
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
  aria-hidden={!props["aria-label"] && !props["aria-labelledby"]}
  {...props}
>
  {@html icon.body}
</svg>
