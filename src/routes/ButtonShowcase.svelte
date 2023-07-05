<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import Button from "$lib/buttons/Button.svelte";
  const types: ("elevated" | "filled" | "tonal" | "outlined" | "text")[] = [
    "elevated",
    "filled",
    "tonal",
    "outlined",
    "text",
  ];
</script>

<table>
  <tr>
    <th />
    <th>Elevated</th>
    <th>Filled</th>
    <th>Tonal</th>
    <th>Outlined</th>
    <th>Text</th>
  </tr>
  <tr>
    <th>Enabled</th>
    {#each types as type}
      <td><Button {type} on:click={() => alert("Pressed")}>Enabled</Button></td>
    {/each}
  </tr>
  <tr>
    <th>Disabled</th>
    {#each types as type}
      <td><Button {type} disabled>Disabled</Button></td>
    {/each}
  </tr>
  <tr>
    <th>Icon</th>
    {#each types as type}
      <td>
        <div class="flex">
          <Button {type} on:click={() => alert("Pressed")} iconType="left">
            <Icon icon={iconEdit} />
            Enabled
          </Button>
          <Button {type} on:click={() => alert("Pressed")} iconType="full">
            <Icon icon={iconEdit} />
          </Button>
        </div>
      </td>
    {/each}
  </tr>
</table>

<style>
  table {
    border-collapse: collapse;
  }
  td,
  th {
    padding: 1rem;
    border: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  .flex {
    display: flex;
    gap: 0.5rem;
  }
</style>
