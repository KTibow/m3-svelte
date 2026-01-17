<script lang="ts">
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Snippet from "../Snippet.svelte";
  import { appType } from "../../state";
  import Switch from "$lib/forms/Switch.svelte";

  let useCompression = $state(true);
  const uc = (uncompressed: number, compressed: number) =>
    useCompression ? compressed : uncompressed;
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

{#snippet color(c: string, label: string)}
  <span class="color" style:color="color-mix(in oklab, currentColor, {c} 30%)">
    <span style:background-color={c}></span>
    {label}
  </span>
{/snippet}
{#snippet stackedBars(title: string, nums: number[])}
  <div class="stacked-bars-container">
    <h4>{title}</h4>
    <div class="stacked-bars">
      {#each nums as n}
        <div style:width="{(n / 100) * 100}%" title="{n.toFixed(2)}kB"></div>
      {/each}
    </div>
  </div>
{/snippet}

<h2>Versus other libraries</h2>
<p>
  We tested the sizes of the {@render color(
    "var(--m3c-primary-container-subtle)",
    "framework baseline",
  )}, {@render color("var(--m3c-primary-container)", "library baseline")}, and {@render color(
    "var(--m3c-primary)",
    "full size to render a Button",
  )}. The build setups are
  <a href="https://github.com/KTibow/m3-svelte-comparisons">available on GitHub</a>.
</p>
<label>
  <Switch bind:checked={useCompression} />
  Use compression
</label>

<h3>M3 Svelte (SvelteKit)</h3>
<p>Built using token-shaker.</p>
<p>Takes {uc(1.148 + 1.22 + 5.87, 0.609 + 0.62 + 1.33).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(1.148, 0.609), uc(0.985, 0.535), uc(0.842, 0.483)])}
{@render stackedBars("CSS", [uc(1.22 + 5.87, 0.62 + 1.33), uc(0.63 + 0.85, 0.31 + 0.46), 0])}
{@render stackedBars("JS (optional)", [uc(78.03, 37.75), uc(67.45, 33.04), uc(63.74, 30.74)])}

<h3>M3 Svelte (Vite)</h3>
<p>Built using token-shaker.</p>
<p>Takes {uc(0.38 + 7.08 + 37.43, 0.26 + 1.78 + 14.41).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(0.38, 0.26), uc(0.38, 0.26), uc(0.3, 0.22)])}
{@render stackedBars("CSS", [uc(7.08, 1.78), uc(1.48, 0.67), 0])}
{@render stackedBars("JS", [uc(37.43, 14.41), uc(23.5, 9.22), uc(19.82, 7.95)])}

<h3><a href="https://material-web.dev/">Material Web</a> (Vite)</h3>
<p>
  Material Web uses web components, but <a
    href="https://github.com/material-components/material-web/discussions/5642">isn't developed</a
  >.
</p>
<p>Takes {uc(0.35 + 45.5, 0.24 + 13.53).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(0.35, 0.24), uc(0.3, 0.22), uc(0.3, 0.22)])}
{@render stackedBars("JS", [uc(45.5, 13.53), uc(25.42, 9.23), uc(15.39, 5.91)])}

<h3><a href="https://matraic.github.io/m3e/">M3E</a> (Vite)</h3>
<p>
  M3E uses web components, but is vibe coded, so some of the components look weird. It also has
  numerous extraneous components.
</p>
<p>Takes {uc(0.34 + 155.25, 0.24 + 32.31).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(0.34, 0.24), uc(0.3, 0.22), uc(0.3, 0.22)])}
{@render stackedBars("JS", [uc(155.25, 32.31), uc(87.28, 21.33), uc(15.39, 5.91)])}

<h3><a href="https://m3dl.r58playz.dev/">M3 Dreamland</a> (Vite)</h3>
<p>
  M3 Dreamland uses Dreamland, a minimal, experimental web framework. Dreamland is built for
  client-side apps; it can do SSR, but you have to configure prerendering and such manually.
</p>
<p>Takes {uc(0.3 + 131.12, 0.22 + 29.04).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(0.3, 0.22), uc(0.3, 0.22), uc(0.3, 0.22)])}
{@render stackedBars("JS", [uc(131.12, 29.04), uc(91.32, 23.29), uc(7.77, 3.83)])}

<h3><a href="https://m3dl.r58playz.dev/">M3 Solid</a> (Vite)</h3>
<p>Coming soon. Would show up <a href="https://github.com/PalmDevs">here</a>.</p>

<h3><a href="https://www.beercss.com/">Beer CSS</a> (Vite)</h3>
<p>
  The good part about Beer CSS is that it has a lot of styles. The bad part is that it's unserious:
  many of the styles aren't from M3, no support for tree shaking, dark mode requires JS, doesn't
  really match M3, copies code without credit, etc.
</p>
<p>Takes {uc(0.4 + 192.49, 0.27 + 36.75).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(0.4, 0.27), uc(0.37, 0.25), uc(0.3, 0.22)])}
{@render stackedBars("CSS", [uc(192.49, 36.75), uc(192.49, 36.75), 0])}
{@render stackedBars("JS (optional)", [uc(12.03, 4.24), uc(12.03, 4.24), 0])}

<h3>Fun fact</h3>
<p>
  Most of Svelte and M3 Svelte's optimizations show up in this simple demo. For example, you can see
  how Svelte let the button be rendered with just HTML and CSS, and how the tokens and styles that
  were shipped was optimized to the specific component. But adding an icon would tip the scale even
  further. Material Web, M3E, and Beer CSS pull in <em>all icons</em> (by default) through an icon font,
  which can weigh nearly 300kB.
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

  .color {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    > span {
      width: 12px;
      height: 12px;
      border-radius: var(--m3-shape-full);
    }
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .stacked-bars-container {
    display: flex;
    @media (width < 37.5rem) {
      flex-direction: column;
    }
    gap: 0.5rem;
    max-width: 100ch;
  }
  .stacked-bars-container > h4 {
    @apply --m3-title-small;
    width: 5rem;
    margin: 0;
    align-self: center;
  }
  .stacked-bars {
    display: flex;
    height: 64px;
    flex-grow: 1;
    position: relative;
    > * {
      position: absolute;
      inset: 0 auto 0 0;
      border-radius: var(--m3-shape-small);
    }
    > :nth-child(1) {
      background-color: var(--m3c-primary);
    }
    > :nth-child(2) {
      background-color: var(--m3c-primary-container);
    }
    > :nth-child(3) {
      background-color: var(--m3c-primary-container-subtle);
    }
  }
</style>
