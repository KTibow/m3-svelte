<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Chip from "$lib/forms/Chip.svelte";
let style: "input" | "assist" | "assist elevated" | "general" | "general elevated" =
  $state("input");
let iconType: "none" | "left" | "right" = $state("none");
let enabled = $state(true);
let selected = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Chip variant="general" icon={iconCircle} onclick={() => alert("!")}>Hello${"<"}/Chip>`;
const relevantLinks = [{"title":"Chip.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Chip.svelte"}];
</script>

<InternalCard title="Chip" showCode={() => showCode("Chip", minimalDemo, relevantLinks)}>
<label>
  <Arrows
    list={["input", "assist", "assist elevated", "general", "general elevated"]}
    bind:value={style}
  />
  {style[0].toUpperCase() + style.slice(1)}
</label>
<label>
  <Arrows list={["none", "left", "right"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Right icon"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  <div>
    <Chip
      variant={style.startsWith("assist")
        ? "assist"
        : style.startsWith("general")
          ? "general"
          : "input"}
      elevated={style.endsWith("elevated")}
      icon={iconType == "left" ? iconCircle : undefined}
      trailingIcon={iconType == "right" ? iconSquare : undefined}
      disabled={!enabled}
      {selected}
      onclick={() => (selected = !selected)}
    >
      Hello
    </Chip>
  </div>
{/snippet}
</InternalCard>
