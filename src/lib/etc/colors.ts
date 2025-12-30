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

export const genCSS = (light: DynamicScheme, dark: DynamicScheme, cs: DynamicColor[]) => {
  const argbToHex = (argb: number): string => {
    const rgb = argb & 0xffffff;
    const hex = rgb.toString(16).padStart(6, "0");

    if (hex[0] == hex[1] && hex[2] == hex[3] && hex[4] == hex[5]) {
      return `#${hex[0]}${hex[2]}${hex[4]}`;
    }

    return `#${hex}`;
  };
  const genColorVariable = (name: string, lightArgb: number, darkArgb: number) => {
    const kebabCase = name.replaceAll("_", "-");
    const lightHex = argbToHex(lightArgb);
    const darkHex = argbToHex(darkArgb);
    return `    --m3c-${kebabCase}: ${lightHex == darkHex ? lightHex : `light-dark(${lightHex}, ${darkHex})`};`;
  };
  const colors = cs
    .map((color) => genColorVariable(color.name, color.getArgb(light), color.getArgb(dark)))
    .join("\n");
  return `:root {
  color-scheme: light dark;
}
@layer tokens {
  :root {
${colors}
  }
}`;
};
