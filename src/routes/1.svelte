<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import SegmentedButtonContainer from "$lib/buttons/SegmentedButtonContainer.svelte";
import SegmentedButtonItem from "$lib/buttons/SegmentedButtonItem.svelte";
let multiselect = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}SegmentedButtonContainer>
  ${"<"}input type="checkbox" id="segmented-0" bind:checked={itemA} />
  ${"<"}SegmentedButtonItem input="segmented-0">A${"<"}/SegmentedButtonItem>
  ${"<"}input type="checkbox" id="segmented-1" bind:checked={itemB} />
  ${"<"}SegmentedButtonItem input="segmented-1">B${"<"}/SegmentedButtonItem>
${"<"}/SegmentedButtonContainer>`;
const relevantLinks = [{"title":"SegmentedButtonContainer.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/SegmentedButtonContainer.svelte"},{"title":"SegmentedButtonItem.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/SegmentedButtonItem.svelte"}];
</script>

<InternalCard title="Segmented button" showCode={() => showCode("Segmented button", minimalDemo, relevantLinks)}>
<label>
  <Switch bind:checked={multiselect} />
  {multiselect ? "Multi-select" : "Single-select"}
</label>
{#snippet demo()}
  <div>
  {#if multiselect}
    <SegmentedButtonContainer>
      <input type="checkbox" id="segmented-a-0" />
      <SegmentedButtonItem input="segmented-a-0" icon={iconCircle}>A</SegmentedButtonItem>
      <input type="checkbox" id="segmented-a-1" />
      <SegmentedButtonItem input="segmented-a-1" icon={iconSquare}>B</SegmentedButtonItem>
      <input type="checkbox" id="segmented-a-2" disabled />
      <SegmentedButtonItem input="segmented-a-2" icon={iconTriangle}>C</SegmentedButtonItem>
    </SegmentedButtonContainer>
  {:else}
    <SegmentedButtonContainer>
      <input type="radio" name="segmented-b" id="segmented-b-0" checked />
      <SegmentedButtonItem input="segmented-b-0" icon={iconCircle}>A</SegmentedButtonItem>
      <input type="radio" name="segmented-b" id="segmented-b-1" />
      <SegmentedButtonItem input="segmented-b-1" icon={iconSquare}>B</SegmentedButtonItem>
      <input type="radio" name="segmented-b" id="segmented-b-2" disabled />
      <SegmentedButtonItem input="segmented-b-2" icon={iconTriangle}>C</SegmentedButtonItem>
    </SegmentedButtonContainer>
  {/if}
  </div>
{/snippet}
</InternalCard>
