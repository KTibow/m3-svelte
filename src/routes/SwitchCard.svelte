<script lang="ts">
  import Switch from "$lib/forms/Switch.svelte";
  import Card from "./_card.svelte";

  let enabled = true;
</script>

<Card title="Switch" code={`<Switch disabled={!enabled} />`}>
  <table>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div slot="demo">
    <label for={undefined}>
      <Switch disabled={!enabled} />
    </label>
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
