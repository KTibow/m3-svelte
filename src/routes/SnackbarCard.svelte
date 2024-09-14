<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import Snackbar, { type SnackbarIn } from "$lib/containers/Snackbar.svelte";
  import SnackbarAnim from "$lib/containers/SnackbarAnim.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Card from "./_card.svelte";

  let snackbar: (data: SnackbarIn) => void;
  let animation = false;
</script>

<Card
  title="Snackbar"
  code={`<${""}script lang="ts">
  let snackbar: (data: SnackbarIn) => void;
  let snackbarAnim: (data: SnackbarIn) => void;
</${""}script>
<Button
  type="tonal"
  on:click={() => snackbar({ message: "Hello", actions: { Undo: () => {} }, closable: true })}
>
  Show
</Button>
<SnackbarAnim bind:show={snackbarAnim} />
<Snackbar bind:show={snackbar} />`}
>
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
