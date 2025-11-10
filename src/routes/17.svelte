<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";

let icons: "checked" | "both" | "none" = $state("checked");
let enabled = $state(true);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}label>
  ${"<"}Switch bind:checked={on} />
${"<"}/label>`;
const relevantLinks: { title: string; link: string }[] = [{"title":"Switch.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Switch.svelte"}];
</script>

<InternalCard title="Switch" showCode={() => showCode("Switch", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["checked", "both", "none"]} bind:value={icons} />
  {icons == "checked" ? "Checked icon" : icons == "both" ? "Both icons" : "No icons"}
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
