<script lang="ts">
  import iconSquare from "@iconify-icons/ic/outline-square";
  import iconCircle from "@iconify-icons/ic/outline-circle";
  import Card from "$lib/containers/Card.svelte";
  import TabsPrimary from "$lib/nav/TabsPrimary.svelte";
  import TabsSecondary from "$lib/nav/TabsSecondary.svelte";
  import Arrows from "./Arrows.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import TabsPrimaryAnim from "$lib/nav/TabsPrimaryAnim.svelte";
  import TabsSecondaryAnim from "$lib/nav/TabsSecondaryAnim.svelte";

  let type = "primary";
  let icons = false;
  let animation = false;

  $: items = icons
    ? [
        { icon: iconSquare, name: "Hello", value: "hello" },
        { icon: iconCircle, name: "World", value: "world" },
      ]
    : [
        { name: "Hello", value: "hello" },
        { name: "World", value: "world" },
      ];
  $: component = animation
    ? type == "primary"
      ? TabsPrimaryAnim
      : TabsSecondaryAnim
    : type == "primary"
    ? TabsPrimary
    : TabsSecondary;
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
        <label for={undefined} style="display: flex"><Switch bind:checked={icons} /></label>
      </td>
      <td>
        {icons ? "Icons" : "No icons"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined} style="display: flex"><Switch bind:checked={animation} /></label>
      </td>
      <td>
        {animation ? "Animated" : "Not animated"}
      </td>
    </tr>
  </table>
  <div class="area">
    <svelte:component this={component} bind:tab {items} />
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
  table {
    margin-bottom: 1rem;
  }
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
</style>
