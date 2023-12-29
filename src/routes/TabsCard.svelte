<script lang="ts">
  import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
  import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
  import iconBald from "@ktibow/iconset-material-symbols/face-5";
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Tabs from "$lib/nav/Tabs.svelte";
  import VariableTabs from "$lib/nav/VariableTabs.svelte";

  let type = "primary";
  let icons = false;
  let variable = false;

  $: items = icons
    ? [
        { icon: iconSquare, name: "Hello", value: "hello" },
        { icon: iconCircle, name: "World", value: "world" },
        { icon: iconBald, name: "The longest item", value: "long" },
      ]
    : [
        { name: "Hello", value: "hello" },
        { name: "World", value: "world" },
        { name: "The longest item", value: "long" },
      ];
  let tab = "hello";
</script>

<span class="anchor" />
<Card>
  <h2 class="m3-font-headline-large">Tabs</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["primary", "secondary"]} bind:value={type} />
      </td>
      <td>
        {type == "primary" ? "Primary" : "Secondary"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={icons} /></label>
      </td>
      <td>
        {icons ? "Icons" : "No icons"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={variable} /></label>
      </td>
      <td>
        {variable ? "Variable" : "Fixed"}
      </td>
    </tr>
  </table>
  <svelte:fragment slot="demo">
    {#if variable}
      <VariableTabs bind:tab secondary={type == "secondary"} {items} />
    {:else}
      <Tabs bind:tab secondary={type == "secondary"} {items} />
    {/if}
  </svelte:fragment>
</Card>

<style>
  .anchor {
    display: none;
  }
  .anchor + :global(div) {
    overflow: hidden;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  label {
    display: flex;
  }
  table {
    margin-bottom: 1rem;
  }
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
</style>
