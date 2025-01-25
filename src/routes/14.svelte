<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";

let enabled = true;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}label>
  ${"<"}Switch bind:checked={on} />
${"<"}/label>`;
</script>

<InternalCard title="Switch" on:showCode={() => dispatch("showCode", { name: "Switch" })}>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

<label slot="demo">
  <Switch disabled={!enabled} />
</label>
</InternalCard>
