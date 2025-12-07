import { readFile, writeFile, unlink } from "node:fs/promises";
import { glob } from "tinyglobby";

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
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
${components
  .split("\n")
  .filter(Boolean)
  .filter((c) => !["Switch", "Icon"].includes(c))
  .map((c) => `import ${c} from "${getFile(c).replace("src/lib", "$lib")}";`)
  .join("\n")}
${fullDemoTs}

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = \`${minimalDemo.replaceAll("$", '${"$"}').replaceAll("<", '${"<"}')}\`;
const relevantLinks: { title: string; link: string }[] = ${JSON.stringify(
    components
      .split("\n")
      .filter(Boolean)
      .filter((c) =>
        c.toLowerCase() == friendlyName.toLowerCase()
          ? true
          : !["Checkbox", "Divider", "Button"].includes(c),
      )
      .map((c) => ({
        title: c.length > 10 ? `${c}.sv` : `${c}.svelte`,
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

// Read demo files
const todoListDemo = await readFile("scripts/demo-todo-list.svelte", "utf8");
const notesAppDemo = await readFile("scripts/demo-notes-app.svelte", "utf8");
const layoutCssDemo = await readFile("scripts/demo-clone/layout.css", "utf8");
const layoutSvelteDemo = await readFile("scripts/demo-clone/+layout.svelte", "utf8");
const pageSvelteDemo = await readFile("scripts/demo-clone/+page.svelte", "utf8");

// Read template and replace placeholders
let llmsTxt = await readFile("scripts/llms-txt-template.md", "utf8");

// Replace demo placeholders
llmsTxt = llmsTxt.replace("<!-- TODO_LIST_DEMO -->", todoListDemo);
llmsTxt = llmsTxt.replace("<!-- NOTES_APP_DEMO -->", notesAppDemo);
llmsTxt = llmsTxt.replace("<!-- LAYOUT_CSS_DEMO -->", layoutCssDemo);
llmsTxt = llmsTxt.replace("<!-- LAYOUT_SVELTE_DEMO -->", layoutSvelteDemo);
llmsTxt = llmsTxt.replace("<!-- PAGE_SVELTE_DEMO -->", pageSvelteDemo);

// Replace component demos
const componentDemos = demosList
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
  .join("\n\n");

llmsTxt = llmsTxt.replace("<!-- COMPONENT_DEMOS -->", componentDemos);

await writeFile("static/llms.txt", llmsTxt);
