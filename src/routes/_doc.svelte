<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";

  let {
    name,
    minimalDemo,
    relevantLinks,
  }: {
    name: string;
    minimalDemo: string;
    relevantLinks: { title: string; link: string }[];
  } = $props();

  let demoURL = $derived(
    `https://github.com/KTibow/m3-svelte/blob/main/src/demos.md#${name.toLowerCase().replaceAll(" ", "-")}`,
  );
</script>

<div class="anchor">
  <Highlight language={xml} code={minimalDemo} />
  <a href={demoURL}>Full demo code ↗</a>
  {#each relevantLinks as { title, link }, i}
    <a href={link}>{title} ↗</a>
  {/each}
</div>

<style>
  .anchor {
    display: flex;
    flex-direction: column;
    padding-inline: 1.5rem;
    padding-bottom: 1.5rem;
    flex-grow: 1;

    :global {
      pre {
        margin: 0;
      }
      code {
        padding: 0;
        background: transparent;
        white-space: pre-wrap;
      }
    }
  }

  a {
    font-family: monospace;
    color: var(--m3c-on-surface-variant);
    &:hover {
      color: var(--m3c-primary);
    }
  }
</style>
