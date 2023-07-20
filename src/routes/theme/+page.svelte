<script lang="ts">
  import {
    CorePalette,
    Scheme,
    argbFromHex,
    hexFromArgb,
    sourceColorFromImage,
  } from "@material/material-color-utilities";
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import iconImage from "@iconify-icons/ic/outline-wallpaper";
  import iconCopy from "@iconify-icons/ic/outline-content-copy";

  import { browser } from "$app/environment";
  import type { SerializedScheme } from "$lib/misc/utils";
  import StyleFromScheme from "$lib/misc/StyleFromScheme.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import TabsPrimaryAnim from "$lib/nav/TabsPrimaryAnim.svelte";
  import ColorCard from "./ColorCard.svelte";

  let sourceColorInput: HTMLInputElement, sourceFileInput: HTMLInputElement;
  let sourceColor: number, sourcePalette: CorePalette;
  $: if (sourceColor) sourcePalette = CorePalette.of(sourceColor);
  let schemeLight: Scheme, schemeDark: Scheme;
  $: if (sourcePalette) {
    schemeLight = Scheme.lightFromCorePalette(sourcePalette);
    schemeDark = Scheme.darkFromCorePalette(sourcePalette);
  }

  let tab = "light";
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

  const serializeScheme = (scheme: Scheme) => Object.entries(scheme.toJSON()) as SerializedScheme;
  const copyUsage = () =>
    navigator.clipboard.writeText(
      `<StyleFromScheme
  lightScheme={${JSON.stringify(serializeScheme(schemeLight))}}
  darkScheme={${JSON.stringify(serializeScheme(schemeDark))}} />`,
    );
</script>

<svelte:head>
  <title>M3 Svelte: Theme</title>
  <meta
    name="description"
    content="Generate a Material 3/You theme for use with the library M3 Svelte."
  />
</svelte:head>
<p class="source-chooser">
  <span
    style="background-color: {browser ? hexFromArgb(sourceColor) : '#000'};"
    class="color-disc m3-font-label-large"
  >
    Color
  </span>
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
    accept="image/*"
    bind:this={sourceFileInput}
    on:change={(e) => {
      if (!e.currentTarget.files) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = String(reader.result);
        sourceColor = await sourceColorFromImage(image);
      };
      reader.readAsDataURL(e.currentTarget.files[0]);
    }}
  />
  {#if schemeLight}
    <Button type="filled" iconType="left" on:click={copyUsage}>
      <Icon icon={iconCopy} width="18" height="18" />
      Copy usage
    </Button>
  {/if}
</p>
{#if schemeLight}
  <StyleFromScheme
    lightScheme={serializeScheme(schemeLight)}
    darkScheme={serializeScheme(schemeDark)}
  />
  <TabsPrimaryAnim
    bind:tab
    items={[
      { name: "Light", value: "light" },
      { name: "Dark", value: "dark" },
    ]}
  />
  <br />
  <div class="color-container">
    {#each pairs as [bgName, fgName]}
      <ColorCard scheme={tab == "light" ? schemeLight : schemeDark} fg={fgName} bg={bgName} />
    {/each}
  </div>
{/if}

<!-- 
{#if sourcePalettes}
  <div class="palettes">
    {#each Object.entries( { primary: sourcePalettes.a1, secondary: sourcePalettes.a2, tertiary: sourcePalettes.a3, neutral: sourcePalettes.n1, neutralVariant: sourcePalettes.n2, error: sourcePalettes.error } ) as [name, hct]}
      <PaletteCard {name} {hct} on:changeColor={(e) => changeColor(hct, e.detail)} />
    {/each}
  </div>
{/if}
{#if schemeLight}
  <StyleFromScheme
    lightScheme={serializeScheme(schemeLight)}
    darkScheme={serializeScheme(schemeDark)}
  />
  <Tabs style="primary" items={[{ name: "Light" }, { name: "Dark" }]} bind:activeItem={activeTab} />
  <br />
  <div class="container">
    {#each pairs as [bgName, fgName]}
      <ColorCard
        headline={bgName}
        sub="{fgName} text"
        {...getCardData(activeTab == 0 ? schemeLight : schemeDark, bgName, fgName)}
      />
    {/each}
  </div>
{/if}
-->

<style>
  .source-chooser {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
  }
  .color-disc {
    flex-grow: 1;
    min-width: 2rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
  .hidden {
    display: none;
  }
  .color-container {
    display: grid;
    border-radius: 1rem;
    overflow: hidden;
  }
  @media (min-width: 30rem) {
    .color-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 60rem) {
    .color-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 80rem) {
    .color-container {
      grid-template-columns: repeat(6, 1fr);
    }
  }
</style>
