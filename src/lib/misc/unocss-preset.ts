import { definePreset, symbols, type CSSObject, type Preset, type StaticRule } from "unocss";

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

export default definePreset({
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
      xl: "var(--m3-shape-extra-large)", // 28px
    },
    colors: {
      background: "var(--m3c-background)",
      "on-background": "var(--m3c-on-background)",
      surface: {
        DEFAULT: "var(--m3c-surface)",
        dim: "var(--m3c-surface-dim)",
        bright: "var(--m3c-surface-bright)",
        "container-lowest": "var(--m3c-surface-container-lowest)",
        "container-low": "var(--m3c-surface-container-low)",
        container: "var(--m3c-surface-container)",
        "container-high": "var(--m3c-surface-container-high)",
        "container-highest": "var(--m3c-surface-container-highest)",
      },
      "on-surface": {
        DEFAULT: "var(--m3c-on-surface)",
        variant: "var(--m3c-on-surface-variant)",
      },
      outline: {
        DEFAULT: "var(--m3c-outline)",
        variant: "var(--m3c-outline-variant)",
      },
      inverse: {
        surface: "var(--m3c-inverse-surface)",
        "on-surface": "var(--m3c-inverse-on-surface)",
        primary: "var(--m3c-inverse-primary)",
      },
      primary: {
        DEFAULT: "var(--m3c-primary)",
        dim: "var(--m3c-primary-dim)",
        container: "var(--m3c-primary-container)",
        "container-subtle": "var(--m3c-primary-container-subtle)",
        fixed: "var(--m3c-primary-fixed)",
        "fixed-dim": "var(--m3c-primary-fixed-dim)",
      },
      "on-primary": {
        DEFAULT: "var(--m3c-on-primary)",
        container: "var(--m3c-on-primary-container)",
        "container-subtle": "var(--m3c-on-primary-container-subtle)",
        fixed: "var(--m3c-on-primary-fixed)",
        "fixed-variant": "var(--m3c-on-primary-fixed-variant)",
      },
      "on-on-primary": "var(--m3c-on-on-primary)",
      secondary: {
        DEFAULT: "var(--m3c-secondary)",
        dim: "var(--m3c-secondary-dim)",
        container: "var(--m3c-secondary-container)",
        "container-subtle": "var(--m3c-secondary-container-subtle)",
        fixed: "var(--m3c-secondary-fixed)",
        "fixed-dim": "var(--m3c-secondary-fixed-dim)",
      },
      "on-secondary": {
        DEFAULT: "var(--m3c-on-secondary)",
        container: "var(--m3c-on-secondary-container)",
        "container-subtle": "var(--m3c-on-secondary-container-subtle)",
        fixed: "var(--m3c-on-secondary-fixed)",
        "fixed-variant": "var(--m3c-on-secondary-fixed-variant)",
      },
      tertiary: {
        DEFAULT: "var(--m3c-tertiary)",
        dim: "var(--m3c-tertiary-dim)",
        container: "var(--m3c-tertiary-container)",
        "container-subtle": "var(--m3c-tertiary-container-subtle)",
        fixed: "var(--m3c-tertiary-fixed)",
        "fixed-dim": "var(--m3c-tertiary-fixed-dim)",
      },
      "on-tertiary": {
        DEFAULT: "var(--m3c-on-tertiary)",
        container: "var(--m3c-on-tertiary-container)",
        "container-subtle": "var(--m3c-on-tertiary-container-subtle)",
        fixed: "var(--m3c-on-tertiary-fixed)",
        "fixed-variant": "var(--m3c-on-tertiary-fixed-variant)",
      },
      error: {
        DEFAULT: "var(--m3c-error)",
        dim: "var(--m3c-error-dim)",
        container: "var(--m3c-error-container)",
        "container-subtle": "var(--m3c-error-container-subtle)",
      },
      "on-error": {
        DEFAULT: "var(--m3c-on-error)",
        container: "var(--m3c-on-error-container)",
        "container-subtle": "var(--m3c-on-error-container-subtle)",
      },
      shadow: "var(--m3c-shadow)",
      scrim: "var(--m3c-scrim)",
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
} satisfies Preset);
