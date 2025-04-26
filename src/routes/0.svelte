<!--<svelte:options customElement="my-stepper" />-->

<script lang="ts">
  import type { ComponentProps } from "svelte";
  import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
  import Icon from "$lib/misc/_icon.svelte";
  import Arrows from "./_arrows.svelte";
  import InternalCard from "./_card.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import type { DocData } from "./+page.svelte";
  import { Switch } from "$lib";

  let { showCode }: { showCode: (docData: DocData) => void } = $props();

  const minimalDemo = `${"<"}Button type="elevated" on:click={() => alert("!")}>Hello${"<"}/Button>`;
  const relevantLinks = [{
    "title": "Button.sv",
    "link": "https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"
  }, {
    "title": "ButtonLink.sv",
    "link": "https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/ButtonLink.svelte"
  }];

  let type: "elevated" | "filled" | "tonal" | "outlined" | "text" = $state("elevated");
  let iconType: "none" | "left" | "full" = $state("none");
  let enabled: boolean = $state(true);


</script>

<InternalCard showCode={() => {showCode({ name: "Button", minimalDemo, relevantLinks })}} title="Button">
  {#if type != null}
    <label>
      <Arrows list={["elevated", "filled", "tonal", "outlined", "text"]} bind:value={type} />
      {type[0].toUpperCase() + type.slice(1)}
    </label>
  {/if}
  <label>
    <Arrows list={["none", "left", "full"]} bind:value={iconType} />
    {iconType === "none" ? "No icon" : iconType === "left" ? "Left icon" : "Icon"}
  </label>
  <label>
    <Switch bind:checked={enabled} />
    {enabled ? "Enabled" : "Disabled"}
  </label>
  <!--<label>-->
  <!--  <Switch checked={link} />-->
  <!--  {link ? "Link" : "Button"}-->
  <!--</label>-->
  {#snippet demo()}
    <Button {iconType} {type} disabled={!enabled}>
      {#if iconType === "none"}
        Hello
      {:else if iconType === "full"}
        <Icon icon={iconCircle} />
      {:else}
        <Icon icon={iconCircle} />
        Hello
      {/if}
    </Button>
  {/snippet}
</InternalCard>
