<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import { snackbar } from "$lib/containers/Snackbar.svelte";
  import Icon from "$lib/misc/Icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";
  import Highlight from "svelte-highlight";
  import javascript from "svelte-highlight/languages/javascript";
  import css from "svelte-highlight/languages/css";
  import xml from "svelte-highlight/languages/xml";

  let { name, code, lang }: { name?: string; code: string; lang: string } = $props();

  let language = $derived.by(() => {
    const result = {
      javascript,
      css,
      xml,
    }[lang];
    if (!result) {
      throw new Error(`Language "${lang}" not supported`);
    }
    return result;
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    snackbar("Text copied to clipboard", undefined, true, 2000);
  }
</script>

<div class="snippet">
  {#if name}
    <p class="name">{name}</p>
  {/if}
  <div class="button-container">
    <Button variant="text" onclick={copyToClipboard} iconType="full">
      <Icon icon={iconCopy} />
    </Button>
  </div>
  <Highlight {language} {code} />
</div>

<style>
  .snippet {
    background-color: var(--m3c-surface-container-high);
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
      background: transparent;
      white-space: pre-wrap;
    }
  }
</style>
