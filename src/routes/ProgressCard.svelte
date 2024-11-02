<script lang="ts">
  import CircularProgress from "$lib/forms/CircularProgress.svelte";
  import CircularProgressIndeterminate from "$lib/forms/CircularProgressIndeterminate.svelte";
  import LinearProgress from "$lib/forms/LinearProgress.svelte";
  import LinearProgressIndeterminate from "$lib/forms/LinearProgressIndeterminate.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";

  let type = "linear";
  let indeterminate = false;
</script>

<Card
  title="Progress"
  code={`<LinearProgressIndeterminate />
<LinearProgress percent={60} />
<CircularProgressIndeterminate />
<CircularProgress percent={60} />`}
>
  <table>
    <tbody>
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
    </tbody>
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
