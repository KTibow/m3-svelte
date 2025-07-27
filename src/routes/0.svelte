<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
let variant: "elevated" | "filled" | "tonal" | "outlined" | "text" = $state("elevated");
let action: "click" | "link" | "toggle" = $state("click");
let square = $state(false);
let iconType: "none" | "left" | "full" = $state("none");
let enabled = $state(true);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Button variant="elevated" onclick={() => alert("!")}>Hello${"<"}/Button>`;
const relevantLinks = [{"title":"Button.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"}];
</script>

<InternalCard title="Button" showCode={() => showCode("Button", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["elevated", "filled", "tonal", "outlined", "text"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Arrows list={["click", "link", "toggle"]} bind:value={action} />
  {action[0].toUpperCase() + action.slice(1)}
</label>
<label>
  <Switch bind:checked={square} />
  {square ? "Square" : "Round"}
</label>
<label>
  <Arrows list={["none", "left", "full"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
{#snippet demo()}
  <div>
    <input type="checkbox" id="random-input" disabled={!enabled} />
    <Button
      {variant}
      {square}
      {...{
        click: { onclick: () => {}, disabled: !enabled },
        link: { href: "https://example.com" },
        toggle: { for: "random-input" },
      }[action]}
      {iconType}
    >
      {#if iconType == "none"}
        Hello
      {:else if iconType == "left"}
        <Icon icon={iconCircle} /> Hello
      {:else}
        <Icon icon={iconCircle} />
      {/if}
    </Button>
  </div>
{/snippet}

<style>
  #random-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>
</InternalCard>
