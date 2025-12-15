<script>
  import { TextField, Button, ListItem, Icon, Checkbox } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
  import iconDelete from "@ktibow/iconset-material-symbols/delete";

  let tasks = [
    { id: 1, text: "Learn M3 Svelte", completed: false },
    { id: 2, text: "Build a prototype", completed: false },
    { id: 3, text: "Test components", completed: true },
  ];

  let newTaskText = "";

  function addTask() {
    newTaskText = newTaskText.trim();
    if (!newTaskText) return;

    tasks = [
      ...tasks,
      {
        id: Math.max(...tasks.map((t) => t.id)) + 1,
        text: newTaskText,
        completed: false,
      },
    ];
    newTaskText = "";
  }
</script>

<div class="tasks">
  {#each tasks as task (task.id)}
    <ListItem headline={task.text}>
      <label class="box-wrapper" slot="leading">
        <Checkbox>
          <input type="checkbox" bind:checked={task.completed} />
        </Checkbox>
      </label>
      <label slot="trailing">
        <Button
          variant="text"
          iconType="full"
          onclick={() => (tasks = tasks.filter((t) => t.id != task.id))}
        >
          <Icon icon={iconDelete} />
        </Button>
      </label>
    </ListItem>
  {/each}
</div>
<TextField
  label="Task name"
  trailingIcon={iconPlus}
  bind:value={newTaskText}
  on:enter={addTask}
  on:trailingClick={addTask}
/>

<style>
  .tasks {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex-grow: 1;
  }
  .box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    align-self: stretch;
  }
</style>
