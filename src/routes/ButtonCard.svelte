<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import iconEdit from "@ktibow/iconset-material-symbols/edit-outline";
  import Button from "$lib/buttons/Button.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";

  let type: "elevated" | "filled" | "tonal" | "outlined" | "text" = "elevated";
  let iconType: "none" | "left" | "full" = "none";
  let enabled = true;
</script>

<Card>
  <h2 class="m3-font-headline-large">Button</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["elevated", "filled", "tonal", "outlined", "text"]} bind:value={type} />
      </td>
      <td>{type[0].toUpperCase() + type.slice(1)}</td>
    </tr>
    <tr>
      <td>
        <Arrows list={["none", "left", "full"]} bind:value={iconType} />
      </td>
      <td>{iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}</td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div slot="demo">
    <Button {type} disabled={!enabled} {iconType}>
      {#if iconType == "none"}
        Hello
      {:else if iconType == "left"}
        <Icon icon={iconEdit} /> Hello
      {:else}
        <Icon icon={iconEdit} />
      {/if}
    </Button>
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
  tr + tr {
    border-top: solid 0.5rem transparent;
  }
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
</style>
