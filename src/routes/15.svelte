<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import TextField from "$lib/forms/TextField.svelte";
import TextFieldOutlined from "$lib/forms/TextFieldOutlined.svelte";
import TextFieldMultiline from "$lib/forms/TextFieldMultiline.svelte";
import TextFieldOutlinedMultiline from "$lib/forms/TextFieldOutlinedMultiline.svelte";
import type { HTMLInputAttributes } from "svelte/elements";
let type: "filled" | "filled_multiline" | "outlined" | "outlined_multiline" = "filled";
let option: "text" | "password" | "number" | "file" = "text";
let leadingIcon = false;
let errored = false;
let enabled = true;
$: extraOptions = { type: option } as HTMLInputAttributes;

const dispatch = createEventDispatcher();
const minimalDemo = `${"<"}TextField name="Field" bind:value={text} />`;
const relevantLinks = [{"title":"TextField.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/TextField.svelte"},{"title":"TextFieldOutlined.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/TextFieldOutlined.svelte"},{"title":"TextFieldMultiline.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/TextFieldMultiline.svelte"},{"title":"TextFieldOutlinedMultiline.sv","link":"https://github.com/KTibow/m3-svelte/blob/main/src/lib/forms/TextFieldOutlinedMultiline.svelte"}];
</script>

<InternalCard title="Text field" on:showCode={() => dispatch("showCode", { name: "Text field", minimalDemo, relevantLinks })}>
<label>
  <Arrows
    list={["filled", "filled_multiline", "outlined", "outlined_multiline"]}
    bind:value={type}
  />
  {type == "filled"
    ? "Filled"
    : type == "filled_multiline"
      ? "Filled multiline"
      : type == "outlined"
        ? "Outlined"
        : "Outlined multiline"}
</label>
<label>
  <Arrows list={["text", "password", "number", "file"]} bind:value={option} />
  {option == "text"
    ? "Text"
    : option == "password"
      ? "Password"
      : option == "number"
        ? "Number"
        : "File"}
</label>
<label>
  <Switch bind:checked={leadingIcon} />
  {leadingIcon ? "Leading icon" : "No leading icon"}
</label>
<label>
  <Switch bind:checked={errored} />
  {errored ? "Errored" : "Not errored"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

<div slot="demo">
  {#if type === "filled"}
    <TextField
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
      {extraOptions}
    />
  {:else if type === "outlined"}
    <TextFieldOutlined
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
      {extraOptions}
    />
  {:else if type === "filled_multiline"}
    <TextFieldMultiline
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
    />
  {:else if type === "outlined_multiline"}
    <TextFieldOutlinedMultiline
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
    />
  {/if}
</div>
</InternalCard>
