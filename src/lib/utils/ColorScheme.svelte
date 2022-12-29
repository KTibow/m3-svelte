<script lang="ts">
  import BaseStyles from "./BaseStyles.svelte";
  import { genCSS } from "./colorScheme";
  export let light: [string, number][], dark: [string, number][];
  let themeStyle;
  $: themeStyle = genCSS(light, dark);
</script>

{@html `<style>${themeStyle}</style>`}
<BaseStyles />
