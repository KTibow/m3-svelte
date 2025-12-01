import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { tokenShaker } from "vite-plugin-token-shaker";

export default defineConfig({
  plugins: [sveltekit(), tokenShaker()],
});
