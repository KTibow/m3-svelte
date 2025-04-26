<script module lang="ts">
  import { slide } from "svelte/transition";
  import { easeEmphasized } from "$lib/misc/easing";
  import StandardSideSheet from "$lib/containers/StandardSideSheet.svelte";
  import BottomSheet from "$lib/containers/BottomSheet.svelte";

  import Doc from "./_doc.svelte";
  import Hero from "./Hero.svelte";
  import Demo0 from "./0.svelte";
  import Demo1 from "./1.svelte";

  let innerWidth: number | undefined = $state();

  export type DocData = {
    name: string;
    minimalDemo: string;
    relevantLinks: { title: string; link: string }[];
  };

  let doc: DocData | undefined = $state();
  const showCode = (docData: DocData) => {
    doc = docData;
  };
</script>

<svelte:window bind:innerWidth={innerWidth} />
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
<div class="grid grid-cols-[1fr_auto] grid-rows-[auto_auto_1fr] -m-4 min-h-screen sm:-m-6">
  <Hero />
  <!--cards-->
  <div
    class="grid gap-y-12 gap-x-6 px-4 mb-4 col-start-1 sm:[grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))] sm:px-6 sm:mb-6">
    <Demo0 {showCode} />
    <Demo1 {showCode} />
  </div>
  {#if doc && innerWidth != null && innerWidth >= 600}
    <div
      class="flex flex-col w-64 ml-4 border-l-outline border-l-[1px] sticky top-0 h-full overflow-auto row-start-1 row-span-3 col-start-2 sm:ml-6"
      transition:slide={{ easing: easeEmphasized, duration: 500, axis: "x" }}>
      <StandardSideSheet headline={doc.name} onclose={() => (doc = undefined)}>
        {@render docs()}
      </StandardSideSheet>
    </div>
  {:else if doc}
    <BottomSheet on:close={() => (doc = undefined)}>
      {@render docs()}
    </BottomSheet>
  {/if}
</div>
