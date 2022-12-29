{@html `<style>
/* Needed for elevation to work */
:root {
  --md-sys-elevation-0: none;
  --md-sys-elevation-1: 0px 3px 1px -2px rgb(var(--md-sys-color-shadow) / 0.2),
  0px 2px 2px 0px rgb(var(--md-sys-color-shadow) / 0.14),
  0px 1px 5px 0px rgb(var(--md-sys-color-shadow) / 0.12);
  --md-sys-elevation-2: 0px 2px 4px -1px rgb(var(--md-sys-color-shadow) / 0.2),
  0px 4px 5px 0px rgb(var(--md-sys-color-shadow) / 0.14),
  0px 1px 10px 0px rgb(var(--md-sys-color-shadow) / 0.12);
  --md-sys-elevation-3: 0px 5px 5px -3px rgb(var(--md-sys-color-shadow) / 0.2),
  0px 8px 10px 1px rgb(var(--md-sys-color-shadow) / 0.14),
  0px 3px 14px 2px rgb(var(--md-sys-color-shadow) / 0.12);
  --md-sys-elevation-4: 0px 5px 5px -3px rgb(var(--md-sys-color-shadow) / 0.2),
  0px 8px 10px 1px rgb(var(--md-sys-color-shadow) / 0.14),
  0px 3px 14px 2px rgb(var(--md-sys-color-shadow) / 0.12);
  --md-sys-elevation-5: 0px 8px 10px -6px rgb(var(--md-sys-color-shadow) / 0.2),
  0px 16px 24px 2px rgb(var(--md-sys-color-shadow) / 0.14),
  0px 6px 30px 5px rgb(var(--md-sys-color-shadow) / 0.12);
}
/* As the largest text on the screen, display styles are reserved for short, important text or numerals. */
.md-display-large, .md-display-medium, .md-display-small {
  font-family: var(--md-sys-typescale-display, Roboto, system-ui, sans-serif);
  font-weight: var(--md-sys-typescale-display-weight, 400);
}
.md-display-large {
  font-size: var(--md-sys-typescale-display-large-size, 57px);
  line-height: var(--md-sys-typescale-display-large-height, 64px);
  letter-spacing: var(--md-sys-typescale-display-large-tracking, 0);
}
.md-display-medium {
  font-size: var(--md-sys-typescale-display-medium-size, 45px);
  line-height: var(--md-sys-typescale-display-medium-height, 52px);
  letter-spacing: var(--md-sys-typescale-display-medium-tracking, 0);
}
.md-display-small {
  font-size: var(--md-sys-typescale-display-small-size, 36px);
  line-height: var(--md-sys-typescale-display-small-height, 44px);
  letter-spacing: var(--md-sys-typescale-display-small-tracking, 0);
}
/* Headlines are best-suited for short, high-emphasis text on smaller screens. */
.md-headline-large, .md-headline-medium, .md-headline-small {
  font-family: var(--md-sys-typescale-headline, Roboto, system-ui, sans-serif);
  font-weight: var(--md-sys-typescale-headline-weight, 400);
}
.md-headline-large {
  font-size: var(--md-sys-typescale-headline-large-size, 32px);
  line-height: var(--md-sys-typescale-headline-large-height, 40px);
  letter-spacing: var(--md-sys-typescale-headline-large-tracking, 0);
}
.md-headline-medium {
  font-size: var(--md-sys-typescale-headline-medium-size, 28px);
  line-height: var(--md-sys-typescale-headline-medium-height, 36px);
  letter-spacing: var(--md-sys-typescale-headline-medium-tracking, 0);
}
.md-headline-small {
  font-size: var(--md-sys-typescale-headline-small-size, 24px);
  line-height: var(--md-sys-typescale-headline-small-height, 32px);
  letter-spacing: var(--md-sys-typescale-headline-small-tracking, 0);
}
/* Titles are smaller than headline styles, and should be used for medium-emphasis text that remains relatively short. */
.md-title-large, .md-title-medium, .md-title-small {
  font-family: var(--md-sys-typescale-title, Roboto, system-ui, sans-serif);
  font-weight: var(--md-sys-typescale-title-weight, 400);
}
.md-title-large {
  font-size: var(--md-sys-typescale-title-large-size, 22px);
  line-height: var(--md-sys-typescale-title-large-height, 28px);
  letter-spacing: var(--md-sys-typescale-title-large-tracking, 0);
}
.md-title-medium {
  font-size: var(--md-sys-typescale-title-medium-size, 16px);
  line-height: var(--md-sys-typescale-title-medium-height, 24px);
  letter-spacing: var(--md-sys-typescale-title-medium-tracking, 0);
}
.md-title-small {
  font-size: var(--md-sys-typescale-title-small-size, 14px);
  line-height: var(--md-sys-typescale-title-small-height, 20px);
  letter-spacing: var(--md-sys-typescale-title-small-tracking, 0.1);
}
/* Label styles are smaller, utilitarian styles, used for things like the text inside components
or for very small text in the content body, such as captions. */
.md-label-large, .md-label-medium, .md-label-small {
  font-family: var(--md-sys-typescale-label, Roboto, system-ui, sans-serif);
  font-weight: var(--md-sys-typescale-label-weight, 500);
}
.md-label-large {
  font-size: var(--md-sys-typescale-label-large-size, 14px);
  line-height: var(--md-sys-typescale-label-large-height, 20px);
  letter-spacing: var(--md-sys-typescale-label-large-tracking, 0.1);
}
.md-label-medium {
  font-size: var(--md-sys-typescale-label-medium-size, 12px);
  line-height: var(--md-sys-typescale-label-medium-height, 16px);
  letter-spacing: var(--md-sys-typescale-label-medium-tracking, 0.5);
}
.md-label-small {
  font-size: var(--md-sys-typescale-label-small-size, 11px);
  line-height: var(--md-sys-typescale-label-small-height, 16px);
  letter-spacing: var(--md-sys-typescale-label-small-tracking, 0.5);
}
/* Body styles are used for longer passages of text in your app. */
.md-body-large, .md-body-medium, .md-body-small {
  font-family: var(--md-sys-typescale-body, Roboto, system-ui, sans-serif);
  font-weight: var(--md-sys-typescale-body-weight, 400);
}
.md-body-large {
  font-size: var(--md-sys-typescale-body-large-size, 16px);
  line-height: var(--md-sys-typescale-body-large-height, 24px);
  letter-spacing: var(--md-sys-typescale-body-large-tracking, 0.5);
}
.md-body-medium {
  font-size: var(--md-sys-typescale-body-medium-size, 14px);
  line-height: var(--md-sys-typescale-body-medium-height, 20px);
  letter-spacing: var(--md-sys-typescale-body-medium-tracking, 0.25);
}
.md-body-small {
  font-size: var(--md-sys-typescale-body-small-size, 12px);
  line-height: var(--md-sys-typescale-body-small-height, 16px);
  letter-spacing: var(--md-sys-typescale-body-small-tracking, 0.4);
}
/* Fix some browser stuff */
.m3-container {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
.m3-container a {
  text-decoration: none;
}
</style>`}
