<script lang="ts">
  import Chip from "$lib/forms/Chip.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import iconEdit from "@ktibow/iconset-material-symbols/edit-outline";
  import iconDropdown from "@ktibow/iconset-material-symbols/expand-more";
  import Card from "./_card.svelte";
  import Arrows from "./Arrows.svelte";

  let style: "input" | "assist" | "assist-elevated" | "general" | "general-elevated" = "input";
  let iconType: "none" | "left" | "right" = "none";
  let enabled = true;
  let selected = false;
</script>

<Card
  title="Chip"
  code={`<Chip
  {type}
  {elevated}
  {selected}
  disabled={!enabled}
  {icon}
  {trailingIcon}
  on:click={() => (selected = !selected)}
>
  Hello
</Chip>`}
>
  <table>
    <tr>
      <td>
        <Arrows
          list={["input", "assist", "assist-elevated", "general", "general-elevated"]}
          bind:value={style}
        />
      </td>
      <td>
        {style == "input"
          ? "Input"
          : style == "assist"
            ? "Assist"
            : style == "assist-elevated"
              ? "Assist elevated"
              : style == "general"
                ? "General"
                : "General elevated"}
      </td>
    </tr>
    <tr>
      <td>
        <Arrows list={["none", "left", "right"]} bind:value={iconType} />
      </td>
      <td>
        {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Trailing icon"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div slot="demo">
    <Chip
      type={style == "assist-elevated" ? "assist" : style == "general-elevated" ? "general" : style}
      elevated={style == "assist-elevated" || style == "general-elevated"}
      {selected}
      disabled={!enabled}
      icon={iconType == "left" ? iconEdit : undefined}
      trailingIcon={iconType == "right" ? iconDropdown : undefined}
      on:click={() => (selected = !selected)}
    >
      Hello
    </Chip>
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
