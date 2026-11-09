/**
 * Writes docs/components/*.md for the npm package, so agents and humans can read a
 * component's usage without interpreting its source. Runs from prepack, after
 * svelte-package, because the prop types come from the emitted .d.ts files.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { parse } from "svelte/compiler";
import { glob } from "tinyglobby";
import { loadDemos } from "../src/load-demos.ts";

const OUT = "docs/components";
const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** default values, which the .d.ts files lose: `variant = "filled"` -> variant: "filled" */
const propDefaults = (source: string) => {
  const script = parse(source, { modern: true }).instance;
  if (!script) return [];
  const out: string[] = [];
  const visit = (node: any) => {
    if (!node || typeof node != "object") return;
    if (Array.isArray(node)) return node.forEach(visit);
    if (node.type == "VariableDeclarator" && node.init?.callee?.name == "$props") {
      for (const prop of node.id.properties ?? []) {
        if (prop.type != "Property" || prop.value.type != "AssignmentPattern") continue;
        let value = prop.value.right;
        if (value.callee?.name == "$bindable") {
          value = value.arguments[0];
          if (!value) continue;
        }
        out.push(`${prop.key.name}: ${source.slice(value.start, value.end)}`);
      }
      return;
    }
    for (const key in node) if (key != "loc") visit(node[key]);
  };
  visit(script.content);
  return out;
};

const propTypes = (declaration: string) =>
  declaration
    .split("\n")
    .filter((line) => !/^(import |declare const |export default |type \w+ = ReturnType)/.test(line))
    .join("\n")
    .trim();

/** the part of a site demo that shows the component, without the site's own controls */
const demoMarkup = (svelte: string) => {
  const start = svelte.indexOf("{#snippet demo()}");
  if (start == -1) return undefined;
  const tag = /\{#snippet |\{\/snippet\}/g;
  tag.lastIndex = start;
  let depth = 0;
  for (let m; (m = tag.exec(svelte));) {
    depth += m[0] == "{/snippet}" ? -1 : 1;
    if (depth == 0) {
      const lines = svelte.slice(start, m.index).split("\n").slice(1);
      return lines
        .map((line) => line.replace(/^ {2}/, ""))
        .join("\n")
        .trimEnd();
    }
  }
};

const index = await readFile("src/lib/index.ts", "utf8");
const exported = new Set([...index.matchAll(/default as (\w+)/g)].map((m) => m[1]));
const sources = await glob(["src/lib/**/*.svelte", "!src/lib/forms/_picker"]);
const fence = (lang: string, code: string) => `\`\`\`${lang}\n${code}\n\`\`\``;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const pages: string[] = [];
for (const demo of await loadDemos()) {
  const components = demo.components.split("\n").filter(Boolean);
  // Demos borrow other components for their controls; only document the ones they're about.
  const own = components.filter(
    (c) =>
      !["Button", "Slider", "Checkbox", "Divider", "Menu", "MenuItem"].includes(c) ||
      slug(demo.friendlyName).includes(c.toLowerCase()),
  );
  const imports = components.filter((c) => exported.has(c));

  let page = `# ${demo.friendlyName}\n`;
  if (demo.warning) page += `\n> ${demo.warning}\n`;
  if (imports.length) {
    page += `\n${fence("ts", `import { ${imports.join(", ")} } from "m3-svelte";`)}\n`;
  }
  page += `\n## Usage\n\n${fence("svelte", demo.minimalDemo)}\n`;
  if (demo.notes) page += `\n## Notes\n\n${demo.notes}\n`;

  const markup = demoMarkup(demo.fullDemoSvelte);
  if (markup && markup != demo.minimalDemo) {
    const state = demo.fullDemoTs
      .split("\n")
      .filter((line) => !line.includes("#lib/"))
      .join("\n")
      .trim();
    page += `\n## Every option\n\nFrom the interactive demo on the website.\n\n`;
    if (state) page += `${fence("ts", state)}\n\n`;
    page += `${fence("svelte", markup)}\n`;
  }

  for (const component of own) {
    const source = sources.find((f) => f.endsWith(`/${component}.svelte`));
    if (!source) continue;
    const packaged = source.replace("src/lib/", "package/");
    page += `\n## ${component} props\n\n`;
    const defaults = propDefaults(await readFile(source, "utf8"));
    const types = propTypes(await readFile(`${packaged}.d.ts`, "utf8"));
    page += `${fence("ts", types)}\n`;
    if (defaults.length) page += `\nDefaults: \`${defaults.join("`, `")}\`\n`;
    page += `\nSource: \`node_modules/m3-svelte/${packaged}\`\n`;
  }

  await writeFile(`${OUT}/${slug(demo.friendlyName)}.md`, page);
  pages.push(
    `- [${demo.friendlyName}](./${slug(demo.friendlyName)}.md)${own.length ? `: ${own.join(", ")}` : ""}`,
  );
}

await writeFile(`${OUT}/README.md`, `# Components\n\n${pages.join("\n")}\n`);
console.log(`docs: wrote ${pages.length} component pages`);
