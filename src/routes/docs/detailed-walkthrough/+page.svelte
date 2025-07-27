<script>
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";

  import Snippet from "../Snippet.svelte";

  let styleType = $state("plain");
  const componentCode1 = `${"<"}button class="bg-surface-container-low text-primary rounded-full">Click me${"<"}/button>`;
  const componentCode2 = `${"<"}button>Click me${"<"}/button>
${"<"}style>
  button {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-primary));
    box-shadow: var(--m3-util-elevation-1);
    border-radius: var(--m3-util-rounding-full);
  }
${"<"}/style>`;
  const componentCode3 = `${"<"}script>
  import { Button } from "m3-svelte";
${"<"}/script>

${"<"}Button variant="filled" onclick={() => alert("Hello world")}>Click me${"<"}/Button>`;
</script>

<p>
  Welcome to M3 Svelte! If you haven't already, play around with the components on the home page.
  It's rather fun. They even adapt to the theme you pick. You should also check out the Discord and
  GitHub if you want to keep track of this project.
</p>
<p>
  This page is a detailed walkthrough of how to use M3 Svelte: we'll take you from configuration to
  advanced usage.
</p>

<h2 class="m3-font-headline-large">Configure your app</h2>
<p>
  The first thing to do is to set up your theme and font. If you haven't done that yet, the quick
  start page will help you.
</p>
<p>
  Beyond that, you can configure some general settings with CSS variables. You might already know
  that you can change the default font stack with <code>--m3-font</code>, but you can also customize
  the fonts of certain sizes (eg <code>--m3-font-label</code>) and their configuration (eg
  <code>--m3-font-label-large-size</code>). You can also tweak rounding by setting variables like
  <code>--m3-util-rounding-small</code>
  and <code>--m3-button-shape</code>.
</p>
<p>
  One obscure thing you can configure is ripples. You can use a simpler layer by defining
  <code>M3_SVELTE_NO_RIPPLE</code> to <code>true</code> in your Vite config.
</p>

<h2 class="m3-font-headline-large">
  Make your own components
  <ConnectedButtons>
    <input type="radio" id="styletype-plain" value="plain" bind:group={styleType} />
    <Button for="styletype-plain" variant="filled" square>Plain</Button>
    <input type="radio" id="styletype-tailwind" value="tailwind" bind:group={styleType} />
    <Button for="styletype-tailwind" variant="filled" square>Tailwind</Button>
  </ConnectedButtons>
</h2>
<p>
  Chances are M3 doesn't have everything you need. That's where you can make your own components
  while still using Material 3 elements. Here's an example.
</p>
{#if styleType == "tailwind"}
  <Snippet code={componentCode1} name="Component.svelte" lang="xml" />
  <p>You'll need to update your Tailwind config too:</p>
  <Snippet
    code={`@theme {
  --color-primary: rgb(var(--m3-scheme-primary));
  --color-on-primary: rgb(var(--m3-scheme-on-primary));
  --color-primary-container: rgb(var(--m3-scheme-primary-container));
  --color-on-primary-container: rgb(var(--m3-scheme-on-primary-container));
  --color-secondary: rgb(var(--m3-scheme-secondary));
  --color-on-secondary: rgb(var(--m3-scheme-on-secondary));
  --color-secondary-container: rgb(var(--m3-scheme-secondary-container));
  --color-on-secondary-container: rgb(var(--m3-scheme-on-secondary-container));
  --color-tertiary: rgb(var(--m3-scheme-tertiary));
  --color-on-tertiary: rgb(var(--m3-scheme-on-tertiary));
  --color-tertiary-container: rgb(var(--m3-scheme-tertiary-container));
  --color-on-tertiary-container: rgb(var(--m3-scheme-on-tertiary-container));
  --color-error: rgb(var(--m3-scheme-error));
  --color-on-error: rgb(var(--m3-scheme-on-error));
  --color-error-container: rgb(var(--m3-scheme-error-container));
  --color-on-error-container: rgb(var(--m3-scheme-on-error-container));
  --color-background: rgb(var(--m3-scheme-background));
  --color-on-background: rgb(var(--m3-scheme-on-background));
  --color-surface: rgb(var(--m3-scheme-surface));
  --color-on-surface: rgb(var(--m3-scheme-on-surface));
  --color-surface-variant: rgb(var(--m3-scheme-surface-variant));
  --color-on-surface-variant: rgb(var(--m3-scheme-on-surface-variant));
  --color-outline: rgb(var(--m3-scheme-outline));
  --color-outline-variant: rgb(var(--m3-scheme-outline-variant));
  --color-shadow: rgb(var(--m3-scheme-shadow));
  --color-scrim: rgb(var(--m3-scheme-scrim));
  --color-inverse-surface: rgb(var(--m3-scheme-inverse-surface));
  --color-inverse-on-surface: rgb(var(--m3-scheme-inverse-on-surface));
  --color-inverse-primary: rgb(var(--m3-scheme-inverse-primary));
  --color-surface-bright: rgb(var(--m3-scheme-surface-bright));
  --color-surface-container: rgb(var(--m3-scheme-surface-container));
  --color-surface-container-high: rgb(var(--m3-scheme-surface-container-high));
  --color-surface-container-highest: rgb(var(--m3-scheme-surface-container-highest));
  --color-surface-container-low: rgb(var(--m3-scheme-surface-container-low));
  --color-surface-container-lowest: rgb(var(--m3-scheme-surface-container-lowest));
  --color-surface-dim: rgb(var(--m3-scheme-surface-dim));
  --color-surface-tint: rgb(var(--m3-scheme-surface-tint));
}`}
    name="app.css"
    lang="css"
  />
{:else}
  <Snippet code={componentCode2} name="Component.svelte" lang="xml" />
{/if}
<p>You might also want to make your app match your theme. Here's what that could look like:</p>
{#if styleType == "tailwind"}
  <Snippet
    code={`<body class="m3-font-body-large bg-background text-on-background">`}
    name="app.html"
    lang="xml"
  />
{:else}
  <Snippet code={`<body class="m3-font-body-large">`} name="app.html" lang="xml" />
  <Snippet
    code={`body {
  background-color: rgb(var(--m3-scheme-background));
  color: rgb(var(--m3-scheme-on-background));
}`}
    name="app.css"
    lang="css"
  />
{/if}
<p>
  So what's going on here? We're using M3 Svelte globals. All of them can be used in components, and
  all of them can be overridden (as outlined earlier). Some come from your custom theme, but most
  are defaults from
  <a href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/styles.css">styles.css</a>.
</p>

<h2 class="m3-font-headline-large">Use M3 Svelte components</h2>
<p>
  It's usually simple to use components. For example, this is what it looks like to use a Button:
</p>
<Snippet code={componentCode3} name="Component.svelte" lang="xml" />
<p>For more, the home page has a lot of demos and code examples.</p>

<style>
  p {
    margin: 0;
    max-width: 100ch;
  }
  p:first-child ~ :global(*) {
    margin-top: 1em;
  }
  h2 {
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
  code {
    font-size: 0.9rem;
    background-color: rgb(var(--m3-scheme-surface-variant));
    padding-inline: 2px;
    border-radius: 0.25rem;
  }
  a {
    color: rgb(var(--m3-scheme-primary));
  }
</style>
