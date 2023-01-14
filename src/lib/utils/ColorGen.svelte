<script lang="ts">
  import {
    argbFromHex,
    themeFromSourceColor,
    type Theme,
  } from "@importantimport/material-color-utilities";
  import BaseStyles from "./BaseStyles.svelte";
  import { genCSS } from "./colorScheme";
  export let color: `#${string}`;
  let theme: Theme, themeStyle;
  $: theme = themeFromSourceColor(argbFromHex(color));
  $: themeStyle = genCSS(
    Object.entries(theme.schemes.light.toJSON()),
    Object.entries(theme.schemes.dark.toJSON())
  );
  function hexCode(argb: number) {
    return "#" + ((argb & 0xffffff) + 0x1000000).toString(16).slice(1);
  }
  $: lightMainColor = hexCode(theme.schemes.light.toJSON()["primary"]);
  $: darkMainColor = hexCode(theme.schemes.dark.toJSON()["primary"]);
</script>

<svelte:head>
  <meta name="theme-color" content={lightMainColor} />
  <meta name="theme-color" media="(prefers-color-scheme: dark)" content={darkMainColor} />
</svelte:head>
{@html `<style>${themeStyle}</style>`}
<BaseStyles />
