# m3-svelte

An attempt to make Material 3 in Svelte. See the [website](https://ktibow.github.io/m3-svelte/) for docs.


## Getting started

1. Install the library into a Svelte project (e.g. `npm install m3-svelte`) 
1. Use [the theme creator](https://ktibow.github.io/m3-svelte/theme) to construct your theme. This is needed for components to function, as it gives some base styling, and your theme's colors. Drop the component in `+layout.svelte` and import it.
1. Set up your typography. You can customize it with CSS variables or just import [Roboto](https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap). The CSS variables used for font styles are:
    * font-family: `--md-sys-typescale-body`
    * font-weight: `--md-sys-typescale-body-weight`
1. Set up your body defaults, such as foreground/background and default fonts. You can optionally use the classes `md-body-large`, `md-body-medium`, or `md-body-small` depending on the desired root font size.
1. That's all; import components as needed!

Example `+page.svelte`:
```xml
<script>
	import { Card, Button } from 'm3-svelte';
</script>

<Card type='filled'>
	Hello world
</Card>

<Button type='filled'>Press me</Button>
```