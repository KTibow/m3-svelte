import { SchemeTonalSpot, Hct } from "@ktibow/material-color-utilities-nightly";

const sourceColors: number[] = [];
for (let h = 0; h < 360; h += 30) {
  sourceColors.push(Hct.from(h, 50, 60).toInt());
}

const schemeColors = ["primary", "secondary", "tertiary"] as const;

const width = 1280;
const height = 640;
const dotSize = 16;
const xSpacing = width / (sourceColors.length + 1);
const ySpacing = height / (schemeColors.length + 1);

let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@700&amp;display=swap");
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#1c1b1f"/>

  <g>`;

sourceColors.forEach((sourceColor, x) => {
  const scheme = new SchemeTonalSpot(Hct.fromInt(sourceColor), true, 0);
  schemeColors.forEach((color, y) => {
    const colorValue = scheme[color];
    svg += `
    <circle
      cx="${(x + 1) * xSpacing}"
      cy="${(y + 1) * ySpacing}"
      r="${dotSize / 2}"
      fill="#${(colorValue >>> 0).toString(16).padStart(8, "0").slice(2)}"
    />`;
  });
});

svg += `
  </g>
  <text
    x="50%"
    y="50%"
    font-family="Roboto"
    font-size="120"
    font-weight="700"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle"
  >M3 Svelte</text>
</svg>`;

await Deno.writeTextFile("static/og.svg", svg);
