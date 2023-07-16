<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import Checkbox from "$lib/forms/Checkbox.svelte";
  import CheckboxAnim from "$lib/forms/CheckboxAnim.svelte";
  import Switch from "$lib/forms/Switch.svelte";

  let animation = true;
  let enabled = true;
  $: component = animation ? CheckboxAnim : Checkbox;
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">Checkbox</h2>
  <table>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={animation} /></label>
      </td>
      <td>{animation ? "Animated" : "Not animated"}</td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div class="area">
    <label>
      <svelte:component this={component}>
        <input type="checkbox" checked disabled={!enabled} />
      </svelte:component>
    </label>
  </div>
</Card>

<style>
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
    display: flex;
    gap: 0.5rem;
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
  tr + tr {
    border-top: solid 0.5rem transparent;
  }
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
</style>
