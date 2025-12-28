import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { demosPlugin } from "./vite-plugin-demos";
import { llmsTxtPlugin } from "./vite-plugin-llms-txt";
import { shikiPlugin } from "./vite-plugin-shiki";
import { tokenShaker } from "vite-plugin-token-shaker";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [
    sveltekit(),
    demosPlugin(),
    llmsTxtPlugin(),
    shikiPlugin(),
    tokenShaker(),
    functionsMixins(),
  ],
});
