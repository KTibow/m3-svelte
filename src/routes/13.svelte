<script lang="ts">
import { createEventDispatcher } from "svelte";
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

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Slider bind:value={n} />`;
</script>

<InternalCard title="Slider" on:showCode={() => dispatch("showCode", { name: "Slider" })}>
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

<div slot="demo">
  {#if precision == "discrete-ticks"}
    <SliderTicks step={1} max={6} value={0} disabled={!enabled} />
  {:else}
    <Slider step={precision == "continuous" ? "any" : 10} value={0} disabled={!enabled} />
  {/if}
</div>
</InternalCard>
