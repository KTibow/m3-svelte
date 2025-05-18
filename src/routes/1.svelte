<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
import Button from "$lib/buttons/Button.svelte";
let variant: "filled" | "tonal" = $state("filled");
let multiselect = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}ConnectedButtons>
  ${"<"}input type="checkbox" id="segmented-0" bind:checked={itemA} />
  ${"<"}Button for="segmented-0" variant="filled" square>A${"<"}/Button>
  ${"<"}input type="checkbox" id="segmented-1" bind:checked={itemB} />
  ${"<"}Button for="segmented-1" variant="filled" square>B${"<"}/Button>
${"<"}/ConnectedButtons>`;
const relevantLinks = [{"title":"ConnectedButtons.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/ConnectedButtons.svelte"}];
</script>

<InternalCard title="Connected buttons" showCode={() => showCode("Connected buttons", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["filled", "tonal"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={multiselect} />
  {multiselect ? "Multi-select" : "Single-select"}
</label>
{#snippet demo()}
  <ConnectedButtons>
    {#if multiselect}
      <input type="checkbox" id="segmented-a-0" />
      <Button for="segmented-a-0" {variant} square>Alpha</Button>
      <input type="checkbox" id="segmented-a-1" />
      <Button for="segmented-a-1" {variant} square>Beta</Button>
      <input type="checkbox" id="segmented-a-2" />
      <Button for="segmented-a-2" {variant} square>Charlie</Button>
    {:else}
      <input type="radio" name="segmented-b" id="segmented-b-0" checked />
      <Button for="segmented-b-0" {variant} square>Alpha</Button>
      <input type="radio" name="segmented-b" id="segmented-b-1" />
      <Button for="segmented-b-1" {variant} square>Beta</Button>
      <input type="radio" name="segmented-b" id="segmented-b-2" />
      <Button for="segmented-b-2" {variant} square>Charlie</Button>
    {/if}
  </ConnectedButtons>
{/snippet}
</InternalCard>
