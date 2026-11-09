# Theming

`m3-svelte/etc/livetheme/tonalspot2025.css` computes the whole color scheme in CSS from one
color, `--m3v-source`, which defaults to the system color `AccentColor`. Like Android, an app
doesn't need to choose a theme: it picks up the user's accent color and light/dark preference.
Browsers decide what `AccentColor` reports, and some give a fixed default instead of the real one.

Colors are the `--m3c-*` variables, such as `--m3c-primary`, `--m3c-on-primary`,
`--m3c-surface-container` and `--m3c-primary-container-subtle`. Pair each color with its `on-`
counterpart for text.

## Use a specific color

Set `--m3v-source` to any CSS color, after the theme import:

```css
:root {
  --m3v-source: #6750a4;
}
```

It can also change at runtime:

```ts
document.documentElement.style.setProperty("--m3v-source", color);
```

To theme part of a page, add the class `m3-theme` to that element and set `--m3v-source` on it.
This doesn't work with `vite-plugin-token-shaker`, which keeps theme colors on `:root`.

## Choose a style

Swap the import for another file in `m3-svelte/etc/livetheme/`:

| Style       | Files                                      | Look                     |
| ----------- | ------------------------------------------ | ------------------------ |
| Tonal Spot  | `tonalspot2025.css`, `tonalspot2021.css`   | The classic look         |
| Vibrant     | `vibrant2025.css`, `vibrant2021.css`       | Vivid colors all around  |
| Expressive  | `expressive2025.css`, `expressive2021.css` | Harmoniously rotated     |
| Neutral     | `neutral2025.css`, `neutral2021.css`       | Almost grayscale         |
| Rainbow     | `rainbow2021.css`                          | Vivid primary, drab rest |
| Fruit Salad | `fruitsalad2021.css`                       | Spin the chroma around   |

## Live or static

A live theme is an approximation of Material Color Utilities (MCU) in CSS. It's close: for
Tonal Spot 2025, the median color differs from MCU by 0.62 ΔE (OKLab × 100), and the worst
measured case, a tertiary color, by 9.6. It costs about 2.5 KB gzipped, plus the work of computing
the colors on each page load. Vibrant 2025 is the least accurate style, off by up to 30 ΔE on its
tertiary colors.

Bake a static theme when the color is fixed. It's exact MCU output, smaller, and its tokens can be
inlined and removed when unused by `vite-plugin-token-shaker`. You need a static theme for:

- exact MCU colors
- a contrast level other than the default
- the `Content`, `Fidelity`, `Monochrome` or `CMF` variants
- the `dim`, `bright` and `fixed` roles, such as `--m3c-surface-dim`, which live themes omit

### Bake one

The [theme editor](https://kendell.dev/m3-svelte/theme) does this interactively; its Copy button
gives you a complete stylesheet. To do it from a script:

```sh
pnpm install -D @ktibow/material-color-utilities-nightly
```

```js
// generate-theme.js
import { DynamicScheme, Hct, Variant } from "@ktibow/material-color-utilities-nightly";
import { colors, genCSS } from "m3-svelte/etc/colors";

const scheme = (isDark) =>
  new DynamicScheme({
    sourceColorHct: Hct.fromInt(0xff6750a4),
    variant: Variant.TONAL_SPOT,
    contrastLevel: 0, // -1 to 1
    isDark,
    specVersion: "2025",
  });

// Remove this filter if you use the dim, bright or fixed roles.
const roles = colors.filter((c) => !/dim|bright|fixed/.test(c.name));
console.log(genCSS(scheme(false), scheme(true), roles));
```

```sh
node generate-theme.js > src/theme.css
```

Run it from your project root as an ES module (`"type": "module"`, or name it `.mjs`). Then
replace the live theme import with your file:

```diff
-@import "m3-svelte/etc/livetheme/tonalspot2025.css";
+@import "./theme.css";
```

You still define `--m3-density` yourself, as in [getting-started.md](./getting-started.md).
