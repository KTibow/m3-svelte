<script lang="ts">
  import iconEdit from "@ktibow/iconset-material-symbols/edit-outline";
  import Switch from "$lib/forms/Switch.svelte";
  import TextField from "$lib/forms/TextField.svelte";
  import TextFieldMultiline from "$lib/forms/TextFieldMultiline.svelte";
  import TextFieldOutlined from "$lib/forms/TextFieldOutlined.svelte";
  import TextFieldOutlinedMultiline from "$lib/forms/TextFieldOutlinedMultiline.svelte";
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";
  import type {HTMLInputAttributes, HTMLTextareaAttributes} from "svelte/elements";

  let extraOptions: HTMLInputAttributes = {};
  let type = "filled";
  let leadingIcon = false;
  let errored = false;
  let enabled = true;
  let option = "text";
  $: extraOptions.type = option;
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
        <Arrows
          list={["text", "password", "number", "file"]}
          bind:value={option}
        />
      </td>
      <td>
        {option == "text"
          ? "Text"
          : option == "password"
            ? "Password"
            : option == "number"
              ? "Number"
              : "File"}
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
    {#if type === "filled"}
      <TextField
        name="Field"
        leadingIcon={leadingIcon ? iconEdit : undefined}
        error={errored}
        disabled={!enabled}
        extraOptions={extraOptions}
        --m3-util-background="var(--m3-scheme-surface-container-low)"
      />
    {:else if type === "outlined"}
      <TextFieldOutlined
        name="Field"
        leadingIcon={leadingIcon ? iconEdit : undefined}
        error={errored}
        disabled={!enabled}
        extraOptions={extraOptions}
        --m3-util-background="var(--m3-scheme-surface-container-low)"
      />
    {:else if type === "filled_multiline"}
      <TextFieldMultiline
        name="Field"
        leadingIcon={leadingIcon ? iconEdit : undefined}
        error={errored}
        disabled={!enabled}
        --m3-util-background="var(--m3-scheme-surface-container-low)"
      />
    {:else if type === "outlined_multiline"}
      <TextFieldOutlinedMultiline
        name="Field"
        leadingIcon={leadingIcon ? iconEdit : undefined}
        error={errored}
        disabled={!enabled}
        --m3-util-background="var(--m3-scheme-surface-container-low)"
      />
    {/if}
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
