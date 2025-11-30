import { writable } from "svelte/store";

export const styling = writable(`
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
  :root, ::backdrop {
    --color-background: #fdf7fe;
    --color-on-background: #34313a;
    --color-surface: #fdf7fe;
    --color-surface-dim: #ded7e4;
    --color-surface-bright: #fdf7fe;
    --color-surface-container-lowest: #ffffff;
    --color-surface-container-low: #f8f1fa;
    --color-surface-container: #f2ecf5;
    --color-surface-container-high: #ece6f0;
    --color-surface-container-highest: #e7e0ec;
    --color-on-surface: #34313a;
    --color-on-surface-variant: #615d67;
    --color-outline: #7e7983;
    --color-outline-variant: #b6b0bb;
    --color-inverse-surface: #0f0d12;
    --color-inverse-on-surface: #a09ba1;
    --color-primary: #655789;
    --color-primary-dim: #594b7c;
    --color-on-primary: #fdf7ff;
    --color-primary-container: #d2c0f9;
    --color-on-primary-container: #483a6a;
    --color-primary-fixed: #d2c0f9;
    --color-primary-fixed-dim: #c4b3eb;
    --color-on-primary-fixed: #332654;
    --color-on-primary-fixed-variant: #514373;
    --color-inverse-primary: #d2c0f9;
    --color-secondary: #635c71;
    --color-secondary-dim: #565065;
    --color-on-secondary: #fdf7ff;
    --color-secondary-container: #e8def8;
    --color-on-secondary-container: #554e63;
    --color-secondary-fixed: #e8def8;
    --color-secondary-fixed-dim: #dad0ea;
    --color-on-secondary-fixed: #423c50;
    --color-on-secondary-fixed-variant: #5f586d;
    --color-tertiary: #7c5270;
    --color-tertiary-dim: #6f4663;
    --color-on-tertiary: #fff7f9;
    --color-tertiary-container: #f4bfe2;
    --color-on-tertiary-container: #603955;
    --color-tertiary-fixed: #f4bfe2;
    --color-tertiary-fixed-dim: #e5b2d4;
    --color-on-tertiary-fixed: #4a2641;
    --color-on-tertiary-fixed-variant: #6a425f;
    --color-error: #a8364b;
    --color-error-dim: #6b0221;
    --color-on-error: #fff7f7;
    --color-error-container: #f97386;
    --color-on-error-container: #6e0523;
    --color-shadow: #000000;
    --color-scrim: #000000;
    --color-on-on-primary: #655788;
    --color-primary-container-subtle: #e2d3ff;
    --color-on-primary-container-subtle: #534575;
    --color-secondary-container-subtle: #e0d6ef;
    --color-on-secondary-container-subtle: #50495e;
    --color-tertiary-container-subtle: #ffcbed;
    --color-on-tertiary-container-subtle: #67405d;
    --color-error-container-subtle: #ffced2;
    --color-on-error-container-subtle: #8f2339;
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
  :root, ::backdrop {
    --color-background: #0f0d12;
    --color-on-background: #eae3ef;
    --color-surface: #0f0d12;
    --color-surface-dim: #0f0d12;
    --color-surface-bright: #2e2b34;
    --color-surface-container-lowest: #000000;
    --color-surface-container-low: #141218;
    --color-surface-container: #1b181f;
    --color-surface-container-high: #211e26;
    --color-surface-container-highest: #27242d;
    --color-on-surface: #eae3ef;
    --color-on-surface-variant: #afa9b4;
    --color-outline: #78737e;
    --color-outline-variant: #4a4650;
    --color-inverse-surface: #fdf7fe;
    --color-inverse-on-surface: #575459;
    --color-primary: #cec0ec;
    --color-primary-dim: #c0b2de;
    --color-on-primary: #453a5f;
    --color-primary-container: #574c72;
    --color-on-primary-container: #eadeff;
    --color-primary-fixed: #dccdfa;
    --color-primary-fixed-dim: #cec0ec;
    --color-on-primary-fixed: #3b3054;
    --color-on-primary-fixed-variant: #574d72;
    --color-inverse-primary: #64597f;
    --color-secondary: #ccc2db;
    --color-secondary-dim: #beb5cd;
    --color-on-secondary: #433d51;
    --color-secondary-container: #3e384c;
    --color-on-secondary-container: #c4bbd4;
    --color-secondary-fixed: #e8def8;
    --color-secondary-fixed-dim: #dad0ea;
    --color-on-secondary-fixed: #423c50;
    --color-on-secondary-fixed-variant: #5f586d;
    --color-tertiary: #ffcfee;
    --color-tertiary-dim: #f4bfe2;
    --color-on-tertiary: #69415f;
    --color-tertiary-container: #f4bfe2;
    --color-on-tertiary-container: #603955;
    --color-tertiary-fixed: #f4bfe2;
    --color-tertiary-fixed-dim: #e5b2d4;
    --color-on-tertiary-fixed: #4a2641;
    --color-on-tertiary-fixed-variant: #6a425f;
    --color-error: #f97386;
    --color-error-dim: #c44b5f;
    --color-on-error: #490013;
    --color-error-container: #871c34;
    --color-on-error-container: #ff97a3;
    --color-shadow: #000000;
    --color-scrim: #000000;
    --color-on-on-primary: #cebfec;
    --color-primary-container-subtle: #302649;
    --color-on-primary-container-subtle: #b2a4cf;
    --color-secondary-container-subtle: #2f293c;
    --color-on-secondary-container-subtle: #b0a7bf;
    --color-tertiary-container-subtle: #43203b;
    --color-on-tertiary-container-subtle: #ce9cbe;
    --color-error-container-subtle: #5f001c;
    --color-on-error-container-subtle: #ff8796;
  }
}`);
export const appType = writable("vanilla");
