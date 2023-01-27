<script lang="ts">
  import iconRightArrow from "@iconify-icons/ic/outline-arrow-right-alt";
  import iconBoxes from "@iconify-icons/ic/outline-view-agenda";
  import iconList from "@iconify-icons/ic/outline-list";
  import iconLocation from "@iconify-icons/ic/outline-navigation";
  import iconWrench from "@iconify-icons/ic/outline-build";
  import { writable } from "svelte/store";
  import { base } from "$app/paths";
  import { setContext } from "svelte";

  import Component from "./Component.svelte";
  import ChipChooser from "$lib/utils/ChipChooser.svelte";
  const categories = [
    { icon: iconRightArrow, label: "Buttons" },
    { icon: iconBoxes, label: "Containers" },
    { icon: iconList, label: "Forms" },
    { icon: iconLocation, label: "Nav" },
    { icon: iconWrench, label: "Utility" },
  ];
  let chosenCategories = [0, 2];
  const categoryStore = writable();
  $: $categoryStore = chosenCategories.map((c) => categories[c]);
  setContext("categories", categoryStore);
</script>

<svelte:head>
  <title>M3 Svelte: Docs</title>
  <meta
    name="description"
    content="Documentation about using the library M3 Svelte, including components, theming, and more."
  />
</svelte:head>
<article>
  <p>
    M3 Svelte is an effort to implement some of the components and theming from Material 3 in
    Svelte. Note the "effort" - you may encounter jank or annoyance, in which case you should let me
    (KTibow) know. Anyway:
  </p>
  <h2 class="md-headline-medium">Setting up M3 Svelte</h2>
  <ol>
    <li>Install the library into a Svelte project (e.g. <code>npm i m3-svelte</code>).</li>
    <li>
      Use the <a href="{base}/theme">theme page</a> to construct your theme. This is needed for
      components to function, as it gives some base styling, and your theme's colors. Drop the
      component in <code>+layout.svelte</code> and import it.
    </li>
    <li>
      Set up your typography. You can customize it with CSS variables or just import <a
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        >Roboto</a
      >. The CSS variables used for font styles are:
      <ul>
        <li>font-family: <code>--md-sys-typescale-body</code></li>
        <li>font-weight: <code>--md-sys-typescale-body-weight</code></li>
      </ul>
    </li>
    <li>
      Set up your body defaults, such as foreground/background and default fonts. You can optionally
      use the classes <code>md-body-large</code>, <code>md-body-medium</code>, or
      <code>md-body-small</code> depending on the desired root font size.
    </li>
    <li>That's all, import components as needed!</li>
  </ol>
  <p>
    Note: Aside from the components listed here, there are some utility and theming components.
    Check out the source code (click the FAB).
  </p>
</article>
<h2 class="md-headline-medium">Components (ordered as on Material)</h2>
<ChipChooser options={categories} bind:chosenOptions={chosenCategories} />
<div class="container">
  <Component
    name="Badge"
    mtLink="https://m3.material.io/components/badges"
    desc="Not a separate component, and not implemented"
    category="Utility"
  />
  <Component
    name="Bottom app bar"
    mtLink="https://m3.material.io/components/bottom-app-bar"
    desc="Might come"
    category="Nav"
  />
  <Component
    name="Bottom sheets"
    mtLink="https://m3.material.io/components/bottom-sheets"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/BottomSheet.svelte"
    desc="Bottom sheet that's customizable and works well, lmk if it doesn't"
    category="Containers"
  />
  <Component
    name="Common buttons"
    mtLink="https://m3.material.io/components/buttons"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"
    desc="A button component with an option of styles. Icon buttons is included in this component."
    category="Buttons"
  />
  <Component
    name="FAB"
    mtLink="https://m3.material.io/components/floating-action-button"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/FAB.svelte"
    desc="A customizable FAB component. Extended FAB is included in this component. Positioning is up to the parent (or ResponsiveLayout)."
    category="Buttons"
  />
  <Component
    name="Segmented buttons"
    mtLink="https://m3.material.io/components/segmented-buttons"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/SegmentedButton.svelte"
    desc="A group of buttons that can be used to pick things."
    category="Buttons"
  />
  <Component
    name="Cards"
    mtLink="https://m3.material.io/components/cards"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Card.svelte"
    desc="A simple wrapper used to add a card with an option of styles."
    category="Containers"
  />
  <Component
    name="Checkbox"
    mtLink="https://m3.material.io/components/checkbox"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Checkbox.svelte"
    desc="A styled checkbox, similar to the radio button. Must be wrapped in a <label>."
    category="Forms"
  />
  <Component
    name="Chips"
    mtLink="https://m3.material.io/components/chips"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Chip.svelte"
    desc="A chip with many configuration options."
    category="Forms"
  />
  <Component
    name="Date pickers"
    mtLink="https://m3.material.io/components/date-pickers"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/DatePickerDocked.svelte"
    desc="An implementation of the date picker. Use DateFieldAndPicker from utils to position it."
    category="Forms"
  />
  <Component
    name="Dialogs"
    mtLink="https://m3.material.io/components/dialogs"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Dialog.svelte"
    desc="A dialog that can go over other things. Tell me if it doesn't work for your contents."
    category="Containers"
  />
  <Component
    name="Dividers"
    mtLink="https://m3.material.io/components/divider"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/Divider.svelte"
    desc="Just a styled <hr>, from what I can tell from the docs."
    category="Utility"
  />
  <Component
    name="Lists"
    mtLink="https://m3.material.io/components/lists"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/List.svelte"
    desc="A list component that probably works, check out the implementation"
    category="Containers"
  />
  <Component
    name="Menus"
    mtLink="https://m3.material.io/components/menus"
    desc="Might come"
    category="Containers"
  />
  <Component
    name="Navigation drawer"
    mtLink="https://m3.material.io/components/navigation-drawer"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/NavDrawer.svelte"
    desc="A component that lets the user click on categories on the side of the screen. Positioning is up to the parent. If you want to use other content, just wrap this component and add headings/groups as needed."
    category="Nav"
  />
  <Component
    name="Navigation rail"
    mtLink="https://m3.material.io/components/navigation-rail"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/NavRail.svelte"
    desc="A component suitable to go on the left/bottom of the screen that lets the user tap icons. Navigation bar is included in this component. Positioning is up to the parent (or ResponsiveLayout)."
    category="Nav"
  />
  <Component
    name="Progress indicators"
    mtLink="https://m3.material.io/components/progress-indicators"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/LinearProgress.svelte"
    desc="A circular and linear component are available. The linear one is linked."
    category="Forms"
  />
  <Component
    name="Radio button"
    mtLink="https://m3.material.io/components/radio-button"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Radio.svelte"
    desc="A styled radio button. Try using flexbox to position it. Must be wrapped in a <label>."
    category="Forms"
  />
  <Component
    name="Search"
    mtLink="https://m3.material.io/components/search"
    desc="Might come"
    category="Nav"
  />
  <Component
    name="Sliders"
    mtLink="https://m3.material.io/components/sliders"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"
    desc="Implemented with most features. See the code."
    category="Forms"
  />
  <Component
    name="Snackbar"
    mtLink="https://m3.material.io/components/snackbar"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Snackbar.svelte"
    desc="A snackbar that can display a message. Try using SnackbarPlacer (from utils) to position it."
    category="Containers"
  />
  <Component
    name="Switch"
    mtLink="https://m3.material.io/components/switch"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Switch.svelte"
    desc="A checkbox styled into a switch. It also lets you drag it instead of clicking, which I think is pretty nice."
    category="Forms"
  />
  <Component
    name="Tabs"
    mtLink="https://m3.material.io/components/tabs"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/Tabs.svelte"
    desc="A tab component built with radio buttons. There isn't any mechanism for the content yet."
    category="Nav"
  />
  <Component
    name="Text fields"
    mtLink="https://m3.material.io/components/text-fields"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/TextField.svelte"
    desc="A text input that works decently. Note that the clear button, multi-line text, prefixes, suffixes, and characters are not supported."
    category="Forms"
  />
  <Component
    name="Time pickers"
    mtLink="https://m3.material.io/components/time-pickers"
    desc="Might come"
    category="Forms"
  />
  <Component
    name="Top app bar"
    mtLink="https://m3.material.io/components/top-app-bar"
    desc="Might come, might be integrated into the other app bar"
    category="Nav"
  />
</div>

<style>
  article {
    max-width: 65ch;
  }
  .container {
    display: grid;
    gap: 1rem;
    margin: 1rem 0;
  }
  @media (orientation: landscape) {
    .container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  code,
  a {
    color: rgb(var(--md-sys-color-primary));
  }
</style>
