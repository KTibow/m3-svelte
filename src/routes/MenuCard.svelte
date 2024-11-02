<script lang="ts">
  import Menu from "$lib/containers/Menu.svelte";
  import MenuItem from "$lib/containers/MenuItem.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import iconCut from "@ktibow/iconset-material-symbols/content-cut";
  import iconRedo from "@ktibow/iconset-material-symbols/redo";
  import iconUndo from "@ktibow/iconset-material-symbols/undo";
  import Card from "./_card.svelte";

  let icons = false;
</script>

<Card
  title="Menu"
  code={`<Menu>
  <MenuItem icon={iconUndo}>Undo</MenuItem>
  <MenuItem icon={iconRedo} disabled>Redo</MenuItem>
  <MenuItem icon={iconCut} disabled>Cut</MenuItem>
</Menu>`}
>
  <table>
    <tbody>
      <tr>
        <td>
          <label for={undefined}><Switch bind:checked={icons} /></label>
        </td>
        <td>{icons ? "Icons" : "No icons"}</td>
      </tr>
    </tbody>
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
