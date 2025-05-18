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
import Snackbar, { type SnackbarIn } from "$lib/containers/Snackbar.svelte";
let snackbar: ReturnType<typeof Snackbar>;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}script lang="ts">
  let snackbar: ReturnType${"<"}typeof Snackbar>;
${"<"}/script>

${"<"}Button variant="tonal" click={() => snackbar.show({ message: "Hello", closable: true })}>Show${"<"}/Button>
${"<"}Snackbar bind:this={snackbar} />`;
const relevantLinks = [{"title":"Snackbar.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Snackbar.svelte"}];
</script>

<InternalCard title="Snackbar" on:showCode={() => dispatch("showCode", { name: "Snackbar", minimalDemo, relevantLinks })}>
<div slot="demo">
  <Button variant="tonal" click={() => snackbar.show({ message: "Hello", closable: true })}>Show</Button>
  <Snackbar bind:this={snackbar} />
</div>
</InternalCard>
