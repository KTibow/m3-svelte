<script lang="ts">
  import iconUndo from "@ktibow/iconset-material-symbols/undo";
  import iconRedo from "@ktibow/iconset-material-symbols/redo";
  import iconCut from "@ktibow/iconset-material-symbols/content-cut";
  import Card from "./_card.svelte";
  import Menu from "$lib/containers/Menu.svelte";
  import MenuItem from "$lib/containers/MenuItem.svelte";
  import Switch from "$lib/forms/Switch.svelte";

  let icons = false;
</script>

<Card>
  <h2 class="m3-font-headline-large">Menu</h2>
  <table>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={icons} /></label>
      </td>
      <td>{icons ? "Icons" : "No icons"}</td>
    </tr>
  </table>
  <div slot="demo">
    <Menu>
      <MenuItem icon={icons ? iconUndo : undefined}>Undo</MenuItem>
      <MenuItem icon={icons ? iconRedo : undefined} disabled>Redo</MenuItem>
      <MenuItem icon={icons ? iconCut : undefined} disabled>Cut</MenuItem>
    </Menu>
  </div>
</Card>

<style>
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
