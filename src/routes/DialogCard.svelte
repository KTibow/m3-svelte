<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import iconTrash from "@iconify-icons/ic/outline-delete";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Button from "$lib/buttons/Button.svelte";

  let open = false;
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">Dialog</h2>
  <div class="area">
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
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
</style>
