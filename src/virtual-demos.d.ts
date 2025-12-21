declare module "virtual:demo/*" {
  import type { Component } from "svelte";
  const component: Component<{
    showCode: (
      name: string,
      minimalDemo: string,
      relevantLinks: { title: string; link: string }[],
    ) => void;
  }>;
  export default component;
}
