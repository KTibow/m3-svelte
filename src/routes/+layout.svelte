<script lang="ts">
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
  import NavList from "$lib/nav/NavList.svelte";
  import NavListLink from "$lib/nav/NavListLink.svelte";
  import { styling } from "./themeStore";
  import "../app.css";
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();

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
  ];
  const normalizePath = (path: string) => {
    const u = new URL(path, page.url.href);
    path = u.pathname;
    if (path.endsWith("/")) path = path.slice(0, -1);
    return path || "/";
  };
</script>

{@html `<style>${$styling}</style>`}
<div class="flex min-h-screen flex-col-reverse sm:flex-row">
  <div
    class="z-20 sidebar sticky flex self-start shrink-0 bottom-0 w-full sm:w-20 sm:top-0 sm:left-0 sm:flex-col sm:min-h-screen">
    <NavList type="auto" className="sm:flex-col grow-1 sm:justify-center">
      <div class="contents">
        {#each paths as { path, icon, iconS, label }}
          {@const selected = normalizePath(path) === normalizePath(page.url.pathname)}
          <NavListLink
            type="auto"
            href={normalizePath(path)}
            {selected}
            icon={selected ? iconS : icon}
          >
            {label}
          </NavListLink>
        {/each}
        <NavListLink
          type="auto"
          href={normalizePath(base + "/docs/quick-start")}
          selected={page.url.pathname.startsWith(base + "/docs")}
          icon={page.url.pathname.startsWith(base + "/docs") ? iconBookS : iconBook}
        >
          Docs
        </NavListLink>
        <NavListLink
          type="auto"
          href={normalizePath(base + "/transitions")}
          selected={page.url.pathname.startsWith(base + "/transitions")}
          icon={page.url.pathname.startsWith(base + "/transitions")
            ? iconAnimationS
            : iconAnimation}
        >
          Animations
        </NavListLink>
      </div>
    </NavList>
  </div>
  <div class="flex-grow min-w-0 p-6">
    {@render children()}
  </div>
</div>
