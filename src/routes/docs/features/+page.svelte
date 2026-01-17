<script lang="ts">
  import Switch from "$lib/forms/Switch.svelte";

  let useCompression = $state(true);
  const uc = (uncompressed: number, compressed: number) =>
    useCompression ? compressed : uncompressed;
</script>

<svelte:head><title>Features</title></svelte:head>

<h2>Does a lot, does it right</h2>
<p>M3 Svelte supports:</p>
<ul>
  <li>Theming</li>
  <li>Animations</li>
  <li>Other tokens</li>
  <li>Components (including proper ripples)</li>
  <li>Shapes</li>
</ul>

<p>
  I spent winter days making sure my buttons were completely correct, so don't worry about
  hallucinated styling. Even in edge cases like printing, high contrast mode, or with JavaScript
  disabled, components still work (if distorted).
</p>

<h2>Tiny</h2>
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
  really match M3, copies <abbr title="look at the loading indicator">code without credit</abbr>,
  etc.
</p>
<p>Takes {uc(0.4 + 192.49, 0.27 + 36.75).toFixed(1)}kB to render a Button.</p>
{@render stackedBars("HTML", [uc(0.4, 0.27), uc(0.37, 0.25), uc(0.3, 0.22)])}
{@render stackedBars("CSS", [uc(192.49, 36.75), uc(192.49, 36.75), 0])}
{@render stackedBars("JS (optional)", [uc(12.03, 4.24), uc(12.03, 4.24), 0])}

<h2>How so tiny?</h2>
<p>M3 Svelte has so many optimizations. Some come with using the platform:</p>
<ul>
  <li>SvelteKit can SSR components, meaning they load without JS.</li>
  <li>Svelte Runes mean app size grows slowly.</li>
  <li>Svelte attaches each style to each component, so only used styles are loaded.</li>
</ul>
<p>And others are really interesting:</p>
<ul>
  <li>
    Tokens are grouped in a special layer where they can be inlined or mangled by <code
      >vite-plugin-token-shaker</code
    >
  </li>
  <li>Cutting-edge functions and mixins make deduplication and customization simple</li>
  <li>Themes simply declare tokens using <code>light-dark()</code></li>
  <li>
    Icons use Iconify's SVG wrapper format, meaning unlike Material Web, M3E, or Beer CSS we don't
    need a ~300kB web font
  </li>
  <li>
    A normalized and minified format lets shapes be animated between (for example in the loading
    indicator) without needing Flubber or 2 paths/shape
  </li>
</ul>

<style>
  h2 {
    @apply --m3-headline-medium;
    margin: 0;
  }
  h3 {
    @apply --m3-headline-small;
    margin: 0;
  }
  p {
    @apply --m3-body-large;
    margin: 0;
    max-width: 80ch;
  }
  h2,
  h3,
  p,
  label {
    margin-top: 1em;
  }
  a {
    color: var(--m3c-primary);
  }

  /* Comparison styles */
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
    margin-bottom: 1rem;
    @apply --m3-label-large;
  }
  .stacked-bars-container {
    display: flex;
    @media (width < 37.5rem) {
      flex-direction: column;
    }
    gap: 0.5rem;
    max-width: 100ch;
    margin-bottom: 0.5rem;
  }
  .stacked-bars-container > h4 {
    @apply --m3-title-small;
    width: 5rem;
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
