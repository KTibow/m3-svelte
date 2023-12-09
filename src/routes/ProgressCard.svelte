<script lang="ts">
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import LinearProgress from "$lib/forms/LinearProgress.svelte";
  import LinearProgressIndeterminate from "$lib/forms/LinearProgressIndeterminate.svelte";
  import CircularProgress from "$lib/forms/CircularProgress.svelte";
  import CircularProgressIndeterminate from "$lib/forms/CircularProgressIndeterminate.svelte";

  let type = "linear";
  let indeterminate = false;
</script>

<Card>
  <h2 class="m3-font-headline-large">Progress</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["linear", "circular"]} bind:value={type} />
      </td>
      <td>{type == "linear" ? "Linear" : "Circular"}</td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={indeterminate} /></label>
      </td>
      <td>{indeterminate ? "Indeterminate" : "Fixed progress"}</td>
    </tr>
  </table>
  <div slot="demo">
    {#if type == "linear" && indeterminate}
      <LinearProgressIndeterminate />
    {:else if type == "linear"}
      <LinearProgress percent={60} />
    {:else if type == "circular" && indeterminate}
      <CircularProgressIndeterminate />
    {:else if type == "circular"}
      <CircularProgress percent={60} />
    {/if}
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
