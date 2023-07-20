import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import glob from "fast-glob";

const entries = Object.fromEntries(
  glob
    .sync("./src/lib/**/*.svelte", {
      ignore: ["./src/lib/**/_*.svelte", "./src/lib/**/_**/*.svelte"],
    })
    .map((entry) => [entry.slice(10).slice(0, -7), entry]),
);

export default defineConfig({
  build: {
    outDir: "package-components",
    lib: {
      entry: entries,
      formats: ["es"],
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  resolve: {
    alias: {
      $lib: resolve(__dirname, "src/lib"),
    },
  },
});
