<script>
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Snippet from "../Snippet.svelte";
  import { appType } from "../../state";

  const componentCode1 = `${"<"}button class="rounded-full bg-surface-container-low text-primary shadow-1">Click me${"<"}/button>`;
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

<h2 class="m3-font-headline-large">
  Make your own components
  <ConnectedButtons>
    <input type="radio" value="vanilla" id="apptype-vanilla" bind:group={$appType} />
    <Button for="apptype-vanilla" variant="filled" square>Vanilla</Button>
    <input type="radio" value="tailwind" id="apptype-tailwind" bind:group={$appType} />
    <Button for="apptype-tailwind" variant="filled" square>Tailwind</Button>
  </ConnectedButtons>
</h2>
<p>
  Chances are M3 doesn't have everything you need. That's where you can make your own components
  while still using Material 3 elements. Here's an example.
</p>
{#if $appType == "tailwind"}
  <Snippet code={componentCode1} name="Component.svelte" lang="xml" />
{:else}
  <Snippet code={componentCode2} name="Component.svelte" lang="xml" />
{/if}
<p>You might also want to make your app match your theme. Here's what that could look like:</p>
{#if $appType == "tailwind"}
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
