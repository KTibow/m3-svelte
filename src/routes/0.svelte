<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import ButtonLink from "$lib/buttons/ButtonLink.svelte";
let type: "elevated" | "filled" | "tonal" | "outlined" | "text" = "elevated";
let iconType: "none" | "left" | "full" = "none";
let enabled = true;
let link = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Button type="elevated" on:click={() => alert("!")}>Hello${"<"}/Button>`;
const relevantLinks = [{"title":"Button.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"},{"title":"ButtonLink.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/ButtonLink.svelte"}];
</script>

<InternalCard title="Button" on:showCode={() => dispatch("showCode", { name: "Button", minimalDemo, relevantLinks })}>
<label>
  <Arrows list={["elevated", "filled", "tonal", "outlined", "text"]} bind:value={type} />
  {type[0].toUpperCase() + type.slice(1)}
</label>
<label>
  <Arrows list={["none", "left", "full"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
<label>
  <Switch bind:checked={link} />
  {link ? "Link" : "Button"}
</label>
<div slot="demo">
  <svelte:component this={link ? ButtonLink : Button} {type} disabled={!enabled} {iconType} href="https://example.com">
    {#if iconType == "none"}
      Hello
    {:else if iconType == "left"}
      <Icon icon={iconCircle} /> Hello
    {:else}
      <Icon icon={iconCircle} />
    {/if}
  </svelte:component>
</div>
</InternalCard>
