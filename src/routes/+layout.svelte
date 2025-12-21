<script lang="ts">
  import type { Snippet } from "svelte";
  import iconHome from "@ktibow/iconset-material-symbols/home-outline";
  import iconHomeS from "@ktibow/iconset-material-symbols/home";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconPaletteS from "@ktibow/iconset-material-symbols/palette";
  import iconBook from "@ktibow/iconset-material-symbols/book-2-outline";
  import iconBookS from "@ktibow/iconset-material-symbols/book-2";
  import { asset, resolve } from "$app/paths";
  import { page } from "$app/state";
  import NavCMLX from "$lib/nav/NavCMLX.svelte";
  import NavCMLXItem from "$lib/nav/NavCMLXItem.svelte";
  import { styling, density } from "./state";
  import "../app.css";
  import Snackbar from "$lib/containers/Snackbar.svelte";

  let { children }: { children: Snippet } = $props();
  let innerWidth = $state(0);

  const paths = [
    {
      path: resolve("/"),
      icon: iconHome,
      iconS: iconHomeS,
      label: "Home",
    },
    {
      path: resolve("/theme"),
      icon: iconPalette,
      iconS: iconPaletteS,
      label: "Theme",
    },
  ];
  const normalizePath = (path: string) => {
    const u = new URL(path, page.url.href);
    path = u.pathname;
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  };
  // deprecated: in future, will switch to first party --m3-density definition
  // so --density instead of --m3v-density
</script>

{@html `<style>${$styling}:root { --m3v-density: ${$density == "variable" ? 0 : $density}; }</style>`}
<svelte:window bind:innerWidth />
<Snackbar />
<div class="container">
  <div class="sidebar">
    <NavCMLX variant="auto">
      {#each paths as { path, icon, iconS, label }}
        {@const selected = normalizePath(path) === normalizePath(page.url.pathname)}
        <NavCMLXItem
          variant="auto"
          href={normalizePath(path)}
          {selected}
          icon={selected ? iconS : icon}
          text={label}
        />
      {/each}
      {#if page.url.pathname.startsWith(resolve("/docs")) || innerWidth >= 840}
        {#each [["Quick start", `${resolve("/docs/quick-start")}`], ["Walkthrough", `${resolve("/docs/detailed-walkthrough")}`], ["llms.txt", asset("/llms.txt")]] as [text, href]}
          <NavCMLXItem
            variant="auto"
            {href}
            selected={page.url.pathname == href}
            icon={page.url.pathname == href ? iconBookS : iconBook}
            {text}
          />
        {/each}
      {:else}
        <NavCMLXItem
          variant="auto"
          href={normalizePath(resolve("/docs/quick-start"))}
          selected={page.url.pathname.startsWith(resolve("/docs"))}
          icon={page.url.pathname.startsWith(resolve("/docs")) ? iconBookS : iconBook}
          text="Docs"
        />
      {/if}
    </NavCMLX>
  </div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .container {
    display: grid;
    min-height: 100dvh;
  }
  .sidebar {
    display: flex;
    position: sticky;
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  @media (width < 52.5rem) {
    .container {
      grid-template-rows: 1fr auto;
      --m3v-bottom-offset: 5rem;
    }
    .sidebar {
      flex-direction: column;
      bottom: 0;
      width: 100%;
      z-index: 3;
      grid-row: 2;
    }
  }
  @media (width >= 52.5rem) {
    .container {
      grid-template-columns: auto 1fr;
    }
    .sidebar {
      grid-column: 1;
      top: 0;
      left: 0;
      flex-direction: column;
      height: 100dvh;
      @media (width < 100rem) {
        width: 6rem;
        > :global(nav) {
          position: absolute;
          top: 50%;
          translate: 0 -50%;
        }
      }
    }
    .content {
      padding: 1.5rem;
      grid-column: 2;
    }
  }
</style>
