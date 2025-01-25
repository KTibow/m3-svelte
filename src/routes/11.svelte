<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import LinearProgress from "$lib/forms/LinearProgress.svelte";
import LinearProgressIndeterminate from "$lib/forms/LinearProgressIndeterminate.svelte";
import CircularProgress from "$lib/forms/CircularProgress.svelte";
import CircularProgressIndeterminate from "$lib/forms/CircularProgressIndeterminate.svelte";
let type: "linear" | "circular" = "linear";
let indeterminate = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}LinearProgress percent={60} />
${"<"}LinearProgressIndeterminate />
${"<"}CircularProgress percent={60} />
${"<"}CircularProgressIndeterminate />`;
</script>

<InternalCard title="Progress" on:showCode={() => dispatch("showCode", { name: "Progress" })}>
<label>
  <Arrows list={["linear", "circular"]} bind:value={type} />
  {type[0].toUpperCase() + type.slice(1)}
</label>
<label>
  <Switch bind:checked={indeterminate} />
  {indeterminate ? "Indeterminate" : "Fixed progress"}
</label>

<div slot="demo">
  {#if type == "linear" && indeterminate}
    <LinearProgressIndeterminate />
  {:else if type == "linear"}
    <LinearProgress percent={60} />
  {:else if type == "circular" && indeterminate}
    <CircularProgressIndeterminate />
  {:else if type == "circular"}
    <CircularProgress percent={60} />
  {/if}
</div>
</InternalCard>
