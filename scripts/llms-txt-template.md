# M3 Svelte

This is M3 Svelte, a Svelte component library that implements the Material 3 design system by @KTibow.

## Getting started

Follow these steps:

**Choose project**
(use an existing project, create a plain Svelte project with `npm create vite`, or create a SvelteKit project with `npx sv create`)

**Install dependencies**
```bash
npm i m3-svelte vite-plugin-functions-mixins
```

**Configure Vite**
```ts (vite.config.ts)
<!-- VITE_CONFIG -->
```

**Set a theme**
```css (somewhere always loaded)
/* The style snippet you copied from https://ktibow.github.io/m3-svelte/theme goes here */

:root {
  @apply --m3-body-large;
}
```

**Load Roboto**
```html (your template)
<head>
  [...]
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
  />
</head>
<body>
  [...]
</body>
```

Aim to keep configuration and boilerplate out of Svelte.

## Building blocks

M3 Svelte is built on a few core concepts. All of these globals (except colors) are defined in [styles.css](https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/styles.css). All can be used and overridden in your own app.

### Colors

These start with `--m3c-` and are defined in your theme. Available colors:

<!-- COLOR_LIST -->

### Tokens

The truths of Material 3. These start with `--m3-` and look like `--m3-elevation-1`. They have a predefined value and live in `@layer tokens`.

```css
--m3-elevation-[0-5]: [box shadow]; /* Elevation levels */
--m3-shape-[size]: [size];          /* Border radius sizes */
```

Rounding sizes: none, extra-small, small, medium, large, extra-large, full

There's more M3 theming beyond the theme page: you can modify these tokens directly.

### Variables

These start with `--m3v-`, but only a few can be set:
- Set `--m3v-bottom-offset` to shift up snackbars
- Set `--m3v-background` to calibrate the color of an outlined field's box

### Functions

These are shorthands for specific logic. M3 Svelte only has a few:
- `--translucent([color], [opacity])` makes a color semitransparent
- `--m3-density([size])` (theme-defined) adjusts a size

### Mixins

These are shorthands for specific properties, applied with `@apply --[name]`. M3 Svelte's only global mixins are for font styles. You can and could override them to make your own theme.

```css
h1 {
  @apply --m3-display-large;
}
p {
  @apply --m3-body-large;
}
```

Typography scale: display, headline, title, body, label
Typography sizes: large, medium, small

### Components: Ready-to-use Material elements

```svelte
<script>
  import { Button } from "m3-svelte";
</script>

<Button variant="filled">Hello</Button>
```

## Tips

M3 Svelte is more and less than the typical component framework.

On one hand, Material 3 consists of guidelines across color, shadow, easing, animation, and spacing, and M3 Svelte is all of that. You don't have to make your own components or animations - you could use components like `Card` and animate them with the `sharedAxisTransition`, eased with `easeEmphasized`.

On the other hand, M3 Svelte doesn't give you a template. There are many things you have to do yourself, like:

- Generating and pasting your theme
- Including your font
- Resetting CSS
- Setting up your own layout (ideally a responsive one)
- Styling your components (if you need something M3 doesn't have)
- Slotting in <input>s
- Rendering icons

If you're ever unsure about something, you might want to check the [source code](https://github.com/KTibow/m3-svelte). The M3 Svelte demo website is built with M3 Svelte and might have implemented what you're trying to do.

## Troubleshooting

You should avoid trying to restyle components. You can't set a `class` and due to Svelte scoped styles, even if you could, it wouldn't work. I repeat, you CANNOT set a `class` on M3 Svelte components. Always look for alternatives, like using `gap` instead of `margin`. If you _must_ do this, you would have to do something like `.my-container > :global(.m3-container)`.

You must wrap Checkbox, Radio, and Switch in <label>s.

M3 Svelte uses the Iconify ecosystem. M3 Svelte imports icons from NPM and renders them as SVG. Some components render icons for you:

```svelte
<script>
  import { FAB } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
</script>

<FAB icon={iconPlus} />
```

While in other cases, you render them yourselves:

```svelte
<script>
  import { ListItem, Icon } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
</script>

<ListItem headline="User">
  <Icon icon={iconPlus} slot="leading" />
</ListItem>
```

## Examples

Here's an example todo list component:

```svelte
<!-- TODO_LIST_DEMO -->
```

Here's an example notes app:

```svelte
<!-- NOTES_APP_DEMO -->
```

Here's an even more complicated example - a partial clone of the M3 documentation website, using SvelteKit:

```css layout.css
<!-- LAYOUT_CSS_DEMO -->
```

```svelte +layout.svelte
<!-- LAYOUT_SVELTE_DEMO -->
```

```svelte +page.svelte
<!-- PAGE_SVELTE_DEMO -->
```

## Components

Okay, now on to the components. Again, if you're unsure about how a component works, you can look at [its source code](https://github.com/KTibow/m3-svelte).

<!-- COMPONENT_DEMOS -->
