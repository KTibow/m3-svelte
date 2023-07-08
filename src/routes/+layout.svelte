<script>
  import StyleFromScheme from "$lib/misc/StyleFromScheme.svelte";
  // import iconMonitor from "@iconify-icons/ic/outline-monitor";
  // import iconMonitorFull from "@iconify-icons/ic/round-monitor";
  // import iconAnimation from "@iconify-icons/ic/outline-animation";
  // import iconAnimationFull from "@iconify-icons/ic/round-animation";
  // import iconTheme from "@iconify-icons/ic/outline-palette";
  // import iconThemeFull from "@iconify-icons/ic/round-palette";
  // import iconBook from "@iconify-icons/ic/outline-book";
  // import iconBookFull from "@iconify-icons/ic/round-book";
  // import iconCode from "@iconify-icons/ic/outline-code";
  // import { page } from "$app/stores";
  // import { base } from "$app/paths";
  // import ResponsiveLayout from "$lib/utils/ResponsiveLayout.svelte";
  // $: hereNormalized = $page.url.pathname.replace(/\/\/$/, "/");
  // const pages = [
  //   {
  //     name: "Components",
  //     href: base || "/",
  //     activeIcon: iconMonitorFull,
  //     inactiveIcon: iconMonitor,
  //   },
  //   {
  //     name: "Transitions",
  //     href: base + "/transitions",
  //     activeIcon: iconAnimationFull,
  //     inactiveIcon: iconAnimation,
  //   },
  //   { name: "Use", href: base + "/docs", activeIcon: iconBookFull, inactiveIcon: iconBook },
  //   { name: "Theme", href: base + "/theme", activeIcon: iconThemeFull, inactiveIcon: iconTheme },
  // ];
</script>

<StyleFromScheme
  lightScheme={[
    ["primary", 4284960932],
    ["onPrimary", 4294967295],
    ["primaryContainer", 4293516799],
    ["onPrimaryContainer", 4280418397],
    ["secondary", 4284636017],
    ["onSecondary", 4294967295],
    ["secondaryContainer", 4293451512],
    ["onSecondaryContainer", 4280162603],
    ["tertiary", 4286468704],
    ["onTertiary", 4294967295],
    ["tertiaryContainer", 4294957539],
    ["onTertiaryContainer", 4281405469],
    ["error", 4290386458],
    ["onError", 4294967295],
    ["errorContainer", 4294957782],
    ["onErrorContainer", 4282449922],
    ["background", 4294966271],
    ["onBackground", 4280032030],
    ["surface", 4294966271],
    ["onSurface", 4280032030],
    ["surfaceVariant", 4293386475],
    ["onSurfaceVariant", 4282991950],
    ["outline", 4286215551],
    ["outlineVariant", 4291478735],
    ["shadow", 4278190080],
    ["scrim", 4278190080],
    ["inverseSurface", 4281413683],
    ["inverseOnSurface", 4294242292],
    ["inversePrimary", 4291804415],
  ]}
  darkScheme={[
    ["primary", 4291804415],
    ["onPrimary", 4281867890],
    ["primaryContainer", 4283381642],
    ["onPrimaryContainer", 4293516799],
    ["secondary", 4291543771],
    ["onSecondary", 4281544001],
    ["secondaryContainer", 4283057240],
    ["onSecondaryContainer", 4293451512],
    ["tertiary", 4293900488],
    ["onTertiary", 4283049266],
    ["tertiaryContainer", 4284693320],
    ["onTertiaryContainer", 4294957539],
    ["error", 4294948011],
    ["onError", 4285071365],
    ["errorContainer", 4287823882],
    ["onErrorContainer", 4294948011],
    ["background", 4280032030],
    ["onBackground", 4293321190],
    ["surface", 4280032030],
    ["onSurface", 4293321190],
    ["surfaceVariant", 4282991950],
    ["onSurfaceVariant", 4291478735],
    ["outline", 4287926169],
    ["outlineVariant", 4282991950],
    ["shadow", 4278190080],
    ["scrim", 4278190080],
    ["inverseSurface", 4293321190],
    ["inverseOnSurface", 4281413683],
    ["inversePrimary", 4284960932],
  ]}
/>
<!-- <ResponsiveLayout
  fabOptions={{ icon: iconCode }}
  railOptions={{
    mainItems: pages.map((page) => ({
      ...page,
      active: hereNormalized == page.href,
    })),
  }}
  on:chosen={(e) => {
    if (e.detail.name == "fab") return window.open("https://github.com/KTibow/m3-svelte");
  }}
>
  <slot />
</ResponsiveLayout> -->
<slot />
