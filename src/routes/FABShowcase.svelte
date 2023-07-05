<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import FAB from "$lib/buttons/FAB.svelte";
  const colors: ("primary" | "surface" | "secondary" | "tertiary")[] = [
    "primary",
    "surface",
    "secondary",
    "tertiary",
  ];
</script>

<table>
  <tr>
    <th />
    <th>Primary</th>
    <th>Surface</th>
    <th>Secondary</th>
    <th>Tertiary</th>
  </tr>
  <tr>
    <th>Small</th>
    {#each colors as color}
      <td><FAB {color} size="small" icon={iconEdit} /></td>
    {/each}
  </tr>
  <tr>
    <th>Normal</th>
    {#each colors as color}
      <td><FAB {color} size="normal" icon={iconEdit} /></td>
    {/each}
  </tr>
  <tr>
    <th>Large</th>
    {#each colors as color}
      <td><FAB {color} size="large" icon={iconEdit} /></td>
    {/each}
  </tr>
  <tr>
    <th>Extended</th>
    {#each colors as color}
      <td><FAB {color} size="normal" icon={iconEdit} text="Extended" /></td>
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
