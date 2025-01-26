<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Card from "$lib/containers/Card.svelte";
import CardClickable from "$lib/containers/CardClickable.svelte";
let type: "elevated" | "filled" | "outlined" = "elevated";
let clickable = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Card type="filled">Hello${"<"}/Card>
${"<"}CardClickable type="filled" on:click={() => alert("!")}>Hello${"<"}/CardClickable>`;
const relevantLinks = [{"title":"Card.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Card.svelte"},{"title":"CardClickable.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/CardClickable.svelte"}];
</script>

<InternalCard title="Card" on:showCode={() => dispatch("showCode", { name: "Card", minimalDemo, relevantLinks })}>
<label>
  <Arrows list={["elevated", "filled", "outlined"]} bind:value={type} />
  {type[0].toUpperCase() + type.slice(1)}
</label>
<label>
  <Switch bind:checked={clickable} />
  {clickable ? "Clickable" : "Not clickable"}
</label>
<div slot="demo">
  {#if clickable}
    <CardClickable {type}>Hello</CardClickable>
  {:else}
    <Card {type}>Hello</Card>
  {/if}
</div>
</InternalCard>
