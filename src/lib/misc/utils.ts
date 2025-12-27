import { type DynamicScheme } from "@ktibow/material-color-utilities-nightly";
import { colors } from "./colors";

// default cs value is deprecated
export const genCSS = (light: DynamicScheme, dark: DynamicScheme, cs = colors) => {
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

export const parseSize = (size: string) =>
  (size.endsWith("px")
    ? +size.slice(0, -2)
    : size.endsWith("rem")
      ? +size.slice(0, -3) * 16
      : null) || 0;
