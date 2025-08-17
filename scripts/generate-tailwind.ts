import { writeFile } from "node:fs/promises";
import { colors } from "../src/lib/misc/colors.ts";

const easings = ["-fast-spatial", "-spatial", "-slow-spatial", "-fast", "", "-slow"];
const easingsTF = ["-emphasized", "-emphasized-accel", "-emphasized-decel"];
const fontClasses = [
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
  --font-mono: var(--m3-font-mono);
  --breakpoint-m: 37.5rem; /* ≅ sm */
  --breakpoint-x: 52.5rem; /* ≅ md */
  --breakpoint-l: 75rem; /* ≅ lg, xl */
  --breakpoint-xl: 100rem; /* ≅ 2xl */
}
@theme inline {
  --shadow-1: var(--m3-util-elevation-1);
  --shadow-2: var(--m3-util-elevation-2);
  --shadow-3: var(--m3-util-elevation-3);
  --shadow-4: var(--m3-util-elevation-4);
  --shadow-5: var(--m3-util-elevation-5);

  --radius-xs: var(--m3-util-rounding-extra-small); /* = 4px = rounded-sm */
  --radius-sm: var(--m3-util-rounding-small); /* = 8px = rounded-lg */
  --radius-md: var(--m3-util-rounding-medium); /* = 12px = rounded-xl */
  --radius-lg: var(--m3-util-rounding-large); /* = 16px = rounded-2xl */
  --radius-xl: var(--m3-util-rounding-extra-large); /* = 28px ≅ rounded-3xl */

${[...easings, ...easingsTF].map((e) => `  --ease${e}: var(--m3-util-timing-function${e});`).join("\n")}

  --default-transition-timing-function: var(--ease);
  --default-transition-duration: var(--m3-util-duration);

${colors
  .map((c) => c.name.replaceAll("_", "-"))
  .map((c) => `  --color-${c}: rgb(var(--m3-scheme-${c}));`)
  .join("\n")}
}

${easings
  .filter((e) => e != "")
  .map(
    (e) => `@utility transition${e} {
  transition-timing-function: var(--m3-util-timing-function${e});
  transition-duration: var(--m3-util-duration${e});
}`,
  )
  .join("\n")}

${fontClasses
  .map(
    (c) => `@utility ${c} {
  --: "";
}`,
  )
  .join("\n")}
`;
await writeFile("src/lib/misc/tailwind-styles.css", style);
