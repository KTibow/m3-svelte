import { writable } from "svelte/store";

export const styling = writable(`
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
  :root,
  ::backdrop {
    --m3-scheme-primary: 101 85 143;
    --m3-scheme-on-primary: 255 255 255;
    --m3-scheme-primary-container: 233 221 255;
    --m3-scheme-on-primary-container: 77 61 117;
    --m3-scheme-inverse-primary: 207 189 254;
    --m3-scheme-secondary: 98 91 113;
    --m3-scheme-on-secondary: 255 255 255;
    --m3-scheme-secondary-container: 232 222 248;
    --m3-scheme-on-secondary-container: 74 68 88;
    --m3-scheme-tertiary: 126 82 96;
    --m3-scheme-on-tertiary: 255 255 255;
    --m3-scheme-tertiary-container: 255 217 227;
    --m3-scheme-on-tertiary-container: 99 59 72;
    --m3-scheme-error: 186 26 26;
    --m3-scheme-on-error: 255 255 255;
    --m3-scheme-error-container: 255 218 214;
    --m3-scheme-on-error-container: 147 0 10;
    --m3-scheme-background: 253 247 255;
    --m3-scheme-on-background: 29 27 32;
    --m3-scheme-surface: 253 247 255;
    --m3-scheme-on-surface: 29 27 32;
    --m3-scheme-surface-variant: 231 224 235;
    --m3-scheme-on-surface-variant: 73 69 78;
    --m3-scheme-inverse-surface: 50 47 53;
    --m3-scheme-inverse-on-surface: 245 239 247;
    --m3-scheme-outline: 122 117 127;
    --m3-scheme-outline-variant: 202 196 207;
    --m3-scheme-shadow: 0 0 0;
    --m3-scheme-scrim: 0 0 0;
    --m3-scheme-surface-dim: 222 216 224;
    --m3-scheme-surface-bright: 253 247 255;
    --m3-scheme-surface-container-lowest: 255 255 255;
    --m3-scheme-surface-container-low: 248 242 250;
    --m3-scheme-surface-container: 242 236 244;
    --m3-scheme-surface-container-high: 236 230 238;
    --m3-scheme-surface-container-highest: 230 224 233;
    --m3-scheme-surface-tint: 101 85 143;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
  :root,
  ::backdrop {
    --m3-scheme-primary: 207 189 254;
    --m3-scheme-on-primary: 54 39 93;
    --m3-scheme-primary-container: 77 61 117;
    --m3-scheme-on-primary-container: 233 221 255;
    --m3-scheme-inverse-primary: 101 85 143;
    --m3-scheme-secondary: 203 194 219;
    --m3-scheme-on-secondary: 51 45 65;
    --m3-scheme-secondary-container: 74 68 88;
    --m3-scheme-on-secondary-container: 232 222 248;
    --m3-scheme-tertiary: 239 184 200;
    --m3-scheme-on-tertiary: 74 37 50;
    --m3-scheme-tertiary-container: 99 59 72;
    --m3-scheme-on-tertiary-container: 255 217 227;
    --m3-scheme-error: 255 180 171;
    --m3-scheme-on-error: 105 0 5;
    --m3-scheme-error-container: 147 0 10;
    --m3-scheme-on-error-container: 255 218 214;
    --m3-scheme-background: 20 18 24;
    --m3-scheme-on-background: 230 224 233;
    --m3-scheme-surface: 20 18 24;
    --m3-scheme-on-surface: 230 224 233;
    --m3-scheme-surface-variant: 73 69 78;
    --m3-scheme-on-surface-variant: 202 196 207;
    --m3-scheme-inverse-surface: 230 224 233;
    --m3-scheme-inverse-on-surface: 50 47 53;
    --m3-scheme-outline: 148 143 153;
    --m3-scheme-outline-variant: 73 69 78;
    --m3-scheme-shadow: 0 0 0;
    --m3-scheme-scrim: 0 0 0;
    --m3-scheme-surface-dim: 20 18 24;
    --m3-scheme-surface-bright: 59 56 62;
    --m3-scheme-surface-container-lowest: 15 13 19;
    --m3-scheme-surface-container-low: 29 27 32;
    --m3-scheme-surface-container: 33 31 36;
    --m3-scheme-surface-container-high: 43 41 47;
    --m3-scheme-surface-container-highest: 54 52 58;
    --m3-scheme-surface-tint: 207 189 254;
  }
}
`);
