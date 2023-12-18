<script lang="ts">
  import iconTrash from "@ktibow/iconset-material-symbols/delete-outline";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import Card from "./_card.svelte";

  let open = false;
</script>

<Card>
  <h2 class="m3-font-headline-large">Dialog</h2>
  <div slot="demo">
    <Button type="tonal" on:click={() => (open = true)}>Open</Button>
    <Dialog icon={iconTrash} headline="Permanently delete?" bind:open>
      Deleting the selected messages will also remove them from all synced devices.
      <svelte:fragment slot="buttons">
        <Button type="text" on:click={() => (open = false)}>Cancel</Button>
        <Button type="tonal" on:click={() => (open = false)}>Delete</Button>
      </svelte:fragment>
    </Dialog>
  </div>
</Card>

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
</style>
