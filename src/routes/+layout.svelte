<script lang="ts">
  import iconHome from "@ktibow/iconset-material-symbols/home-outline";
  import iconHomeS from "@ktibow/iconset-material-symbols/home";
  import iconAnimation from "@ktibow/iconset-material-symbols/animation";
  import iconAnimationS from "@ktibow/iconset-material-symbols/animation";
  import iconBook from "@ktibow/iconset-material-symbols/book-outline";
  import iconBookS from "@ktibow/iconset-material-symbols/book";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconPaletteS from "@ktibow/iconset-material-symbols/palette";
  import iconCode from "@ktibow/iconset-material-symbols/code";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import StyleFromScheme from "$lib/misc/StyleFromScheme.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import NavList from "$lib/nav/NavList.svelte";
  import NavListLink from "$lib/nav/NavListLink.svelte";
  import { currentColorScheme } from "./SchemeStore";
  import "../app.css";

  const paths = [
    {
      path: base || "/",
      icon: iconHome,
      iconS: iconHomeS,
      label: "Home",
    },
    {
      path: base + "/docs",
      icon: iconBook,
      iconS: iconBookS,
      label: "Use",
    },
    {
      path: base + "/theme",
      icon: iconPalette,
      iconS: iconPaletteS,
      label: "Theme",
    },
  ];
  const normalizePath = (path: string) => {
    const u = new URL(path, $page.url.href);
    path = u.pathname;
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  };
</script>

<StyleFromScheme
  lightScheme={$currentColorScheme.lightTheme}
  darkScheme={$currentColorScheme.darkTheme}
/>

<div class="container">
  <div class="sidebar">
    <NavList type="auto">
      <div class="fab">
        <FAB on:click={() => window.open("https://github.com/KTibow/m3-svelte")} icon={iconCode} />
      </div>
      <div class="items">
        {#each paths as { path, icon, iconS, label }}
          {@const selected = normalizePath(path) === normalizePath($page.url.pathname)}
          <NavListLink type="auto" href={path} {selected} icon={selected ? iconS : icon}>
            {label}
          </NavListLink>
        {/each}
        <NavListLink
          type="auto"
          href={base + "/transitions"}
          selected={$page.url.pathname.startsWith(base + "/transitions")}
          icon={$page.url.pathname.startsWith(base + "/transitions")
            ? iconAnimationS
            : iconAnimation}
        >
          Animations
        </NavListLink>
      </div>
    </NavList>
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style>
  .container {
    display: flex;
    min-height: 100vh;
  }
  .sidebar {
    position: sticky;
    align-self: flex-start;
    display: flex;
    width: 5rem;
    flex-shrink: 0;
  }
  .content {
    padding: 1rem;
  }
  @media (max-width: 37.5rem) {
    .container {
      flex-direction: column-reverse;
      --m3-util-bottom-offset: 5rem;
    }
    .sidebar {
      bottom: 0;
      width: 100%;
      z-index: 3;
    }
    .fab {
      position: fixed;
      right: 1rem;
      bottom: 6rem;
    }
    .items {
      display: contents;
    }
  }
  @media (min-width: 37.5rem) {
    .content {
      flex-grow: 1;
      padding: 1.5rem;
    }
    .sidebar {
      top: 0;
      left: 0;
      flex-direction: column;
      min-height: 100vh;
    }
    .fab {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 2;
      margin-bottom: 1.5rem;
    }
    .fab > :global(button) {
      box-shadow: none !important;
    }
    .items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      justify-content: center;
    }
    @media (min-height: 30rem) {
      .items {
        position: absolute;
        inset: 0;
      }
      @media (max-height: 35rem) {
        .items {
          padding-top: 3.5rem;
        }
      }
    }
  }
</style>
