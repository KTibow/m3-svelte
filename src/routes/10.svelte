<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Chip from "$lib/forms/Chip.svelte";
let style: "input" | "assist" | "assist elevated" | "general" | "general elevated" = "input";
let iconType: "none" | "left" | "right" = "none";
let enabled = true;
let selected = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Chip type="general" icon={iconCircle} on:click={() => alert("!")}>Hello${"<"}/Chip>`;
const relevantLinks = [{"title":"Chip.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Chip.svelte"}];
</script>

<InternalCard title="Chip" on:showCode={() => dispatch("showCode", { name: "Chip", minimalDemo, relevantLinks })}>
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

<div slot="demo">
  <Chip
    type={style.startsWith("assist") ? "assist" : style.startsWith("general") ? "general" : "input"}
    elevated={style.endsWith("elevated")}
    icon={iconType == "left" ? iconCircle : undefined}
    trailingIcon={iconType == "right" ? iconSquare : undefined}
    disabled={!enabled}
    {selected}
    on:click={() => (selected = !selected)}
  >
    Hello
  </Chip>
</div>
</InternalCard>
