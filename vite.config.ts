import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { tokenShaker } from "vite-plugin-token-shaker";
import { functionsMixins } from "vite-plugin-functions-mixins";
import { demosPlugin } from "./vite-plugin-demos";
import { llmsTxtPlugin } from "./vite-plugin-llms-txt";

export default defineConfig({
  plugins: [sveltekit(), demosPlugin(), llmsTxtPlugin(), tokenShaker(), functionsMixins()],
});
