import { SchemeTonalSpot, Hct } from "@ktibow/material-color-utilities-nightly";

const toHex = (color: number) => "#" + (color >>> 0).toString(16).padStart(8, "0").slice(2);

// From src/favicon.svg (107x128)
const sOuter =
  "M94 23a34 34 0 0 0-46-10L22 30A30 30 0 0 0 9 50a32 32 0 0 0 3 20L7 81a32 32 0 0 0 6 24c10 15 31 19 46 10l26-17a30 30 0 0 0 13-20 32 32 0 0 0-3-20l5-11a32 32 0 0 0-6-24";
const sInner =
  "M46 107a21 21 0 0 1-22-9 19 19 0 0 1-4-14l1-3v-1l2 1 10 5h1v1l1 4a6 6 0 0 0 7 3l1-1 26-17 3-3-1-5a6 6 0 0 0-7-2h-2l-10 7-5 2a21 21 0 0 1-22-8 19 19 0 0 1-3-15 18 18 0 0 1 8-12l26-16 5-3a21 21 0 0 1 22 9 19 19 0 0 1 4 14l-1 3v1l-2-1-10-5h-1v-1l-1-4a6 6 0 0 0-7-3l-1 1-26 17-3 3 1 5a6 6 0 0 0 7 2h2l10-7 5-2a21 21 0 0 1 22 8 19 19 0 0 1 3 15 18 18 0 0 1-8 12l-26 16z";

const logoScale = 1.3;
const logoWidth = 107 * logoScale;
const logoHeight = 128 * logoScale;
const gap = 32;
const fontSize = 150;
// Measured bounds of "M3 Svelte" at this size and weight
const textBearing = 9;
const textWidth = 689;
const textHeight = 110;

const width = Math.ceil(logoWidth + gap + textWidth);
const height = Math.ceil(logoHeight);
const textX = logoWidth + gap - textBearing;
const textBaseline = (logoHeight + textHeight) / 2;

// Same hue sweep as the OG image, as one gradient
const stops: string[] = [];
for (let h = 0; h <= 360; h += 30) {
  const scheme = new SchemeTonalSpot(Hct.from(h % 360, 50, 60), true, 0);
  stops.push(toHex(scheme.primary));
}

const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      <![CDATA[
        @import url("https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,700&display=swap");
      ]]>
    </style>
    <linearGradient id="fill" x1="0" y1="0" x2="${width}" y2="0" gradientUnits="userSpaceOnUse">
${stops.map((c, i) => `      <stop offset="${i / (stops.length - 1)}" stop-color="${c}"/>`).join("\n")}
    </linearGradient>
    <mask id="shape">
      <g transform="scale(${logoScale})">
        <path fill="white" d="${sOuter}"/>
        <path fill="black" d="${sInner}"/>
      </g>
      <text
        x="${textX}"
        y="${textBaseline}"
        font-family="Google Sans Flex"
        font-size="${fontSize}"
        font-weight="700"
        fill="white"
      >M3 Svelte</text>
    </mask>
  </defs>
  <rect width="100%" height="100%" fill="url(#fill)" mask="url(#shape)"/>
</svg>`;

await Deno.writeTextFile("static/wordmark.svg", svg);
console.log("Generated wordmark.svg");
