<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Select from "$lib/forms/Select.svelte";
import SelectOutlined from "$lib/forms/SelectOutlined.svelte";
let variant: "filled" | "outlined" = $state("filled");
let icons = $state(false);
let enabled = $state(true);
let options = $derived([
  { icon: icons ? iconCircle : undefined, text: "Alpha", value: "alpha" },
  { icon: icons ? iconSquare : undefined, text: "Beta", value: "beta" },
  { icon: icons ? iconTriangle : undefined, text: "Charlie", value: "charlie" },
]);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Select label="Select" options={[{text: "A", value: "a"}, {text: "B", value: "b"}]} bind:value />`;
const relevantLinks = [{"title":"Select.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Select.svelte"},{"title":"SelectOutlined.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/SelectOutlined.svelte"}];
</script>

<InternalCard title="Select" showCode={() => showCode("Select", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["filled", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  {#if variant === "filled"}
    <Select
      label="Select"
      {options}
      disabled={!enabled}
      value="alpha"
    />
  {:else}
    <SelectOutlined
      label="Select"
      {options}
      disabled={!enabled}
      value="alpha"
    />
  {/if}
{/snippet}
</InternalCard>
