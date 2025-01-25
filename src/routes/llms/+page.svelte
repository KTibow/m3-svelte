<script lang="ts">
  import {
    TextField,
    Button,
    ListItem,
    Icon,
    Checkbox,
    FAB,
    Dialog,
    SegmentedButtonContainer,
    SegmentedButtonItem,
    Card,
    Chip,
    Snackbar,
  } from "$lib";
  import iconAdd from "@ktibow/iconset-material-symbols/add";
  import iconDelete from "@ktibow/iconset-material-symbols/delete";
  import iconEdit from "@ktibow/iconset-material-symbols/edit";
  import iconFlag from "@ktibow/iconset-material-symbols/flag";
  import iconCalendar from "@ktibow/iconset-material-symbols/calendar-today";

  type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    category: string;
    dueDate?: string;
  };

  type Category = {
    id: string;
    name: string;
    color: string;
  };

  let tasks: Task[] = [];
  let categories: Category[] = [
    { id: "work", name: "Work", color: "primary" },
    { id: "personal", name: "Personal", color: "secondary" },
    { id: "shopping", name: "Shopping", color: "tertiary" },
  ];

  let dialog = {
    open: false,
    taskText: "",
    priority: "medium" as Task["priority"],
    category: "work",
    dueDate: "",
    editingId: null as number | null,
  };

  let snackbar: (data: { message: string; closable?: boolean }) => void;
  let filterCategory = "all";

  function addTask() {
    const newTask = {
      id: Date.now(),
      text: dialog.taskText.trim(),
      completed: false,
      priority: dialog.priority,
      category: dialog.category,
      dueDate: dialog.dueDate,
    };

    tasks = [newTask, ...tasks];
    closeDialog();
    snackbar({ message: "Task added successfully", closable: true });
  }

  function deleteTask(id: number) {
    tasks = tasks.filter((t) => t.id !== id);
    snackbar({ message: "Task deleted", closable: true });
  }

  function toggleComplete(id: number) {
    tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function closeDialog() {
    dialog = {
      open: false,
      taskText: "",
      priority: "medium",
      category: "work",
      dueDate: "",
      editingId: null,
    };
  }

  function getPriorityColor(priority: Task["priority"]) {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "tertiary";
      case "low":
        return "secondary";
      default:
        return "primary";
    }
  }

  $: filteredTasks =
    filterCategory === "all" ? tasks : tasks.filter((task) => task.category === filterCategory);
</script>

<div class="container">
  <Card type="outlined" class="filters">
    <div class="category-filters">
      <SegmentedButtonContainer>
        <input
          type="radio"
          name="category"
          id="cat-all"
          bind:group={filterCategory}
          value="all"
          checked
        />
        <SegmentedButtonItem input="cat-all">All</SegmentedButtonItem>
        {#each categories as category}
          <input
            type="radio"
            name="category"
            id={`cat-${category.id}`}
            bind:group={filterCategory}
            value={category.id}
          />
          <SegmentedButtonItem input={`cat-${category.id}`}>{category.name}</SegmentedButtonItem>
        {/each}
      </SegmentedButtonContainer>
    </div>
  </Card>

  <div class="tasks">
    {#each filteredTasks as task (task.id)}
      <ListItem headline={task.text} supporting={task.dueDate ? `Due: ${task.dueDate}` : undefined}>
        <label class="checkbox-wrapper" slot="leading">
          <Checkbox>
            <input
              type="checkbox"
              checked={task.completed}
              on:change={() => toggleComplete(task.id)}
            />
          </Checkbox>
        </label>
        <div slot="trailing" class="actions">
          <Chip type="assist" elevated={true} color={getPriorityColor(task.priority)}>
            {task.priority}
          </Chip>
          <Button type="text" iconType="full" on:click={() => deleteTask(task.id)}>
            <Icon icon={iconDelete} />
          </Button>
        </div>
      </ListItem>
    {/each}
  </div>

  <Dialog headline={dialog.editingId ? "Edit Task" : "New Task"} bind:open={dialog.open}>
    <div class="dialog-content">
      <TextField name="Task" bind:value={dialog.taskText} leadingIcon={iconEdit} />

      <div class="priority-select">
        <span class="m3-font-label-large">Priority:</span>
        <SegmentedButtonContainer>
          <input
            type="radio"
            name="priority"
            id="priority-low"
            bind:group={dialog.priority}
            value="low"
          />
          <SegmentedButtonItem input="priority-low">Low</SegmentedButtonItem>
          <input
            type="radio"
            name="priority"
            id="priority-medium"
            bind:group={dialog.priority}
            value="medium"
          />
          <SegmentedButtonItem input="priority-medium">Medium</SegmentedButtonItem>
          <input
            type="radio"
            name="priority"
            id="priority-high"
            bind:group={dialog.priority}
            value="high"
          />
          <SegmentedButtonItem input="priority-high">High</SegmentedButtonItem>
        </SegmentedButtonContainer>
      </div>

      <div class="category-select">
        <span class="m3-font-label-large">Category:</span>
        <SegmentedButtonContainer>
          {#each categories as category}
            <input
              type="radio"
              name="category"
              id={`new-${category.id}`}
              bind:group={dialog.category}
              value={category.id}
            />
            <SegmentedButtonItem input={`new-${category.id}`}>{category.name}</SegmentedButtonItem>
          {/each}
        </SegmentedButtonContainer>
      </div>

      <TextField
        name="Due Date"
        type="date"
        bind:value={dialog.dueDate}
        leadingIcon={iconCalendar}
      />
    </div>

    <svelte:fragment slot="buttons">
      <Button type="text" on:click={closeDialog}>Cancel</Button>
      <Button
        type="filled"
        disabled={!dialog.taskText}
        on:click={dialog.editingId ? updateTask : addTask}
      >
        {dialog.editingId ? "Update" : "Add"}
      </Button>
    </svelte:fragment>
  </Dialog>

  <div class="fab-container">
    <FAB icon={iconAdd} color="primary" on:click={() => (dialog.open = true)} />
  </div>

  <Snackbar bind:show={snackbar} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
    height: 100vh;
    box-sizing: border-box;
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
    overflow-y: auto;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .priority-select,
  .category-select {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .fab-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }

  .filters {
    padding: 1rem;
  }

  .category-filters {
    display: flex;
    justify-content: center;
  }
</style>
