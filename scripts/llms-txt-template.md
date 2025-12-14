# M3 Svelte

This is M3 Svelte, a Svelte component library that implements the Material 3 design system by @KTibow.

## Getting started

The first step is installation:

```bash
npm i m3-svelte
```

M3 Svelte needs two things to work: a theme and a font. The simplest setup looks like this:

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

```css (somewhere always loaded)
/* The style snippet you copied from https://ktibow.github.io/m3-svelte/theme goes here */

body {
  @apply --m3-body-large;
}

:root {
  /* Any custom styles should go here */
}
```

Aim to keep configuration and boilerplate out of Svelte.

## Building blocks

M3 Svelte is built on a few core concepts:

### CSS Custom Properties: The foundation of theming

```css
--m3c-[color]: [hex];               /* Color tokens */
--m3-elevation-[0-5]: [box shadow]; /* Elevation levels */
--m3-shape-[size]: [size];          /* Border radius sizes */
/*
Colors:
primary, on-primary, primary-container, on-primary-container, inverse-primary, secondary, on-secondary, secondary-container, on-secondary-container, tertiary, on-tertiary, tertiary-container, on-tertiary-container, error, on-error, error-container, on-error-container, background, on-background, surface, on-surface, surface-variant, on-surface-variant, inverse-surface, inverse-on-surface, outline, outline-variant, shadow, scrim, surface-dim, surface-bright, surface-container-lowest, surface-container-low, surface-container, surface-container-high, surface-container-highest, surface-tint
Rounding sizes:
none, extra-small, small, medium, large, extra-large, full
/*
```

### Typography Mixins: Apply Material typography styles with `@apply`

```css
h1 {
  @apply --m3-display-large;
}
p {
  @apply --m3-body-large;
}
/*
Scale: display, headline, title, body, label
Sizes: large, medium, small
*/
```

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

If you're ever unsure about something, you might want to check the [m3-svelte repo](https://github.com/KTibow/m3-svelte). The M3 Svelte demo website is built with M3 Svelte and might have implemented what you're trying to do.

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
