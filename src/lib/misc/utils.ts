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

/**
 * @returns A string of CSS code with custom properties representing the color scheme values.
 * */
export const genCSS = (light: SerializedScheme, dark: SerializedScheme) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `--m3-scheme-${kebabCase}: ${red} ${green} ${blue};`;
  };
  const lightColors = Object.entries(light)
    .map(([name, argb]) => genColorVariable(name, argb))
    .join("\n");
  const darkColors = Object.entries(dark)
    .map(([name, argb]) => genColorVariable(name, argb))
    .join("\n");
  const colors = `
:root {
  accent-color: rgb(var(--m3-scheme-primary));
}
@media (prefers-color-scheme: light) {
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
  return colors;
};
