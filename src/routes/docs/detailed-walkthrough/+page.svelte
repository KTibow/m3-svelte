<script lang="ts">
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
    <Button variant="tonal" square label
      ><input type="radio" value="vanilla" bind:group={$appType} />Vanilla</Button
    >
    <Button variant="tonal" square label
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
<p>We're using M3 Svelte globals.</p>
<p class="styles-defined">
  Some globals are defined in <a
    href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/etc/styles.css">styles.css</a
  >. If you want to change them, nothing's stopping you from overriding them in your own theme.
</p>
<p class="theme-defined">
  Other globals are defined directly in your theme - you can read and write them there.
</p>
<h3>Tokens</h3>
<p>
  These live in <code>@layer tokens</code>. M3 Svelte defines many, like
  <span class="styles-defined">elevations</span>
  (<code class="styles-defined">--m3-elevation-0</code> through
  <code class="styles-defined">--m3-elevation-5</code>) and
  <span class="styles-defined">shapes</span> (<code class="styles-defined">--m3-shape-[size]</code>
  where size is none, extra-small, small, medium, large, extra-large, or full).
  <span class="theme-defined">Colors</span>, the
  <code class="theme-defined">--m3c-</code> variables, are also tokens.
</p>
<p>Want these to be minified and inlined? The "Use token-shaker" option from setup does that.</p>
<h3>Variables</h3>
<p>These start with <code>--m3v-</code>, and let you send information to M3 Svelte.</p>
<ul>
  <li>Set <code>--m3v-bottom-offset</code> to shift up snackbars</li>
  <li>Set <code>--m3v-background</code> to calibrate the color of an outlined field's box</li>
</ul>
<h3>Functions</h3>
<p>These are shorthands for specific logic, like:</p>
<ul>
  <li>
    <code class="styles-defined">--translucent([color], [opacity])</code> makes a color semitransparent
  </li>
  <li><code class="theme-defined">--m3-density([size])</code> adjusts a size</li>
</ul>
<h3>Mixins</h3>
<p>
  These are shorthands for specific properties, applied with <code>@apply --[name]</code>.
</p>
<p>
  M3 Svelte's built in mixins: <span class="styles-defined">font styles</span>
  (<code class="styles-defined">@apply --m3-[scale]-[size]</code>. scales: display, headline, title,
  body, label. sizes: large, medium, small) and <span class="styles-defined">focus styles</span>
  (<code class="styles-defined">@apply --m3-focus-inward</code> and
  <code class="styles-defined">@apply --m3-focus-none</code>).
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
    align-items: center;
    gap: 1rem;
    margin: 0;
  }
  h3 {
    @apply --m3-headline-small;
    margin: 0;
  }
  code {
    font-size: 0.9rem;
    background-color: var(--m3c-surface-container-highest);
    padding-inline: 2px;
    border-radius: 0.25rem;
  }
  a {
    color: var(--m3c-primary);
  }
  .styles-defined {
    background-color: var(--m3c-primary-container-subtle);
    color: var(--m3c-on-primary-container-subtle);
  }
  .theme-defined {
    background-color: var(--m3c-tertiary-container-subtle);
    color: var(--m3c-on-tertiary-container-subtle);
  }
  p.styles-defined,
  p.theme-defined {
    padding-inline: 0.25rem;
    margin-inline: -0.25rem;
    border-radius: var(--m3-shape-small);
    align-self: start;
  }
</style>
