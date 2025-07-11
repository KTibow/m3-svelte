<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import LinearProgress from "$lib/forms/LinearProgress.svelte";
import LinearProgressEstimate from "$lib/forms/LinearProgressEstimate.svelte";
import WavyLinearProgress from "$lib/forms/WavyLinearProgress.svelte";
import WavyLinearProgressEstimate from "$lib/forms/WavyLinearProgressEstimate.svelte";
import CircularProgress from "$lib/forms/CircularProgress.svelte";
import CircularProgressEstimate from "$lib/forms/CircularProgressEstimate.svelte";
import Button from "$lib/buttons/Button.svelte";
import Slider from "$lib/forms/Slider.svelte";
let type: "linear" | "linear-wavy" | "circular" = $state("linear");
let estimate = $state(false);
let thick = $state(false);
let percent = $state(10);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}LinearProgress percent={60} />
${"<"}LinearProgressEstimate sToHalfway={2} />
${"<"}WavyLinearProgress percent={60} />
${"<"}WavyLinearProgressEstimate sToHalfway={2} />
${"<"}CircularProgress percent={60} />
${"<"}CircularProgressEstimate sToHalfway={2} />`;
const relevantLinks = [{"title":"LinearProgress.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/LinearProgress.svelte"},{"title":"LinearProgressEstimate.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/LinearProgressEstimate.svelte"},{"title":"WavyLinearProgress.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/WavyLinearProgress.svelte"},{"title":"WavyLinearProgressEstimate.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/WavyLinearProgressEstimate.svelte"},{"title":"CircularProgress.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/CircularProgress.svelte"},{"title":"CircularProgressEstimate.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/CircularProgressEstimate.svelte"},{"title":"Slider.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"}];
</script>

<InternalCard title="Progress" showCode={() => showCode("Progress", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["linear", "linear-wavy", "circular"]} bind:value={type} />
  {type[0].toUpperCase() + type.slice(1).replace("-", " ")}
</label>
<label>
  <Switch bind:checked={thick} />
  {thick ? "Thicker" : "Default"}
</label>
{#if !estimate}
  <Slider bind:value={percent} />
{/if}
<input type="checkbox" id="estimate-toggle" bind:checked={estimate} />
<Button variant="tonal" for="estimate-toggle">{estimate ? "Estimated" : "Estimate"}</Button>

{#snippet demo()}
  {#if estimate && type == "linear"}
    <LinearProgressEstimate sToHalfway={2} height={thick ? 8 : 4} />
  {:else if estimate && type == "linear-wavy"}
    <WavyLinearProgressEstimate height={thick ? 14 : 10} thickness={thick ? 8 : 4} />
  {:else if estimate && type == "circular"}
    <CircularProgressEstimate sToHalfway={2} thickness={thick ? 8 : 4} />
  {:else if type == "linear"}
    <LinearProgress {percent} height={thick ? 8 : 4} />
  {:else if type == "linear-wavy"}
    <WavyLinearProgress {percent} height={thick ? 14 : 10} thickness={thick ? 8 : 4} />
  {:else if type == "circular"}
    <CircularProgress {percent} thickness={thick ? 8 : 4} />
  {/if}
{/snippet}

<style>
  #estimate-toggle {
    display: none;
  }
</style>
</InternalCard>
