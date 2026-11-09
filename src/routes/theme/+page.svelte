<script lang="ts">
  import { onMount } from "svelte";
  import { goto, pushState } from "$app/navigation";
  import { resolve } from "$app/paths";

  // The editor is a modal. Going through home gives closing it somewhere to return to.
  onMount(async () => {
    await goto(resolve("/"), { replaceState: true });
    pushState(resolve("theme"), { themeModal: true });
  });
</script>

<svelte:head>
  <title>Theme</title>
  <meta
    name="description"
    content="Bake a static Material 3 theme and use it in CSS. Works great with M3 Svelte components."
  />
</svelte:head>
