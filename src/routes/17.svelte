<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";

let icons = $state<"both" | "none" | "checked">("checked");
let enabled = $state<boolean>(true);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}label>
  ${"<"}Switch bind:checked={on} />
${"<"}/label>`;
const relevantLinks = [{"title":"Switch.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Switch.svelte"}];
</script>

<InternalCard title="Switch" showCode={() => showCode("Switch", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["checked", "both", "none"]} bind:value={icons} />
  {icons == "checked" ? "Icon on selected" : icons == "both" ? "Icon on both" : "Without icons"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  <label>
    <Switch disabled={!enabled} {icons} />
  </label>
{/snippet}
</InternalCard>
