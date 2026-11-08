import adapter from "@sveltejs/adapter-static";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { demosPlugin } from "./vite-plugin-demos.ts";
import { llmsTxtPlugin } from "./vite-plugin-llms-txt.ts";
import { shikiPlugin } from "./vite-plugin-shiki.ts";
import { tokenShaker } from "vite-plugin-token-shaker";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: { runes: true },
      adapter: adapter(),
      paths: { relative: false },
      prerender: { handleHttpError: "warn" },
    }),
    demosPlugin(),
    llmsTxtPlugin(),
    shikiPlugin(),
    tokenShaker(),
    functionsMixins(),
  ],
});
