<script lang="ts">
  import BaseStyles from "./BaseStyles.svelte";
  import { genCSS } from "./colorScheme";
  export let light: [string, number][], dark: [string, number][];
  let themeStyle;
  $: themeStyle = genCSS(light, dark);
  function hexCode(argb: number) {
    return "#" + ((argb & 0xffffff) + 0x1000000).toString(16).slice(1);
  }
  $: lightMainColor = hexCode(light.find((item) => item[0] == "primary")![1]);
  $: darkMainColor = hexCode(dark.find((item) => item[0] == "primary")![1]);
</script>

<svelte:head>
  <meta name="theme-color" content={lightMainColor} />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content={darkMainColor} />
</svelte:head>
{@html `<style>${themeStyle}</style>`}
<BaseStyles />
