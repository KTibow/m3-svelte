<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Slider from "$lib/forms/Slider.svelte";
let size = $state(24);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}script>
  import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
${"<"}/script>

${"<"}Icon icon={iconCircle} />`;
const relevantLinks: { title: string; link: string }[] = [{"title":"Icon.svelte","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/misc/Icon.svelte"},{"title":"Slider.svelte","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/Slider.svelte"}];
</script>

<InternalCard title="Icons" showCode={() => showCode("Icons", minimalDemo, relevantLinks)}>
<Slider bind:value={size} min={16} max={96} format={(n) => n.toFixed(0) + "px"} />

{#snippet demo()}
  <div style:display="flex" style:gap="1rem" style:align-items="center" style:justify-content="center">
    <Icon icon={iconCircle} {size} />
    <Icon icon={iconSquare} {size} />
    <Icon icon={iconTriangle} {size} />
  </div>
{/snippet}
</InternalCard>
