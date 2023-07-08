<script>
  import Card from "$lib/containers/Card.svelte";
  import CardClickable from "$lib/containers/CardClickable.svelte";
</script>

<table>
  <tr>
    <th />
    <th>Elevated</th>
    <th>Filled</th>
    <th>Outlined</th>
  </tr>
  <tr>
    <th>Div</th>
    <td><Card type="elevated">Text</Card></td>
    <td><Card type="filled">Text</Card></td>
    <td><Card type="outlined">Text</Card></td>
  </tr>
  <tr>
    <th>Button</th>
    <td><CardClickable type="elevated">Text</CardClickable></td>
    <td><CardClickable type="filled">Text</CardClickable></td>
    <td><CardClickable type="outlined">Text</CardClickable></td>
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
</style>
