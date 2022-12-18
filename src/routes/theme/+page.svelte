<script>
  import { browser } from "$app/environment";
  import {
    argbFromHex,
    hexFromArgb,
    themeFromSourceColor,
    sourceColorFromImage,
  } from "@importantimport/material-color-utilities";
  import ColorCard from "./ColorCard.svelte";
  let sourceFile, sourceColorInput;
  let sourceColor, theme;
  $: if (sourceColor && browser) {
    theme = themeFromSourceColor(sourceColor);
    console.log(theme);
  }
  $: if (sourceFile) {
    const reader = new FileReader();
    reader.onload = async () => {
      const image = new Image();
      image.src = reader.result;
      console.log("loading color", image);
      sourceColor = await sourceColorFromImage(image);
      console.log("obtained color", sourceColor);
    };
    reader.readAsDataURL(sourceFile[0]);
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
    ["error", "onError"],
  ];
</script>

<svelte:head>
  <title>M3 Svelte: Theme</title>
</svelte:head>
<h1 class="md-display-large">Theme</h1>
<p>
  <label>
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
  </label>
  <input type="file" bind:files={sourceFile} />
</p>
{#if theme}
  {#each Object.entries( { Light: theme.schemes.light.props, Dark: theme.schemes.dark.props } ) as [name, colors]}
    <h2 class="md-headline-large">{name}</h2>
    <div class="container">
      {#each pairs as [bgName, fgName]}
        <ColorCard
          text={`${fgName} text\n${bgName} background`}
          bg={colors[bgName]}
          fg={colors[fgName]}
        />
      {/each}
    </div>
  {/each}
  <p>Exporting soon</p>
{/if}

<style>
  label {
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
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
</style>
