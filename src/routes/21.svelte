<script lang="ts">
  import StarsOutlineIcon from "@ktibow/iconset-material-symbols/stars-outline";
  import EditIcon from "@ktibow/iconset-material-symbols/edit";
  import StarIcon from "@ktibow/iconset-material-symbols/stars";
  import NavigationRailItem from "$lib/nav/NavigationRailItem.svelte";
  import NavigationRail from "$lib/nav/NavigationRail.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import InternalCard from "./_card.svelte";
    import Arrows from "./_arrows.svelte";

  let collapse = $state<'full' | 'normal' | 'none'>('normal');
  let modal = $state<boolean>(false);
  let { showCode } = $props<{
    showCode: (
      name: string,
      minimalDemo: string,
      relevantLinks: {
        title: string;
        link: string;
      }[],
    ) => void;
  }>();
  
  $effect(() => {
    modal = collapse === 'full' ? true : modal;
  });

  const minimalDemo = `${"<"}NavigationRail>
  {#snippet fab(open)}
    ${"<"}FAB color="primary-container" icon={iconCircle} text={open ? 'Label' : ''} onclick={() => alert("!")} />
  {/snippet}
    
  ${"<"}NavigationRailItem label="Label" icon={iconStar} active />

  ${"<"}NavigationRailItem label="Label" icon={iconStarOutline} />

  ${"<"}NavigationRailItem label="Label" icon={iconStarOutline} badge={{
      label: '3'
  }} />

  ${"<"}NavigationRailItem label="Label" icon={iconStarOutline} badge={{
    small: true
  }} />
${"<"}/NavigationRail>`;
  const relevantLinks = [
    {
      title: "NavigationRail.sv",
      link: "https://github.com/KTibow/m3-svelte/blob/main/src/lib/nav/NavigationRail.svelte",
    },
  ];
</script>

<InternalCard
  title="Navigation Rail"
  showCode={() => showCode("Navigation Rail", minimalDemo, relevantLinks)}
>
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
    <div class="container">
      <NavigationRail {collapse} {modal}>
        {#snippet fab(open)}
          <FAB color="primary-container" icon={EditIcon} text={open ? "Label" : ""} onclick={() => {}} />
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
    </div>
  {/snippet}
</InternalCard>

<style>
  .container {
    position: relative;
    height: 500px;
    width: 100%;

    :global(> .m3-container > .rail) {
      position: relative;
    }
  }
</style>
