<script>
  import iconDownload from "@ktibow/iconset-material-symbols/download";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconType from "@ktibow/iconset-material-symbols/font-download-outline";
  import { base } from "$app/paths";
  import Icon from "$lib/misc/_icon.svelte";
  import SegmentedButtonContainer from "$lib/buttons/SegmentedButtonContainer.svelte";
  import SegmentedButtonItem from "$lib/buttons/SegmentedButtonItem.svelte";
  import VariableTabs from "$lib/nav/VariableTabs.svelte";
  import Snippet from "./Snippet.svelte";

  let step2Page = "stylefromscheme";
  let step3Page = "roboto";
  let colorType = "plain";
</script>

<svelte:head>
  <title>M3 Svelte: Use</title>
</svelte:head>
<h1 class="m3-font-headline-large">Use M3 Svelte</h1>
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
        />
      {:else}
        <p>
          If you want to lower your bundle size, manually adding the styles is an option. While this
          means you only send the styles once, it isn't recommended.
        </p>
        <p>
          You'll need to set all the colors on <code>:root</code>, add <code>theme-color</code> meta
          tags, and add the
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
        />
      {:else}
        <Snippet
          code={`body {
  --m3-font: [your font], system-ui, sans-serif;
}`}
          name="app.css"
        />
      {/if}
    </div>
  </li>
</ol>

<ul>
  <li>Great. M3 Svelte components now function as expected, but you might want to do more.</li>
  <li>
    <p>Make your body match up with the rest of M3 Svelte</p>
    <Snippet code={`<body class="m3-font-body-large">`} name="app.html" />
    <Snippet
      code={`body {
  background-color: rgb(var(--m3-scheme-background));
  color: rgb(var(--m3-scheme-on-background));
}`}
      name="app.css"
    />
  </li>
  <li>
    <p>Start using components</p>
    <Snippet
      code={`<script>
  import { Button } from "m3-svelte";
<${""}/script>

<Button type="filled" on:click={() => alert("Hello world!")}>Hello world!<${""}/Button>`}
      name="+page.svelte"
    />
  </li>
  <li>
    <p>Start using variables</p>
    <VariableTabs
      bind:tab={colorType}
      items={[
        { name: "Plain", value: "plain" },
        { name: "Tailwind", value: "tailwind" },
      ]}
    />
    {#if colorType == "plain"}
      <Snippet
        code={`button {
  background-color: rgb(var(--m3-scheme-surface-container-low));
  color: rgb(var(--m3-scheme-primary));
  box-shadow: var(--m3-util-elevation-1);
  border-radius: var(--m3-util-rounding-full);
}`}
        name="+page.svelte"
      />
    {:else}
      <Snippet
        code={`colors: {
  "primary": "rgb(var(--m3-scheme-primary) / <alpha-value>)",
  "on-primary": "rgb(var(--m3-scheme-on-primary) / <alpha-value>)",
  "primary-container": "rgb(var(--m3-scheme-primary-container) / <alpha-value>)",
  "on-primary-container": "rgb(var(--m3-scheme-on-primary-container) / <alpha-value>)",
  "secondary": "rgb(var(--m3-scheme-secondary) / <alpha-value>)",
  "on-secondary": "rgb(var(--m3-scheme-on-secondary) / <alpha-value>)",
  "secondary-container": "rgb(var(--m3-scheme-secondary-container) / <alpha-value>)",
  "on-secondary-container": "rgb(var(--m3-scheme-on-secondary-container) / <alpha-value>)",
  "tertiary": "rgb(var(--m3-scheme-tertiary) / <alpha-value>)",
  "on-tertiary": "rgb(var(--m3-scheme-on-tertiary) / <alpha-value>)",
  "tertiary-container": "rgb(var(--m3-scheme-tertiary-container) / <alpha-value>)",
  "on-tertiary-container": "rgb(var(--m3-scheme-on-tertiary-container) / <alpha-value>)",
  "error": "rgb(var(--m3-scheme-error) / <alpha-value>)",
  "on-error": "rgb(var(--m3-scheme-on-error) / <alpha-value>)",
  "error-container": "rgb(var(--m3-scheme-error-container) / <alpha-value>)",
  "on-error-container": "rgb(var(--m3-scheme-on-error-container) / <alpha-value>)",
  "background": "rgb(var(--m3-scheme-background) / <alpha-value>)",
  "on-background": "rgb(var(--m3-scheme-on-background) / <alpha-value>)",
  "surface": "rgb(var(--m3-scheme-surface) / <alpha-value>)",
  "on-surface": "rgb(var(--m3-scheme-on-surface) / <alpha-value>)",
  "surface-variant": "rgb(var(--m3-scheme-surface-variant) / <alpha-value>)",
  "on-surface-variant": "rgb(var(--m3-scheme-on-surface-variant) / <alpha-value>)",
  "outline": "rgb(var(--m3-scheme-outline) / <alpha-value>)",
  "outline-variant": "rgb(var(--m3-scheme-outline-variant) / <alpha-value>)",
  "shadow": "rgb(var(--m3-scheme-shadow) / <alpha-value>)",
  "scrim": "rgb(var(--m3-scheme-scrim) / <alpha-value>)",
  "inverse-surface": "rgb(var(--m3-scheme-inverse-surface) / <alpha-value>)",
  "inverse-on-surface": "rgb(var(--m3-scheme-inverse-on-surface) / <alpha-value>)",
  "inverse-primary": "rgb(var(--m3-scheme-inverse-primary) / <alpha-value>)",
  "surface-bright": "rgb(var(--m3-scheme-surface-bright) / <alpha-value>)",
  "surface-container": "rgb(var(--m3-scheme-surface-container) / <alpha-value>)",
  "surface-container-high": "rgb(var(--m3-scheme-surface-container-high) / <alpha-value>)",
  "surface-container-highest": "rgb(var(--m3-scheme-surface-container-highest) / <alpha-value>)",
  "surface-container-low": "rgb(var(--m3-scheme-surface-container-low) / <alpha-value>)",
  "surface-container-lowest": "rgb(var(--m3-scheme-surface-container-lowest) / <alpha-value>)",
  "surface-dim": "rgb(var(--m3-scheme-surface-dim) / <alpha-value>)",
  "surface-tint": "rgb(var(--m3-scheme-surface-tint) / <alpha-value>)"
}
`}
        name="tailwind.config.js"
      />
      <Snippet
        code={`<button class="bg-surface-container-low text-primary rounded-full">`}
        name="+page.svelte"
      />
    {/if}
  </li>
  <li>Have fun!</li>
  <li>
    <p>
      (FYI if your <code>app.css</code> isn't working, make sure you imported it from where your app
      gets mounted, like in <code>+layout.svelte</code>.)
    </p>
  </li>
</ul>

<style>
  ol {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 0;
    margin: 0;
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

  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;

    padding: 0;
    margin: 10rem 0 0 0;
    list-style-type: none;
  }
  ul > li {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
    padding: 0.75rem 1rem;
    border-radius: 1rem 1rem 1rem 0;
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
  ul > li > :global(.m3-container.primary) {
    background-color: rgb(var(--m3-scheme-surface) / 0.4) !important;
  }
</style>
