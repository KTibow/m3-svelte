<script lang="ts">
  import { snackbar } from "$lib/containers/Snackbar.svelte";
  import Icon from "$lib/misc/Icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  let { name, html }: { name: string; html: string } = $props();

  function copyToClipboard(e: Event) {
    const code =
      (e.currentTarget as HTMLElement).closest(".snippet")?.querySelector("pre")?.innerText ?? "";
    navigator.clipboard.writeText(code);
    snackbar("Code copied", undefined, true, 1000);
  }
</script>

<div class="snippet">
  <button class="tags m3-layer" onclick={copyToClipboard} title="Copy">
    {name}
    <Icon icon={iconCopy} size={20} />
  </button>
  {@html html}
</div>

<style>
  .snippet {
    background-color: var(--m3c-surface-container);
    border-radius: var(--m3-shape-large);

    width: 100%;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .tags {
    display: flex;
    height: 2.5rem;
    align-items: center;

    gap: 0.5rem;
    padding-inline: 1rem;

    position: absolute;
    top: 0;
    right: 0;
    border-radius: var(--m3-shape-large);
    background-color: var(--m3c-surface-container);
    box-shadow: var(--m3c-surface) 0 0 0 0.25rem;

    @apply --m3-body-medium;
    border: none;
    cursor: pointer;
    > :global(svg) {
      color: var(--m3c-primary);
    }
  }

  .snippet :global {
    pre {
      margin: 0;
      padding: 1rem 7rem 1rem 1rem;
    }
    code {
      padding: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
</style>
