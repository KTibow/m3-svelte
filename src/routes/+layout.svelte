<script lang="ts">
  import iconHome from "@ktibow/iconset-material-symbols/home-outline";
  import iconHomeS from "@ktibow/iconset-material-symbols/home";
  import iconAnimation from "@ktibow/iconset-material-symbols/animation";
  import iconAnimationS from "@ktibow/iconset-material-symbols/animation";
  import iconBook from "@ktibow/iconset-material-symbols/book-outline";
  import iconBookS from "@ktibow/iconset-material-symbols/book";
  import iconPalette from "@ktibow/iconset-material-symbols/palette-outline";
  import iconPaletteS from "@ktibow/iconset-material-symbols/palette";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import StyleFromScheme from "$lib/misc/StyleFromScheme.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import NavList from "$lib/nav/NavList.svelte";
  import NavListLink from "$lib/nav/NavListLink.svelte";
  import { currentColorScheme } from "./SchemeStore";
  import "../app.css";

  const iconGithub = {
    body: `<path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.42 9.42 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5A10.03 10.03 0 0 0 22 12 10 10 0 0 0 12 2"/>`,
    width: 24,
    height: 24,
  };
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
        <FAB on:click={() => window.open("https://github.com/KTibow/m3-svelte")} icon={iconGithub} />
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
  @media (width < 37.5rem) {
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
