<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import { snackbar } from "$lib/containers/Snackbar.svelte";
  import Icon from "$lib/misc/Icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  let { name, html }: { name?: string; html: string } = $props();

  function copyToClipboard(e: Event) {
    const code =
      (e.currentTarget as HTMLElement).closest(".snippet")?.querySelector("pre")?.innerText ?? "";
    navigator.clipboard.writeText(code);
    snackbar("Text copied to clipboard", undefined, true, 2000);
  }
</script>

<div class="snippet">
  {#if name}
    <p class="name">{name}</p>
  {/if}
  <div class="button-container">
    <Button variant="text" onclick={copyToClipboard} iconType="full" title="Copy">
      <Icon icon={iconCopy} />
    </Button>
  </div>
  {@html html}
</div>

<style>
  .snippet {
    background-color: var(--m3c-surface-container);
    border-radius: var(--m3-shape-large);
    padding: 1rem;

    width: 100%;
    min-height: 3.5rem;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .name {
    margin: -1rem -1rem 1rem -1rem;
    padding: 0.5rem 1rem;
  }

  .button-container {
    position: absolute;
    top: 0;
    right: 0.25rem;
  }

  .snippet :global {
    pre {
      margin: 0;
    }
    code {
      padding: 0;
      white-space: pre-wrap;
    }
  }
</style>
