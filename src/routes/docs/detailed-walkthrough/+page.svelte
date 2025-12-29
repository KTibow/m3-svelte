<script>
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Snippet from "../Snippet.svelte";
  import { appType } from "../../state";
</script>

<svelte:head><title>Walkthrough</title></svelte:head>

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
    <Button square label><input type="radio" value="vanilla" bind:group={$appType} />Vanilla</Button
    >
    <Button square label
      ><input type="radio" value="tailwind" bind:group={$appType} />Tailwind</Button
    >
  </ConnectedButtons>
</h2>
{#if $appType == "tailwind"}
  <p>
    ⚠️ Tailwind <a href="https://github.com/tailwindlabs/tailwindcss/pull/19427"
      >may not support mixins yet</a
    >. You may need to stay on M3 Svelte v5 for now.
  </p>
{/if}
<p>
  Chances are M3 doesn't have everything you need. That's where you can make your own components
  while still using Material 3 elements. Here's an example.
</p>
{#if $appType == "tailwind"}
  <Snippet
    name="Component.svelte"
    html={/* svelte */ `<${""}button class="rounded-full bg-surface-container-low text-primary shadow-1 m3-layer">Click me</${""}button>`}
  />
{:else}
  <Snippet
    name="Component.svelte"
    html={/* svelte */ `<${""}button class="m3-layer">Click me</${""}button>
<${""}style>
  button {
    background-color: var(--m3c-surface-container-low);
    color: var(--m3c-primary);
    box-shadow: var(--m3-elevation-1);
    border-radius: var(--m3-shape-full);
  }
</${""}style>`}
  />
{/if}
<p>
  If layers don't work on your own components, or even in M3 Svelte's, you may need to <code
    >import "m3-svelte/etc/layer"</code
  >.
</p>

<h2>Apply your theme</h2>
{#if $appType == "tailwind"}
  <Snippet
    name="app.html"
    html={/* html */ `<html class="m3-font-body-large bg-surface text-on-surface" lang="en">`}
  />
{:else}
  <Snippet
    name="app.css"
    html={/* css */ `:root {
  @apply --m3-body-large;
  background-color: var(--m3c-surface);
  color: var(--m3c-on-surface);
}`}
  />
{/if}

<h2>So what's going on here?</h2>
<p>
  We're using M3 Svelte globals. All, except colors, were defined in <a
    href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/etc/styles.css">styles.css</a
  >. All can be used and overridden in your own app. You can categorize these into...
</p>
<h3>Colors</h3>
<p>
  These start with <code>--m3c-</code> and are defined in your theme. If you want a list of them, just
  read your theme's code!
</p>
<p>
  <em>
    For new themes, background, dim, bright, and fixed colors aren't included by default. There's an
    option on the theme page to include dim/bright and to include fixed colors.
  </em>
</p>
<h3>Tokens</h3>
<p>
  The truths of Material 3. They have a predefined value and live in
  <code>@layer tokens</code>. Some examples:
</p>
<p>
  Elevations: <code>--m3-elevation-0</code> through <code>--m3-elevation-5</code>
</p>
<p>
  Shapes: <code>--m3-shape-[size]</code> where size is none, extra-small, small, medium, large, extra-large,
  or full.
</p>
<p>M3 theming beyond the theme page is possible - you can modify these directly.</p>
<p>
  We recommend using <a href="https://www.npmjs.com/package/vite-plugin-token-shaker"
    >vite-plugin-token-shaker</a
  > to minify tokens by dropping unused ones, inlining rarely used ones, and mangling commonly used ones.
</p>
<h3>Variables</h3>
<p>These start with <code>--m3v-</code>, but only a few can be set:</p>
<ul>
  <li>Set <code>--m3v-bottom-offset</code> to shift up snackbars</li>
  <li>Set <code>--m3v-background</code> to calibrate the color of an outlined field's box</li>
</ul>
<h3>Functions</h3>
<p>These are shorthands for specific logic. M3 Svelte only has a few:</p>
<ul>
  <li><code>--translucent([color], [opacity])</code> makes a color semitransparent</li>
  <li><code>--m3-density([size])</code> (theme-defined) adjusts a size</li>
</ul>
<h3>Mixins</h3>
<p>
  These are shorthands for specific properties, applied with <code>@apply --[name]</code>. M3
  Svelte's only global mixins are for font styles: <code>@apply --m3-[scale]-[size]</code>.
</p>
<p>Scales: display, headline, title, body, label. Sizes: large, medium, small.</p>
<p>You can override these to make your own theme.</p>

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
