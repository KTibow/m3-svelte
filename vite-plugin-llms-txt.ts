import type { Plugin } from "vite";
import { loadDemos } from "./src/load-demos";
import { readFile, writeFile } from "node:fs/promises";

async function generateLlmsTxt(): Promise<string> {
  const todoListDemo = await readFile("scripts/demo-todo-list.svelte", "utf8");
  const notesAppDemo = await readFile("scripts/demo-notes-app.svelte", "utf8");
  const layoutCssDemo = await readFile("scripts/demo-clone/layout.css", "utf8");
  const layoutSvelteDemo = await readFile("scripts/demo-clone/+layout.svelte", "utf8");
  const pageSvelteDemo = await readFile("scripts/demo-clone/+page.svelte", "utf8");

  let llmsTxt = await readFile("scripts/llms-txt-template.md", "utf8");

  llmsTxt = llmsTxt.replace("<!-- TODO_LIST_DEMO -->", todoListDemo);
  llmsTxt = llmsTxt.replace("<!-- NOTES_APP_DEMO -->", notesAppDemo);
  llmsTxt = llmsTxt.replace("<!-- LAYOUT_CSS_DEMO -->", layoutCssDemo);
  llmsTxt = llmsTxt.replace("<!-- LAYOUT_SVELTE_DEMO -->", layoutSvelteDemo);
  llmsTxt = llmsTxt.replace("<!-- PAGE_SVELTE_DEMO -->", pageSvelteDemo);

  const demosList = await loadDemos();
  const componentDemos = demosList
    .map(
      ({ friendlyName, minimalDemo, components, fullDemoTs, fullDemoSvelte }) =>
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

  return llmsTxt;
}

export function llmsTxtPlugin(): Plugin {
  return {
    name: "vite-plugin-llms-txt",
    async closeBundle() {
      const content = await generateLlmsTxt();
      await writeFile("build/llms.txt", content);
    },
  };
}
