<script lang="ts">
  import { DynamicScheme, Hct, SchemeCmf, Variant } from "@ktibow/material-color-utilities-nightly";

  import SelectColor from "./SelectColor.svelte";
  import SelectVariant from "./SelectVariant.svelte";
  import SelectConfig from "./SelectConfig.svelte";
  import SchemeShowcase from "./SchemeShowcase.svelte";
  import variants, { type SpecVersion } from "./variants";
  import { secondarySourceColor, sourceColor } from "../state";

  let variant: Variant = $state(Variant.TONAL_SPOT);
  let specVersion: SpecVersion = $state("2025");
  let contrast = $state(0);
  let includeDimBright = $state(false);
  let includeFixed = $state(false);

  const resolveSpecVersion = (variant: Variant, preferredSpecVersion: SpecVersion): SpecVersion => {
    const supportedSpecVersions = variants.find((v) => v.id == variant)?.versions;
    if (!supportedSpecVersions || supportedSpecVersions.length == 0) return preferredSpecVersion;
    return supportedSpecVersions.includes(preferredSpecVersion)
      ? preferredSpecVersion
      : supportedSpecVersions.at(-1)!;
  };

  let availableSpecVersions = $derived(variants.find((v) => v.id == variant)?.versions ?? []);

  let schemes = $derived.by(() => {
    const primarySourceColorHct = Hct.fromInt($sourceColor);
    const secondarySourceColorHct = Hct.fromInt($secondarySourceColor);
    const result = {} as Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
    for (const { id: currentVariant } of variants) {
      const variantSpecVersion = resolveSpecVersion(currentVariant, specVersion);
      const sourceColorHcts =
        currentVariant == Variant.CMF
          ? [primarySourceColorHct, secondarySourceColorHct]
          : [primarySourceColorHct];
      const commonArgs = {
        sourceColorHcts,
        contrastLevel: contrast,
        specVersion: variantSpecVersion,
      };
      result[currentVariant] = {
        light:
          currentVariant == Variant.CMF
            ? new SchemeCmf(sourceColorHcts, false, contrast, variantSpecVersion)
            : new DynamicScheme({ ...commonArgs, variant: currentVariant, isDark: false }),
        dark:
          currentVariant == Variant.CMF
            ? new SchemeCmf(sourceColorHcts, true, contrast, variantSpecVersion)
            : new DynamicScheme({ ...commonArgs, variant: currentVariant, isDark: true }),
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

<div class="horizontal colors">
  <SelectColor showSecondary={variant == Variant.CMF} />
</div>
<div class="horizontal variants">
  <SelectVariant {schemes} bind:variant />
</div>
<SelectConfig
  bind:contrast
  bind:specVersion
  {availableSpecVersions}
  bind:includeDimBright
  bind:includeFixed
/>

<div style:height="5rem"></div>

<SchemeShowcase {light} {dark} {includeDimBright} {includeFixed} />

<style>
  .horizontal {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .colors {
    flex-wrap: wrap;
  }
  .variants {
    @media (width < 37.5rem) {
      flex-direction: column;
      height: auto;
    }
  }
</style>
