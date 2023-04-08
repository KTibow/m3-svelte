import { type CorePalette, Scheme } from "@importantimport/material-color-utilities";
export type SerializedScheme = (
  | ["primary", number]
  | ["onPrimary", number]
  | ["primaryContainer", number]
  | ["onPrimaryContainer", number]
  | ["secondary", number]
  | ["onSecondary", number]
  | ["secondaryContainer", number]
  | ["onSecondaryContainer", number]
  | ["tertiary", number]
  | ["onTertiary", number]
  | ["tertiaryContainer", number]
  | ["onTertiaryContainer", number]
  | ["error", number]
  | ["onError", number]
  | ["errorContainer", number]
  | ["onErrorContainer", number]
  | ["background", number]
  | ["onBackground", number]
  | ["surface", number]
  | ["onSurface", number]
  | ["surfaceVariant", number]
  | ["onSurfaceVariant", number]
  | ["outline", number]
  | ["outlineVariant", number]
  | ["shadow", number]
  | ["scrim", number]
  | ["inverseSurface", number]
  | ["inverseOnSurface", number]
  | ["inversePrimary", number]
)[];
export const schemesFromPalettes = (corePalette: CorePalette) => {
  return [Scheme.lightFromCorePalette(corePalette), Scheme.darkFromCorePalette(corePalette)];
};
export const genCSS = (light: SerializedScheme, dark: SerializedScheme) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `--m3-scheme-${kebabCase}: ${red} ${green} ${blue};`;
  };
  const lightColors = light
    .map((colorInfo) => {
      const color: [string, number] = colorInfo;
      return genColorVariable(...color);
    })
    .join("\n");
  const darkColors = dark
    .map((colorInfo) => {
      const color: [string, number] = colorInfo;
      return genColorVariable(...color);
    })
    .join("\n");
  const colors = `@media (prefers-color-scheme: light) {
  :root, ::backdrop {
${lightColors}
  }
}
@media (prefers-color-scheme: dark) {
  :root, ::backdrop {
${darkColors}
  }
}`;
  return colors;
};
