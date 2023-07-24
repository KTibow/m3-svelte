<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import Switch from "$lib/forms/Switch.svelte";

  let enabled = true;
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">Switch</h2>
  <table>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div class="area">
    <label for={undefined}>
      <Switch disabled={!enabled} />
    </label>
  </div>
</Card>

<style>
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
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
