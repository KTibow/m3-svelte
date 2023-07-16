<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Snackbar, { type SnackbarIn } from "$lib/containers/Snackbar.svelte";
  import SnackbarAnim from "$lib/containers/SnackbarAnim.svelte";

  let snackbar: (data: SnackbarIn) => void;
  let animation = false;
</script>

<Card type="elevated">
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
  <div class="area">
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
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
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
