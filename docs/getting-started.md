# Getting started

## 1. Install

```sh
pnpm install -D m3-svelte vite-plugin-functions-mixins @ktibow/iconset-material-symbols @fontsource-variable/google-sans-flex
```

## 2. Enable the Vite plugin

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  build: { cssTarget: "esnext" },
  plugins: [sveltekit(), functionsMixins({ deps: ["m3-svelte"] })],
});
```

Without SvelteKit, use `svelte()` from `@sveltejs/vite-plugin-svelte` in place of `sveltekit()`.

Keep `cssTarget`: it stops the minifier from rewriting `light-dark()`, which would ignore a nested
`color-scheme` and make every color transparent under `vite-plugin-token-shaker`.

## 3. Add the styles

```css
/* app.css */
@import "m3-svelte/etc/styles.css";
@import "m3-svelte/etc/recommended-styles.css";
@import "m3-svelte/etc/livetheme/tonalspot2025.css";
@import "@fontsource-variable/google-sans-flex/opsz.css";

/* Required: components size themselves with this. See customizing.md to change density. */
@function --m3-density(--size) {
  result: var(--size);
}

:root {
  @apply --m3-body-large;
  background-color: var(--m3c-surface);
  color: var(--m3c-on-surface);
}
```

Import `app.css` from your root `+layout.svelte` (or your entry file without SvelteKit).

The colors follow the user's system accent color and light/dark preference. To use your own
colors, see [theming.md](./theming.md).

## 4. Use components

```svelte
<script>
  import { Button } from "m3-svelte";
</script>

<Button onclick={() => alert("Hello world")}>Click me</Button>
```

Each component has a page in [components/](./components/README.md).

## Harmless warnings

- pnpm may warn that `vite-plugin-functions-mixins` wants Vite 7. It works with Vite 8.
- `svelte-check` reports `Unknown at rule @apply`. The Vite plugin handles `@apply` at build time.
