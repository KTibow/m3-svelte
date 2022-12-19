<script lang="ts">
  import Component from "./Component.svelte";
</script>

<p>
  ⚠️ Jank be here! This is a fun project, and a lot of stuff may not be present or not work. Feel
  free to talk to me about any part of it. With that said:
</p>
<h2 class="display-medium">Usage steps</h2>
<p>
  This library requires a number of Material design tokens to be present as CSS variables, like
  --md-sys-color-primary and --md-sys-elevation-1. It also requires some CSS classes like
  md-label-large. The easiest way to get these is with the theme generator on the left.
</p>
<p>Once you apply those, import from the package whatever components you need.</p>
<h2 class="display-medium">Components (ordered as on Material)</h2>
<div class="container">
  <Component
    name="Badge"
    mtLink="https://m3.material.io/components/badges"
    desc="Not a separate component, and not implemented"
  />
  <Component
    name="Bottom app bar"
    mtLink="https://m3.material.io/components/bottom-app-bar"
    desc="Coming soon"
  />
  <Component
    name="Bottom sheets"
    mtLink="https://m3.material.io/components/bottom-sheets"
    desc="Might come"
  />
  <Component
    name="Common buttons"
    mtLink="https://m3.material.io/components/buttons"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"
    desc="A button component with an option of styles. Icon buttons is included in this component."
  />
  <Component
    name="FAB"
    mtLink="https://m3.material.io/components/floating-action-button"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/FAB.svelte"
    desc="A customizable FAB component. Extended FAB is included in this component. Positioning is up to the parent."
  />
  <Component
    name="Segmented buttons"
    mtLink="https://m3.material.io/components/segmented-buttons"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/SegmentedButton.svelte"
    desc="A group of buttons that can be used to pick things."
  />
  <Component
    name="Cards"
    mtLink="https://m3.material.io/components/cards"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Card.svelte"
    desc="A simple wrapper used to add a card with an option of styles."
  />
  <Component
    name="Checkbox"
    mtLink="https://m3.material.io/components/checkbox"
    desc="Coming soon"
  />
  <Component name="Chips" mtLink="https://m3.material.io/components/chips" desc="Coming soon" />
  <Component
    name="Date pickers"
    mtLink="https://m3.material.io/components/date-pickers"
    desc="Might come"
  />
  <Component name="Dialogs" mtLink="https://m3.material.io/components/dialogs" desc="Might come" />
  <Component name="Dividers" mtLink="https://m3.material.io/components/divider" desc="Might come" />
  <Component
    name="Lists"
    mtLink="https://m3.material.io/components/lists"
    desc="Not a separate component, and not implemented"
  />
  <Component name="Menus" mtLink="https://m3.material.io/components/menus" desc="Might come" />
  <Component
    name="Navigation bar"
    mtLink="https://m3.material.io/components/navigation-bar"
    desc="Coming soon, might be integrated into the rail"
  />
  <Component
    name="Navigation drawer"
    mtLink="https://m3.material.io/components/navigation-drawer"
    desc="Coming soon"
  />
  <Component
    name="Navigation rail"
    mtLink="https://m3.material.io/components/navigation-rail"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/NavRail.svelte"
    desc="A component suitable to go on the left side of the screen that lets the user tap icons."
  />
  <Component
    name="Progress indicators"
    mtLink="https://m3.material.io/components/progress-indicators"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/LinearProgress.svelte"
    desc="A circular and linear component are available. The linear one is linked."
  />
  <Component
    name="Radio button"
    mtLink="https://m3.material.io/components/radio-button"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Radio.svelte"
    desc="A styled radio button. Try using flexbox to position it."
  />
  <Component name="Search" mtLink="https://m3.material.io/components/search" desc="Coming soon" />
  <Component
    name="Sliders"
    mtLink="https://m3.material.io/components/sliders"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"
    desc="Implemented but janky, see the code"
  />
  <Component
    name="Snackbar"
    mtLink="https://m3.material.io/components/snackbar"
    desc="Coming soon"
  />
  <Component name="Switch" mtLink="https://m3.material.io/components/switch" desc="Coming soon" />
  <Component
    name="Tabs"
    mtLink="https://m3.material.io/components/tabs"
    desc="Coming soon, might be integrated into the rail"
  />
  <Component
    name="Text fields"
    mtLink="https://m3.material.io/components/text-fields"
    desc="Coming soon"
  />
  <Component
    name="Time pickers"
    mtLink="https://m3.material.io/components/time-pickers"
    desc="Might come"
  />
  <Component
    name="Top app bar"
    mtLink="https://m3.material.io/components/top-app-bar"
    desc="Might come, might be integrated into the other app bar"
  />
</div>

<style>
  .container {
    display: grid;
    gap: 1rem;
  }
  @media (orientation: landscape) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
