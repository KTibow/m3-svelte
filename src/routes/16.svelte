<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Slider from "$lib/forms/Slider.svelte";
let precision = $state<"continuous" | "discrete" | "discrete-stops">("continuous");
let size = $state<"xs" | "s" | "m" | "l" | "xl">("xs");
let trailingIcon = $state<boolean>(false);
let leadingIcon = $state<boolean>(false);
let endStops = $state<boolean>(true);
let enabled = $state<boolean>(true);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Slider bind:value={n} />`;
const relevantLinks: { title: string; link: string }[] = [{"title":"Slider.svelte","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"}];
</script>

<InternalCard title="Slider" showCode={() => showCode("Slider", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["continuous", "discrete", "discrete-stops"]} bind:value={precision} />
  {precision == "continuous"
    ? "Continuous"
    : precision == "discrete"
      ? "Discrete"
      : "Discrete (stops)"}
</label>
<label>
  <Arrows list={["xs", "s", "m", "l", "xl"]} bind:value={size} />
  {size == "xs"
    ? "Extra small"
    : size == "s"
      ? "Small"
      : size == "m"
        ? "Medium"
        : size == "l"
          ? "Large"
          : "Extra large"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
{#if size != "xs" && size != "s"}
  <label>
    <Switch bind:checked={leadingIcon} />
    {leadingIcon ? "Leading icon" : "No leading icon"}
  </label>
  <label>
    <Switch bind:checked={trailingIcon} />
    {trailingIcon ? "Trailing icon" : "No trailing icon"}
  </label>
{/if}
{#if precision != "discrete-stops" && !trailingIcon}
  <label>
    <Switch bind:checked={endStops} />
    {endStops ? "Endstops" : "No endstops"}
  </label>
{/if}

{#snippet demo()}
  <Slider
    step={precision == "continuous" ? "any" : 10}
    value={10}
    disabled={!enabled}
    {size}
    stops={precision == "discrete-stops"}
    {endStops}
    leadingIcon={leadingIcon ? iconCircle : undefined}
    trailingIcon={trailingIcon ? iconSquare : undefined}
  />
{/snippet}
</InternalCard>
