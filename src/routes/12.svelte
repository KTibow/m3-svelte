<script lang="ts">
import { createEventDispatcher } from "svelte";
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
let animation: "1" | "2" | "3" = "1";
let enabled = true;
$: component = animation == "1" ? RadioAnim1 : animation == "2" ? RadioAnim2 : RadioAnim3;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}RadioAnim1>${"<"}input type="radio" name="stuff" value="one" bind:group={stuff} />${"<"}/RadioAnim1>
${"<"}RadioAnim1>${"<"}input type="radio" name="stuff" value="two" bind:group={stuff} />${"<"}/RadioAnim1>
${"<"}RadioAnim1>${"<"}input type="radio" name="stuff" value="three" bind:group={stuff} />${"<"}/RadioAnim1>`;
const relevantLinks = [{"title":"RadioAnim1.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/RadioAnim1.svelte"},{"title":"RadioAnim2.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/RadioAnim2.svelte"},{"title":"RadioAnim3.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/RadioAnim3.svelte"}];
</script>

<InternalCard title="Radio" on:showCode={() => dispatch("showCode", { name: "Radio", minimalDemo, relevantLinks })}>
<label>
  <Arrows list={["1", "2", "3"]} bind:value={animation} />
  Animation {animation}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

<div style:display="flex" style:gap="0.5rem" slot="demo">
  <label>
    <svelte:component this={component}>
      <input type="radio" name="radio" checked disabled={!enabled} />
    </svelte:component>
  </label>
  <label>
    <svelte:component this={component}>
      <input type="radio" name="radio" disabled={!enabled} />
    </svelte:component>
  </label>
  <label>
    <svelte:component this={component}>
      <input type="radio" name="radio" disabled={!enabled} />
    </svelte:component>
  </label>
</div>
</InternalCard>
