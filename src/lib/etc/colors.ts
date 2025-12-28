import {
  MaterialDynamicColors,
  DynamicColor,
  ContrastCurve,
} from "@ktibow/material-color-utilities-nightly";
import type { DynamicScheme } from "@ktibow/material-color-utilities-nightly";

export const materialColors = new MaterialDynamicColors();
// Generates on-on-primary for Switch, read more: https://ktibow.github.io/blog/humanresearch/ononprimary/
const onOnPrimary = DynamicColor.fromPalette({
  name: "on_on_primary",
  palette: (s) => s.primaryPalette,
  background: () => materialColors.onPrimary(),
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});
// Custom colors for you to use
export const primaryContainerSubtle = DynamicColor.fromPalette({
  name: "primary_container_subtle",
  palette: (s) => s.primaryPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
export const onPrimaryContainerSubtle = DynamicColor.fromPalette({
  name: "on_primary_container_subtle",
  palette: (s) => s.primaryPalette,
  background: () => primaryContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});
export const secondaryContainerSubtle = DynamicColor.fromPalette({
  name: "secondary_container_subtle",
  palette: (s) => s.secondaryPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
export const onSecondaryContainerSubtle = DynamicColor.fromPalette({
  name: "on_secondary_container_subtle",
  palette: (s) => s.secondaryPalette,
  background: () => secondaryContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});
export const tertiaryContainerSubtle = DynamicColor.fromPalette({
  name: "tertiary_container_subtle",
  palette: (s) => s.tertiaryPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
export const onTertiaryContainerSubtle = DynamicColor.fromPalette({
  name: "on_tertiary_container_subtle",
  palette: (s) => s.tertiaryPalette,
  background: () => tertiaryContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});
export const errorContainerSubtle = DynamicColor.fromPalette({
  name: "error_container_subtle",
  palette: (s) => s.errorPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
export const onErrorContainerSubtle = DynamicColor.fromPalette({
  name: "on_error_container_subtle",
  palette: (s) => s.errorPalette,
  background: () => errorContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});

export const colors = [
  ...materialColors.allColors.filter((c) => c.name != "background" && c.name != "on_background"),
  materialColors.shadow(),
  materialColors.scrim(),
  onOnPrimary,
  primaryContainerSubtle,
  onPrimaryContainerSubtle,
  secondaryContainerSubtle,
  onSecondaryContainerSubtle,
  tertiaryContainerSubtle,
  onTertiaryContainerSubtle,
  errorContainerSubtle,
  onErrorContainerSubtle,
];

// default cs value is deprecated
export const genCSS = (light: DynamicScheme, dark: DynamicScheme, cs: DynamicColor[]) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replaceAll("_", "-");
    const hex = argb.toString(16).slice(-6);
    return `    --m3c-${kebabCase}: #${hex};`;
  };
  const lightColors = cs
    .map((color) => genColorVariable(color.name, color.getArgb(light)))
    .join("\n");
  const darkColors = cs
    .map((color) => genColorVariable(color.name, color.getArgb(dark)))
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
