import globals from "globals";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";

const tsRules = {
  ...ts.configs["recommended"].rules,
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
    },
  ],
};
const ignores = [".svelte-kit/**/*", "node_modules/**/*", "package/**/*", "build/**/*"];

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
export default [
  {
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
      "no-regex-spaces": "off",
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
    },
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores,
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.ts"],
    plugins: {
      "@typescript-eslint": ts,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: tsRules,
    ignores,
  },
  {
    files: ["**/*.svelte"],
    plugins: {
      "@typescript-eslint": ts,
      svelte: svelte,
    },
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      ...tsRules,
      ...svelte.configs.base.overrides[0].rules,
      ...svelte.configs.recommended.rules,
      "svelte/no-at-html-tags": "off",
    },
    ignores,
  },
];
