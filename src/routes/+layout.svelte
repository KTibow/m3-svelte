<script>
  import NavRail from "$lib/nav/NavRail.svelte";
  import iconMonitor from "@iconify-icons/ic/outline-monitor";
  import iconMonitorFull from "@iconify-icons/ic/round-monitor";
  import iconTheme from "@iconify-icons/ic/outline-palette";
  import iconThemeFull from "@iconify-icons/ic/round-palette";
  import iconBook from "@iconify-icons/ic/outline-book";
  import iconBookFull from "@iconify-icons/ic/round-book";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  $: console.log($page.url.pathname, base);
</script>

<div class="parentContainer">
  <div class="railSpace">
    <div class="railPlacer">
      <NavRail
        mainItems={[
          {
            name: "Demo",
            active: $page.url.pathname == base + "/",
            activeIcon: iconMonitorFull,
            inactiveIcon: iconMonitor,
          },
          {
            name: "Theme",
            active: $page.url.pathname == base + "/theme",
            activeIcon: iconThemeFull,
            inactiveIcon: iconTheme,
          },
          {
            name: "Docs",
            active: $page.url.pathname == base + "/docs",
            activeIcon: iconBookFull,
            inactiveIcon: iconBook,
          },
        ]}
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
