<script lang="ts">
  import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
  import Arrows from "./_arrows.svelte";
  import InternalCard from "./_card.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import type { DocProps } from "./+page.svelte";

  let color: "primary" | "surface" | "secondary" | "tertiary" = $state("primary");
  let size: "small" | "normal" | "large" | "extended" = $state("normal");

  const minimalDemo = `${"<"}FAB color="primary" icon={iconCircle} on:click={() => alert("!")} />`;
  const relevantLinks = [
    {
      "title": "FAB.sv",
      "link": "https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/FAB.svelte"
    }
  ];
  let { showCode }: DocProps = $props();
</script>

<InternalCard title="FAB" showCode={() => showCode({ name: "FAB", minimalDemo, relevantLinks })}>
  <label>
    <Arrows list={["primary", "surface", "secondary", "tertiary"]} bind:value={color} />
    {color[0].toUpperCase() + color.slice(1)}
  </label>
  <label>
    <Arrows list={["small", "normal", "large", "extended"]} bind:value={size} index={1} />
    {size[0].toUpperCase() + size.slice(1)}
  </label>
  {#snippet demo()}
    <FAB
      {color}
      size={size === "extended" ? "normal" : size}
      icon={iconCircle}
      text={size === "extended" ? "Hello" : undefined}
    />
  {/snippet}
</InternalCard>
