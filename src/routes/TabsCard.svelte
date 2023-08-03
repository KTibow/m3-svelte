<script lang="ts">
  import iconSquare from "@iconify-icons/ic/outline-square";
  import iconCircle from "@iconify-icons/ic/outline-circle";
  import Card from "$lib/containers/Card.svelte";
  import Arrows from "./Arrows.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Tabs from "$lib/nav/Tabs.svelte";

  let type = "primary";
  let icons = false;

  $: items = icons
    ? [
        { icon: iconSquare, name: "Hello", value: "hello" },
        { icon: iconCircle, name: "World", value: "world" },
      ]
    : [
        { name: "Hello", value: "hello" },
        { name: "World", value: "world" },
      ];
  let tab = "hello";
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">Tabs</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["primary", "secondary"]} bind:value={type} />
      </td>
      <td>
        {type == "primary" ? "Primary" : "Secondary"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={icons} /></label>
      </td>
      <td>
        {icons ? "Icons" : "No icons"}
      </td>
    </tr>
  </table>
  <div class="area">
    <Tabs bind:tab secondary={type == "secondary"} {items} />
  </div>
</Card>

<style>
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
    display: flex;
    flex-direction: column;
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
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
</style>
