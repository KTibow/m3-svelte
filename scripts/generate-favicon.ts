import { Hct, argbFromHex, SchemeTonalSpot } from "@ktibow/material-color-utilities-nightly";

// Same purple primary as in src/routes/state.ts (101 87 137)
const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex("655789")), true, 0);

const toHex = (color: number) => "#" + (color >>> 0).toString(16).padStart(8, "0").slice(2);

const size = 48;
const v = size / 3;

const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size - v}" rx="${v / 2}" fill="${toHex(scheme.primary)}"/>
  <rect width="${size}" y="${size - v}" height="${v}" rx="${v / 2}" fill="#ff3e00"/>
</svg>`;

await Deno.writeTextFile("static/favicon.svg", svg);
console.log("Generated favicon.svg");
