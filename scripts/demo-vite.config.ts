import { defineConfig } from "vite";
import { functionsMixins } from "vite-plugin-functions-mixins";

export default defineConfig({
  plugins: [/* your existing plugins */ functionsMixins({ deps: ["m3-svelte"] })],
});
