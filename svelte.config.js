import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: { runes: true },
  kit: {
    adapter: adapter(),
    paths: {
      relative: false,
    },
    prerender: {
      handleHttpError: "warn",
    },
  },
};

export default config;
