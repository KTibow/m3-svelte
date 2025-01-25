<script lang="ts">
  import { slide } from "svelte/transition";
  import { easeEmphasized } from "$lib/misc/easing";
  import StandardSideSheet from "$lib/containers/StandardSideSheet.svelte";
  import Hero from "./Hero.svelte";
  import Demo0 from "./0.svelte";
  import Demo1 from "./1.svelte";
  import Demo2 from "./2.svelte";
  import Demo3 from "./3.svelte";
  import Demo4 from "./4.svelte";
  import Demo5 from "./5.svelte";
  import Demo6 from "./6.svelte";
  import Demo7 from "./7.svelte";
  import Demo8 from "./8.svelte";
  import Demo9 from "./9.svelte";
  import Demo10 from "./10.svelte";
  import Demo11 from "./11.svelte";
  import Demo12 from "./12.svelte";
  import Demo13 from "./13.svelte";
  import Demo14 from "./14.svelte";
  import Demo15 from "./15.svelte";
  import Demo16 from "./16.svelte";
  import Demo17 from "./17.svelte";
  import BottomSheet from "$lib/containers/BottomSheet.svelte";

  let innerWidth: number;

  let doc: { name: string } | undefined;
  const showCode = (e: { detail: { name: string } }) => {
    doc = e.detail;
  };
</script>

<svelte:window bind:innerWidth />
<svelte:head>
  <title>M3 Svelte</title>
  <meta
    name="description"
    content="The home of Material 3 Svelte, a library for the M3 design system, with components, animations, and theming."
  />
</svelte:head>

{#snippet docs()}
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi culpa ipsum, possimus laudantium
  dignissimos impedit at, unde officia doloribus asperiores quia aperiam et ducimus error ex magni
  quam? Tempore, est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat
  fuga voluptas sit tempora soluta quia totam optio. Laudantium, in! Porro ut fuga ratione eius
  cupiditate nihil perspiciatis quos sed! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  Molestias illo, numquam mollitia deserunt et est dicta modi ratione fuga culpa dolor voluptatibus
  veniam aspernatur quibusdam nostrum neque, fugiat consectetur sunt. Lorem, ipsum dolor sit amet
  consectetur adipisicing elit. Quaerat rerum voluptas perferendis, officiis, eius, unde quia magni
  laborum blanditiis vero id maiores cum vel natus. Nostrum voluptatibus magni magnam eligendi!
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias officiis at sint assumenda,
  deserunt nihil eaque, cupiditate nisi beatae eum blanditiis soluta vel, sequi nulla porro dolorum
  accusamus ad quas? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis natus
  molestias, ratione, ducimus, optio facilis porro molestiae omnis obcaecati similique officia
  cupiditate iste recusandae nesciunt quidem saepe alias laborum doloremque? Lorem ipsum dolor sit
  amet consectetur adipisicing elit. Atque veniam repellendus sed magni a saepe numquam pariatur
  inventore ea. Nobis aspernatur iste in tempora corporis porro cumque accusamus quod at.
{/snippet}
<div class="side-wrapper">
  <Hero />
  <div class="cards">
    <Demo0 on:showCode={showCode} />
    <Demo1 on:showCode={showCode} />
    <Demo2 on:showCode={showCode} />
    <Demo3 on:showCode={showCode} />
    <Demo4 on:showCode={showCode} />
    <Demo5 on:showCode={showCode} />
    <Demo6 on:showCode={showCode} />
    <Demo7 on:showCode={showCode} />
    <Demo8 on:showCode={showCode} />
    <Demo9 on:showCode={showCode} />
    <Demo10 on:showCode={showCode} />
    <Demo11 on:showCode={showCode} />
    <Demo12 on:showCode={showCode} />
    <Demo13 on:showCode={showCode} />
    <Demo14 on:showCode={showCode} />
    <Demo15 on:showCode={showCode} />
    <Demo16 on:showCode={showCode} />
    <Demo17 on:showCode={showCode} />
  </div>
  {#if doc && innerWidth >= 600}
    <div class="sheet" transition:slide={{ easing: easeEmphasized, duration: 500, axis: "x" }}>
      <StandardSideSheet headline={doc.name} on:close={() => (doc = undefined)}>
        {@render docs()}
      </StandardSideSheet>
    </div>
  {:else if doc}
    <BottomSheet on:close={() => (doc = undefined)}>
      {@render docs()}
    </BottomSheet>
  {/if}
</div>

<style>
  .side-wrapper {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto 1fr;

    margin: -1rem;
    min-height: 100dvh;
  }
  .cards {
    display: grid;
    gap: 3rem 1.5rem;
    padding: 0 1rem;
    margin-bottom: 1rem;

    grid-column: 1;
  }
  .sheet {
    display: flex;
    flex-direction: column;
    width: 16rem;
    margin-left: 1rem;
    border-left: solid 1px rgb(var(--m3-scheme-outline));

    position: sticky;
    top: 0;
    height: 100dvh;
    overflow: auto;
    grid-row: 1 / span 3;
    grid-column: 2;
  }

  @media (width >= 37.5rem) {
    .side-wrapper {
      margin: -1.5rem;
    }
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      padding: 0 1.5rem;
      margin-bottom: 1.5rem;
    }
    .sheet {
      margin-left: 1.5rem;
    }
  }
</style>
