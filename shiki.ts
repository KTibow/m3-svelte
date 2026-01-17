import { createHighlighter } from "shiki";
const highlighterPromise = createHighlighter({
  themes: ["github-light-default", "github-dark-default"],
  langs: ["svelte", "typescript", "html", "css", "sh"],
});
export default async (code: string, lang: string) => {
  const highlighter = await highlighterPromise;
  let html = highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: "light-dark()",
  });
  html = html.replace(/<pre .+?>/, "");
  html = html.replace(/<\/pre>/, "");
  html = html.replace(/<code>/, "");
  html = html.replace(/<\/code>/, "");
  html = html.replace(/<span class="line">(.+)<\/span>$/gm, "$1");
  html = html.replace(/;--shiki-light:#[^;]+;--shiki-dark:#[^"]+/g, "");
  html = html.replace(/light-dark\(([^,]+), /g, "light-dark($1,");
  return html;
};
