<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  let icon: IconifyIcon;
  let width: string = "1em";
  let height: string = "1em";
  let clazz: string | undefined = undefined;
  export { icon, width, height, clazz as class };
</script>

<svg {width} {height} class={clazz} viewBox="0 0 {icon.width} {icon.height}">
  {@html icon.body}
</svg>
