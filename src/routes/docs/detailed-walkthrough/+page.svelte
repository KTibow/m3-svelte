<script>
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Snippet from "../Snippet.svelte";
  import { appType } from "../../state";

  const componentCode1 = `${"<"}button class="rounded-full bg-surface-container-low text-primary shadow-1">Click me${"<"}/button>`;
  const componentCode2 = `${"<"}button>Click me${"<"}/button>
${"<"}style>
  button {
    background-color: var(--m3c-surface-container-low);
    color: var(--m3c-primary);
    box-shadow: var(--m3-elevation-1);
    border-radius: var(--m3-shape-full);
  }
${"<"}/style>`;
</script>

<p>
  Welcome to M3 Svelte! If you haven't already, play around with the components on the home page.
  It's rather fun. They even adapt to the theme you pick. You should also check out the Discord and
  GitHub if you want to keep track of this project.
</p>

<p>
  The rest of this page covers some finer details of M3 Svelte. It isn't the place to look for
  component-specific info - the home page is.
</p>

<h2>
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
<h2>Apply your theme</h2>
{#if $appType == "tailwind"}
  <Snippet
    code={`<body class="m3-font-body-large bg-background text-on-background">`}
    name="app.html"
    lang="xml"
  />
{:else}
  <Snippet
    code={`body {
  ${"@"}apply --m3-body-large;
  background-color: var(--m3c-background);
  color: var(--m3c-on-background);
}`}
    name="app.css"
    lang="css"
  />
{/if}

<h2>So what's going on here?</h2>
<p>
  We're using M3 Svelte globals. All, except colors, were defined in <a
    href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/styles.css">styles.css</a
  >. All can be used and overridden in your own app. You can categorize these into...
</p>
<h3>Colors</h3>
<p>
  These start with <code>--m3c-</code> and are defined in your theme. If you want a list of them, just
  read your theme's code!
</p>
<h3>Tokens</h3>
<p>
  The truths of Material 3. These start with <code>--m3-</code> and look like
  <code>--m3-elevation-1</code>. They have a predefined value and live in
  <code>@layer tokens</code>.
</p>
<p>
  M3 Svelte's theme page doesn't encompass all M3 theming - you need to modify the values of tokens
  to do that.
</p>
<p>
  We recommend using <a href="https://www.npmjs.com/package/vite-plugin-token-shaker"
    >vite-plugin-token-shaker</a
  > to minify tokens by dropping unused ones, inlining rarely used ones, and mangling commonly used ones.
</p>
<h3>Variables</h3>
<p>These start with <code>--m3v-</code>, but only a few can be set:</p>
<ul>
  <li>Set <code>--m3v-bottom-offset</code> to shift up snackbars</li>
  <li>Set <code>--m3v-density</code> in your theme to make things more or less compressed</li>
  <li>Set <code>--m3v-background</code> to calibrate the color of an outlined text field's box</li>
</ul>
<h3>Functions</h3>
<p>These are shorthands for specific logic. M3 Svelte only has a few:</p>
<ul>
  <li><code>{"--"}translucent([color], [opacity])</code> makes a color semitransparent</li>
  <li><code>{"--"}m3-density([size])</code> adjusts a size based on <code>--m3v-density</code></li>
</ul>
<h3>Mixins</h3>
<p>
  These are shorthands for specific properties, applied with <code>@apply --[name]</code>. M3
  Svelte's only global mixins are for font styles. You can and could override them to make your own
  theme.
</p>

<style>
  p {
    margin: 0;
    max-width: 100ch;
  }
  p:first-child ~ :global(*) {
    margin-top: 1em;
  }
  h2 {
    @apply --m3-headline-large;
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
  h3 {
    @apply --m3-headline-small;
    margin: 0;
  }
  code {
    font-size: 0.9rem;
    background-color: var(--m3c-surface-variant);
    padding-inline: 2px;
    border-radius: 0.25rem;
  }
  a {
    color: var(--m3c-primary);
  }
</style>
