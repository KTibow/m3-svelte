<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
import Button from "$lib/buttons/Button.svelte";
import TogglePrimitive from "$lib/buttons/TogglePrimitive.svelte";
let variant: "filled" | "tonal" = $state("filled");
let multiselect = $state(true);
let size: "xs" | "s" | "m" | "l" | "xl" = $state("s");

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}ConnectedButtons>
  ${"<"}TogglePrimitive bind:toggle={itemA}>A${"<"}/TogglePrimitive>
  ${"<"}TogglePrimitive bind:toggle={itemB}>B${"<"}/TogglePrimitive>
${"<"}/ConnectedButtons>`;
const relevantLinks: { title: string; link: string }[] = [{"title":"ConnectedButtons.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/ConnectedButtons.svelte"},{"title":"TogglePrimitive.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/TogglePrimitive.svelte"}];
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
<label>
  <Arrows list={["xs", "s", "m", "l", "xl"]} bind:value={size} initialIndex={1} />
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
{#snippet demo()}
  <ConnectedButtons>
    {#if multiselect}
      <TogglePrimitive toggle={true} {variant} {size}>Alpha</TogglePrimitive>
      <TogglePrimitive toggle={false} {variant} {size}>Beta</TogglePrimitive>
      <TogglePrimitive toggle={false} {variant} {size}>Charlie</TogglePrimitive>
    {:else}
      <input type="radio" name="segmented-b" id="segmented-b-0" checked />
      <Button for="segmented-b-0" {variant} {size} square>Alpha</Button>
      <input type="radio" name="segmented-b" id="segmented-b-1" />
      <Button for="segmented-b-1" {variant} {size} square>Beta</Button>
      <input type="radio" name="segmented-b" id="segmented-b-2" />
      <Button for="segmented-b-2" {variant} {size} square>Charlie</Button>
    {/if}
  </ConnectedButtons>
{/snippet}
</InternalCard>
