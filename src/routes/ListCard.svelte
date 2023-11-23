<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconUser from "@iconify-icons/ic/outline-person";
  import Card from "$lib/containers/Card.svelte";
  import Divider from "$lib/utils/Divider.svelte";
  import Checkbox from "$lib/forms/Checkbox.svelte";
  import ListItem from "$lib/containers/ListItem.svelte";
  import ListItemButton from "$lib/containers/ListItemButton.svelte";
  import ListItemLabel from "$lib/containers/ListItemLabel.svelte";
  import Arrows from "./Arrows.svelte";

  let lines: "1" | "2" | "3" = "1";
  let type: "div" | "button" | "label" = "div";
  $: supporting =
    lines == "1"
      ? undefined
      : lines == "2"
        ? "This is supporting text"
        : "This is an example of supporting text for a list item component showcase.";
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">List</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["1", "2", "3"]} bind:value={lines} />
      </td>
      <td>{lines} {lines == "1" ? "line" : "lines"}</td>
    </tr>
    <tr>
      <td>
        <Arrows list={["div", "button", "label"]} bind:value={type} />
      </td>
      <td>{"<" + type + ">"}</td>
    </tr>
  </table>
  <div class="area">
    <div class="list">
      {#if type == "div"}
        <ListItem headline="This is a headline" {supporting} lines={+lines}>
          <svelte:fragment slot="leading">
            <Icon icon={iconUser} />
          </svelte:fragment>
        </ListItem>
        <Divider />
        <ListItem headline="This is a headline" {supporting} lines={+lines}>
          <svelte:fragment slot="leading">
            <Icon icon={iconUser} />
          </svelte:fragment>
        </ListItem>
      {:else if type == "button"}
        <ListItemButton headline="This is a headline" {supporting} lines={+lines}>
          <svelte:fragment slot="leading">
            <Icon icon={iconUser} />
          </svelte:fragment>
        </ListItemButton>
        <Divider />
        <ListItemButton headline="This is a headline" {supporting} lines={+lines}>
          <svelte:fragment slot="leading">
            <Icon icon={iconUser} />
          </svelte:fragment>
        </ListItemButton>
      {:else}
        <ListItemLabel headline="This is a headline" {supporting} lines={+lines}>
          <svelte:fragment slot="leading">
            <div class="box-wrapper">
              <Checkbox><input type="checkbox" /></Checkbox>
            </div>
          </svelte:fragment>
        </ListItemLabel>
        <Divider />
        <ListItemLabel headline="This is a headline" {supporting} lines={+lines}>
          <svelte:fragment slot="leading">
            <div class="box-wrapper">
              <Checkbox><input type="checkbox" /></Checkbox>
            </div>
          </svelte:fragment>
        </ListItemLabel>
      {/if}
    </div>
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
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
  .list {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface-container-high));
  }
  .box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
