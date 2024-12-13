<script lang="ts">
  import { Button, Snackbar, type SnackbarIn } from "$lib";
  import Icon from "$lib/misc/_icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";
  import Highlight from "svelte-highlight";
  import type { LanguageType } from "svelte-highlight/languages";
  import javascript from "svelte-highlight/languages/javascript";
  import css from "svelte-highlight/languages/css";
  import xml from "svelte-highlight/languages/xml";

  export let code: string;
  export let name: string | undefined;
  export let lang: string;

  let snackbar: (data: SnackbarIn) => void;

  const languageType = {
    javascript,
    css,
    xml,
  }[lang];
  if (!languageType) {
    throw new Error(`Language "${lang}" not supported`);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    snackbar({ closable: true, message: "Text copied to clipboard", timeout: 2000 });
  }
</script>

<div class="snippet">
  {#if name}
    <p class="name">{name}</p>
  {/if}
  <div class="button-container">
    <Button on:click={copyToClipboard} type="text" iconType="full">
      <Icon icon={iconCopy} />
    </Button>
    <Snackbar bind:show={snackbar} />
  </div>
  <Highlight language={languageType} {code} />
</div>

<style>
  .snippet {
    background-color: rgb(var(--m3-scheme-surface-container-high));
    border-radius: var(--m3-util-rounding-large);
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
    }
  }
</style>
