<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Card from "$lib/containers/Card.svelte";
let variant: "elevated" | "filled" | "outlined" = $state("elevated");
let clickable = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Card variant="filled">Hello${"<"}/Card>
${"<"}Card variant="filled" onclick={() => alert("!")}>Hello${"<"}/Card>`;
const relevantLinks = [{"title":"Card.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Card.svelte"}];
</script>

<InternalCard title="Card" showCode={() => showCode("Card", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["elevated", "filled", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={clickable} />
  {clickable ? "Clickable" : "Not clickable"}
</label>
{#snippet demo()}
  <Card {variant} {...clickable ? { onclick: () => {} } : {}}>Hello</Card>
{/snippet}
</InternalCard>
