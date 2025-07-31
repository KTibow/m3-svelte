<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle";
import iconSquare from "@ktibow/iconset-material-symbols/square-rounded";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Slider from "$lib/forms/Slider.svelte";

let precision = $state<"continuous" | "discrete" | "discrete-ticks">("continuous");
let size = $state<"xs" | "s" | "m" | 'l' | 'xl'>("m");
let trailingIcon = $state<boolean>(false);
let leadingIcon = $state<boolean>(false);
let endStops = $state<boolean>(true);
let enabled = $state<boolean>(true);

let { showCode } = $props<{
  showCode: (
    name: string,
    minimalDemo: string,
    relevantLinks: { title: string; link: string }[],
  ) => void
}>();

const minimalDemo = `${"<"}Slider bind:value={n} />`;
const relevantLinks = [{"title":"Slider.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"}];
</script>

<InternalCard title="Slider" showCode={() => showCode("Slider", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["continuous", "discrete", "discrete-ticks"]} bind:value={precision} />
  {precision == "continuous"
    ? "Continuous"
    : precision == "discrete"
      ? "Discrete"
      : "Discrete (ticks)"}
</label>
<label>
  <Arrows list={["m", 'l', 'xl', "xs", "s"]} bind:value={size} />
  {size == "xs"
    ? "Extra Small"
    : size == "s"
      ? "Small"
      : size == "m"
        ? "Medium"
          : size == "l"
          ? "Large" : "Extra Large"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
<label>
  <Switch bind:checked={leadingIcon} />
  {leadingIcon ? "Leading icon" : "No leading icon"}
</label>
<label>
  <Switch bind:checked={trailingIcon} />
  {trailingIcon ? "Trailing icon" : "No trailing icon"}
</label>
<label>
  <Switch bind:checked={endStops} />
  {leadingIcon ? "Endstops" : "No Endstops"}
</label>

{#snippet demo()}
  <Slider step={precision == "continuous" ? "any" : 10} value={10} disabled={!enabled} ticks={precision === 'discrete-ticks'} {size} {endStops} leadingIcon={leadingIcon ? iconCircle : undefined} trailingIcon={trailingIcon ? iconSquare : undefined} />
{/snippet}
</InternalCard>
