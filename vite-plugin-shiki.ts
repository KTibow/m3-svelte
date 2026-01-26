import type { Plugin } from "vite";
import { readFile } from "fs/promises";
import shiki from "./shiki";

function escapeForTemplate(str: string): string {
  return str
    .replaceAll("\\", "\\\\")
    .replaceAll("`", "\\`")
    .replaceAll("$", "\\$")
    .replaceAll("<", "\\x3C");
}

// Match /* lang */ `code` pattern
const langTemplateRegex = /\/\*\s*(\w+)\s*\*\/\s*`([\s\S]*?)`/g;

export const shikiPlugin = (): Plugin => {
  return {
    name: "vite-plugin-shiki",
    async load(id) {
      if (!id.endsWith(".svelte")) return;
      const code = await readFile(id, "utf-8");
      if (!code.includes("/*")) return;

      let newCode = code;
      const matches = [...code.matchAll(langTemplateRegex)];

      for (const m of matches) {
        const [fullMatch, lang, codeContent] = m;

        // Handle ${"<"} escapes
        const resolvedCode = codeContent.replace(/\$\{"(<?\/?)"?\}/g, "$1");

        const highlighted = await shiki(resolvedCode, lang);
        const escapedHtml = escapeForTemplate(highlighted);

        const replacement = `\`${escapedHtml}\``;
        newCode = newCode.replace(fullMatch, replacement);
      }

      if (newCode != code) {
        return newCode;
      }
    },
  };
};
