<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import BottomSheet from "$lib/containers/BottomSheet.svelte";
let open = $state(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `{#if open}
  ${"<"}BottomSheet close={() => (open = false)}>Hello${"<"}/BottomSheet>
{/if}`;
const relevantLinks = [{"title":"BottomSheet.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/containers/BottomSheet.svelte"}];
</script>

<InternalCard title="Bottom sheet" showCode={() => showCode("Bottom sheet", minimalDemo, relevantLinks)}>
{#snippet demo()}
  <Button variant="tonal" onclick={() => (open = true)}>Open</Button>
  {#if open}
    <BottomSheet close={() => (open = false)}>
      {"Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at ZomboCom! The unattainable is unknown at ZomboCom! ".repeat(
        20,
      )}
    </BottomSheet>
  {/if}
{/snippet}
</InternalCard>
