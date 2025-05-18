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
let variant: "elevated" | "filled" | "tonal" | "outlined" | "text" = "elevated";
let iconType: "none" | "left" | "full" = "none";
let enabled = true;
let link = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Button variant="elevated" click={() => alert("!")}>Hello${"<"}/Button>`;
const relevantLinks = [{"title":"Button.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"}];
</script>

<InternalCard title="Button" on:showCode={() => dispatch("showCode", { name: "Button", minimalDemo, relevantLinks })}>
<label>
  <Arrows list={["elevated", "filled", "tonal", "outlined", "text"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
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
  <Button
    {variant}
    {...link ? { href: "https://example.com" } : { click: () => {}, disabled: !enabled }}
    {iconType}
  >
    {#if iconType == "none"}
      Hello
    {:else if iconType == "left"}
      <Icon icon={iconCircle} /> Hello
    {:else}
      <Icon icon={iconCircle} />
    {/if}
  </Button>
</div>
</InternalCard>
