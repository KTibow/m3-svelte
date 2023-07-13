<script lang="ts">
  import ButtonCard from "./ButtonCard.svelte";
  import CardCard from "./CardCard.svelte";
  import CheckboxCard from "./CheckboxCard.svelte";
  import ChipCard from "./ChipCard.svelte";
  import DialogCard from "./DialogCard.svelte";
  import FABCard from "./FABCard.svelte";
  import Hero from "./Hero.svelte";
  import ProgressCard from "./ProgressCard.svelte";
  import RadioCard from "./RadioCard.svelte";
  import SegmentedButtonCard from "./SegmentedButtonCard.svelte";
  import SwitchCard from "./SwitchCard.svelte";
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
  <ProgressCard />
  <RadioCard />
  <CheckboxCard />
  <SwitchCard />
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
