<script>
  import Dialog from "$lib/containers/Dialog.svelte";
  import Checkbox from "$lib/forms/Checkbox.svelte";

  let open = false;
</script>

<p>
  This is just a dialog because it's the best example. It's also used in other places like the date
  picker. In general, enter and exit is usually used for overlays.
</p>
<p><label for={undefined}><Checkbox bind:checked={open} /> Open</label></p>
<Dialog bind:open title="Hi" confirmLabel="OK">Hello world</Dialog>

<style>
  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
