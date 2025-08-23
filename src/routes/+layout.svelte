<script lang="ts">
  import type { Snippet } from "svelte";
  import iconHome from "@ktibow/iconset-material-symbols/home-outline";
  import iconHomeS from "@ktibow/iconset-material-symbols/home";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconPaletteS from "@ktibow/iconset-material-symbols/palette";
  import iconBook from "@ktibow/iconset-material-symbols/book-2-outline";
  import iconBookS from "@ktibow/iconset-material-symbols/book-2";
  import iconAnimation from "@ktibow/iconset-material-symbols/animation";
  import iconAnimationS from "@ktibow/iconset-material-symbols/animation";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import NavCMLX from "$lib/nav/NavCMLX.svelte";
  import NavCMLXItem from "$lib/nav/NavCMLXItem.svelte";
  import NavigationRailItem from "$lib/nav/NavigationRailItem.svelte";
  import NavigationRail from "$lib/nav/NavigationRail.svelte";
  import { styling } from "./state";
  import "../app.css";

  let { children }: { children: Snippet } = $props();
  let innerWidth = $state<number | undefined>();

  const paths = [
    {
      path: base || "/",
      icon: iconHome,
      iconS: iconHomeS,
      label: "Home",
    },
    {
      path: base + "/theme",
      icon: iconPalette,
      iconS: iconPaletteS,
      label: "Theme",
    },
    {
      path: base + "/docs/quick-start",
      icon: iconBook,
      iconS: iconBookS,
      label: "Setup",
    },
    {
      path: base + "/docs/detailed-walkthrough",
      icon: iconBook,
      iconS: iconBookS,
      label: "Advanced",
    },
    {
      path: base + "/llms.txt",
      icon: iconBook,
      iconS: iconBookS,
      label: "llms.txt",
    },
  ];
  const normalizePath = (path: string) => {
    const u = new URL(path, page.url.href);
    path = u.pathname;
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  };
</script>

{@html `<style>${$styling}</style>`}

<svelte:window bind:innerWidth />

<div class="container">
  <div class="sidebar">
    <NavigationRail fullyCollapse={!!innerWidth && innerWidth < 560} modal>
      {#each paths as { path, icon, iconS, label }}
        {@const active = normalizePath(path) === normalizePath(page.url.pathname)}
        <a href={normalizePath(path)} tabindex="-1">
          <NavigationRailItem icon={active ? iconS : icon} {active} {label} />
        </a>
      {/each}
    </NavigationRail>
  </div>

  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: rgb(var(--m3-scheme-surface-container));
  }
  .sidebar {
    z-index: 1;
  }
  .content {
    overflow: auto;
    padding: 1rem;
    width: 100%;
    height: 100%;
    position: relative;
    background: rgb(var(--m3-scheme-background));
  }
  @media (width < 52.5rem) {
    .container {
      --m3-util-bottom-offset: 5rem;
    }
  }
  @media (width >= 52.5rem) {
    .content {
      padding: 1.5rem;
    }
  }

  @media (width >= 560px) {
    .content {
      border-top-left-radius: var(--m3-util-rounding-extra-large);
    }
  }
</style>
