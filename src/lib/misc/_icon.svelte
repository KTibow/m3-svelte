<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  export let icon: IconifyIcon;
  export let width: string = "1em";
  export let height: string = "1em";
  let clazz: string | undefined = undefined;
  export { clazz as class };
</script>

<svg {width} {height} class={clazz} viewBox="0 0 {icon.width} {icon.height}">
  {@html icon.body}
</svg>
