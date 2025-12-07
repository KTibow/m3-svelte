<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import Snackbar from "$lib/containers/Snackbar.svelte";
import { snackbar } from "$lib/containers/Snackbar.svelte";

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}script lang="ts">
  import { snackbar } from "m3-svelte";
${"<"}/script>

${"<"}Button variant="tonal" onclick={() => snackbar("Hello", undefined, true)}>Show${"<"}/Button>
${"<"}Snackbar />`;
const relevantLinks: { title: string; link: string }[] = [{"title":"Snackbar.svelte","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Snackbar.svelte"}];
</script>

<InternalCard title="Snackbar" showCode={() => showCode("Snackbar", minimalDemo, relevantLinks)}>
{#snippet demo()}
  <Button variant="tonal" onclick={() => snackbar("Hello", undefined, true)}>Show</Button>
{/snippet}
</InternalCard>
