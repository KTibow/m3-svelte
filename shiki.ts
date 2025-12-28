import { createHighlighter } from "shiki";
const highlighterPromise = createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["svelte", "typescript", "html", "css"],
});
export default async (code: string, lang: string) => {
  const highlighter = await highlighterPromise;
  let html = highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light-dark()",
  });
  html = html.replace(/<pre [^>]*>/, "<pre>");
  html = html.replace(/;--shiki-light:#[^;]+;--shiki-dark:#[^"]+/g, "");
  html = html.replace(/light-dark\(([^,]+), /g, "light-dark($1,");
  return html;
};
