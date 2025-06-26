import { writable } from "svelte/store";

export const styling = writable(`
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
  :root,
  ::backdrop {
    --m3-scheme-background: 253 247 254;
    --m3-scheme-on-background: 52 49 58;
    --m3-scheme-surface: 253 247 254;
    --m3-scheme-surface-dim: 222 215 228;
    --m3-scheme-surface-bright: 253 247 254;
    --m3-scheme-surface-container-lowest: 255 255 255;
    --m3-scheme-surface-container-low: 248 241 250;
    --m3-scheme-surface-container: 242 236 245;
    --m3-scheme-surface-container-high: 236 230 240;
    --m3-scheme-surface-container-highest: 231 224 236;
    --m3-scheme-on-surface: 52 49 58;
    --m3-scheme-on-surface-variant: 97 93 103;
    --m3-scheme-outline: 126 121 131;
    --m3-scheme-outline-variant: 182 176 187;
    --m3-scheme-inverse-surface: 15 13 18;
    --m3-scheme-inverse-on-surface: 160 155 161;
    --m3-scheme-primary: 101 87 137;
    --m3-scheme-primary-dim: 89 75 124;
    --m3-scheme-on-primary: 253 247 255;
    --m3-scheme-primary-container: 210 192 249;
    --m3-scheme-on-primary-container: 72 58 106;
    --m3-scheme-primary-fixed: 210 192 249;
    --m3-scheme-primary-fixed-dim: 196 179 235;
    --m3-scheme-on-primary-fixed: 51 38 84;
    --m3-scheme-on-primary-fixed-variant: 81 67 115;
    --m3-scheme-inverse-primary: 210 192 249;
    --m3-scheme-secondary: 99 92 113;
    --m3-scheme-secondary-dim: 86 80 101;
    --m3-scheme-on-secondary: 253 247 255;
    --m3-scheme-secondary-container: 232 222 248;
    --m3-scheme-on-secondary-container: 85 78 99;
    --m3-scheme-secondary-fixed: 232 222 248;
    --m3-scheme-secondary-fixed-dim: 218 208 234;
    --m3-scheme-on-secondary-fixed: 66 60 80;
    --m3-scheme-on-secondary-fixed-variant: 95 88 109;
    --m3-scheme-tertiary: 124 82 112;
    --m3-scheme-tertiary-dim: 111 70 99;
    --m3-scheme-on-tertiary: 255 247 249;
    --m3-scheme-tertiary-container: 244 191 226;
    --m3-scheme-on-tertiary-container: 96 57 85;
    --m3-scheme-tertiary-fixed: 244 191 226;
    --m3-scheme-tertiary-fixed-dim: 229 178 212;
    --m3-scheme-on-tertiary-fixed: 74 38 65;
    --m3-scheme-on-tertiary-fixed-variant: 106 66 95;
    --m3-scheme-error: 168 54 75;
    --m3-scheme-error-dim: 107 2 33;
    --m3-scheme-on-error: 255 247 247;
    --m3-scheme-error-container: 249 115 134;
    --m3-scheme-on-error-container: 110 5 35;
    --m3-scheme-shadow: 0 0 0;
    --m3-scheme-scrim: 0 0 0;
    --m3-scheme-on-on-primary: 101 87 136;
    --m3-scheme-primary-container-subtle: 226 211 255;
    --m3-scheme-on-primary-container-subtle: 83 69 117;
    --m3-scheme-tertiary-container-subtle: 255 203 237;
    --m3-scheme-on-tertiary-container-subtle: 103 64 93;
    --m3-scheme-error-container-subtle: 255 206 210;
    --m3-scheme-on-error-container-subtle: 143 35 57;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
  :root,
  ::backdrop {
    --m3-scheme-background: 15 13 18;
    --m3-scheme-on-background: 234 227 239;
    --m3-scheme-surface: 15 13 18;
    --m3-scheme-surface-dim: 15 13 18;
    --m3-scheme-surface-bright: 46 43 52;
    --m3-scheme-surface-container-lowest: 0 0 0;
    --m3-scheme-surface-container-low: 20 18 24;
    --m3-scheme-surface-container: 27 24 31;
    --m3-scheme-surface-container-high: 33 30 38;
    --m3-scheme-surface-container-highest: 39 36 45;
    --m3-scheme-on-surface: 234 227 239;
    --m3-scheme-on-surface-variant: 151 145 156;
    --m3-scheme-outline: 120 115 126;
    --m3-scheme-outline-variant: 74 70 80;
    --m3-scheme-inverse-surface: 253 247 254;
    --m3-scheme-inverse-on-surface: 87 84 89;
    --m3-scheme-primary: 206 192 236;
    --m3-scheme-primary-dim: 192 178 222;
    --m3-scheme-on-primary: 69 58 95;
    --m3-scheme-primary-container: 87 76 114;
    --m3-scheme-on-primary-container: 234 222 255;
    --m3-scheme-primary-fixed: 220 205 250;
    --m3-scheme-primary-fixed-dim: 206 192 236;
    --m3-scheme-on-primary-fixed: 59 48 84;
    --m3-scheme-on-primary-fixed-variant: 87 77 114;
    --m3-scheme-inverse-primary: 100 89 127;
    --m3-scheme-secondary: 204 194 219;
    --m3-scheme-secondary-dim: 190 181 205;
    --m3-scheme-on-secondary: 67 61 81;
    --m3-scheme-secondary-container: 62 56 76;
    --m3-scheme-on-secondary-container: 196 187 212;
    --m3-scheme-secondary-fixed: 232 222 248;
    --m3-scheme-secondary-fixed-dim: 218 208 234;
    --m3-scheme-on-secondary-fixed: 66 60 80;
    --m3-scheme-on-secondary-fixed-variant: 95 88 109;
    --m3-scheme-tertiary: 255 207 238;
    --m3-scheme-tertiary-dim: 244 191 226;
    --m3-scheme-on-tertiary: 105 65 95;
    --m3-scheme-tertiary-container: 244 191 226;
    --m3-scheme-on-tertiary-container: 96 57 85;
    --m3-scheme-tertiary-fixed: 244 191 226;
    --m3-scheme-tertiary-fixed-dim: 229 178 212;
    --m3-scheme-on-tertiary-fixed: 74 38 65;
    --m3-scheme-on-tertiary-fixed-variant: 106 66 95;
    --m3-scheme-error: 249 115 134;
    --m3-scheme-error-dim: 196 75 95;
    --m3-scheme-on-error: 73 0 19;
    --m3-scheme-error-container: 135 28 52;
    --m3-scheme-on-error-container: 255 151 163;
    --m3-scheme-shadow: 0 0 0;
    --m3-scheme-scrim: 0 0 0;
    --m3-scheme-on-on-primary: 206 191 236;
    --m3-scheme-primary-container-subtle: 48 38 73;
    --m3-scheme-on-primary-container-subtle: 178 164 207;
    --m3-scheme-tertiary-container-subtle: 67 32 59;
    --m3-scheme-on-tertiary-container-subtle: 206 156 190;
    --m3-scheme-error-container-subtle: 95 0 28;
    --m3-scheme-on-error-container-subtle: 255 135 150;
  }
}
`);
