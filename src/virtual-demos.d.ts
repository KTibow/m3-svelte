declare module "virtual:demo" {
  import type { Component } from "svelte";
  type Demo = Component<{
    showCode: (
      name: string,
      minimalDemo: string,
      relevantLinks: { title: string; link: string }[],
    ) => void;
  }>;
  const components: Demo[];
  export default components;
}
