<script lang="ts">
  import { DynamicScheme, Hct, Variant } from "@ktibow/material-color-utilities-nightly";

  import ColorChooser from "./ColorChooser.svelte";
  import Arrow from "./Arrow.svelte";
  import TransformChooser from "./TransformChooser.svelte";
  import SchemeShowcase from "./SchemeShowcase.svelte";
  import variants from "./variants";
  import { sourceColor } from "../state";

  let variant: Variant = $state(Variant.TONAL_SPOT);
  let specVersion: "2021" | "2025" = $state("2025");
  let contrast = $state(0);
  let includeDimBright = $state(false);
  let includeFixed = $state(false);

  let schemes = $derived.by(() => {
    const commonArgs = {
      sourceColorHct: Hct.fromInt($sourceColor),
      contrastLevel: contrast,
      specVersion,
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
  <title>Theme</title>
  <meta
    name="description"
    content="Make a Material 3 theme and use it in CSS. Works great with M3 Svelte components."
  />
</svelte:head>
<ColorChooser bind:sourceColor={$sourceColor} />
<Arrow />
<TransformChooser
  {schemes}
  bind:variant
  bind:contrast
  bind:specVersion
  bind:includeDimBright
  bind:includeFixed
/>
<Arrow />
<SchemeShowcase {light} {dark} {includeDimBright} {includeFixed} />
