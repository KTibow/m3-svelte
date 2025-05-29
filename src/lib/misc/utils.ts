import {
  type DynamicScheme,
  MaterialDynamicColors,
} from "@ktibow/material-color-utilities-nightly";

export type Color =
  | "primary"
  | "onPrimary"
  | "primaryContainer"
  | "onPrimaryContainer"
  | "inversePrimary"
  | "secondary"
  | "onSecondary"
  | "secondaryContainer"
  | "onSecondaryContainer"
  | "tertiary"
  | "onTertiary"
  | "tertiaryContainer"
  | "onTertiaryContainer"
  | "error"
  | "onError"
  | "errorContainer"
  | "onErrorContainer"
  | "background"
  | "onBackground"
  | "surface"
  | "onSurface"
  | "surfaceVariant"
  | "onSurfaceVariant"
  | "inverseSurface"
  | "inverseOnSurface"
  | "outline"
  | "outlineVariant"
  | "shadow"
  | "scrim"
  | "surfaceDim"
  | "surfaceBright"
  | "surfaceContainerLowest"
  | "surfaceContainerLow"
  | "surfaceContainer"
  | "surfaceContainerHigh"
  | "surfaceContainerHighest"
  | "surfaceTint";
export type SerializedScheme = Record<Color, number>;

export const pairs = [
  ["primary", "onPrimary"],
  ["primaryContainer", "onPrimaryContainer"],
  ["secondary", "onSecondary"],
  ["secondaryContainer", "onSecondaryContainer"],
  ["tertiary", "onTertiary"],
  ["tertiaryContainer", "onTertiaryContainer"],
  ["background", "onBackground"],
  ["surface", "onSurface"],
  ["inverseSurface", "inverseOnSurface"],
  ["surfaceVariant", "onSurfaceVariant"],
  ["error", "onError"],
  ["errorContainer", "onErrorContainer"],
];

export const colors: Color[] = [
  "primary",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "inversePrimary",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "background",
  "onBackground",
  "surface",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "inverseSurface",
  "inverseOnSurface",
  "outline",
  "outlineVariant",
  "shadow",
  "scrim",
  "surfaceDim",
  "surfaceBright",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "surfaceTint",
];

/**
 * @returns A string of CSS code with custom properties representing the color scheme values.
 * */
export const genCSS = (light: DynamicScheme, dark: DynamicScheme) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `--m3-scheme-${kebabCase}: ${red} ${green} ${blue};`;
  };
  const lightColors = colors
    .map((name) => genColorVariable(name, MaterialDynamicColors[name].getArgb(light)))
    .join("\n");
  const darkColors = colors
    .map((name) => genColorVariable(name, MaterialDynamicColors[name].getArgb(dark)))
    .join("\n");
  return `@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
  :root, ::backdrop {
${lightColors}
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
  :root, ::backdrop {
${darkColors}
  }
}`;
};

export const parseSize = (size: string) =>
  (size.endsWith("px")
    ? +size.slice(0, -2)
    : size.endsWith("rem")
      ? +size.slice(0, -3) * 16
      : null) || 0;
