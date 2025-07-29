<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import ListItem from "$lib/containers/ListItem.svelte";
import Checkbox from "$lib/forms/Checkbox.svelte";
import Divider from "$lib/utils/Divider.svelte";
const headline = "Hello";

let lines: "1" | "2" | "3" = $state("1");
let type: "div" | "button" | "label" | "a" = $state("div");

let supporting = $derived(
  lines == "1"
    ? undefined
    : lines == "2"
      ? "Welcome to ZomboCom!"
      : "Welcome to ZomboCom! Anything is possible at ZomboCom! You can do anything at ZomboCom!",
);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}div>
  ${"<"}ListItem headline="Hello" />
  ${"<"}ListItem headline="Hello" />
${"<"}/div>`;
const relevantLinks = [{"title":"ListItem.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/ListItem.svelte"}];
</script>

<InternalCard title="List" showCode={() => showCode("List", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["1", "2", "3"]} bind:value={lines} />
  {lines}
  {lines == "1" ? "line" : "lines"}
</label>
<label>
  <Arrows list={["div", "button", "label", "a"]} bind:value={type} />
  {"<" + type + ">"}
</label>
{#snippet demo()}
  <div class="demo">
    {#snippet leading()}
      {#if type == "label"}
        <div class="box-wrapper">
          <Checkbox><input type="checkbox" /></Checkbox>
        </div>
      {:else}
        <Icon icon={iconCircle} />
      {/if}
    {/snippet}
    <ListItem
      {leading}
      {headline}
      {supporting}
      lines={+lines}
      {...type == "label"
        ? { label: true }
        : type == "button"
          ? { onclick: () => {} }
          : type == "a"
            ? { href: "https://example.com" }
            : {}}
    />
    <Divider />
    <ListItem
      {leading}
      {headline}
      {supporting}
      lines={+lines}
      {...type == "label"
        ? { label: true }
        : type == "button"
          ? { onclick: () => {} }
          : type == "a"
            ? { href: "https://example.com" }
            : {}}
    />
  </div>
{/snippet}

<style>
  .demo {
    display: flex;
    flex-direction: column;
  }
  .box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
</InternalCard>
