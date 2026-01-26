<script lang="ts">
  import { NavCMLX, NavCMLXItem, FAB } from "m3-svelte";
  import iconSearch from "@ktibow/iconset-material-symbols/search";
  import iconHome from "@ktibow/iconset-material-symbols/home";
  import iconApps from "@ktibow/iconset-material-symbols/apps";
  import iconCode from "@ktibow/iconset-material-symbols/code";
  import iconBook from "@ktibow/iconset-material-symbols/book";
  import iconPalette from "@ktibow/iconset-material-symbols/palette";
  import iconExtension from "@ktibow/iconset-material-symbols/extension";
  import iconPages from "@ktibow/iconset-material-symbols/pages";
  import "./layout.css";

  // not implemented: using an outlined icon if not selected
  const navItems = [
    { icon: iconHome, label: "Home", id: "home" },
    { icon: iconApps, label: "Get started", id: "get-started" },
    { icon: iconCode, label: "Develop", id: "develop" },
    { icon: iconBook, label: "Foundations", id: "foundations" },
    { icon: iconPalette, label: "Styles", id: "styles" },
    { icon: iconExtension, label: "Components", id: "components" },
    { icon: iconPages, label: "Blog", id: "blog" },
  ];
</script>

<div class="nav">
  <NavCMLX variant="auto">
    <div class="search">
      <FAB icon={iconSearch} onclick={() => {}} />
    </div>
    {#each navItems as item}
      <!-- not implemented: the ability to click on a destination -->
      <!-- (you would set an `href` and use better `selected` logic then) -->
      <NavCMLXItem
        variant="auto"
        icon={item.icon}
        text={item.label}
        selected={item.id == "components"}
      />
    {/each}
  </NavCMLX>
</div>
<div class="main">
  <slot />
</div>

<style>
  .main {
    padding: 0.5rem;
    overflow-y: auto;
    flex: 1;
  }

  @media (width < 37.5rem) {
    .nav {
      background: var(--m3c-surface-container);
    }
    .search {
      position: fixed;
      right: 1.5rem;
      bottom: calc(var(--m3v-bottom-offset, 0) + 1.5rem);
    }
  }

  @media (width >= 37.5rem) {
    .nav {
      width: 5rem;
      height: 100dvh;
    }
    .search {
      align-self: center;
    }
  }
</style>
