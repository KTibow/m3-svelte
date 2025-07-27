<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import FAB from "$lib/buttons/FAB.svelte";
let color:
  | "primary-container"
  | "secondary-container"
  | "tertiary-container"
  | "primary"
  | "secondary"
  | "tertiary" = $state("primary-container");
let size: "small" | "normal" | "large" | "extended" = $state("normal");

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}FAB color="primary" icon={iconCircle} onclick={() => alert("!")} />`;
const relevantLinks = [{"title":"FAB.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/buttons/FAB.svelte"}];
</script>

<InternalCard title="FAB" showCode={() => showCode("FAB", minimalDemo, relevantLinks)}>
<label>
  <Arrows
    list={[
      "primary-container",
      "secondary-container",
      "tertiary-container",
      "primary",
      "secondary",
      "tertiary",
    ]}
    bind:value={color}
  />
  {color[0].toUpperCase() + color.slice(1).replace("-", " ")}
</label>
<label>
  <Arrows list={["small", "normal", "large", "extended"]} bind:value={size} initialIndex={1} />
  {size[0].toUpperCase() + size.slice(1)}
</label>
{#snippet demo()}
  <div>
    <FAB
      {color}
      onclick={() => {}}
      {...size == "extended" ? { size: "normal", text: "Hello" } : { size }}
      icon={iconCircle}
    />
  </div>
{/snippet}
</InternalCard>
