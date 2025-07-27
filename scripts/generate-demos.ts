import { readFile, writeFile, unlink } from "node:fs/promises";
import glob from "fast-glob";

const components = await glob(["src/lib/**/*.svelte", "!src/lib/forms/_picker"]);
const getFile = (component: string) => {
  return components.find((f) => f.endsWith(`/${component}.svelte`))!;
};

const demos = await readFile("src/demos.md", "utf8");
const demosList = [
  ...demos.matchAll(
    /## (.+)\n\nMinimal demo:\n\n```svelte\n([^]+?)\n```\n\nFull demo:\n\n```use\n([^]*?)\n```\n\n```ts\n([^]*?)\n```\n\n```svelte\n([^]+?)\n```/g,
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
  .filter((c) => !["Switch"].includes(c))
  .map((c) =>
    c == "Snackbar"
      ? `import Snackbar, { type SnackbarIn } from "$lib/containers/Snackbar.svelte";`
      : `import ${c} from "${getFile(c).replace("src/lib", "$lib")}";`,
  )
  .join("\n")}
${fullDemoTs}

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = \`${minimalDemo.replaceAll("$", '${"$"}').replaceAll("<", '${"<"}')}\`;
const relevantLinks = ${JSON.stringify(
    components
      .split("\n")
      .filter(Boolean)
      .filter((c) =>
        c.toLowerCase() == friendlyName.toLowerCase()
          ? true
          : !["Checkbox", "Divider", "Button"].includes(c),
      )
      .map((c) => ({
        title: `${c}.sv`,
        link: getFile(c).replace(
          "src/lib",
          "https://github.com/KTibow/m3-svelte/blob/main/src/lib",
        ),
      })),
  )};
</script>

<InternalCard title="${friendlyName}" showCode={() => showCode(${JSON.stringify(friendlyName)}, minimalDemo, relevantLinks)}>
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
/* The style snippet you copied from https://ktibow.github.io/m3-svelte/theme goes here */

:root {
  /* Any custom styles should go here */
}
\`\`\`

Aim to keep configuration and boilerplate out of Svelte.

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
<Button variant="filled">Hello</Button>
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

You must wrap Checkbox, Radio, and Switch in <label>s.

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
  </svelte:fragment>
</Dialog>

<div class="fab">
  <FAB color="primary" icon={iconAdd} onclick={openNewNoteDialog} />
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

Here's an even more complicated example - a partial clone of the M3 documentation website, using SvelteKit:
\`\`\`css layout.css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

/* snip: theme snippet */

body {
  display: flex;
  height: 100dvh;
  margin: 0;
  box-sizing: border-box;
  background: rgb(var(--m3-scheme-background));
  color: rgb(var(--m3-scheme-on-background));
}
@media (width < 52.5rem) {
  body {
    flex-direction: column-reverse;
    --m3-util-bottom-offset: 5rem;
  }
}
img {
  max-width: 100%;
}
/* not implemented: a comprehensive css reset */
\`\`\`

\`\`\`svelte +layout.svelte
<script lang="ts">
  import { NavCMLX, NavCMLXItem, FAB } from 'm3-svelte';
  import iconSearch from '@ktibow/iconset-material-symbols/search';
  import iconHome from '@ktibow/iconset-material-symbols/home';
  import iconApps from '@ktibow/iconset-material-symbols/apps';
  import iconCode from '@ktibow/iconset-material-symbols/code';
  import iconBook from '@ktibow/iconset-material-symbols/book';
  import iconPalette from '@ktibow/iconset-material-symbols/palette';
  import iconExtension from '@ktibow/iconset-material-symbols/extension';
  import iconPages from '@ktibow/iconset-material-symbols/pages';
  import './layout.css';

  // not implemented: using an outlined icon if not selected
  const navItems = [
    { icon: iconHome, label: 'Home', id: 'home' },
    { icon: iconApps, label: 'Get started', id: 'get-started' },
    { icon: iconCode, label: 'Develop', id: 'develop' },
    { icon: iconBook, label: 'Foundations', id: 'foundations' },
    { icon: iconPalette, label: 'Styles', id: 'styles' },
    { icon: iconExtension, label: 'Components', id: 'components' },
    { icon: iconPages, label: 'Blog', id: 'blog' }
  ];
</script>

<div class="nav">
  <NavCMLX variant="auto">
    <div class="search">
      <FAB icon={iconSearch} />
    </div>
    {#each navItems as item}
      <!-- not implemented: the ability to click on a destination -->
      <!-- (you would set an \`href\` and use better \`selected\` logic then) -->
      <NavCMLXItem variant="auto" icon={item.icon} text={item.label} selected={item.id == 'components'} />
    {/each}
  </NavCMLX>
</div>
<div class="main">
  <slot />
</div>

<style>
  .main {
    padding: 0.5rem;
    overflow-y: auto;
    flex: 1;
  }

  @media (width < 37.5rem) {
    .nav {
      background: rgb(var(--m3-scheme-surface-container));
    }
    .search {
      position: fixed;
      right: 1.5rem;
      bottom: calc(var(--m3-util-bottom-offset) + 1.5rem);
    }
  }

  @media (width >= 37.5rem) {
    .nav {
      width: 5rem;
      height: 100dvh;
    }
    .search {
      align-self: center;
    }
  }
</style>
\`\`\`

\`\`\`svelte +page.svelte
<script lang="ts">
  import { Button, Icon } from 'm3-svelte';
  import iconInfo from '@ktibow/iconset-material-symbols/info';
  import iconSpecs from '@ktibow/iconset-material-symbols/rule';
  import iconGuidelines from '@ktibow/iconset-material-symbols/lightbulb';
  import iconAccessibility from '@ktibow/iconset-material-symbols/accessibility';

  let currentTab = 'overview';
  const tabs = [
    { icon: iconInfo, label: 'Overview', id: 'overview' },
    { icon: iconSpecs, label: 'Specs', id: 'specs' },
    { icon: iconGuidelines, label: 'Guidelines', id: 'guidelines' },
    { icon: iconAccessibility, label: 'Accessibility', id: 'accessibility' }
  ];
</script>

<div class="header">
  <div class="info">
    <h1 class="m3-font-display-large">Lists</h1>
    <p class="m3-font-title-large">Lists are continuous, vertical indexes of text and images</p>
  </div>
  <img
    src="https://picsum.photos/id/12/1000/562"
    alt="A list in a recipe app"
    class="preview-image"
  />
</div>

<div class="tabs">
  {#each tabs as tab}
    <button
      class="m3-font-title-medium"
      disabled={currentTab == tab.id}
      onclick={() => (currentTab = tab.id)}
    >
      <Icon icon={tab.icon} width="1.5rem" height="1.5rem" />
      {tab.label}
    </button>
  {/each}
</div>

<article>
  {Array.from({ length: 200 }, () => 'Lorem ipsum.').join(' ')}
</article>

<style>
  .header {
    display: flex;
    gap: 0.5rem;

    > * {
      border-radius: var(--m3-util-rounding-large);
      min-width: 0;
      flex: 1;
    }
    > .info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      background-color: rgb(var(--m3-scheme-surface-container));
      padding: 2rem;

      > * {
        margin: 0;
      }
    }
  }

  .tabs {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface-container));
    border-radius: 3rem;
    margin-top: 0.5rem;
    flex-shrink: 0;

    @media (width >= 37.5rem) {
      flex-direction: row;

      > * {
        flex: 1;
      }
    }

    > * {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      padding: 0;
      border: none;
      height: 6rem;
      border-radius: inherit;
      background-color: inherit;
      color: inherit;
      flex-shrink: 0;

      transition: 200ms;
      cursor: pointer;

      &:disabled {
        background-color: rgb(var(--m3-scheme-secondary-container));
        color: rgb(var(--m3-scheme-on-surface-container));
      }
    }
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

## Addendum: more components

### Nav CMLX

This component works across all 4 breakpoints: compact, small, large, and expanded. Compact is equivalent to the old navigation bar (items vertical but arranged horizontally), Small is new (items horizontal and arranged horizontally), Large is equivalent to the old navigation rail (items vertical and arranged vertically), and Expanded is equivalent to the old navigation drawer (items horizontal but arranged vertically). It can take a \`click\` if it's a button or an \`href\` if it's a link.

Minimal demo:
\`\`\`svelte
<NavCMLX variant="auto">
  <NavCMLXItem variant="auto" icon={iconCircle} text="A" selected={item == "a"} click={() => item = "a"} />
  <NavCMLXItem variant="auto" icon={iconSquare} text="B" selected={item == "b"} click={() => item = "b"} />
</NavCMLX>
\`\`\`
`;

await writeFile("static/llms.txt", llmsTxt);
