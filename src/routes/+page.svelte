<script lang="ts">
  import { slide } from "svelte/transition";
  import { easeEmphasized } from "$lib/misc/easing";
  import StandardSideSheet from "$lib/containers/StandardSideSheet.svelte";
  import BottomSheet from "$lib/containers/BottomSheet.svelte";

  import Doc from "./_doc.svelte";
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

  let innerWidth: number;

  type DocData = {
    name: string;
    minimalDemo: string;
    relevantLinks: { title: string; link: string }[];
  };
  let doc: DocData | undefined;
  const showCode = (e: { detail: DocData }) => {
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
  {#if doc}
    <Doc {...doc} />
  {/if}
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
      <StandardSideSheet headline={doc.name} close={() => (doc = undefined)}>
        {@render docs()}
      </StandardSideSheet>
    </div>
  {:else if doc}
    <BottomSheet close={() => (doc = undefined)}>
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
