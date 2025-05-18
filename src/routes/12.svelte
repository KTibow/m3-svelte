<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import RadioAnim1 from "$lib/forms/RadioAnim1.svelte";
import RadioAnim2 from "$lib/forms/RadioAnim2.svelte";
import RadioAnim3 from "$lib/forms/RadioAnim3.svelte";
let animation: "1" | "2" | "3" = $state("1");
let enabled = $state(true);

let Component = $derived(
  animation == "1" ? RadioAnim1 : animation == "2" ? RadioAnim2 : RadioAnim3,
);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}RadioAnim1>${"<"}input type="radio" name="stuff" value="one" bind:group={stuff} />${"<"}/RadioAnim1>
${"<"}RadioAnim1>${"<"}input type="radio" name="stuff" value="two" bind:group={stuff} />${"<"}/RadioAnim1>
${"<"}RadioAnim1>${"<"}input type="radio" name="stuff" value="three" bind:group={stuff} />${"<"}/RadioAnim1>`;
const relevantLinks = [{"title":"RadioAnim1.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/RadioAnim1.svelte"},{"title":"RadioAnim2.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/RadioAnim2.svelte"},{"title":"RadioAnim3.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/RadioAnim3.svelte"}];
</script>

<InternalCard title="Radio" showCode={() => showCode("Radio", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["1", "2", "3"]} bind:value={animation} />
  Animation {animation}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  <div style:display="flex" style:gap="0.5rem">
    <label>
      <Component>
        <input type="radio" name="radio" checked disabled={!enabled} />
      </Component>
    </label>
    <label>
      <Component>
        <input type="radio" name="radio" disabled={!enabled} />
      </Component>
    </label>
    <label>
      <Component>
        <input type="radio" name="radio" disabled={!enabled} />
      </Component>
    </label>
  </div>
{/snippet}
</InternalCard>
