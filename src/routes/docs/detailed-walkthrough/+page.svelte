<script>
  import SegmentedButtonContainer from "$lib/buttons/SegmentedButtonContainer.svelte";
  import SegmentedButtonItem from "$lib/buttons/SegmentedButtonItem.svelte";
  import { base } from "$app/paths";

  import Base from "../Base.svelte";
  import Snippet from "../Snippet.svelte";

  let styleType = "plain";
  const componentCode = `<${""}button>Click me<${""}/button>
<style>
  button {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    color: rgb(var(--m3-scheme-primary));
    box-shadow: var(--m3-util-elevation-1);
    border-radius: var(--m3-util-rounding-full);
  }
<${""}/style>`;
</script>

<Base>
  <p>
    Welcome to M3 Svelte! If you haven't already, play around with the components on the home page.
    It's rather fun. They even adapt to the theme you pick. You should also check out the Discord
    and GitHub if you want to keep track of this project.
  </p>
  <p>
    This page is a detailed walkthrough of how to use M3 Svelte: we'll take you from configuration
    to advanced usage.
  </p>

  <h2 class="m3-font-headline-large">Configuring your app</h2>
  <p>
    The first thing to do is to set up your theme and font. If you haven't done that yet, the quick
    start page will help you.
  </p>
  <p>
    Beyond that, you can configure some general settings with CSS variables. You might already know
    that you can change the default font stack with <code>--m3-font</code>, but you can also
    customize the fonts of certain sizes (eg <code>--m3-font-label</code>) and their configuration
    (eg <code>--m3-font-label-large-size</code>). You can also tweak rounding by setting variables
    like <code>--m3-util-rounding-small</code> and <code>--m3-button-shape</code>.
  </p>
  <p>
    One obscure thing you can configure is ripples. You can use a simpler layer by defining
    <code>M3_SVELTE_NO_RIPPLE</code> to <code>true</code> in your Vite config.
  </p>

  <h2 class="m3-font-headline-large">Make your own components</h2>
  <SegmentedButtonContainer>
    <input type="radio" id="styletype-plain" value="plain" bind:group={styleType} />
    <SegmentedButtonItem input="styletype-plain">Plain</SegmentedButtonItem>
    <input type="radio" id="styletype-tailwind" value="tailwind" bind:group={styleType} />
    <SegmentedButtonItem input="styletype-tailwind">Tailwind</SegmentedButtonItem>
  </SegmentedButtonContainer>
  <p>
    Chances are M3 doesn't have everything you need. That's where you can make your own components
    while still using Material 3 elements. Here's an example.
  </p>
  {#if styleType == "tailwind"}
    <Snippet
      code={`<${""}button class="bg-surface-container-low text-primary rounded-full">Click me<${""}/button>`}
      name="Component.svelte"
    />
    <p>You'll need to update your Tailwind config too:</p>
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
}`}
      name="tailwind.config.js"
    />
  {:else}
    <Snippet code={componentCode} name="Component.svelte" />
  {/if}
  <p>You might also want to make your app match your theme. Here's what that could look like:</p>
  {#if styleType == "tailwind"}
    <Snippet
      code={`<body class="m3-font-body-large bg-background text-on-background">`}
      name="app.html"
    />
  {:else}
    <Snippet code={`<body class="m3-font-body-large">`} name="app.html" />
    <Snippet
      code={`body {
  background-color: rgb(var(--m3-scheme-background));
  color: rgb(var(--m3-scheme-on-background));
}`}
      name="app.css"
    />
  {/if}
  <p>
    So what's going on here? We're using M3 Svelte globals. All of them can be used in components,
    and all of them can be overridden (as outlined earlier). Some come from your custom theme, but
    most are defaults from
    <a href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/styles.css">styles.css</a>.
  </p>

  <h2 class="m3-font-headline-large">Use M3 Svelte components</h2>
  <p>
    It's usually simple to use components. For example, this is what it looks like to use a Button:
  </p>
  <Snippet
    code={`<script>
  import { Button } from "m3-svelte";
<${""}/script>

<Button type="filled" on:click={() => alert("Hello world!")}>Click me<${""}/Button>`}
    name="+page.svelte"
  />
  <p>There are a few ways to get more info on how to use a component.</p>
  <ul>
    <li>Click the code button on the component on the home page</li>
    <li>Read the <a href="{base}/llms.txt">the component guide</a></li>
    <li>Check the M3 Svelte source code</li>
  </ul>
</Base>

<style>
  p {
    margin: 0;
    max-width: 100ch;
  }
  p:first-child ~ :global(*) {
    margin-top: 1em;
  }
  h2 {
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
