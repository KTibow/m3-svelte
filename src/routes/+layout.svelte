<script lang="ts">
  import type { Snippet } from "svelte";
  import iconHome from "@ktibow/iconset-material-symbols/home-outline";
  import iconHomeS from "@ktibow/iconset-material-symbols/home";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconPaletteS from "@ktibow/iconset-material-symbols/palette";
  import iconBook from "@ktibow/iconset-material-symbols/book-2-outline";
  import iconBookS from "@ktibow/iconset-material-symbols/book-2";
  import iconAnimation from "@ktibow/iconset-material-symbols/animation";
  import iconMenu from "@ktibow/iconset-material-symbols/menu";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import NavigationRailItem from "$lib/nav/NavigationRailItem.svelte";
  import NavigationRail from "$lib/nav/NavigationRail.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Icon from "$lib/misc/_icon.svelte";
  import { styling } from "./state";
  import "../app.css";
    import NavigationToggle from "$lib/nav/NavigationToggle.svelte";

  let { children }: { children: Snippet } = $props();
  let innerWidth = $state<number | undefined>();
  let open = $state<boolean>(false);

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
    {
      path: base + "/transitions",
      icon: iconAnimation,
      iconS: iconAnimation,
      label: "Motion",
    }
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
    <NavigationRail collapse={!!innerWidth && innerWidth < 560 ? 'full' : 'normal'} modal={!!innerWidth && innerWidth < 560} bind:open>
      {#each paths as { path, icon, iconS, label }}
        {@const active = normalizePath(path) === normalizePath(page.url.pathname)}
        
        <NavigationRailItem icon={active ? iconS : icon} {active} {label} href={normalizePath(path)} />
      {/each}
    </NavigationRail>
  </div>

  <div class="content">
    {#if !!innerWidth && innerWidth < 560}
      <div class="railtoggle">
        <NavigationToggle bind:active={open} />
      </div>
    {/if}
    
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
    position: relative;
    background: rgb(var(--m3-scheme-background));
    width: 100%;
  }
  
  .railtoggle {
    margin-block-start: 28px;
    margin-inline-start: 4px;
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
      border-start-start-radius: var(--m3-util-rounding-extra-large);
    }
  }
</style>
