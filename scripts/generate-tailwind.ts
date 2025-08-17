import { writeFile } from "node:fs/promises";
import { colors } from "../src/lib/misc/colors.ts";

const classes = [
  "m3-font-display-large",
  "m3-font-display-medium",
  "m3-font-display-small",
  "m3-font-headline-large",
  "m3-font-headline-medium",
  "m3-font-headline-small",
  "m3-font-title-large",
  "m3-font-title-medium",
  "m3-font-title-small",
  "m3-font-label-large",
  "m3-font-label-medium",
  "m3-font-label-small",
  "m3-font-body-large",
  "m3-font-body-medium",
  "m3-font-body-small",
];
const style = `@theme {
  --*: initial;

  --spacing: 0.25rem;
  --font-mono: "Google Sans Code", "Roboto Mono", monospace;

  --shadow-1: var(--m3-util-elevation-1);
  --shadow-2: var(--m3-util-elevation-2);
  --shadow-3: var(--m3-util-elevation-3);
  --shadow-4: var(--m3-util-elevation-4);
  --shadow-5: var(--m3-util-elevation-5);

  --radius-xs: var(--m3-util-rounding-extra-small); /* = 4px = rounded-sm */
  --radius-s: var(--m3-util-rounding-small); /* = 8px = rounded-lg */
  --radius-m: var(--m3-util-rounding-medium); /* = 12px = rounded-xl */
  --radius-l: var(--m3-util-rounding-large); /* = 16px = rounded-2xl */
  --radius-xl: var(--m3-util-rounding-extra-large); /* = 28px ≅ rounded-3xl */

  --breakpoint-m: 37.5rem; /* ≅ sm */
  --breakpoint-x: 52.5rem; /* ≅ md */
  --breakpoint-l: 75rem; /* ≅ lg, xl */
  --breakpoint-xl: 100rem; /* ≅ 2xl */

${colors
  .map((c) => c.name.replaceAll("_", "-"))
  .map((c) => `  --color-${c}: rgb(var(--m3-scheme-${c}));`)
  .join("\n")}
}
${classes
  .map(
    (c) => `@utility ${c} {
  --: "";
}`,
  )
  .join("\n")}
`;
await writeFile("src/lib/misc/tailwind-styles.css", style);
