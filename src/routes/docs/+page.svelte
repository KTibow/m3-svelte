<script>
  import { base } from "$app/paths";
</script>

<svelte:head>
  <title>M3 Svelte: Use</title>
</svelte:head>
<h2 class="m3-font-headline-large">Use M3 Svelte</h2>
<div class="card-container">
  <div class="card">
    <span class="number m3-font-display-medium">1</span>
    <p>Install m3-svelte into your SvelteKit project with <code>npm i m3-svelte</code></p>
  </div>
  <div class="card">
    <span class="number m3-font-display-medium">2</span>
    <p>
      To set up your theme, get a theme snippet from <a href="{base}/theme">the theme page</a>. In
      <code>+layout.svelte</code>, import StyleFromScheme and add the snippet
    </p>
  </div>
  <div class="card">
    <span class="number m3-font-display-medium">3</span>
    <p>
      To style the body, add a <code>style</code> tag to the <code>head</code> of
      <code>app.html</code> like this
    </p>
    <pre>{`<${""}style>
  body {
    margin: 0;
    background-color: rgb(var(--m3-scheme-background));
    color: rgb(var(--m3-scheme-on-background));
  }
</${""}style>`}</pre>
  </div>
  <div class="card">
    <span class="number m3-font-display-medium">4</span>
    <p>If you want to use Roboto, add this to the <code>head</code> of <code>app.html</code></p>
    <pre>{`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />`}</pre>
    <p>
      If you want to load another font, set up CSS variables. They will be used by <a
        href="https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/styles.css"
      >
        styles.css
      </a>
    </p>
  </div>
</div>

<style>
  .card-container {
    display: grid;
    gap: 1rem;
  }
  @media (min-width: 60rem) {
    .card-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 80rem) {
    .card-container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  .card {
    background-color: rgb(var(--m3-scheme-surface-container));
    padding: 1rem;
    border-radius: 0.75rem;
    display: flex;
    flex-direction: column;
  }
  .number {
    color: rgb(var(--m3-scheme-primary));
    margin: -0.5rem 0 -1.5rem -0.5rem;
    opacity: 0.38;
  }
  p {
    margin: 0;
  }
  pre {
    white-space: pre-wrap;
    word-break: break-word;
  }
  a {
    color: rgb(var(--m3-scheme-primary));
  }
</style>
