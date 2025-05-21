<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Checkbox from "$lib/forms/Checkbox.svelte";
let enabled = $state(true);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}label>
  ${"<"}Checkbox>
    ${"<"}input type="checkbox" bind:checked={on} />
  ${"<"}/Checkbox>
${"<"}/label>`;
const relevantLinks = [{"title":"Checkbox.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Checkbox.svelte"}];
</script>

<InternalCard title="Checkbox" showCode={() => showCode("Checkbox", minimalDemo, relevantLinks)}>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
{#snippet demo()}
  <label>
    <Checkbox>
      <input type="checkbox" checked disabled={!enabled} />
    </Checkbox>
  </label>
{/snippet}
</InternalCard>
