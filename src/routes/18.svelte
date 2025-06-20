<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import DateField from "$lib/utils/DateField.svelte";


let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}DateField label="Date" bind:date />`;
const relevantLinks = [{"title":"DateField.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/utils/DateField.svelte"}];
</script>

<InternalCard title="Date field" showCode={() => showCode("Date field", minimalDemo, relevantLinks)}>
{#snippet demo()}
  <DateField label="Date" />
{/snippet}
</InternalCard>
