<script lang="ts">
  import ButtonLink from "$lib/buttons/ButtonLink.svelte";
  import Highlight from "svelte-highlight";
  import xml from "svelte-highlight/languages/xml";

  const { minimalDemo, relevantLinks = [] }: {
    minimalDemo: string,
    relevantLinks: { title: string; link: string }[]
  } = $props();
</script>

<div class="anchor">
  <Highlight language={xml} code={minimalDemo} />

  {#each relevantLinks as { title, link }, i}
    <ButtonLink type={i === 0 ? "filled" : "tonal"} href={link}>{title}</ButtonLink>
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
