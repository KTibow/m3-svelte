import { writable } from "svelte/store";

export const styling = writable(`
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
    --m3c-surface: #fdf7fe;
    --m3c-surface-container-lowest: #ffffff;
    --m3c-surface-container-low: #f8f1fa;
    --m3c-surface-container: #f2ecf5;
    --m3c-surface-container-high: #ece6f0;
    --m3c-surface-container-highest: #e7e0ec;
    --m3c-on-surface: #34313a;
    --m3c-on-surface-variant: #615d67;
    --m3c-outline: #7e7983;
    --m3c-outline-variant: #b6b0bb;
    --m3c-inverse-surface: #0f0d12;
    --m3c-inverse-on-surface: #a09ba1;
    --m3c-primary: #655789;
    --m3c-on-primary: #fdf7ff;
    --m3c-primary-container: #d2c0f9;
    --m3c-on-primary-container: #483a6a;
    --m3c-inverse-primary: #d2c0f9;
    --m3c-secondary: #635c71;
    --m3c-on-secondary: #fdf7ff;
    --m3c-secondary-container: #e8def8;
    --m3c-on-secondary-container: #554e63;
    --m3c-tertiary: #7c5270;
    --m3c-on-tertiary: #fff7f9;
    --m3c-tertiary-container: #f4bfe2;
    --m3c-on-tertiary-container: #603955;
    --m3c-error: #a8364b;
    --m3c-on-error: #fff7f7;
    --m3c-error-container: #f97386;
    --m3c-on-error-container: #6e0523;
    --m3c-shadow: #000000;
    --m3c-scrim: #000000;
    --m3c-on-on-primary: #655788;
    --m3c-primary-container-subtle: #e2d3ff;
    --m3c-on-primary-container-subtle: #534575;
    --m3c-secondary-container-subtle: #e0d6ef;
    --m3c-on-secondary-container-subtle: #50495e;
    --m3c-tertiary-container-subtle: #ffcbed;
    --m3c-on-tertiary-container-subtle: #67405d;
    --m3c-error-container-subtle: #ffced2;
    --m3c-on-error-container-subtle: #8f2339;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --m3c-surface: #0f0d12;
    --m3c-surface-container-lowest: #000000;
    --m3c-surface-container-low: #141218;
    --m3c-surface-container: #1b181f;
    --m3c-surface-container-high: #211e26;
    --m3c-surface-container-highest: #27242d;
    --m3c-on-surface: #eae3ef;
    --m3c-on-surface-variant: #afa9b4;
    --m3c-outline: #78737e;
    --m3c-outline-variant: #4a4650;
    --m3c-inverse-surface: #fdf7fe;
    --m3c-inverse-on-surface: #575459;
    --m3c-primary: #cec0ec;
    --m3c-on-primary: #453a5f;
    --m3c-primary-container: #574c72;
    --m3c-on-primary-container: #eadeff;
    --m3c-inverse-primary: #64597f;
    --m3c-secondary: #ccc2db;
    --m3c-on-secondary: #433d51;
    --m3c-secondary-container: #3e384c;
    --m3c-on-secondary-container: #c4bbd4;
    --m3c-tertiary: #ffcfee;
    --m3c-on-tertiary: #69415f;
    --m3c-tertiary-container: #f4bfe2;
    --m3c-on-tertiary-container: #603955;
    --m3c-error: #f97386;
    --m3c-on-error: #490013;
    --m3c-error-container: #871c34;
    --m3c-on-error-container: #ff97a3;
    --m3c-shadow: #000000;
    --m3c-scrim: #000000;
    --m3c-on-on-primary: #cebfec;
    --m3c-primary-container-subtle: #302649;
    --m3c-on-primary-container-subtle: #b2a4cf;
    --m3c-secondary-container-subtle: #2f293c;
    --m3c-on-secondary-container-subtle: #b0a7bf;
    --m3c-tertiary-container-subtle: #43203b;
    --m3c-on-tertiary-container-subtle: #ce9cbe;
    --m3c-error-container-subtle: #5f001c;
    --m3c-on-error-container-subtle: #ff8796;
  }
}
`);
export const appType = writable("vanilla");
export const sourceColor = writable(0xd0bcff);
export const density = writable<"variable" | number>(0);
