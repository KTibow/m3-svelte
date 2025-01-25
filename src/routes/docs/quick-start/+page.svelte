<script>
  import iconDownload from "@ktibow/iconset-material-symbols/download";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconType from "@ktibow/iconset-material-symbols/font-download-outline";

  import Icon from "$lib/misc/_icon.svelte";
  import SegmentedButtonContainer from "$lib/buttons/SegmentedButtonContainer.svelte";
  import SegmentedButtonItem from "$lib/buttons/SegmentedButtonItem.svelte";
  import { base } from "$app/paths";

  import Snippet from "../Snippet.svelte";

  let step2Page = "stylefromscheme";
  let step3Page = "roboto";
  const componentCode = `${"<"}script>
  import { Button } from "m3-svelte";
${"<"}/script>

${"<"}Button type="filled" on:click={() => alert("Hello world")}>Click me${"<"}/Button>`;
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
      <SegmentedButtonContainer>
        <input
          type="radio"
          id="step2-stylefromscheme"
          value="stylefromscheme"
          name="step2"
          bind:group={step2Page}
        />
        <SegmentedButtonItem input="step2-stylefromscheme">StyleFromScheme</SegmentedButtonItem>
        <input type="radio" id="step2-manual" value="manual" name="step2" bind:group={step2Page} />
        <SegmentedButtonItem input="step2-manual">Manual</SegmentedButtonItem>
      </SegmentedButtonContainer>
    </div>
    <div class="text">
      {#if step2Page == "stylefromscheme"}
        <p>
          <a href="{base}/theme">Copy a theme snippet</a> and paste it on your site.
        </p>
        <Snippet
          code={`<script>
  import { StyleFromScheme } from "m3-svelte";
<${""}/script>

[your theme snippet]`}
          name="+layout.svelte or similar"
          lang="xml"
        />
      {:else}
        <p>
          If you want to lower your bundle size, manually adding the styles is an option. While this
          means you only send the styles once, it isn't recommended.
        </p>
        <p>
          You'll need to set all the colors on <code>:root</code>, add <code>theme-color</code>
          meta tags, and add the
          <a href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/styles.css"
            >base styles</a
          >.
        </p>
      {/if}
    </div>
  </li>
  <li>
    <div class="header">
      <div class="number">
        3
        <Icon icon={iconType} />
      </div>
      <SegmentedButtonContainer>
        <input type="radio" id="step3-roboto" value="roboto" name="step3" bind:group={step3Page} />
        <SegmentedButtonItem input="step3-roboto">Roboto</SegmentedButtonItem>
        <input type="radio" id="step3-manual" value="manual" name="step3" bind:group={step3Page} />
        <SegmentedButtonItem input="step3-manual">Manual</SegmentedButtonItem>
      </SegmentedButtonContainer>
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
