import type { Plugin } from "vite";
import { loadDemos } from "./src/load-demos";
import { glob } from "tinyglobby";
import shiki from "./shiki";

const VIRTUAL_PREFIX = "virtual:demo";
const RESOLVED_PREFIX = `\0${VIRTUAL_PREFIX}`;

export function demosPlugin(): Plugin {
  return {
    name: "vite-plugin-demos",
    async resolveId(id) {
      if (id === VIRTUAL_PREFIX) {
        return RESOLVED_PREFIX + "index.js";
      } else if (id.startsWith(VIRTUAL_PREFIX)) {
        return RESOLVED_PREFIX + id.slice(VIRTUAL_PREFIX.length + "/".length) + ".svelte";
      }
    },
    async load(id) {
      if (!id.startsWith(RESOLVED_PREFIX)) return;
      const demos = await loadDemos();

      if (id === RESOLVED_PREFIX + "index.js") {
        const imports: string[] = [];
        const exports: string[] = [];

        demos.forEach(({ friendlyName }, index) => {
          if (friendlyName === "Shapes") {
            exports.push(`import("${VIRTUAL_PREFIX + "/" + index}").then(m => m.default)`);
          } else {
            const name = "Demo" + index;
            imports.push(`import ${name} from "${VIRTUAL_PREFIX + "/" + index}"`);
            exports.push(name);
          }
        });

        return `${imports.join("\n")}\nexport default [ ${exports.join(",")} ]`;
      }
      if (!id.endsWith(".svelte")) return;

      const demoIndex = parseInt(id.slice(RESOLVED_PREFIX.length, -".svelte".length));
      const demo = demos[demoIndex];
      if (!demo) return;

      const components = await glob(["src/lib/**/*.svelte", "!src/lib/forms/_picker"]);
      const getFile = (component: string) => {
        return components.find((f) => f.endsWith(`/${component}.svelte`))!;
      };

      const {
        friendlyName,
        minimalDemo,
        components: componentsStr,
        fullDemoTs,
        fullDemoSvelte,
      } = demo;
      const demoComponents = componentsStr.split("\n").filter(Boolean);

      const imports = demoComponents
        .filter((c) => !["Switch", "Icon", "Slider"].includes(c))
        .map((c) => `import ${c} from "${getFile(c).replace("src/lib", "$lib")}";`)
        .join("\n");

      const relevantLinksData = demoComponents
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
        }));

      // Escape for template literal
      const escapedMinimalDemoHtml = (await shiki(minimalDemo, "svelte"))
        .replaceAll("\\", "\\\\")
        .replaceAll("`", "\\`")
        .replaceAll("$", "\\$")
        .replaceAll("<", "\\x3C");

      const relevantLinksJson = JSON.stringify(relevantLinksData);
      const friendlyNameJson = JSON.stringify(friendlyName);

      return `<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Slider from "$lib/forms/Slider.svelte";
import Arrows from "/src/routes/_arrows.svelte";
import InternalCard from "/src/routes/_card.svelte";
${imports}
${fullDemoTs}

let { showCode }: { showCode: (
		name: string,
		minimalDemoHtml: string,
		relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemoHtml = \`${escapedMinimalDemoHtml}\`;
const relevantLinks: { title: string; link: string }[] = ${relevantLinksJson};
</script>

<InternalCard title="${friendlyName}" showCode={() => showCode(${friendlyNameJson}, minimalDemoHtml, relevantLinks)}>
${fullDemoSvelte}
</InternalCard>
`;
    },
  };
}
