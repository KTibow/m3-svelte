<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import Dialog from "$lib/containers/Dialog.svelte";
  import iconTrash from "@ktibow/iconset-material-symbols/delete-outline";
  import Card from "./_card.svelte";

  let open = false;
</script>

<Card
  title="Dialog"
  code={`<Dialog icon={iconTrash} headline="Permanently delete?" bind:open>
  Deleting the selected messages will also remove them
  from all synced devices.
  <svelte:fragment slot="buttons">
    <Button type="text" on:click={() => (open = false)}>
      Cancel
    </Button>
    <Button type="tonal" on:click={() => (open = false)}>
      Delete
    </Button>
  </svelte:fragment>
</Dialog>`}
>
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
