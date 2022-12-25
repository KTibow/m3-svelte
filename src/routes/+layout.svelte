<script>
  import NavRail from "$lib/nav/NavRail.svelte";
  import iconMonitor from "@iconify-icons/ic/outline-monitor";
  import iconMonitorFull from "@iconify-icons/ic/round-monitor";
  import iconTheme from "@iconify-icons/ic/outline-palette";
  import iconThemeFull from "@iconify-icons/ic/round-palette";
  import iconBook from "@iconify-icons/ic/outline-book";
  import iconBookFull from "@iconify-icons/ic/round-book";
  import iconCode from "@iconify-icons/ic/outline-code";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  $: hereNormalized = ($page.url.pathname + "/").replace(/\/\/$/, "/");
  const pages = [
    { name: "Demo", href: base + "/", activeIcon: iconMonitorFull, inactiveIcon: iconMonitor },
    { name: "Theme", href: base + "/theme/", activeIcon: iconThemeFull, inactiveIcon: iconTheme },
    { name: "Docs", href: base + "/docs/", activeIcon: iconBookFull, inactiveIcon: iconBook },
  ];
</script>

<div class="parentContainer">
  <div class="railSpace">
    <div class="railPlacer">
      <NavRail
        fab={{ icon: iconCode }}
        mainItems={pages.map((page) => ({
          ...page,
          active: hereNormalized == page.href,
        }))}
        on:chosen={(e) => {
          if (e.detail.name == "fab") return window.open("https://github.com/KTibow/m3-svelte");
        }}
      />
    </div>
  </div>
  <div class="parentContent"><slot /></div>
</div>

<style>
  .parentContainer {
    display: flex;
  }
  .railSpace {
    width: 5rem;
    flex-shrink: 0;
  }
  .railPlacer {
    position: fixed;
    top: 0;
    height: 100vh;
    display: flex;
  }
  .parentContent {
    flex-grow: 1;
    margin: 1rem;
  }
</style>
