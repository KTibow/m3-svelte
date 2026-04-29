import { readFile } from "node:fs/promises";

export type Demo = {
  friendlyName: string;
  minimalDemo: string;
  components: string;
  fullDemoTs: string;
  fullDemoSvelte: string;
  warning?: string;
};

export async function loadDemos(): Promise<Demo[]> {
  const demos = await readFile("src/demos.md", "utf8");
  const demosList = [
    ...demos.matchAll(
      /## (.+)\n(?:> Warning: (.+)\n\n|\n)Minimal demo:\n\n```svelte\n([^]+?)\n```\n\nFull demo:\n\n```use\n([^]*?)\n```\n\n```ts\n([^]*?)\n```\n\n```svelte\n([^]+?)\n```/g,
    ),
  ];

  return demosList.map(([, friendlyName, warning, minimalDemo, components, fullDemoTs, fullDemoSvelte]) => ({
    friendlyName,
    minimalDemo,
    components,
    fullDemoTs,
    fullDemoSvelte,
    ...(warning ? { warning } : {}),
  }));
}
