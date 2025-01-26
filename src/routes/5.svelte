<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Menu from "$lib/containers/Menu.svelte";
import MenuItem from "$lib/containers/MenuItem.svelte";
let icons = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Menu>
  ${"<"}MenuItem icon={iconCircle}>Undo${"<"}/MenuItem>
  ${"<"}MenuItem icon={iconSquare}>Redo${"<"}/MenuItem>
  ${"<"}MenuItem icon={iconTriangle}>Cut${"<"}/MenuItem>
${"<"}/Menu>`;
const relevantLinks = [{"title":"Menu.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Menu.svelte"},{"title":"MenuItem.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/MenuItem.svelte"}];
</script>

<InternalCard title="Menu" on:showCode={() => dispatch("showCode", { name: "Menu", minimalDemo, relevantLinks })}>
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
<Menu slot="demo">
  <MenuItem icon={icons ? iconCircle : undefined}>Cut</MenuItem>
  <MenuItem icon={icons ? iconSquare : undefined}>Undo</MenuItem>
  <MenuItem icon={icons ? iconTriangle : undefined} disabled>Redo</MenuItem>
</Menu>
</InternalCard>
