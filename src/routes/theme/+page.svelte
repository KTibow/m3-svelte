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
  let contrast = 1;
  $: if (sourceColor) {
    const scheme = schemes[algorithm];
    const contrastFloat =
      contrast == 0
        ? -0.5
        : contrast == 1
        ? 0
        : contrast == 2
        ? 6 / 12
        : contrast == 3
        ? 8 / 12
        : contrast == 4
        ? 10 / 12
        : contrast == 5
        ? 11 / 12
        : 1;
    schemeLight = new scheme(Hct.fromInt(sourceColor), false, contrastFloat);
    schemeDark = new scheme(Hct.fromInt(sourceColor), true, contrastFloat);
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
