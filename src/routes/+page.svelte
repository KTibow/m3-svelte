<script lang="ts">
  import { slide } from "svelte/transition";
  import { innerWidth } from "svelte/reactivity/window";
  import { easeEmphasized } from "$lib/misc/easing";
  import StandardSideSheet from "$lib/containers/StandardSideSheet.svelte";
  import BottomSheet from "$lib/containers/BottomSheet.svelte";

  import Doc from "./_doc.svelte";
  import Hero from "./Hero.svelte";
  import Demos from "virtual:demo";
  import { afterNavigate } from "$app/navigation";

  type DocData = {
    name: string;
    minimalDemoHtml: string;
    relevantLinks: { title: string; link: string }[];
  };
  let doc: DocData | undefined = $state();
  const showCode = (
    name: string,
    minimalDemoHtml: string,
    relevantLinks: { title: string; link: string }[],
  ) => {
    doc = { name, minimalDemoHtml, relevantLinks };
  };

  afterNavigate(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView();
    }
  });
</script>

<svelte:window
  onkeydown={doc ? (e) => e.key == "Escape" && (e.preventDefault(), (doc = undefined)) : undefined}
/>

<svelte:head>
  <title>M3 Svelte</title>
  <meta
    name="description"
    content="The Material 3 design system in Svelte, cleanly, robustly, and across components, animations, and theming."
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
    {#each Demos as DemoPromise}
      {#await DemoPromise then Demo}
        <Demo {showCode} />
      {/await}
    {/each}
  </div>
  {#if doc && innerWidth.current && innerWidth.current >= 600}
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
    display: grid;
    width: 16rem;
    margin-inline-start: 1rem;
    border-inline-start: solid 1px var(--m3c-outline);

    position: sticky;
    top: 0;
    height: 100dvh;
    overflow: auto;
    grid-row: 1 / span 3;
    grid-column: 2;
  }

  @media (width >= 52.5rem) {
    .side-wrapper {
      margin: -1.5rem;
    }
    .cards {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      padding: 0 1.5rem;
      margin-bottom: 1.5rem;
    }
    .sheet {
      margin-inline-start: 1.5rem;
    }
  }
</style>
