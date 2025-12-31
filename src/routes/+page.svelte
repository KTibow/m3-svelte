<script lang="ts">
  import { slide } from "svelte/transition";
  import { innerWidth } from "svelte/reactivity/window";
  import { easeEmphasized } from "$lib/misc/easing";
  import StandardSideSheet from "$lib/containers/StandardSideSheet.svelte";
  import BottomSheet from "$lib/containers/BottomSheet.svelte";

  import Doc from "./_doc.svelte";
  import Hero from "./Hero.svelte";
  import Demo0 from "virtual:demo/0";
  import Demo1 from "virtual:demo/1";
  import Demo2 from "virtual:demo/2";
  import Demo3 from "virtual:demo/3";
  import Demo4 from "virtual:demo/4";
  import Demo5 from "virtual:demo/5";
  import Demo6 from "virtual:demo/6";
  import Demo7 from "virtual:demo/7";
  import Demo8 from "virtual:demo/8";
  import Demo9 from "virtual:demo/9";
  import Demo10 from "virtual:demo/10";
  import Demo11 from "virtual:demo/11";
  import Demo12 from "virtual:demo/12";
  import Demo13 from "virtual:demo/13";
  import Demo14 from "virtual:demo/14";
  import Demo15 from "virtual:demo/15";
  import Demo16 from "virtual:demo/16";
  import Demo17 from "virtual:demo/17";
  import Demo18 from "virtual:demo/18";
  import Demo19 from "virtual:demo/19";
  import Demo20 from "virtual:demo/20";
  import Demo21 from "virtual:demo/21";
  import Demo22 from "virtual:demo/22";
  import Demo23 from "virtual:demo/23";
  import Demo24 from "virtual:demo/24";
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
    content="Implements the Material 3 design system in Svelte, cleanly, robustly, and across components, animations, and theming."
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
    <Demo0 {showCode} />
    <Demo1 {showCode} />
    <Demo2 {showCode} />
    <Demo3 {showCode} />
    <Demo4 {showCode} />
    <Demo5 {showCode} />
    <Demo6 {showCode} />
    <Demo7 {showCode} />
    <Demo8 {showCode} />
    <Demo9 {showCode} />
    <Demo10 {showCode} />
    <Demo11 {showCode} />
    <Demo12 {showCode} />
    <Demo13 {showCode} />
    <Demo14 {showCode} />
    <Demo15 {showCode} />
    <Demo16 {showCode} />
    <Demo17 {showCode} />
    <Demo18 {showCode} />
    <Demo19 {showCode} />
    <Demo20 {showCode} />
    <Demo21 {showCode} />
    <Demo22 {showCode} />
    <Demo23 {showCode} />
    <Demo24 {showCode} />
    {#await import("virtual:demo/25") then { default: LastDemo }}
      <LastDemo {showCode} />
    {/await}
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
