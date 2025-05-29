<script lang="ts">
  import {
    DynamicScheme,
    MaterialDynamicColors,
    Hct,
    Variant,
    hexFromArgb,
  } from "@ktibow/material-color-utilities-nightly";
  import type { Color } from "$lib/misc/utils";

  import ColorChooser from "./ColorChooser.svelte";
  import Arrow from "./Arrow.svelte";
  import TransformChooser from "./TransformChooser.svelte";
  import SchemeShowcase from "./SchemeShowcase.svelte";

  let sourceColor = $state(13679871);
  let variant: Variant = $state(Variant.TONAL_SPOT);
  let contrast = $state(0);

  const getScheme = (sourceColor: number, variant: Variant) => {
    const commonArgs = {
      sourceColorHct: Hct.fromInt(sourceColor),
      variant,
      contrastLevel: contrast,
      specVersion: "2025",
    } as const;
    return {
      schemeLight: new DynamicScheme({ ...commonArgs, isDark: false }),
      schemeDark: new DynamicScheme({ ...commonArgs, isDark: true }),
    };
  };

  let { schemeLight, schemeDark } = $derived.by(() => {
    return getScheme(sourceColor, variant);
  });
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
<TransformChooser
  bind:variant
  bind:contrast
  variantColor={(variant: Variant, color: Color) => {
    const { schemeLight, schemeDark } = getScheme(sourceColor, variant);

    return {
      light: hexFromArgb(MaterialDynamicColors[color].getArgb(schemeLight)),
      dark: hexFromArgb(MaterialDynamicColors[color].getArgb(schemeDark)),
    };
  }}
/>
{#if schemeLight && schemeDark}
  <Arrow />
  <SchemeShowcase {schemeLight} {schemeDark} />
{/if}
