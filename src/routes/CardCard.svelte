<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import CardClickable from "$lib/containers/CardClickable.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import CardCustom from "./_card.svelte";
  import Arrows from "./Arrows.svelte";

  let type: "elevated" | "filled" | "outlined" = "elevated";
  let clickable = false;
</script>

<CardCustom>
  <h2 class="m3-font-headline-large">Card</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["elevated", "filled", "outlined"]} bind:value={type} />
      </td>
      <td>{type[0].toUpperCase() + type.slice(1)}</td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={clickable} /></label>
      </td>
      <td>{clickable ? "Clickable" : "Not clickable"}</td>
    </tr>
  </table>
  <div slot="demo">
    {#if clickable}
      <CardClickable {type}>Hello</CardClickable>
    {:else}
      <Card {type}>Hello</Card>
    {/if}
  </div>
</CardCustom>

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
