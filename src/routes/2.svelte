<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import SplitButton from "$lib/buttons/SplitButton.svelte";
import Menu from "$lib/containers/Menu.svelte";
import MenuItem from "$lib/containers/MenuItem.svelte";
let variant: "elevated" | "filled" | "tonal" | "outlined" = $state("elevated");
let position: "inner-down" | "inner-up" | "right-down" | "right-up" = $state("inner-down");
let iconType: "none" | "left" | "full" = $state("none");

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}SplitButton variant="filled" onclick={() => alert("!")}>
  Hello
  {#snippet menu()}
    and more
  {/snippet}
${"<"}/SplitButton>`;
const relevantLinks = [{"title":"SplitButton.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/SplitButton.svelte"},{"title":"Menu.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Menu.svelte"},{"title":"MenuItem.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/MenuItem.svelte"}];
</script>

<InternalCard title="Split button" showCode={() => showCode("Split button", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["elevated", "filled", "tonal", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Arrows list={["inner-down", "inner-up", "right-down", "right-up"]} bind:value={position} />
  {position[0].toUpperCase() + position.slice(1).replace("-", " ")}
</label>
<label>
  <Arrows list={["none", "left", "full"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}
</label>

{#snippet demo()}
  <div>
    <SplitButton
      {variant}
      x={position.startsWith("inner") ? "inner" : "right"}
      y={position.endsWith("down") ? "down" : "up"}
      onclick={() => {}}
    >
      {#if iconType == "none"}
        Hello
      {:else if iconType == "left"}
        <Icon icon={iconCircle} /> Hello
      {:else}
        <Icon icon={iconCircle} />
      {/if}
      {#snippet menu()}
        <Menu>
          <MenuItem icon={iconCircle} onclick={() => {}}>Hi</MenuItem>
          <MenuItem icon={iconSquare} onclick={() => {}}>Howdy</MenuItem>
          <MenuItem icon={iconTriangle} onclick={() => {}}>G'day</MenuItem>
        </Menu>
      {/snippet}
    </SplitButton>
  </div>
{/snippet}
</InternalCard>
