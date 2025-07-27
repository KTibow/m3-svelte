<script>
  import iconDownload from "@ktibow/iconset-material-symbols/download";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconType from "@ktibow/iconset-material-symbols/font-download-outline";

  import Icon from "$lib/misc/_icon.svelte";
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { base } from "$app/paths";

  import Snippet from "../Snippet.svelte";

  let step3Page = $state("roboto");
  const componentCode = `${"<"}script>
  import { Button } from "m3-svelte";
${"<"}/script>

${"<"}Button variant="filled" onclick={() => alert("Hello world")}>Click me${"<"}/Button>`;
</script>

<ol>
  <li>
    <div class="header">
      <div class="number">
        1
        <Icon icon={iconDownload} />
      </div>
    </div>
    <div class="text">
      <p>Install M3 Svelte with <code>npm i m3-svelte</code> (or your package manager).</p>
    </div>
  </li>
  <li>
    <div class="header">
      <div class="number">
        2
        <Icon icon={iconPalette} />
      </div>
    </div>
    <div class="text">
      <p>
        <a href="{base}/theme">Copy a theme snippet</a> and paste it on your site.
      </p>
      <Snippet
        code={`<${""}script>
  import "../app.css"; // Change this if you're not in SvelteKit
</${""}script>`}
        name="+layout.svelte, App.svelte, or similar"
        lang="xml"
      />
      <Snippet code="/* Your theme snippet */" name="app.css" lang="css" />
    </div>
  </li>
  <li>
    <div class="header">
      <div class="number">
        3
        <Icon icon={iconType} />
      </div>
      <ConnectedButtons>
        <input type="radio" id="step3-roboto" value="roboto" name="step3" bind:group={step3Page} />
        <Button for="step3-roboto" variant="filled" square>Roboto</Button>
        <input type="radio" id="step3-manual" value="manual" name="step3" bind:group={step3Page} />
        <Button for="step3-manual" variant="filled" square>Manual</Button>
      </ConnectedButtons>
    </div>
    <div class="text">
      <p>Get a font for M3 Svelte to use.</p>
      {#if step3Page == "roboto"}
        <Snippet
          code={`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />`}
          name="app.html"
          lang="xml"
        />
      {:else}
        <Snippet
          code={`body {
  --m3-font: [your font], system-ui, sans-serif;
}`}
          name="app.css"
          lang="css"
        />
      {/if}
    </div>
  </li>
</ol>
<p>Now you can start using components like this. Check the rest of the docs to learn more.</p>
<Snippet code={componentCode} name="Component.svelte" lang="xml" />

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
    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.75rem;

    padding: 1rem;
    border-radius: 1.5rem;

    min-height: 3rem;
    background-color: rgb(var(--m3-scheme-surface-container-low));
  }

  p {
    margin: 0;
  }
  code {
    font-size: 0.9rem;
    background-color: rgb(var(--m3-scheme-surface-variant));
    padding-inline: 2px;
    border-radius: 0.3rem;
  }
  a {
    text-decoration: none;
    color: rgb(var(--m3-scheme-primary));
  }
</style>
