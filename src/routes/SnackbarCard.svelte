<script lang="ts">
  import Switch from "$lib/forms/Switch.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Snackbar, { type SnackbarIn } from "$lib/containers/Snackbar.svelte";
  import SnackbarAnim from "$lib/containers/SnackbarAnim.svelte";
  import Card from "./_card.svelte";

  let snackbar: (data: SnackbarIn) => void;
  let animation = false;
</script>

<Card>
  <h2 class="m3-font-headline-large">Snackbar</h2>
  <table>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={animation} /></label>
      </td>
      <td>
        {animation ? "#key animated" : "#if animated"}
      </td>
    </tr>
  </table>
  <div slot="demo">
    <Button
      type="tonal"
      on:click={() => snackbar({ message: "Hello", actions: { Undo: () => {} }, closable: true })}
    >
      Show
    </Button>
    <svelte:component this={animation ? SnackbarAnim : Snackbar} bind:show={snackbar} />
  </div>
</Card>

<style>
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
