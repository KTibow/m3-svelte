<script>
  import { base } from "$app/paths";
</script>

<svelte:head>
  <title>M3 Svelte: Transitions</title>
</svelte:head>
<p>This won't cover all of the transitions.</p>
<ul>
  <li><a href="{base}/transitions/shared-axis-x">Shared axis (x)</a></li>
  <li><a href="{base}/transitions/shared-axis-y">Shared axis (y)</a></li>
  <li><a href="{base}/transitions/shared-axis-z">Shared axis (z)</a></li>
  <li><a href="{base}/transitions/container-transform">Container transform</a></li>
</ul>

<style>
  a {
    color: rgb(var(--m3-scheme-primary));
  }
</style>
