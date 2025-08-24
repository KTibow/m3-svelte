<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import DateField from "$lib/forms/DateField.svelte";
import DateFieldOutlined from "$lib/forms/DateFieldOutlined.svelte";
let collapse = $state<'full' | 'normal' | 'none'>('normal');
let modal = $state<boolean>(false);

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}NavigationRail>
  {#snippet fab(open)}
    ${"<"}FAB
      color="primary-container"
      icon={iconCircle}
      text={open ? "Label" : ""}
      onclick={() => alert("!")}
    />
  {/snippet}

  ${"<"}NavigationRailItem label="Label" icon={iconStar} active />

  ${"<"}NavigationRailItem label="Label" icon={iconStarOutline} />

  ${"<"}NavigationRailItem
    label="Label"
    icon={iconStarOutline}
    badge={{
      label: "3",
    }}
  />

  ${"<"}NavigationRailItem
    label="Label"
    icon={iconStarOutline}
    badge={{
      small: true,
    }}
  />
${"<"}/NavigationRail>`;
const relevantLinks = [{"title":"DateField.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/DateField.svelte"},{"title":"DateFieldOutlined.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/DateFieldOutlined.svelte"}];
</script>

<InternalCard title="Navigation Rail" showCode={() => showCode("Navigation Rail", minimalDemo, relevantLinks)}>
<label>
  <Switch bind:checked={modal} />
  {modal ? "Modal" : "Normal"}
</label>
<label>
  <Arrows list={['normal', 'full', 'none']} bind:value={collapse} />
  {collapse == "normal"
  ? "Collapse"
  : collapse == "full"
    ? "Fully Collapse"
    : "Don't Collapse"}
</label>

{#snippet demo()}
  <NavigationRail {collapse} {modal}>
    {#snippet fab(open)}
      <FAB
        color="primary-container"
        icon={EditIcon}
        text={open ? "Label" : ""}
        onclick={() => {}}
      />
    {/snippet}

    <NavigationRailItem label="Label" icon={StarIcon} active />

    <NavigationRailItem label="Label" icon={StarsOutlineIcon} />

    <NavigationRailItem
      label="Label"
      icon={StarsOutlineIcon}
      badge={{
        label: "3",
      }}
    />

    <NavigationRailItem
      label="Label"
      icon={StarsOutlineIcon}
      badge={{
        small: true,
      }}
    />
  </NavigationRail>
{/snippet}
</InternalCard>
