import { readFile, writeFile, unlink } from "node:fs/promises";
import glob from "fast-glob";

const components = await glob(["src/lib/**/*.svelte", "!src/lib/forms/_picker"]);
const getFile = (component: string) => {
  return components.find((f) => f.endsWith(`/${component}.svelte`))!;
};

const demos = await readFile("src/demos.md", "utf8");
const demosList = [
  ...demos.matchAll(
    /## (.+)\n\nMinimal demo:\n\n\`\`\`svelte\n([^]+?)\n\`\`\`\n\nFull demo:\n\n\`\`\`use\n([^]*?)\n\`\`\`\n\n\`\`\`ts\n([^]*?)\n\`\`\`\n\n\`\`\`svelte\n([^]+?)\n\`\`\`/g,
  ),
];

// Demo generation

const oldDemos = await glob("src/routes/[0-9]+.svelte");
for (const file of oldDemos) {
  await unlink(file);
}

for (let i = 0; i < demosList.length; i++) {
  const [, friendlyName, minimalDemo, components, fullDemoTs, fullDemoSvelte] = demosList[i];

  const generatedCode = `<script lang="ts">
import { createEventDispatcher } from "svelte";
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/_icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
${components
  .split("\n")
  .filter(Boolean)
  .map((c) =>
    c == "Snackbar"
      ? `import Snackbar, { type SnackbarIn } from "$lib/containers/Snackbar.svelte";`
      : `import ${c} from "${getFile(c).replace("src/lib", "$lib")}";`,
  )
  .join("\n")}
${fullDemoTs}

const dispatch = createEventDispatcher();
const minimalDemo = \`${minimalDemo.replaceAll("$", '${"$"}').replaceAll("<", '${"<"}')}\`;
</script>

<InternalCard title="${friendlyName}" on:showCode={() => dispatch("showCode", { name: ${JSON.stringify(friendlyName)} })}>
${fullDemoSvelte}
</InternalCard>
`;
  await writeFile(`src/routes/${i}.svelte`, generatedCode);
}

// llms.txt generation

const llmsTxt = `# M3 Svelte

This is M3 Svelte, a Svelte component library that implements the Material 3 design system by @KTibow.

## Getting started

The first step is installation:
\`\`\`bash
npm i m3-svelte
\`\`\`

M3 Svelte needs two things to work: a theme and a font. The simplest setup looks like this:
\`\`\`html (your template)
<head>
  [...]
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
</head>
<body class="m3-font-body-large">
  [...]
</body>
\`\`\`

\`\`\`css (somewhere always loaded)
:root {
  /* Any custom styles should go here */
}
\`\`\`

\`\`\`svelte (somewhere always loaded)
<script>
  import { StyleFromScheme } from "m3-svelte";
</script>

[snippet that you've copied from https://ktibow.github.io/m3-svelte/theme]
\`\`\`

Aim to keep configuration and boilerplate out of Svelte. The only configuration that should be in Svelte is the StyleFromScheme snippet.

## Building blocks

M3 Svelte is built on a few core concepts:

### CSS Custom Properties: The foundation of theming
\`\`\`css
--m3-scheme-[color]: [R G B];            /* Color tokens */
--m3-util-elevation-[0-5]: [box shadow]; /* Elevation levels */
--m3-util-rounding-[size]: [size];       /* Border radius sizes */
/*
Colors:
primary, on-primary, primary-container, on-primary-container, inverse-primary, secondary, on-secondary, secondary-container, on-secondary-container, tertiary, on-tertiary, tertiary-container, on-tertiary-container, error, on-error, error-container, on-error-container, background, on-background, surface, on-surface, surface-variant, on-surface-variant, inverse-surface, inverse-on-surface, outline, outline-variant, shadow, scrim, surface-dim, surface-bright, surface-container-lowest, surface-container-low, surface-container, surface-container-high, surface-container-highest, surface-tint
Rounding sizes:
none, extra-small, small, medium, large, extra-large, full
/*
\`\`\`

### Utility Classes: Common Material styles with the \`m3-\` prefix
\`\`\`svelte
<h1 class="m3-font-display-large">Large Title</h1>
<p class="m3-font-body-large">Regular text</p>
<!--
Scale: display, headline, title, body, label
Sizes: large, medium, small
-->
\`\`\`

### Components: Ready-to-use Material elements
\`\`\`svelte
<script>
  import { Button } from "m3-svelte";
</script>
<Button type="filled">Hello</Button>
\`\`\`

## Tips

M3 Svelte is more and less than the typical component framework.

On one hand, Material 3 consists of guidelines across color, shadow, easing, animation, and spacing, and M3 Svelte is all of that. You don't have to make your own components or animations - you could use components like \`Card\` and animate them with the \`sharedAxisTransition\`, eased with \`easeEmphasized\`.

On the other hand, M3 Svelte doesn't give you a template. There are many things you have to do yourself, like:
- Generating and pasting your theme
- Including your font
- Resetting CSS
- Setting up your own layout (ideally a responsive one)
- Styling your components (if you need something M3 doesn't have)
- Slotting in <input>s
- Rendering icons

If you're ever unsure about something, you might want to check the [m3-svelte repo](https://github.com/KTibow/m3-svelte). The M3 Svelte demo website is built with M3 Svelte and might have implemented what you're trying to do.

## Troubleshooting

You should avoid trying to restyle components. You can't set a \`class\` and due to Svelte scoped styles, even if you could, it wouldn't work. I repeat, you CANNOT set a \`class\` on M3 Svelte components. Always look for alternatives, like using \`gap\` instead of \`margin\`. If you *must* do this, you would have to do something like \`.my-container > :global(.m3-container)\`.

M3 Svelte uses the Iconify ecosystem. M3 Svelte imports icons from NPM and renders them as SVG. Some components render icons for you:
\`\`\`svelte
<script>
  import { FAB } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
</script>

<FAB icon={iconPlus} />
\`\`\`

While in other cases, you render them yourselves:
\`\`\`svelte
<script>
  import { ListItem, Icon } from "m3-svelte";
  import iconPlus from "@ktibow/iconset-material-symbols/add";
</script>

<ListItem headline="User">
  <Icon icon={iconPlus} slot="leading" />
</ListItem>
\`\`\`

## Examples

Here's an example todo list component:
\`\`\`svelte
<script>
  import { TextField, Button, ListItem, Icon, Checkbox } from "$lib";
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
          type="text"
          iconType="full"
          on:click={() => (tasks = tasks.filter((t) => t.id != task.id))}
        >
          <Icon icon={iconDelete} />
        </Button>
      </label>
    </ListItem>
  {/each}
</div>
<TextField
  name="Task name"
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
\`\`\`

Here's an example notes app:
\`\`\`svelte
<script lang="ts">
  import { FAB, Dialog, Button, ListItem, TextFieldMultiline, Snackbar, Card, Icon } from "$lib";
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
  let snackbar: (data: { message: string; closable?: boolean }) => void;

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
    snackbar({ message: "Note deleted", closable: true });
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
            type="text"
            iconType="full"
            on:click={() =>
              (dialog = {
                open: true,
                editingId: note.id,
                title: note.title,
                content: note.content,
              })}
          >
            <Icon icon={iconEdit} />
          </Button>
          <Button type="text" iconType="full" on:click={() => deleteNote(note.id)}>
            <Icon icon={iconDelete} />
          </Button>
        </div>
      </ListItem>
    {/each}
  {:else}
    <Card type="outlined">
      <div class="empty-content">
        <p class="m3-font-body-large">No notes yet</p>
        <p class="m3-font-body-medium">Click the + button to create one</p>
      </div>
    </Card>
  {/if}
</div>

<Dialog headline={dialog.editingId ? "New note" : "Edit note"} bind:open={dialog.open}>
  <div class="dialog-content">
    <TextFieldMultiline name="Title" bind:value={dialog.title} />
    <TextFieldMultiline name="Content" bind:value={dialog.content} />
  </div>
  <svelte:fragment slot="buttons">
    <Button type="text" on:click={closeDialog}>Cancel</Button>
    {#if dialog.editingId}
      <Button type="filled" disabled={!dialog.title || !dialog.content} on:click={updateNote}>
        Update
      </Button>
    {:else}
      <Button type="filled" disabled={!dialog.title || !dialog.content} on:click={addNote}>
        Add
      </Button>
    {/if}
  </svelte:fragment>
</Dialog>

<div class="fab">
  <FAB color="primary" icon={iconAdd} on:click={openNewNoteDialog} />
</div>

<Snackbar bind:show={snackbar} />

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
\`\`\`

## Components

Okay, now on to the components. Again, if you're unsure about how a component works, you can look at its source code in the [m3-svelte repo](https://github.com/KTibow/m3-svelte).

${demosList
  .map(
    ([, friendlyName, minimalDemo, components, fullDemoTs, fullDemoSvelte]) =>
      `### ${friendlyName}

Minimal demo:
\`\`\`svelte
${minimalDemo}
\`\`\`

The M3 Svelte interactive demo for this component uses ${components.split("\n").join(", ")} with the TS \`${fullDemoTs}\` to make this demo:
\`\`\`svelte
${fullDemoSvelte}
\`\`\``,
  )
  .join("\n\n")}
`;

await writeFile("static/llms.txt", llmsTxt);
