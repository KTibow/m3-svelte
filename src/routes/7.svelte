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
import Dialog from "$lib/containers/Dialog.svelte";
let open = false;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}Dialog headline="Hello" bind:open>
  I'm alive
  ${"<"}svelte:fragment slot="buttons">
    ${"<"}Button type="tonal" on:click={() => (open = false)}>OK${"<"}/Button>
  ${"<"}/svelte:fragment>
${"<"}/Dialog>`;
const relevantLinks = [{"title":"Dialog.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Dialog.svelte"}];
</script>

<InternalCard title="Dialog" on:showCode={() => dispatch("showCode", { name: "Dialog", minimalDemo, relevantLinks })}>
<div slot="demo">
  <Button type="tonal" on:click={() => (open = true)}>Open</Button>
  <Dialog icon={iconCircle} headline="Hello" bind:open>
    Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at
    ZomboCom! The unattainable is unknown at ZomboCom!
    <svelte:fragment slot="buttons">
      <Button type="tonal" on:click={() => (open = false)}>OK</Button>
    </svelte:fragment>
  </Dialog>
</div>
</InternalCard>
