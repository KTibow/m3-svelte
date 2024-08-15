<script lang="ts">
  import iconMore from "@ktibow/iconset-material-symbols/arrows-more-up-rounded";
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
<ul>
  <li>Wow! You made it all the way down here!</li>
  <li class="h-center">
    <Icon icon={iconMore} />
    Next steps:
  </li>
  <li>Join the M3 Svelte community on <a href="https://discord.gg/gS8T5RnMmA">Discord</a>.</li>
  <li>Make a theme on the Theme page, and come back here to try it out.</li>
  <li>Maybe even <a href="https://github.com/sponsors/KTibow">be my first public sponsor</a>.</li>
</ul>

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

  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;

    padding: 0;
    margin-top: 2rem;
    list-style-type: none;
  }
  ul > li {
    background-color: rgb(var(--m3-scheme-primary-container) / 0.5);
    color: rgb(var(--m3-scheme-on-primary-container));
    padding: 0.75rem 1rem;
    border-radius: 1rem 1rem 1rem 0;
  }
  .h-center {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  a {
    color: rgb(var(--m3-scheme-primary));
  }
  a:not(:hover) {
    text-decoration: none;
  }
</style>
