<script lang="ts">
  import { Hct, type DynamicScheme } from "@material/material-color-utilities";

  import ColorChooser from "./ColorChooser.svelte";
  import Arrow from "./Arrow.svelte";
  import TransformChooser from "./TransformChooser.svelte";
  import { schemes } from "./data";
  import SchemeShowcase from "./SchemeShowcase.svelte";

  let sourceColor = $state(0);
  let algorithm: keyof typeof schemes = $state("tonal_spot");
  let contrast = $state(0);

  let { schemeLight, schemeDark } = $derived.by(() => {
    if (!sourceColor) return { schemeLight: undefined, schemeDark: undefined };

    const scheme = schemes[algorithm];
    return {
      schemeLight: new scheme(Hct.fromInt(sourceColor), false, contrast),
      schemeDark: new scheme(Hct.fromInt(sourceColor), true, contrast),
    };
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
<TransformChooser bind:algorithm bind:contrast />
{#if schemeLight && schemeDark}
  <Arrow />
  <SchemeShowcase {schemeLight} {schemeDark} />
{/if}
