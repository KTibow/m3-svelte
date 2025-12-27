import { type DynamicScheme } from "@ktibow/material-color-utilities-nightly";
import { colors } from "./colors";

/**
 * @returns A string of CSS code with custom properties representing the color scheme values.
 * */
export const genCSS = (light: DynamicScheme, dark: DynamicScheme) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replaceAll("_", "-");
    const hex = argb.toString(16).slice(-6);
    return `    --m3c-${kebabCase}: #${hex};`;
  };
  const lightColors = colors
    .filter((c) => c.name != "background" && c.name != "on_background")
    .map((color) => genColorVariable(color.name, color.getArgb(light)))
    .join("\n");
  const darkColors = colors
    .filter((c) => c.name != "background" && c.name != "on_background")
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

export const parseSize = (size: string) =>
  (size.endsWith("px")
    ? +size.slice(0, -2)
    : size.endsWith("rem")
      ? +size.slice(0, -3) * 16
      : null) || 0;
