<script>
  import iconMonitor from "@iconify-icons/ic/outline-monitor";
  import iconMonitorFull from "@iconify-icons/ic/round-monitor";
  import iconTheme from "@iconify-icons/ic/outline-palette";
  import iconThemeFull from "@iconify-icons/ic/round-palette";
  import iconBook from "@iconify-icons/ic/outline-book";
  import iconBookFull from "@iconify-icons/ic/round-book";
  import iconCode from "@iconify-icons/ic/outline-code";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import StyleFromScheme from "$lib/colors/StyleFromScheme.svelte";
  import ResponsiveLayout from "$lib/utils/ResponsiveLayout.svelte";
  $: hereNormalized = $page.url.pathname.replace(/\/\/$/, "/");
  const pages = [
    { name: "Demo", href: base || "/", activeIcon: iconMonitorFull, inactiveIcon: iconMonitor },
    { name: "Theme", href: base + "/theme", activeIcon: iconThemeFull, inactiveIcon: iconTheme },
    { name: "Docs", href: base + "/docs", activeIcon: iconBookFull, inactiveIcon: iconBook },
  ];
</script>

<StyleFromScheme
  lightScheme={[
    ["primary", 4285026212],
    ["onPrimary", 4294967295],
    ["primaryContainer", 4293516799],
    ["onPrimaryContainer", 4280483932],
    ["secondary", 4284636016],
    ["onSecondary", 4294967295],
    ["secondaryContainer", 4293451512],
    ["onSecondaryContainer", 4280162603],
    ["tertiary", 4286468703],
    ["onTertiary", 4294967295],
    ["tertiaryContainer", 4294957538],
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
    ["inverseSurface", 4281479219],
    ["inverseOnSurface", 4294307828],
    ["inversePrimary", 4291869951],
  ]}
  darkScheme={[
    ["primary", 4291869951],
    ["onPrimary", 4281933426],
    ["primaryContainer", 4283447178],
    ["onPrimaryContainer", 4293516799],
    ["secondary", 4291609307],
    ["onSecondary", 4281544001],
    ["secondaryContainer", 4283057240],
    ["onSecondaryContainer", 4293451512],
    ["tertiary", 4293900487],
    ["onTertiary", 4283049265],
    ["tertiaryContainer", 4284693320],
    ["onTertiaryContainer", 4294957538],
    ["error", 4294948011],
    ["onError", 4285071365],
    ["errorContainer", 4287823882],
    ["onErrorContainer", 4294957782],
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
    ["inverseOnSurface", 4281479219],
    ["inversePrimary", 4285026212],
  ]}
/>
<ResponsiveLayout
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
</ResponsiveLayout>
