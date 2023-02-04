# m3-svelte

An attempt to make Material 3 in Svelte. See the [website](https://ktibow.github.io/m3-svelte/) for docs.

## Getting started

1. Install the library into a Svelte project (`npm i m3-svelte`).
2. Use the [theme page](https://ktibow.github.io/m3-svelte/theme) to construct a theme. Copy the usage, and paste it in `+layout.svelte` (don't forget to import it first).
3. Set up your typography. By default, M3 Svelte uses Roboto, but you need to import it from `https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap`. You could also customize the font (see [BaseStyles.svelte](https://github.com/KTibow/m3-svelte/blob/main/src/lib/colors/BaseStyles.svelte)).
4. Set up your body to use the theme's background and text color, as well as its font. See [M3 Svelte's app.html](https://github.com/KTibow/m3-svelte/blob/main/src/app.html) for an example.
