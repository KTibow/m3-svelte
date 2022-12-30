<script lang="ts">
  import iconRightArrow from "@iconify-icons/ic/outline-arrow-right-alt";
  import iconBoxes from "@iconify-icons/ic/outline-view-agenda";
  import iconList from "@iconify-icons/ic/outline-list";
  import iconLocation from "@iconify-icons/ic/outline-navigation";
  import iconWrench from "@iconify-icons/ic/outline-build";
  import { writable } from "svelte/store";
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

<article>
  <p>
    ⚠️ You may encounter jank while using this library. I've tried to implement stuff to spec, but
    things may be missing or not correct. Talk to me if you have any questions. With that said:
  </p>
  <h2 class="md-headline-medium">Usage steps</h2>
  <p>
    This library used to require a lot of external CSS variables. Now you use components to set your
    theme and provide utilities. There are 3 options.
  </p>
  <ol>
    <li>
      ColorTheme: Do you already have a Theme object from the official Material color utilities
      library? Pass it to this component and it'll extract the arguments needed so they're
      available.
    </li>
    <li>
      ColorScheme: If you just have a list of different colors (eg manually extracted from your
      theme) this component will make them available.
    </li>
    <li>
      ColorGen: Pass in a single source color as a hex code and this component will generate a theme
      and make it available.
    </li>
  </ol>
  <p>
    Add one of those to your +layout.svelte. You may want to import Roboto (or another font and
    customize it), set body styling (eg background/foreground/font), and
    <a href="https://github.com/KTibow/m3-svelte/tree/main/src/lib/utils">
      also check out the code for utilities.
    </a>
  </p>
  <p>Once you apply those, import from the package whatever components you need.</p>
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
    desc="Coming soon"
    category="Nav"
  />
  <Component
    name="Bottom sheets"
    mtLink="https://m3.material.io/components/bottom-sheets"
    desc="Might come"
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
    desc="A customizable FAB component. Extended FAB is included in this component. Positioning is up to the parent."
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
    desc="Might come"
    category="Forms"
  />
  <Component
    name="Dialogs"
    mtLink="https://m3.material.io/components/dialogs"
    desc="Might come"
    category="Containers"
  />
  <Component
    name="Dividers"
    mtLink="https://m3.material.io/components/divider"
    desc="Might come"
    category="Utility"
  />
  <Component
    name="Lists"
    mtLink="https://m3.material.io/components/lists"
    desc="Not a separate component, and not implemented"
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
    desc="A component suitable to go on the left/bottom of the screen that lets the user tap icons. Navigation bar is included in this component. Positioning is up to the parent."
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
    desc="Coming soon"
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
    desc="Coming soon"
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
    desc="Coming soon, might be integrated into the rail"
    category="Nav"
  />
  <Component
    name="Text fields"
    mtLink="https://m3.material.io/components/text-fields"
    ghLink="https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/TextField.svelte"
    desc="A text input that works decently. Note that supporting text, the clear button, multi-line text, prefixes, suffixes, characters, and errors are not supported."
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
  a {
    color: rgb(var(--md-sys-color-primary));
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
</style>
