<script lang="ts">
  import { DynamicScheme, Hct, Variant } from "@ktibow/material-color-utilities-nightly";

  import SelectColor from "./SelectColor.svelte";
  import SelectVariant from "./SelectVariant.svelte";
  import SelectConfig from "./SelectConfig.svelte";
  import SchemeShowcase from "./SchemeShowcase.svelte";
  import variants from "./variants";
  import { sourceColor } from "../state";

  let variant: Variant = $state(Variant.TONAL_SPOT);
  let usePreExpressive = $state(false);
  let contrast = $state(0);
  let includeDimBright = $state(false);
  let includeFixed = $state(false);

  let schemes = $derived.by(() => {
    const commonArgs = {
      sourceColorHct: Hct.fromInt($sourceColor),
      contrastLevel: contrast,
      specVersion: usePreExpressive ? "2021" : "2025",
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

<div class="horizontal">
  <SelectColor bind:sourceColor={$sourceColor} />
</div>
<div class="horizontal variants">
  <SelectVariant {schemes} bind:variant />
</div>
<SelectConfig bind:contrast bind:usePreExpressive bind:includeDimBright bind:includeFixed />

<div style:height="5rem"></div>

<SchemeShowcase {light} {dark} {includeDimBright} {includeFixed} />

<style>
  .horizontal {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .variants {
    @media (width < 37.5rem) {
      flex-direction: column;
      height: auto;
    }
  }
</style>
