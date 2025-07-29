<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import Dialog from "$lib/containers/Dialog.svelte";
let open = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}Dialog headline="Hello" bind:open>
  I'm alive
  {#snippet buttons()}
    ${"<"}Button variant="tonal" onclick={() => (open = false)}>OK${"<"}/Button>
  {/snippet}
${"<"}/Dialog>`;
const relevantLinks = [{"title":"Dialog.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/Dialog.svelte"}];
</script>

<InternalCard title="Dialog" showCode={() => showCode("Dialog", minimalDemo, relevantLinks)}>
{#snippet demo()}
  <Button variant="tonal" onclick={() => (open = true)}>Open</Button>
  <Dialog icon={iconCircle} headline="Hello" bind:open>
    Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at
    ZomboCom! The unattainable is unknown at ZomboCom!
    {#snippet buttons()}
      <Button variant="tonal" onclick={() => (open = false)}>OK</Button>
    {/snippet}
  </Dialog>
{/snippet}
</InternalCard>
