<script>
  import { TextField, Button, ListItem, Icon, Checkbox } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
  import iconDelete from "@ktibow/iconset-material-symbols/delete";

  let tasks = $state([
    { id: 1, text: "Learn M3 Svelte", completed: false },
    { id: 2, text: "Build a prototype", completed: false },
    { id: 3, text: "Test components", completed: true },
  ]);

  let newTaskText = $state("");

  function addTask() {
    const text = newTaskText.trim();
    if (!text) return;

    tasks.push({ id: Date.now(), text, completed: false });
    newTaskText = "";
  }
</script>

<ul class="tasks">
  {#each tasks as task (task.id)}
    <ListItem headline={task.text}>
      {#snippet leading()}
        <label class="box-wrapper">
          <Checkbox>
            <input type="checkbox" bind:checked={task.completed} />
          </Checkbox>
        </label>
      {/snippet}
      {#snippet trailing()}
        <Button
          variant="text"
          iconType="full"
          title="Delete"
          onclick={() => (tasks = tasks.filter((t) => t.id != task.id))}
        >
          <Icon icon={iconDelete} />
        </Button>
      {/snippet}
    </ListItem>
  {/each}
</ul>
<TextField
  label="Task name"
  trailing={{ icon: iconPlus, title: "Add task", onclick: addTask }}
  bind:value={newTaskText}
  enter={addTask}
/>

<style>
  .tasks {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
    margin: 0;
    padding: 0;
  }
  .box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    align-self: stretch;
  }
</style>
