<script lang="ts">
  import {
    FAB,
    Dialog,
    Button,
    ListItem,
    TextFieldMultiline,
    Snackbar,
    snackbar,
    Card,
    Icon,
  } from "m3-svelte";
  import iconAdd from "@ktibow/iconset-material-symbols/add";
  import iconDelete from "@ktibow/iconset-material-symbols/delete";
  import iconEdit from "@ktibow/iconset-material-symbols/edit";

  type Note = {
    id: number;
    title: string;
    content: string;
    date: string;
  };

  let notes: Note[] = [];
  let dialog: { open: boolean; editingId?: number; title: string; content: string } = {
    open: false,
    title: "",
    content: "",
  };

  function addNote() {
    const newNote = {
      id: Date.now(),
      title: dialog.title.trim(),
      content: dialog.content.trim(),
      date: new Date().toLocaleDateString(),
    };

    notes = [newNote, ...notes];
    closeDialog();
  }

  function updateNote() {
    if (!dialog.editingId) return;

    notes = notes.map((note) =>
      note.id == dialog.editingId
        ? { ...note, title: dialog.title.trim(), content: dialog.content.trim() }
        : note,
    );
    closeDialog();
  }

  function deleteNote(id: number) {
    notes = notes.filter((note) => note.id !== id);
    snackbar("Note deleted", undefined, true);
  }

  function openNewNoteDialog() {
    dialog = { open: true, title: "", content: "" };
  }

  function closeDialog() {
    dialog = { open: false, title: "", content: "" };
  }
</script>

<div class="container">
  {#if notes.length}
    {#each notes as note (note.id)}
      <ListItem headline={note.title} supporting={note.content} overline={note.date}>
        <div slot="trailing" class="actions">
          <Button
            variant="text"
            iconType="full"
            onclick={() =>
              (dialog = {
                open: true,
                editingId: note.id,
                title: note.title,
                content: note.content,
              })}
          >
            <Icon icon={iconEdit} />
          </Button>
          <Button variant="text" iconType="full" onclick={() => deleteNote(note.id)}>
            <Icon icon={iconDelete} />
          </Button>
        </div>
      </ListItem>
    {/each}
  {:else}
    <Card variant="outlined">
      <div class="empty-content">
        <p class="large">No notes yet</p>
        <p class="medium">Click the + button to create one</p>
      </div>
    </Card>
  {/if}
</div>

<Dialog headline={dialog.editingId ? "New note" : "Edit note"} bind:open={dialog.open}>
  <div class="dialog-content">
    <TextFieldMultiline label="Title" bind:value={dialog.title} />
    <TextFieldMultiline label="Content" bind:value={dialog.content} />
  </div>
  {#snippet buttons()}
    <Button variant="text" onclick={closeDialog}>Cancel</Button>
    {#if dialog.editingId}
      <Button variant="filled" disabled={!dialog.title || !dialog.content} onclick={updateNote}>
        Update
      </Button>
    {:else}
      <Button variant="filled" disabled={!dialog.title || !dialog.content} onclick={addNote}>
        Add
      </Button>
    {/if}
  {/snippet}
</Dialog>

<div class="fab">
  <FAB color="primary" icon={iconAdd} onclick={openNewNoteDialog} />
</div>

<Snackbar />

<style>
  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    padding: 1rem;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .empty-content {
    text-align: center;
  }
  .empty-content > .large {
    @apply --m3-body-large;
  }
  .empty-content > .medium {
    @apply --m3-body-medium;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fab {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }
</style>
