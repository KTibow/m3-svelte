<script lang="ts">
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import iconImage from "@iconify-icons/ic/outline-wallpaper";
  import iconCopy from "@iconify-icons/ic/outline-content-copy";
  import {
    CorePalette,
    argbFromHex,
    hexFromArgb,
    sourceColorFromImage,
    Scheme,
    TonalPalette,
  } from "@importantimport/material-color-utilities";
  import { schemesFromPalettes, type SerializedScheme } from "$lib/colors/utils";
  import Button from "$lib/buttons/Button.svelte";
  import PaletteCard from "./PaletteCard.svelte";
  import NeutralComparisonCard from "./NeutralComparisonCard.svelte";
  import ColorCard from "./ColorCard.svelte";
  import StyleFromScheme from "$lib/colors/StyleFromScheme.svelte";

  let sourceColorInput: HTMLInputElement, sourceFileInput: HTMLInputElement;
  let sourceColor: number, sourcePalettes: CorePalette, schemeLight: Scheme, schemeDark: Scheme;
  $: if (sourceColor) sourcePalettes = CorePalette.of(sourceColor);
  $: if (sourcePalettes) [schemeLight, schemeDark] = schemesFromPalettes(sourcePalettes);

  const pairs = [
    ["primary", "onPrimary"],
    ["primaryContainer", "onPrimaryContainer"],
    ["secondary", "onSecondary"],
    ["secondaryContainer", "onSecondaryContainer"],
    ["tertiary", "onTertiary"],
    ["tertiaryContainer", "onTertiaryContainer"],
    ["background", "onBackground"],
    ["surface", "onSurface"],
    ["inverseSurface", "inverseOnSurface"],
    ["surfaceVariant", "onSurfaceVariant"],
    ["error", "onError"],
    ["errorContainer", "onErrorContainer"],
  ];
  const getCardData = (colors: Scheme, bg: string, fg: string) => ({
    bg: colors[bg as keyof Scheme] as number,
    fg: colors[fg as keyof Scheme] as number,
  });
  const serializeScheme = (scheme: Scheme) => Object.entries(scheme.toJSON()) as SerializedScheme;
  const copyUsage = () =>
    navigator.clipboard.writeText(
      `<StyleFromScheme
  lightScheme={${JSON.stringify(serializeScheme(schemeLight))}}
  darkScheme={${JSON.stringify(serializeScheme(schemeDark))}} />`
    );
  const changeColor = (palette: TonalPalette, newPalette: TonalPalette) => {
    const paletteName = Object.entries(sourcePalettes).find((item) => item[1] == palette)?.[0];
    if (!paletteName || !(paletteName in sourcePalettes)) return;
    sourcePalettes[paletteName as keyof CorePalette] = newPalette;
  };
</script>

<svelte:head>
  <title>M3 Svelte: Theme</title>
  <meta
    name="description"
    content="Generate a Material 3/You theme for use with the library M3 Svelte."
  />
</svelte:head>
<h1 class="m3-font-display-large">Theme</h1>
<p class="sourceChooser">
  Source color <span
    style="background-color: {browser && hexFromArgb(sourceColor)};"
    class="colorDisc"
  />
  <Button type="text" iconType="full" on:click={() => sourceColorInput.click()}>
    <Icon icon={iconEdit} width="24" height="24" />
  </Button>
  <Button type="text" iconType="full" on:click={() => sourceFileInput.click()}>
    <Icon icon={iconImage} width="24" height="24" />
  </Button>
  <input
    type="color"
    class="hidden"
    bind:this={sourceColorInput}
    on:change={() => (sourceColor = argbFromHex(sourceColorInput.value))}
  />
  <input
    type="file"
    class="hidden"
    bind:this={sourceFileInput}
    on:change={(e) => {
      if (!(e.target instanceof HTMLInputElement) || !e.target.files) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = String(reader.result);
        sourceColor = await sourceColorFromImage(image);
      };
      reader.readAsDataURL(e.target.files[0]);
    }}
  />
  {#if schemeLight}
    <Button type="filled" iconType="left" on:click={copyUsage}>
      <Icon icon={iconCopy} width="18" height="18" />
      Copy usage
    </Button>
  {/if}
</p>

{#if sourcePalettes}
  <h2 class="m3-font-headline-large">Palettes</h2>
  <div class="pallette">
    {#each Object.entries( { primary: sourcePalettes.a1, secondary: sourcePalettes.a2, tertiary: sourcePalettes.a3, neutral: sourcePalettes.n1, neutralVariant: sourcePalettes.n2, error: sourcePalettes.error } ) as [name, hct]}
      <PaletteCard {name} {hct} on:changeColor={(e) => changeColor(hct, e.detail)} />
    {/each}
  </div>
  <div class="pallette">
    {#each [10, 20, 50, 80, 90] as tone}
      <NeutralComparisonCard
        {tone}
        neutralHCT={sourcePalettes.n1}
        neutralVariantHCT={sourcePalettes.n2}
      />
    {/each}
  </div>
{/if}
{#if schemeLight}
  <StyleFromScheme
    lightScheme={serializeScheme(schemeLight)}
    darkScheme={serializeScheme(schemeDark)}
  />
  {#each Object.entries({ Light: schemeLight, Dark: schemeDark }) as [name, colors]}
    <h2 class="m3-font-headline-large">{name}</h2>
    <div class="container">
      {#each pairs as [bgName, fgName]}
        <ColorCard headline={bgName} sub="{fgName} text" {...getCardData(colors, bgName, fgName)} />
      {/each}
    </div>
  {/each}
{/if}

<style>
  .sourceChooser {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .colorDisc {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border-radius: 1.25rem;
    border: none;
  }
  .hidden {
    display: none;
  }

  .pallette {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .container {
    display: grid;
    gap: 1rem;
  }
  @media (orientation: landscape) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 1280px) {
    .container {
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>
