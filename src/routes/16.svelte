<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Tabs from "$lib/nav/Tabs.svelte";
import VariableTabs from "$lib/nav/VariableTabs.svelte";
let type: "primary" | "secondary" = "primary";
let icons = false;
let variable = false;
let tab = "hello";

$: items = icons
  ? [
      { icon: iconCircle, name: "Hello", value: "hello" },
      { icon: iconSquare, name: "World", value: "world" },
      { icon: iconTriangle, name: "The longest item", value: "long" },
    ]
  : [
      { name: "Hello", value: "hello" },
      { name: "World", value: "world" },
      { name: "The longest item", value: "long" },
    ];

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Tabs
  items={[
    { name: "A", value: "a" },
    { name: "B", value: "b" },
  ]}
  bind:tab
/>`;
const relevantLinks = [{"title":"Tabs.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/Tabs.svelte"},{"title":"VariableTabs.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/VariableTabs.svelte"}];
</script>

<InternalCard title="Tabs" on:showCode={() => dispatch("showCode", { name: "Tabs", minimalDemo, relevantLinks })}>
<label>
  <Arrows list={["primary", "secondary"]} bind:value={type} />
  {type == "primary" ? "Primary" : "Secondary"}
</label>
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
<label>
  <Switch bind:checked={variable} />
  {variable ? "Variable" : "Fixed"}
</label>

<div slot="demo">
  {#if variable}
    <VariableTabs bind:tab secondary={type == "secondary"} {items} />
  {:else}
    <Tabs bind:tab secondary={type == "secondary"} {items} />
  {/if}
</div>
</InternalCard>
