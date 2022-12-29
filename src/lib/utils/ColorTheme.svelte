<script lang="ts">
  import type { Theme } from "@importantimport/material-color-utilities";
  import BaseStyles from "./BaseStyles.svelte";
  import { genCSS } from "./colorScheme";
  export let theme: Theme;
  let themeStyle;
  $: themeStyle = genCSS(
    Object.entries(theme.schemes.light.toJSON()),
    Object.entries(theme.schemes.dark.toJSON())
  );
</script>

{@html `<style>${themeStyle}</style>`}
<BaseStyles />
