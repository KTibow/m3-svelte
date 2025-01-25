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
import SnackbarAnim from "$lib/containers/SnackbarAnim.svelte";
let animation = true;
let snackbar: (data: SnackbarIn) => void;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}script lang="ts">
  let snackbar: (data: SnackbarIn) => void;
${"<"}/script>

${"<"}Button type="tonal" on:click={() => snackbar({ message: "Hello", closable: true })}>Show${"<"}/Button>
${"<"}Snackbar bind:show={snackbar} />`;
</script>

<InternalCard title="Snackbar" on:showCode={() => dispatch("showCode", { name: "Snackbar" })}>
<label>
  <Switch bind:checked={animation} />
  {animation ? "#key animated" : "#if animated"}
</label>
<div slot="demo">
  <Button type="tonal" on:click={() => snackbar({ message: "Hello", closable: true })}>Show</Button>
  <svelte:component this={animation ? SnackbarAnim : Snackbar} bind:show={snackbar} />
</div>
</InternalCard>
