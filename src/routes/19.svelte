<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import DateField from "$lib/forms/DateField.svelte";
import DateFieldOutlined from "$lib/forms/DateFieldOutlined.svelte";
let variant: "filled" | "outlined" = $state("filled");
let enabled = $state(true);
let errored = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}DateField label="Date" bind:value />
${"<"}DateFieldOutlined label="Date" bind:value />`;
const relevantLinks = [{"title":"DateField.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/DateField.svelte"},{"title":"DateFieldOutlined.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/DateFieldOutlined.svelte"}];
</script>

<InternalCard title="Date field" showCode={() => showCode("Date field", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["filled", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={errored} />
  {errored ? "Errored" : "Not errored"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  {#if variant === "filled"}
    <DateField label="Date" disabled={!enabled} error={errored} />
  {:else}
    <DateFieldOutlined label="Date" disabled={!enabled} error={errored} />
  {/if}
{/snippet}
</InternalCard>
