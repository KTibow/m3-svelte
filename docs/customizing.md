# Customizing

M3 Svelte gives you Material 3's colors, shapes, type, motion and components. It doesn't give you
a template: your layout, fonts and CSS reset are up to you.

## Rules to know

- **You can't set `class` on M3 Svelte components**, and Svelte's scoped styles wouldn't reach them
  anyway. Prefer layout on the parent, like `gap` instead of `margin`. If you must restyle one, use
  something like `.my-container > :global(.m3-container)`.
- **Wrap `Checkbox`, `Radio` and `Switch` in a `<label>`.**
- **Pass icons as data.** Icons are Iconify objects imported from npm. Some components render them
  for you, and otherwise you use `Icon`:

```svelte
<script>
  import { FAB, Icon, ListItem } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
</script>

<FAB icon={iconPlus} />

<ListItem headline="User">
  {#snippet leading()}
    <Icon icon={iconPlus} />
  {/snippet}
</ListItem>
```

## Build your own components

```svelte
<button class="m3-layer">Click me</button>

<style>
  button {
    background-color: var(--m3c-surface-container-low);
    color: var(--m3c-primary);
    box-shadow: var(--m3-elevation-1);
    border-radius: var(--m3-shape-full);
  }
</style>
```

`m3-layer` adds the hover and press states. If layers don't work, `import "m3-svelte/etc/layer"`.

## Tokens

Tokens live in `@layer tokens`. Override them in your own CSS. `vite-plugin-token-shaker` can inline
them and remove unused ones: add `tokenShaker()` to your Vite plugins,
and keep the `build.cssTarget` from [getting-started.md](./getting-started.md) or colors come out transparent.

- Colors: `--m3c-*`, from your theme. See [theming.md](./theming.md).
- Elevation: `--m3-elevation-0` through `--m3-elevation-5`
- Shapes: `--m3-shape-[size]`, where size is `none`, `extra-small`, `small`, `medium`, `large`,
  `extra-large` or `full`
- Motion and fonts: see `node_modules/m3-svelte/package/etc/styles.css`

## Variables

These start with `--m3v-` and send information to M3 Svelte.

- `--m3v-source`: the color a live theme is built from
- `--m3v-bottom-offset`: shifts snackbars up
- `--m3v-background`: calibrates the color of an outlined field's box

## Functions

- `--translucent([color], [opacity])` makes a color semitransparent.
- `--m3-density([size])` adjusts a component size. **Your app must define it**:

```css
/* Default density */
@function --m3-density(--size) {
  result: var(--size);
}

/* Or denser: each step is 0.25rem */
@function --m3-density(--size) {
  result: calc(var(--size) - 0.25rem);
}
```

## Mixins

Apply these with `@apply --[name]`.

- Type: `--m3-[scale]-[size]`, where scale is `display`, `headline`, `title`, `body` or `label`, and
  size is `large`, `medium` or `small`
- Focus: `--m3-focus-inward` and `--m3-focus-none`

## Tailwind and UnoCSS

For Tailwind, add `@import "m3-svelte/etc/tailwind-styles.css";` after M3 Svelte's styles. Tailwind
[may not support mixins yet](https://github.com/parcel-bundler/lightningcss/issues/788), so check
this before relying on it. For UnoCSS, use the preset from `m3-svelte/etc/unocss-preset`.
