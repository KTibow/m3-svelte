<script lang="ts">
  import iconTrash from "@iconify-icons/ic/outline-delete";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Button from "$lib/buttons/Button.svelte";

  let isDialogOpen = false;
</script>

<input type="checkbox" bind:checked={isDialogOpen} />
<Dialog icon={iconTrash} headline="Permanently delete?" bind:open={isDialogOpen}>
  Deleting the selected messages will also remove them from all synced devices.
  <svelte:fragment slot="buttons">
    <Button type="text" on:click={() => (isDialogOpen = false)}>Cancel</Button>
    <Button type="tonal" on:click={() => (isDialogOpen = false)}>Delete</Button>
  </svelte:fragment>
</Dialog>
