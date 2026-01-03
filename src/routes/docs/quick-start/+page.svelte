<script>
  import iconDownload from "@ktibow/iconset-material-symbols/download";
  import iconConfig from "@ktibow/iconset-material-symbols/settings-outline";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconType from "@ktibow/iconset-material-symbols/font-download-outline";
  import iconNext from "@ktibow/iconset-material-symbols/arrow-forward";

  import Icon from "$lib/misc/Icon.svelte";
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { resolve } from "$app/paths";

  import Snippet from "../Snippet.svelte";

  let fontSelection = $state("gsans");
  let frameworkSelection = $state("kit");
</script>

<svelte:head><title>Quick start</title></svelte:head>
<ol>
  <li>
    <h2>
      <div class="number">
        1
        <Icon icon={iconDownload} />
      </div>
      <div class="text">Install M3 Svelte</div>
    </h2>
    <Snippet
      name="install.sh"
      html={/* sh */ `pnpm install m3-svelte vite-plugin-functions-mixins -D`}
    />
  </li>
  <li>
    <h2>
      <div class="number">
        2
        <Icon icon={iconConfig} />
      </div>
      <div class="text">Enable functions and mixins</div>
      <ConnectedButtons>
        <Button variant="tonal" square label
          ><input
            type="radio"
            value="kit"
            name="framework"
            bind:group={frameworkSelection}
          />SvelteKit</Button
        >
        <Button variant="tonal" square label
          ><input
            type="radio"
            value="vite"
            name="framework"
            bind:group={frameworkSelection}
          />Vite</Button
        >
      </ConnectedButtons>
    </h2>
    {#if frameworkSelection == "kit"}
      <Snippet
        name="vite.config.ts"
        html={/* typescript */ `import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [sveltekit(), functionsMixins({ deps: ["m3-svelte"] })],
});`}
      />
    {:else}
      <Snippet
        name="vite.config.ts"
        html={/* typescript */ `import { defineConfig } from "vite";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [functionsMixins({ deps: ["m3-svelte"] })],
});`}
      />
    {/if}
  </li>
  <li>
    <h2>
      <div class="number">
        3
        <Icon icon={iconPalette} />
      </div>
      <div class="text">Enable your <a href={resolve("/theme")}>theme snippet</a></div>
    </h2>
    {#if frameworkSelection == "kit"}
      <Snippet
        name="+layout.svelte"
        html={/* svelte */ `<${""}script>
  import "../app.css";
</${""}script>`}
      />
    {:else}
      <Snippet name="index.ts" html={/* typescript */ `import "./app.css";`} />
    {/if}
    <Snippet name="app.css" html={/* css */ `/* Your theme snippet */`} />
  </li>
  <li>
    <h2>
      <div class="number">
        4
        <Icon icon={iconType} />
      </div>
      <ConnectedButtons>
        <Button variant="tonal" square label>
          <input type="radio" value="gsans" name="font" bind:group={fontSelection} />Enable Google
          Sans
        </Button>
        <Button variant="tonal" square label>
          <input type="radio" value="manual" name="font" bind:group={fontSelection} />Enable a
          custom font
        </Button>
      </ConnectedButtons>
    </h2>
    {#if fontSelection == "gsans"}
      <Snippet
        name={frameworkSelection == "kit" ? "app.html" : "index.html"}
        html={/* html */ `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,400..700&display=swap" />`}
      />
    {:else}
      <Snippet
        name="app.css"
        html={/* css */ `:root {
  --m3-font: [your font], system-ui;
}`}
      />
    {/if}
  </li>
</ol>
<div class="stack">
  <Snippet
    name="Now you can start using components"
    html={/* svelte */ `<${""}script>
  import { Button } from "m3-svelte";
</${""}script>

<${""}Button onclick={() => alert("Hello world")}>Click me</${""}Button>`}
  />
  <a class="m3-layer" href={resolve("/docs/detailed-walkthrough")}>
    <Icon icon={iconNext} size={24} />
    Keep learning
  </a>
</div>

<style>
  ol {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 0;
    margin: 0;
    margin-bottom: 4rem;
    list-style-type: none;
  }
  ol > li {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  h2 {
    @apply --m3-title-large;
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.5rem;
    margin: 0;
  }
  .number {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    height: 2.5rem;
    border-radius: 3rem;
    padding: 0 1rem;
    background-color: var(--m3c-primary-container);
    color: var(--m3c-on-primary-container);
  }
  .text {
    display: flex;
    align-items: center;
    gap: 0.25em;

    height: 2.5rem;
    border-radius: 3rem;
    padding: 0 1rem;
    background-color: var(--m3c-secondary-container);
    color: var(--m3c-on-secondary-container);
  }
  a {
    color: inherit;
  }

  .stack {
    display: grid;
    gap: 4rem;
    @media (width >= 37.5rem) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .stack > a {
    @apply --m3-title-large;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: var(--m3c-primary-container-subtle);
    color: var(--m3c-on-primary-container-subtle);
    padding: 1.5rem;
    border-radius: 1rem;
    text-decoration: none;
  }
</style>
