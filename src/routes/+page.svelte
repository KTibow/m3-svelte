<script lang="ts">
  import iconLightbulb from "@ktibow/iconset-material-symbols/lightbulb-outline";
  import iconHeart from "@ktibow/iconset-material-symbols/favorite-outline";
  import Icon from "$lib/misc/_icon.svelte";
  import Hero from "./Hero.svelte";
  import ButtonCard from "./ButtonCard.svelte";
  import SegmentedButtonCard from "./SegmentedButtonCard.svelte";
  import FABCard from "./FABCard.svelte";
  import CardCard from "./CardCard.svelte";
  import DialogCard from "./DialogCard.svelte";
  import SnackbarCard from "./SnackbarCard.svelte";
  import BottomSheetCard from "./BottomSheetCard.svelte";
  import ListCard from "./ListCard.svelte";
  import ProgressCard from "./ProgressCard.svelte";
  import MenuCard from "./MenuCard.svelte";
  import RadioCard from "./RadioCard.svelte";
  import CheckboxCard from "./CheckboxCard.svelte";
  import SwitchCard from "./SwitchCard.svelte";
  import SliderCard from "./SliderCard.svelte";
  import DateFieldCard from "./DateFieldCard.svelte";
  import TextFieldCard from "./TextFieldCard.svelte";
  import ChipCard from "./ChipCard.svelte";
  import TabsCard from "./TabsCard.svelte";
</script>

<svelte:head>
  <title>M3 Svelte</title>
  <meta
    name="description"
    content="The home of Material 3 Svelte, a library for the M3 design system, with components, animations, and theming."
  />
</svelte:head>

<Hero />
<div class="cards">
  <ButtonCard />
  <SegmentedButtonCard />
  <FABCard />
  <CardCard />
  <DialogCard />
  <SnackbarCard />
  <BottomSheetCard />
  <ListCard />
  <ProgressCard />
  <MenuCard />
  <RadioCard />
  <CheckboxCard />
  <SwitchCard />
  <SliderCard />
  <DateFieldCard />
  <TextFieldCard />
  <ChipCard />
  <TabsCard />
</div>
<div class="tip">
  <Icon width="1.5rem" height="1.5rem" icon={iconLightbulb} />
  If you use the theme page, your theme will show up here
</div>
<a href="https://github.com/sponsors/KTibow" class="tip">
  <Icon width="1.5rem" height="1.5rem" icon={iconHeart} />
  If I've saved you $5 of time, consider a sponsor
</a>

<style>
  .cards {
    display: grid;
    grid-gap: 1rem;
  }
  @media (min-width: 37.5rem) {
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    }
  }
  .tip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
  }
  a {
    color: rgb(var(--m3-scheme-primary));
    text-decoration: none;
  }
</style>
