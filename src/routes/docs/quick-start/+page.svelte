<script>
  import iconDownload from "@ktibow/iconset-material-symbols/download";
  import iconConfig from "@ktibow/iconset-material-symbols/settings";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconType from "@ktibow/iconset-material-symbols/font-download-outline";

  import Icon from "$lib/misc/Icon.svelte";
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { resolve } from "$app/paths";

  import Snippet from "../Snippet.svelte";

  let step3Page = $state("gsans");
</script>

<svelte:head><title>Quick start</title></svelte:head>
<ol>
  <li>
    <div class="header">
      <div class="number">
        1
        <Icon icon={iconDownload} />
      </div>
    </div>
    <div class="text">
      <p>
        Install packages with <code>npm i m3-svelte vite-plugin-functions-mixins</code> (or your package
        manager).
      </p>
    </div>
  </li>
  <li>
    <div class="header">
      <div class="number">
        2
        <Icon icon={iconConfig} />
      </div>
    </div>
    <div class="text">
      <p>Enable a functions/mixins polyfill.</p>
      <Snippet
        name="vite.config.ts"
        html={/* typescript */ `import { defineConfig } from "vite";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [/* your existing plugins */ functionsMixins({ deps: ["m3-svelte"] })],
});`}
      />
    </div>
  </li>
  <li>
    <div class="header">
      <div class="number">
        3
        <Icon icon={iconPalette} />
      </div>
    </div>
    <div class="text">
      <p>
        <a href={resolve("/theme")}>Get a theme snippet</a> and start using it.
      </p>
      <Snippet
        name="+layout.svelte, App.svelte, or similar"
        html={/* svelte */ `<${""}script>
  import "../app.css"; // Change this if you're not in SvelteKit
</${""}script>`}
      />
      <Snippet name="app.css" html={/* css */ `/* Your theme snippet */`} />
    </div>
  </li>
  <li>
    <div class="header">
      <div class="number">
        4
        <Icon icon={iconType} />
      </div>
      <ConnectedButtons>
        <input type="radio" id="step3-gsans" value="gsans" name="step3" bind:group={step3Page} />
        <Button for="step3-gsans" variant="filled" square>Google Sans</Button>
        <input type="radio" id="step3-manual" value="manual" name="step3" bind:group={step3Page} />
        <Button for="step3-manual" variant="filled" square>Manual</Button>
      </ConnectedButtons>
    </div>
    <div class="text">
      <p>Get a font for M3 Svelte to use.</p>
      {#if step3Page == "gsans"}
        <Snippet
          name="app.html"
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
    </div>
  </li>
</ol>
<p>
  Now you can start using components like this. <a href="./detailed-walkthrough"
    >Keep learning: detailed walkthrough</a
  >
</p>
<Snippet
  name="Component.svelte"
  html={/* svelte */ `<${""}script>
  import { Button } from "m3-svelte";
</${""}script>

<${""}Button variant="filled" onclick={() => alert("Hello world")}>Click me</${""}Button>`}
/>

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
  .header {
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: 0.5rem;
  }
  .number {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    height: 2.5rem;
    border-radius: 3rem;
    padding: 0 1rem;
    font-size: 1.2rem;
    background-color: var(--m3c-primary-container);
    color: var(--m3c-on-primary-container);
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.75rem;

    padding: 1rem;
    border-radius: 1.5rem;

    min-height: 3rem;
    background-color: var(--m3c-surface-container-low);
  }

  p {
    margin: 0;
  }
  code {
    font-size: 0.9rem;
    background-color: var(--m3c-surface-variant);
    padding-inline: 2px;
    border-radius: 0.3rem;
  }
  a {
    color: var(--m3c-primary);
  }
</style>
