<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import LoadingIndicator from "$lib/forms/LoadingIndicator.svelte";
let container = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}LoadingIndicator />`;
const relevantLinks = [{"title":"LoadingIndicator.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/LoadingIndicator.svelte"}];
</script>

<InternalCard title="Loading" showCode={() => showCode("Loading", minimalDemo, relevantLinks)}>
<label>
  <Switch bind:checked={container} />
  {container ? "Contained" : "Raw"}
</label>

{#snippet demo()}
  <LoadingIndicator {container} />
{/snippet}
</InternalCard>
