<script lang="ts">
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import Card from "$lib/containers/Card.svelte";
  import Arrows from "./Arrows.svelte";
  import FAB from "$lib/buttons/FAB.svelte";

  let color: "primary" | "surface" | "secondary" | "tertiary" = "primary";
  let size: "small" | "normal" | "large" | "extended" = "normal";
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">FAB</h2>
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
  <div class="area">
    <FAB
      {color}
      size={size == "extended" ? "normal" : size}
      icon={iconEdit}
      text={size == "extended" ? "Hello" : undefined}
    />
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
