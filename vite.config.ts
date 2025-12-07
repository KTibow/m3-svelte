import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { tokenShaker } from "vite-plugin-token-shaker";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [sveltekit(), tokenShaker(), functionsMixins()],
});
