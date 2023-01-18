<script lang="ts">
  import { genCSS, type SerializedScheme } from "./utils";

  export let lightScheme: SerializedScheme;
  export let darkScheme: SerializedScheme;
  const hexCode = (argb: number) => "#" + ((argb & 0xffffff) + 0x1000000).toString(16).slice(1);
  const getPrimary = (scheme: SerializedScheme) =>
    scheme.find((color) => color[0] == "primary")![1];
  $: styling = genCSS(lightScheme, darkScheme);
</script>

<svelte:head>
  <meta name="theme-color" content={hexCode(getPrimary(lightScheme))} />
  <meta
    name="theme-color"
    media="(prefers-color-scheme: dark)"
    content={hexCode(getPrimary(darkScheme))}
  />
</svelte:head>
{@html `<sty${""}le>${styling}</sty${""}le>`}
