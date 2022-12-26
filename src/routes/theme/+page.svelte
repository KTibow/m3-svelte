<script lang="ts">
  import { browser } from "$app/environment";
  import Button from "$lib/buttons/Button.svelte";
  import ColorTheme from "$lib/themeUtils/ColorTheme.svelte";
  import {
    argbFromHex,
    hexFromArgb,
    themeFromSourceColor,
    sourceColorFromImage,
    type Theme,
    Scheme,
  } from "@importantimport/material-color-utilities";
  import ColorCard from "./ColorCard.svelte";
  let sourceFile: FileList, sourceColorInput: HTMLInputElement;
  let sourceColor: number, theme: Theme;
  $: if (sourceColor && browser) {
    theme = themeFromSourceColor(sourceColor);
    console.log(theme);
  }
  const pairs = [
    ["primary", "onPrimary"],
    ["primaryContainer", "onPrimaryContainer"],
    ["secondary", "onSecondary"],
    ["secondaryContainer", "onSecondaryContainer"],
    ["tertiary", "onTertiary"],
    ["tertiaryContainer", "onTertiaryContainer"],
    ["background", "onBackground"],
    ["surface", "onSurface"],
    ["surfaceVariant", "onSurfaceVariant"],
    ["error", "onError"],
  ];
  const getCardData = (colors: Scheme, bg: string, fg: string) => ({
    bg: colors[bg as keyof Scheme] as number,
    fg: colors[fg as keyof Scheme] as number,
  });
  const copyUsage = () => {
    const lightColors = Object.entries(theme.schemes.light.toJSON());
    const darkColors = Object.entries(theme.schemes.dark.toJSON());
    navigator.clipboard.writeText(
      `<ColorScheme light={${JSON.stringify(lightColors)}} dark={${JSON.stringify(darkColors)}} />`
    );
  };
</script>

<svelte:head>
  <title>M3 Svelte: Theme</title>
</svelte:head>
{#if theme}
  <ColorTheme {theme} />
{/if}
<h1 class="md-display-large">Theme</h1>
<p class="sourceChooser">
  Source color <button
    style="background-color: {browser && hexFromArgb(sourceColor)};"
    class="colorDisc"
    on:click={() => sourceColorInput.click()}
  />
  <input
    type="color"
    bind:this={sourceColorInput}
    on:change={() => (sourceColor = argbFromHex(sourceColorInput.value))}
  />
  <input
    type="file"
    bind:files={sourceFile}
    on:change={() => {
      const reader = new FileReader();
      reader.onload = async () => {
        const image = new Image();
        image.src = String(reader.result);
        console.log("loading color", image);
        sourceColor = await sourceColorFromImage(image);
        console.log("obtained color", sourceColor);
      };
      reader.readAsDataURL(sourceFile[0]);
    }}
  />
  {#if theme}
    <Button type="filled" on:click={copyUsage}>Copy theme usage</Button>
  {/if}
</p>
{#if theme}
  {#each Object.entries({ Light: theme.schemes.light, Dark: theme.schemes.dark }) as [name, colors]}
    <h2 class="md-headline-large">{name}</h2>
    <div class="container">
      {#each pairs as [bgName, fgName]}
        <ColorCard
          text={`${fgName} text\n${bgName} background`}
          {...getCardData(colors, bgName, fgName)}
        />
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
    border-radius: 1.25rem;
    border: none;
    cursor: pointer;
  }
  input[type="color"] {
    display: none;
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
</style>
