# m3-svelte

An attempt to make Material 3 in Svelte. See the [website](https://ktibow.github.io/m3-svelte/) for docs.


## Getting started

```
npm create svelte@latest my-app
cd my-app
npm install m3-svelte
npm run dev
```

In `app.html`:
1. add the following stylesheet for the Roboto font:
```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
/>
```
2. Add either `md-body-large`, `md-body-medium`, or `md-body-small` to your body's class, depending on the desired root font size:

```html
<body class="md-body-large">
	<div style="display: contents">%sveltekit.body%</div>
</body>
```

Next:

1. Go to https://ktibow.github.io/m3-svelte/theme, pick a color for your desired theme, and click "Copy usage".
2. Create `+layout.svelte` and add the following:
```xml
<script>
	import { StyleFromScheme } from 'm3-svelte';
</script>

<!-- Here, paste the <StyleFromScheme /> that you copied -->

<slot/>
```

Lastly, import and add components as desired into your Svelte pages:

`+page.svelte`
```xml
<script>
	import { Card, Button } from 'm3-svelte';
</script>

<Card type='filled'>
	Hello world
</Card>

<Button type='filled'>Press me</Button>
```