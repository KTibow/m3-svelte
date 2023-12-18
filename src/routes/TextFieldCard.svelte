<script lang="ts">
  import iconEdit from "@ktibow/iconset-ic/outline-edit";
  import Card from "./_card.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import TextField from "$lib/forms/TextField.svelte";
  import TextFieldMultiline from "$lib/forms/TextFieldMultiline.svelte";
  import Arrows from "./Arrows.svelte";
  import TextFieldOutlined from "$lib/forms/TextFieldOutlined.svelte";
  import TextFieldOutlinedMultiline from "$lib/forms/TextFieldOutlinedMultiline.svelte";

  let type = "filled";
  let leadingIcon = false;
  let errored = false;
  let enabled = true;
  $: component =
    type == "filled"
      ? TextField
      : type == "filled_multiline"
        ? TextFieldMultiline
        : type == "outlined"
          ? TextFieldOutlined
          : TextFieldOutlinedMultiline;
</script>

<Card>
  <h2 class="m3-font-headline-large">Text field</h2>
  <table>
    <tr>
      <td>
        <Arrows
          list={["filled", "filled_multiline", "outlined", "outlined_multiline"]}
          bind:value={type}
        />
      </td>
      <td>
        {type == "filled"
          ? "Filled"
          : type == "filled_multiline"
            ? "Filled multiline"
            : type == "outlined"
              ? "Outlined"
              : "Outlined multiline"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={leadingIcon} /></label>
      </td>
      <td>{leadingIcon ? "Leading icon" : "No leading icon"}</td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={errored} /></label>
      </td>
      <td>{errored ? "Errored" : "Not errored"}</td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div class="area" slot="demo">
    <svelte:component
      this={component}
      name="Field"
      leadingIcon={leadingIcon ? iconEdit : undefined}
      error={errored}
      disabled={!enabled}
      --m3-util-background="var(--m3-scheme-surface-container-low)"
    />
  </div>
</Card>

<style>
  .area {
    display: flex;
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
