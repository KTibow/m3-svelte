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
</script>

{@html `<style>${themeStyle}</style>`}
<BaseStyles />
