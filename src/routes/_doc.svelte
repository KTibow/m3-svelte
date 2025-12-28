<script lang="ts">
  let {
    name,
    minimalDemoHtml,
    relevantLinks,
  }: {
    name: string;
    minimalDemoHtml: string;
    relevantLinks: { title: string; link: string }[];
  } = $props();

  let demoURL = $derived(
    `https://github.com/KTibow/m3-svelte/blob/main/src/demos.md#${name
      .toLowerCase()
      .replaceAll(" ", "-")
      .replace(/[^a-z0-9-]/g, "")}`,
  );
</script>

<div class="anchor">
  {@html minimalDemoHtml}
  <a href={demoURL}>Full demo code ↗</a>
  {#each relevantLinks as { title, link }}
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
