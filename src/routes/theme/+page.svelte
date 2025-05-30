<script lang="ts">
  import { DynamicScheme, Hct, Variant } from "@ktibow/material-color-utilities-nightly";

  import ColorChooser from "./ColorChooser.svelte";
  import Arrow from "./Arrow.svelte";
  import TransformChooser from "./TransformChooser.svelte";
  import SchemeShowcase from "./SchemeShowcase.svelte";
  import variants from "./variants";

  let sourceColor = $state(13679871);
  let variant: Variant = $state(Variant.TONAL_SPOT);
  let contrast = $state(0);

  let schemes = $derived.by(() => {
    const commonArgs = {
      sourceColorHct: Hct.fromInt(sourceColor),
      contrastLevel: contrast,
      specVersion: "2025",
    } as const;
    const result = {} as Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
    for (const { id } of variants) {
      result[id] = {
        light: new DynamicScheme({ ...commonArgs, variant: id, isDark: false }),
        dark: new DynamicScheme({ ...commonArgs, variant: id, isDark: true }),
      };
    }
    return result;
  });
  let { light, dark } = $derived(schemes[variant]);
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
<TransformChooser {schemes} bind:variant bind:contrast />
<Arrow />
<SchemeShowcase {light} {dark} />
