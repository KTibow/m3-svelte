<script lang="ts">
  import Hero from "./Hero.svelte";
  import ButtonCard from "./ButtonCard.svelte";
  import SegmentedButtonCard from "./SegmentedButtonCard.svelte";
  import FABCard from "./FABCard.svelte";
  import DialogCard from "./DialogCard.svelte";
  import SnackbarCard from "./SnackbarCard.svelte";
  import MenuCard from "./MenuCard.svelte";
  import ProgressCard from "./ProgressCard.svelte";
  import RadioCard from "./RadioCard.svelte";
  import CheckboxCard from "./CheckboxCard.svelte";
  import SwitchCard from "./SwitchCard.svelte";
  import SliderCard from "./SliderCard.svelte";
  import ChipCard from "./ChipCard.svelte";
  import CardCard from "./CardCard.svelte";
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
  <MenuCard />
  <ProgressCard />
  <RadioCard />
  <CheckboxCard />
  <SwitchCard />
  <SliderCard />
  <ChipCard />
  <TabsCard />
</div>

<style>
  .cards {
    display: grid;
    grid-gap: 1rem;
  }
  @media (min-width: 30rem) {
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    }
  }
</style>
