import { definePreset, symbols, type CSSObject, type StaticRule } from "unocss";

export default definePreset(() => ({
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
    [
      "transition-fast-spatial",
      {
        "transition-timing-function": "var(--m3-timing-function-fast-spatial)",
        "transition-duration": "var(--m3-duration-fast-spatial)",
      },
    ],
    [
      "transition-spatial",
      {
        "transition-timing-function": "var(--m3-timing-function-spatial)",
        "transition-duration": "var(--m3-duration-spatial)",
      },
    ],
    [
      "transition-slow-spatial",
      {
        "transition-timing-function": "var(--m3-timing-function-slow-spatial)",
        "transition-duration": "var(--m3-duration-slow-spatial)",
      },
    ],
    [
      "transition-fast",
      {
        "transition-timing-function": "var(--m3-timing-function-fast)",
        "transition-duration": "var(--m3-duration-fast)",
      },
    ],
    [
      "transition-slow",
      {
        "transition-timing-function": "var(--m3-timing-function-slow)",
        "transition-duration": "var(--m3-duration-slow)",
      },
    ],

    ["m3-font-display-large", { [symbols.body]: "@apply --m3-display-large;" } as CSSObject],
    ["m3-font-display-medium", { [symbols.body]: "@apply --m3-display-medium;" } as CSSObject],
    ["m3-font-display-small", { [symbols.body]: "@apply --m3-display-small;" } as CSSObject],
    ["m3-font-headline-large", { [symbols.body]: "@apply --m3-headline-large;" } as CSSObject],
    ["m3-font-headline-medium", { [symbols.body]: "@apply --m3-headline-medium;" } as CSSObject],
    ["m3-font-headline-small", { [symbols.body]: "@apply --m3-headline-small;" } as CSSObject],
    ["m3-font-title-large", { [symbols.body]: "@apply --m3-title-large;" } as CSSObject],
    ["m3-font-title-medium", { [symbols.body]: "@apply --m3-title-medium;" } as CSSObject],
    ["m3-font-title-small", { [symbols.body]: "@apply --m3-title-small;" } as CSSObject],
    ["m3-font-label-large", { [symbols.body]: "@apply --m3-label-large;" } as CSSObject],
    ["m3-font-label-medium", { [symbols.body]: "@apply --m3-label-medium;" } as CSSObject],
    ["m3-font-label-small", { [symbols.body]: "@apply --m3-label-small;" } as CSSObject],
    ["m3-font-body-large", { [symbols.body]: "@apply --m3-body-large;" } as CSSObject],
    ["m3-font-body-medium", { [symbols.body]: "@apply --m3-body-medium;" } as CSSObject],
    ["m3-font-body-small", { [symbols.body]: "@apply --m3-body-small;" } as CSSObject],
  ] satisfies StaticRule[],
  preflights: [
    {
      getCSS: () => `:root {
  box-sizing: border-box;
}`,
    },
  ],
}));
