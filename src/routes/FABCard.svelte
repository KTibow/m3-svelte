<script lang="ts">
  import FAB from "$lib/buttons/FAB.svelte";
  import iconEdit from "@ktibow/iconset-material-symbols/edit-outline";
  import Arrows from "./Arrows.svelte";
  import Card from "./_card.svelte";

  let color: "primary" | "surface" | "secondary" | "tertiary" = "primary";
  let size: "small" | "normal" | "large" | "extended" = "normal";
</script>

<Card
  title="FAB"
  code={`<FAB
  {color}
  {size}
  {icon}
  text="Hello"
/>`}
>
  <table>
    <tr>
      <td>
        <Arrows list={["primary", "surface", "secondary", "tertiary"]} bind:value={color} />
      </td>
      <td>{color[0].toUpperCase() + color.slice(1)}</td>
    </tr>
    <tr>
      <td>
        <Arrows list={["small", "normal", "large", "extended"]} bind:value={size} index={1} />
      </td>
      <td>{size[0].toUpperCase() + size.slice(1)}</td>
    </tr>
  </table>
  <div slot="demo">
    <FAB
      {color}
      size={size == "extended" ? "normal" : size}
      icon={iconEdit}
      text={size == "extended" ? "Hello" : undefined}
    />
  </div>
</Card>

<style>
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
