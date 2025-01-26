<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import CheckboxAnim from "$lib/forms/CheckboxAnim.svelte";
import Checkbox from "$lib/forms/Checkbox.svelte";
let animated = true;
let enabled = true;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}label>
  ${"<"}Checkbox>
    ${"<"}input type="checkbox" bind:checked={on} />
  ${"<"}/Checkbox>
${"<"}/label>`;
const relevantLinks = [{"title":"CheckboxAnim.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/CheckboxAnim.svelte"},{"title":"Checkbox.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Checkbox.svelte"}];
</script>

<InternalCard title="Checkbox" on:showCode={() => dispatch("showCode", { name: "Checkbox", minimalDemo, relevantLinks })}>
<label>
  <Switch bind:checked={animated} />
  {animated ? "Animated" : "Not animated"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
<label slot="demo">
  <svelte:component this={animated ? CheckboxAnim : Checkbox}>
    <input type="checkbox" checked disabled={!enabled} />
  </svelte:component>
</label>
</InternalCard>
