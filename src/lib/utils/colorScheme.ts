export const genCSS = (light: [string, number][], dark: [string, number][]) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `--md-sys-color-${kebabCase}: ${red} ${green} ${blue};`;
  };
  const lightColors = light.map((colorInfo) => genColorVariable(...colorInfo)).join("\n");
  const darkColors = dark.map((colorInfo) => genColorVariable(...colorInfo)).join("\n");
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
