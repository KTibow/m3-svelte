<script>
  import iconDownload from "@ktibow/iconset-material-symbols/download";
  import iconAdd from "@ktibow/iconset-material-symbols/add";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconType from "@ktibow/iconset-material-symbols/font-download-outline";
  import Icon from "$lib/misc/_icon.svelte";
  import ButtonLink from "$lib/buttons/ButtonLink.svelte";
  import Snippet from "./Snippet.svelte";
  import { base } from "$app/paths";
</script>

<svelte:head>
  <title>M3 Svelte: Use</title>
</svelte:head>
<h1 class="m3-font-headline-large">Use M3 Svelte</h1>
<h2 class="m3-font-title-large">Getting started</h2>
<ol>
  <li>
    <div class="number">
      1
      <Icon icon={iconDownload} />
    </div>
    <div class="text">
      <p><strong>Add M3 Svelte</strong></p>
      <p>Install M3 Svelte with <code>npm i m3-svelte</code> (or your package manager)</p>
    </div>
  </li>
  <li>
    <div class="number">
      2
      <Icon icon={iconAdd} />
    </div>
    <div class="text">
      <p><strong>Set up base styling</strong></p>
      <p>
        Find a <code>.svelte</code> that applies to all pages (eg <code>+layout.svelte</code>).
      </p>
      <p>
        Then, add <code>import &lbrace; StyleFromScheme &rbrace; from "m3-svelte"</code> to a script
        tag, and paste in your theme snippet.
      </p>
      <ButtonLink type="filled" href="{base}/theme">Get theme snippet</ButtonLink>
    </div>
  </li>
  <li>
    <div class="number">
      3
      <Icon icon={iconPalette} />
    </div>
    <div class="text">
      <p><strong>Use the same colors as M3 Svelte</strong></p>
      <p>
        Find a <code>.css</code> that applies to all pages. (Recommended: make a CSS file and import
        it from <code>+layout.svelte</code> or wherever your app is mounted)
      </p>
      <p>Then, add something like this:</p>
      <Snippet
        code={`body {
  background-color: rgb(var(--m3-scheme-background));
  color: rgb(var(--m3-scheme-on-background));
}`}
      />
    </div>
  </li>
  <li>
    <div class="number">
      4
      <Icon icon={iconType} />
    </div>
    <div class="text">
      <p><strong>Use the same font as M3 Svelte</strong></p>
      <p>Add <code>class="m3-font-body-large"</code> to your <code>&lt;body&gt;</code>.</p>
      <p><strong>Make sure M3 Svelte can use your font</strong></p>
      <p>Using Roboto? Add this to your <code>app.html</code>:</p>
      <Snippet
        code={`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />`}
      />
      <p>Not? Set your font like this:</p>
      <Snippet
        code={`body {
  --m3-font: [your font], system-ui, sans-serif;
}`}
      />
    </div>
  </li>
</ol>

<h2 class="m3-font-title-large">Use a component</h2>
<p style="margin-bottom: 0.75rem">Just import a component to start using it. For example:</p>
<Snippet
  code={`<script>
  import { Button } from "m3-svelte";
<\/script>

<Button type="filled" on:click={() => alert("Hello world!")}>Hello world!<\/Button>`}
/>

<h2 class="m3-font-title-large">Write custom styling</h2>
<p style="margin-bottom: 0.75rem">
  Using plain CSS? You can use the styles as CSS variables. Here's an example:
</p>
<Snippet
  code={`button {
  background-color: rgb(var(--m3-scheme-surface-container-low));
  color: rgb(var(--m3-scheme-primary));
  box-shadow: var(--m3-util-elevation-1);
  border-radius: var(--m3-util-rounding-full);
}`}
/>
<p style="margin-top: 1rem; margin-bottom: 0.5rem">Using Tailwind?</p>
<ButtonLink type="filled" href="{base}/tailwindColors.txt">
  View color config to paste in
</ButtonLink>

<style>
  ol {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  ol > li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .number {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    height: 2.5rem;
    border-radius: 2.5rem;
    padding: 0 1rem;
    font-size: 1.2rem;
    background-color: rgb(var(--m3-scheme-primary-container));
  }
  .number > :global(svg) {
    color: rgb(var(--m3-scheme-on-primary-container));
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: start;
    flex-grow: 1;
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
</style>
