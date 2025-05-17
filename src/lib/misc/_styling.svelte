<!--
  @component
  @deprecated Directly set styles instead
-->
<script lang="ts">
  import { genCSS, type SerializedScheme } from "./utils";

  interface Props {
    lightScheme: SerializedScheme;
    darkScheme: SerializedScheme;
  }

  let { lightScheme, darkScheme }: Props = $props();
  const hexCode = (argb: number) => "#" + ((argb & 0xffffff) + 0x1000000).toString(16).slice(1);
  let styling = $derived(genCSS(lightScheme, darkScheme));
</script>

<svelte:head>
  <meta name="theme-color" content={hexCode(lightScheme["primary"])} />
  <meta
    name="theme-color"
    media="(prefers-color-scheme: dark)"
    content={hexCode(darkScheme["primary"])}
  />
</svelte:head>
{@html `<${""}style>${styling}</${""}style>`}
