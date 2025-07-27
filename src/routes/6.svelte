<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Menu from "$lib/containers/Menu.svelte";
import MenuItem from "$lib/containers/MenuItem.svelte";
let icons = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Menu>
  ${"<"}MenuItem icon={iconCircle}>Undo${"<"}/MenuItem>
  ${"<"}MenuItem icon={iconSquare}>Redo${"<"}/MenuItem>
  ${"<"}MenuItem icon={iconTriangle}>Cut${"<"}/MenuItem>
${"<"}/Menu>`;
const relevantLinks = [{"title":"Menu.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Menu.svelte"},{"title":"MenuItem.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/MenuItem.svelte"}];
</script>

<InternalCard title="Menu" showCode={() => showCode("Menu", minimalDemo, relevantLinks)}>
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
{#snippet demo()}
  <Menu>
    <MenuItem icon={icons ? iconCircle : undefined} onclick={() => {}}>Cut</MenuItem>
    <MenuItem icon={icons ? iconSquare : undefined} onclick={() => {}}>Undo</MenuItem>
    <MenuItem icon={icons ? iconTriangle : undefined} disabled onclick={() => {}}>Redo</MenuItem>
  </Menu>
{/snippet}
</InternalCard>
