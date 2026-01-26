import { symbols, type CSSObject, type Preset, type StaticRule } from "unocss";
import { colors } from "./colors";

const easings = ["-fast-spatial", "-spatial", "-slow-spatial", "-fast", "", "-slow"];
const fontClasses = [
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-large",
  "title-medium",
  "title-small",
  "label-large",
  "label-medium",
  "label-small",
  "body-large",
  "body-medium",
  "body-small",
];

const preset: Preset = {
  name: "m3-svelte",
  theme: {
    breakpoints: {
      m: "37.5rem", // ≅ sm
      x: "52.5rem", // expanded; ≅ md
      l: "75rem", // ≅ lg, xl
      xl: "100rem", // ≅ 2xl
    },
    container: {
      maxWidth: {
        m: "37.5rem", // ≅ sm
        x: "52.5rem", // expanded; ≅ md
        l: "75rem", // ≅ lg, xl
        xl: "100rem",
      },
    },
    spacing: {
      DEFAULT: "0.25rem",
    },
    fontFamily: {
      sans: "var(--m3-font)",
      mono: "var(--m3-font-mono)",
    },
    boxShadow: {
      "1": "var(--m3-elevation-1)",
      "2": "var(--m3-elevation-2)",
      "3": "var(--m3-elevation-3)",
      "4": "var(--m3-elevation-4)",
      "5": "var(--m3-elevation-5)",
    },
    borderRadius: {
      xs: "var(--m3-shape-extra-small)", // 4px
      sm: "var(--m3-shape-small)", // 8px
      md: "var(--m3-shape-medium)", // 12px
      lg: "var(--m3-shape-large)", // 16px
      li: "var(--m3-shape-large-increased)", // 20px
      xl: "var(--m3-shape-extra-large)", // 28px
    },
    colors: {
      ...Object.fromEntries(
        colors.map((c) => [
          c.name.replaceAll("_", "-"),
          `var(--m3c-${c.name.replaceAll("_", "-")})`,
        ]),
      ),
      "v-background": "var(--m3v-background)",
    },
  },
  rules: [
    ...easings.map(
      (e): StaticRule => [
        `transition${e}`,
        {
          "transition-timing-function": `var(--m3-timing-function${e})`,
          "transition-duration": `var(--m3-duration${e})`,
        },
      ],
    ),
    ...fontClasses.map(
      (c): StaticRule => [`m3-font-${c}`, { [symbols.body]: `@apply --m3-${c}` } as CSSObject],
    ),
  ],
  preflights: [
    {
      getCSS: () => `:root {
  box-sizing: border-box;
}`,
    },
  ],
};
export default () => preset;
