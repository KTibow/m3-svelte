<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Slider from "$lib/forms/Slider.svelte";
import SliderTicks from "$lib/forms/SliderTicks.svelte";
let precision: "continuous" | "discrete" | "discrete-ticks" = "continuous";
let enabled = true;
let value = 0;

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Slider bind:value={n} />`;
const relevantLinks = [{"title":"Slider.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"},{"title":"SliderTicks.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/SliderTicks.svelte"}];
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
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  {#if precision == "discrete-ticks"}
    <SliderTicks step={1} max={6} value={0} disabled={!enabled} />
  {:else}
    <Slider step={precision == "continuous" ? "any" : 10} value={0} disabled={!enabled} />
  {/if}
{/snippet}
</InternalCard>
