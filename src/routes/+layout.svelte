<script>
  import iconHome from "@iconify-icons/ic/outline-home";
  import iconHomeS from "@iconify-icons/ic/twotone-home";
  import iconAnimation from "@iconify-icons/ic/outline-animation";
  import iconAnimationS from "@iconify-icons/ic/twotone-animation";
  import iconBook from "@iconify-icons/ic/outline-book";
  import iconBookS from "@iconify-icons/ic/twotone-book";
  import iconColorLens from "@iconify-icons/ic/outline-color-lens";
  import iconColorLensS from "@iconify-icons/ic/twotone-color-lens";
  import iconCode from "@iconify-icons/ic/outline-code";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import StyleFromScheme from "$lib/misc/StyleFromScheme.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import NavList from "$lib/nav/NavList.svelte";
  import NavListLink from "$lib/nav/NavListLink.svelte";

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
      icon: iconColorLens,
      iconS: iconColorLensS,
      label: "Theme",
    },
  ];
  $: pathNormalized = $page.url.pathname.replace(/\/$/, "");
</script>

<StyleFromScheme
  lightScheme={{
    primary: 4284831119,
    onPrimary: 4294967295,
    primaryContainer: 4293516799,
    onPrimaryContainer: 4280291399,
    inversePrimary: 4291804670,
    secondary: 4284636017,
    onSecondary: 4294967295,
    secondaryContainer: 4293451512,
    onSecondaryContainer: 4280162603,
    tertiary: 4286468704,
    onTertiary: 4294967295,
    tertiaryContainer: 4294957539,
    onTertiaryContainer: 4281405469,
    error: 4290386458,
    onError: 4294967295,
    errorContainer: 4294957782,
    onErrorContainer: 4282449922,
    background: 4294834175,
    onBackground: 4280097568,
    surface: 4294834175,
    onSurface: 4280097568,
    surfaceVariant: 4293386475,
    onSurfaceVariant: 4282991950,
    inverseSurface: 4281478965,
    inverseOnSurface: 4294307831,
    outline: 4286215551,
    outlineVariant: 4291478735,
    shadow: 4278190080,
    scrim: 4278190080,
    surfaceDim: 4292794592,
    surfaceBright: 4294834175,
    surfaceContainerLowest: 4294967295,
    surfaceContainerLow: 4294505210,
    surfaceContainer: 4294110452,
    surfaceContainerHigh: 4293715694,
    surfaceContainerHighest: 4293320937,
    surfaceTint: 4284831119,
  }}
  darkScheme={{
    primary: 4291804670,
    onPrimary: 4281739101,
    primaryContainer: 4283252085,
    onPrimaryContainer: 4293516799,
    inversePrimary: 4284831119,
    secondary: 4291543771,
    onSecondary: 4281544001,
    secondaryContainer: 4283057240,
    onSecondaryContainer: 4293451512,
    tertiary: 4293900488,
    onTertiary: 4283049266,
    tertiaryContainer: 4284693320,
    onTertiaryContainer: 4294957539,
    error: 4294948011,
    onError: 4285071365,
    errorContainer: 4287823882,
    onErrorContainer: 4294957782,
    background: 4279505432,
    onBackground: 4293320937,
    surface: 4279505432,
    onSurface: 4293320937,
    surfaceVariant: 4282991950,
    onSurfaceVariant: 4291478735,
    inverseSurface: 4293320937,
    inverseOnSurface: 4281478965,
    outline: 4287926169,
    outlineVariant: 4282991950,
    shadow: 4278190080,
    scrim: 4278190080,
    surfaceDim: 4279505432,
    surfaceBright: 4282071102,
    surfaceContainerLowest: 4279176467,
    surfaceContainerLow: 4280097568,
    surfaceContainer: 4280360740,
    surfaceContainerHigh: 4281018671,
    surfaceContainerHighest: 4281742394,
    surfaceTint: 4291804670,
  }}
/>
<div class="container">
  <div class="sidebar">
    <NavList type="auto">
      <div class="fab">
        <FAB on:click={() => window.open("https://github.com/KTibow/m3-svelte")} icon={iconCode} />
      </div>
      <div class="items">
        {#each paths as { path, icon, iconS, label }}
          {@const selected = pathNormalized == path}
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
