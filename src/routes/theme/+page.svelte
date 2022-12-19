<script lang="ts">
  import { browser } from "$app/environment";
  import Button from "$lib/buttons/Button.svelte";
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
  const genCSS = () => {
    const genColorVariable = (name: string, argb: number) => {
      const kebabCase = name.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
      const red = (argb >> 16) & 255;
      const green = (argb >> 8) & 255;
      const blue = argb & 255;
      return `--md-sys-color-${kebabCase}: ${red} ${green} ${blue};`;
    };
    const lightColors = Object.entries(theme.schemes.light.toJSON())
      .map((colorInfo) => genColorVariable(...colorInfo))
      .join("\n");
    const darkColors = Object.entries(theme.schemes.dark.toJSON())
      .map((colorInfo) => genColorVariable(...colorInfo))
      .join("\n");
    const colors = `@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
@media (prefers-color-scheme: light) {
:root {
${lightColors}
}
}
@media (prefers-color-scheme: dark) {
:root {
${darkColors}
}
}
:root {
--md-sys-elevation-0: none;
--md-sys-elevation-1: 0px 3px 1px -2px rgb(var(--md-sys-color-shadow) / 0.2),
0px 2px 2px 0px rgb(var(--md-sys-color-shadow) / 0.14),
0px 1px 5px 0px rgb(var(--md-sys-color-shadow) / 0.12);
--md-sys-elevation-2: 0px 2px 4px -1px rgb(var(--md-sys-color-shadow) / 0.2),
0px 4px 5px 0px rgb(var(--md-sys-color-shadow) / 0.14),
0px 1px 10px 0px rgb(var(--md-sys-color-shadow) / 0.12);
--md-sys-elevation-3: 0px 5px 5px -3px rgb(var(--md-sys-color-shadow) / 0.2),
0px 8px 10px 1px rgb(var(--md-sys-color-shadow) / 0.14),
0px 3px 14px 2px rgb(var(--md-sys-color-shadow) / 0.12);
--md-sys-elevation-4: 0px 5px 5px -3px rgb(var(--md-sys-color-shadow) / 0.2),
0px 8px 10px 1px rgb(var(--md-sys-color-shadow) / 0.14),
0px 3px 14px 2px rgb(var(--md-sys-color-shadow) / 0.12);
--md-sys-elevation-5: 0px 8px 10px -6px rgb(var(--md-sys-color-shadow) / 0.2),
0px 16px 24px 2px rgb(var(--md-sys-color-shadow) / 0.14),
0px 6px 30px 5px rgb(var(--md-sys-color-shadow) / 0.12);
}
.md-background {
background-color: rgb(var(--md-sys-color-background));
color: rgb(var(--md-sys-color-on-background));
}
.md-label-large {
font-family: Roboto, system-ui, sans-serif;
font-weight: 500;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.1px;
}
.md-label-medium {
font-family: Roboto, system-ui, sans-serif;
font-weight: 500;
font-size: 12px;
line-height: 16px;
letter-spacing: 0.5px;
}
.md-body-medium {
font-family: Roboto, system-ui, sans-serif;
font-weight: 400;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.25px;
}
* {
box-sizing: border-box;
}`;
    const file = new File([colors], "theme.css", {
      type: "text/plain",
    });
    const url = window.URL.createObjectURL(file);
    const link = document.createElement("a");
    link.setAttribute("download", "theme.css");
    link.setAttribute("href", url);
    document.head.appendChild(link);
    link.click();
    link.remove();
  };
</script>

<svelte:head>
  <title>M3 Svelte: Theme</title>
</svelte:head>
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
    <Button type="filled" on:click={genCSS}>Export theme</Button>
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
