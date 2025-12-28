# M3 Svelte

This is M3 Svelte, a Svelte component library that implements the Material 3 design system by @KTibow.

## Documentation pages (Svelte source)

These are the actual Svelte files from the docs site. They're authoritative for getting started and building blocks:

### Quick Start page

```svelte
<!-- QUICK_START_DOC -->
```

### Detailed Walkthrough page

```svelte
<!-- WALKTHROUGH_DOC -->
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
