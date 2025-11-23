<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
let variant: "elevated" | "filled" | "tonal" | "outlined" | "text" = $state("filled");
let action: "click" | "link" | "toggle" = $state("click");
let square = $state(false);
let iconType: "none" | "left" | "full" = $state("none");
let size: "xs" | "s" | "m" | "l" | "xl" = $state("s");
let enabled = $state(true);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Button variant="elevated" onclick={() => alert("!")}>Hello${"<"}/Button>`;
const relevantLinks: { title: string; link: string }[] = [{"title":"Button.svelte","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/Button.svelte"}];
</script>

<InternalCard title="Button" showCode={() => showCode("Button", minimalDemo, relevantLinks)}>
<label>
  <Arrows
    list={["elevated", "filled", "tonal", "outlined", "text"]}
    bind:value={variant}
    initialIndex={1}
  />
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
      {size}
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
