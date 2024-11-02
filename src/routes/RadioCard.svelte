<script lang="ts">
  import RadioAnim1 from "$lib/forms/RadioAnim1.svelte";
  import RadioAnim2 from "$lib/forms/RadioAnim2.svelte";
  import RadioAnim3 from "$lib/forms/RadioAnim3.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";

  let animation = "1";
  let enabled = true;
  $: component = animation == "1" ? RadioAnim1 : animation == "2" ? RadioAnim2 : RadioAnim3;
</script>

<Card
  title="Radio"
  code={`<RadioAnim1><input type="radio" name="radio" disabled={!enabled} /></RadioAnim1>
<RadioAnim2><input type="radio" name="radio" disabled={!enabled} /></RadioAnim2>
<RadioAnim3><input type="radio" name="radio" disabled={!enabled} /></RadioAnim3>`}
>
  <table>
    <tbody>
      <tr>
        <td>
          <Arrows list={["1", "2", "3"]} bind:value={animation} />
        </td>
        <td>Animation {animation}</td>
      </tr>
      <tr>
        <td>
          <label for={undefined}><Switch bind:checked={enabled} /></label>
        </td>
        <td>{enabled ? "Enabled" : "Disabled"}</td>
      </tr>
    </tbody>
  </table>
  <div class="area" slot="demo">
    <label>
      <svelte:component this={component}>
        <input type="radio" name="radio" checked disabled={!enabled} />
      </svelte:component>
    </label>
    <label>
      <svelte:component this={component}>
        <input type="radio" name="radio" disabled={!enabled} />
      </svelte:component>
    </label>
    <label>
      <svelte:component this={component}>
        <input type="radio" name="radio" disabled={!enabled} />
      </svelte:component>
    </label>
  </div>
</Card>

<style>
  .area {
    display: flex;
    gap: 0.5rem;
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
