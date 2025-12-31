import { writeFile } from "node:fs/promises";
import { colors } from "../src/lib/etc/colors.ts";

const easings = ["-fast-spatial", "-spatial", "-slow-spatial", "-fast", "", "-slow"];
const easingsTF = ["-emphasized", "-emphasized-accel", "-emphasized-decel"];
const fontClasses = [
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-large",
  "title-medium",
  "title-small",
  "label-large",
  "label-medium",
  "label-small",
  "body-large",
  "body-medium",
  "body-small",
];

const style = `@theme {
  --*: initial;
  --spacing: 0.25rem;

  --breakpoint-m: 37.5rem; /* ≅ sm */
  --breakpoint-x: 52.5rem; /* expanded; ≅ md */
  --breakpoint-l: 75rem; /* ≅ lg, xl */
  --breakpoint-xl: 100rem; /* ≅ 2xl */

  --container-m: 37.5rem; /* ≅ xl */
  --container-x: 52.5rem; /* ≅ 3xl, 4xl */
  --container-l: 75rem; /* ≅ 6xl, 7xl */
  --container-xl: 100rem;
}
@theme inline {
  --font-mono: var(--m3-font-mono);

  --shadow-1: var(--m3-elevation-1);
  --shadow-2: var(--m3-elevation-2);
  --shadow-3: var(--m3-elevation-3);
  --shadow-4: var(--m3-elevation-4);
  --shadow-5: var(--m3-elevation-5);

  --radius-xs: var(--m3-shape-extra-small); /* = 4px = rounded-sm */
  --radius-sm: var(--m3-shape-small); /* = 8px = rounded-lg */
  --radius-md: var(--m3-shape-medium); /* = 12px = rounded-xl */
  --radius-lg: var(--m3-shape-large); /* = 16px = rounded-2xl */
  --radius-li: var(--m3-shape-large-increased); /* = 20px = halfway between 2xl and 3xl */
  --radius-xl: var(--m3-shape-extra-large); /* = 28px ≅ rounded-3xl */

${[...easings, ...easingsTF].map((e) => `  --ease${e}: var(--m3-timing-function${e});`).join("\n")}

  --default-transition-timing-function: var(--ease);
  --default-transition-duration: var(--m3-duration);

${colors
  .map((c) => c.name.replaceAll("_", "-"))
  .map((c) => `  --color-${c}: var(--m3c-${c});`)
  .join("\n")}
  --color-v-background: var(--m3v-background);
}

${easings
  .filter((e) => e != "")
  .map(
    (e) => `@utility transition${e} {
  transition-timing-function: var(--m3-timing-function${e});
  transition-duration: var(--m3-duration${e});
}`,
  )
  .join("\n")}

${fontClasses
  .map(
    (c) => `@utility m3-font-${c} {
  @apply --m3-${c};
}`,
  )
  .join("\n")}

@layer base {
  :root {
    box-sizing: border-box;
  }
}
`;
await writeFile("src/lib/etc/tailwind-styles.css", style);
