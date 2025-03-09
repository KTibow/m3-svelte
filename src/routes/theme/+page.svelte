<script lang="ts">
  import { Hct, type DynamicScheme } from "@material/material-color-utilities";

  import ColorChooser from "./ColorChooser.svelte";
  import Arrow from "./Arrow.svelte";
  import TransformChooser from "./TransformChooser.svelte";
  import { schemes } from "./data";
  import SchemeShowcase from "./SchemeShowcase.svelte";

  let schemeLight: DynamicScheme, schemeDark: DynamicScheme;
  let sourceColor: number;
  let algorithm: keyof typeof schemes = "tonal_spot";
  let contrast = 0;

  $: if (sourceColor) {
    const scheme = schemes[algorithm];

    schemeLight = new scheme(Hct.fromInt(sourceColor), false, contrast);
    schemeDark = new scheme(Hct.fromInt(sourceColor), true, contrast);
  }
</script>

<svelte:head>
  <title>M3 Svelte: Theme</title>
  <meta
    name="description"
    content="Generate a Material 3/You theme for use with the library M3 Svelte."
  />
</svelte:head>
<ColorChooser bind:sourceColor />
<Arrow />
<TransformChooser bind:algorithm bind:contrast />
{#if schemeLight}
  <Arrow />
  <SchemeShowcase {schemeLight} {schemeDark} />
{/if}
