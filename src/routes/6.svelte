<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import BottomSheet from "$lib/containers/BottomSheet.svelte";
let open = false;

const dispatch = createEventDispatcher();
const minimalDemo = `{#if open}
  ${"<"}BottomSheet close={() => (open = false)}>Hello${"<"}/BottomSheet>
{/if}`;
const relevantLinks = [{"title":"BottomSheet.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/BottomSheet.svelte"}];
</script>

<InternalCard title="Bottom sheet" on:showCode={() => dispatch("showCode", { name: "Bottom sheet", minimalDemo, relevantLinks })}>
<div slot="demo">
  <Button variant="tonal" click={() => (open = true)}>Open</Button>
  {#if open}
    <BottomSheet close={() => (open = false)}>
      {"Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at ZomboCom! The unattainable is unknown at ZomboCom! ".repeat(20)}
    </BottomSheet>
  {/if}
</div>
</InternalCard>
