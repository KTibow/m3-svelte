<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";

  export let minimalDemo: string;
  export let relevantLinks: { title: string; link: string }[];
</script>

<div class="anchor">
  <Highlight language={xml} code={minimalDemo} />

  {#each relevantLinks as { title, link }, i}
    <Button type={i == 0 ? "filled" : "tonal"} href={link}>{title}</Button>
  {/each}
</div>

<style>
  .anchor {
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem;
    gap: 0.5rem;

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
</style>
