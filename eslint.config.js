import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import { defineConfig } from "eslint/config";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["scripts/**"],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: { "no-undef": "off" },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "svelte/require-each-key": "off",
      "svelte/no-at-html-tags": "off",
      "svelte/no-useless-mustaches": "off",
      "svelte/no-navigation-without-resolve": "off",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "$lib",
              message: "Use specific imports from $lib/* to preserve CSS tree shaking",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "BinaryExpression[operator='===']",
          message: "Use == instead of ===",
        },
        {
          selector: "BinaryExpression[operator='!==']",
          message: "Use != instead of !==",
        },
      ],
    },
  },
);
