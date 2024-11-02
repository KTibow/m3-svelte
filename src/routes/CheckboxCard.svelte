<script lang="ts">
  import Checkbox from "$lib/forms/Checkbox.svelte";
  import CheckboxAnim from "$lib/forms/CheckboxAnim.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Card from "./_card.svelte";

  let animation = true;
  let enabled = true;
  $: component = animation ? CheckboxAnim : Checkbox;
</script>

<Card
  title="Checkbox"
  code={`<CheckboxAnim>
  <input type="checkbox" checked disabled={!enabled} />
</CheckboxAnim>
<Checkbox>
  <input type="checkbox" checked disabled={!enabled} />
</Checkbox>`}
>
  <table>
    <tbody>
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
    </tbody>
  </table>
  <div slot="demo">
    <label>
      <svelte:component this={component}>
        <input type="checkbox" checked disabled={!enabled} />
      </svelte:component>
    </label>
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
