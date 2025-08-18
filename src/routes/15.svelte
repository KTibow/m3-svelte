<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Select from "$lib/forms/Select.svelte";
let enabled = $state(true);
let options = [
  { text: "Option 1", value: "option1" },
  { text: "Option 2", value: "option2" },
  { text: "Option 3", value: "option3" },
];

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Select options={[{text: "A", value: "a"}, {text: "B", value: "b"}]} bind:value />`;
const relevantLinks = [{"title":"Select.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Select.svelte"}];
</script>

<InternalCard title="Select" showCode={() => showCode("Select", minimalDemo, relevantLinks)}>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  <Select
    {options}
    disabled={!enabled}
  />
{/snippet}
</InternalCard>
