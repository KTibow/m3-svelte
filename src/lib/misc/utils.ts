import { type DynamicScheme } from "@ktibow/material-color-utilities-nightly";
import { colors } from "./colors";

/**
 * @returns A string of CSS code with custom properties representing the color scheme values.
 * */
export const genCSS = (light: DynamicScheme, dark: DynamicScheme) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replaceAll("_", "-");
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `--m3-scheme-${kebabCase}: ${red} ${green} ${blue};`;
  };
  const lightColors = colors
    .map((color) => genColorVariable(color.name, color.getArgb(light)))
    .join("\n");
  const darkColors = colors
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
