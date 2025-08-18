<script lang="ts">
import Switch from "$lib/forms/Switch.svelte";
import InternalCard from "./_card.svelte";
import Arrows from "./_arrows.svelte";

let icons = $state<'both' | 'none' | 'checked'>('checked');
let enabled = $state<boolean>(true);

let { showCode } = $props<{
  showCode: (
    name: string,
    minimalDemo: string,
    relevantLinks: { title: string; link: string }[],
  ) => void
}>();

const minimalDemo = `${"<"}label>
  ${"<"}Switch bind:checked={on} />
${"<"}/label>`;
const relevantLinks = [{"title":"Switch.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Switch.svelte"}];
</script>

<InternalCard title="Switch" showCode={() => showCode("Switch", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["checked", "both", "none"]} bind:value={icons} />
  {icons == "checked"
    ? "Icon when checked"
    : icons == "both"
      ? "Both icons"
      : "No icons"}
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