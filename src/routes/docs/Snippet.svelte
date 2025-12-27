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
    <Button variant="text" onclick={copyToClipboard} iconType="full" title="Copy">
      <Icon icon={iconCopy} />
    </Button>
  </div>
  <Highlight {language} {code} />
</div>

<style>
  :global {
    .hljs {
      color: light-dark(#24292e, #c9d1d9);
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      color: light-dark(#d73a49, #ff7b72);
    }

    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      color: light-dark(#6f42c1, #d2a8ff);
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-variable,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id {
      color: light-dark(#005cc5, #79c0ff);
    }

    .hljs-regexp,
    .hljs-string,
    .hljs-meta .hljs-string {
      color: light-dark(#032f62, #a5d6ff);
    }

    .hljs-built_in,
    .hljs-symbol {
      color: light-dark(#e36209, #ffa657);
    }

    .hljs-comment,
    .hljs-code,
    .hljs-formula {
      color: light-dark(#6a737d, #8b949e);
    }

    .hljs-name,
    .hljs-quote,
    .hljs-selector-tag,
    .hljs-selector-pseudo {
      color: light-dark(#22863a, #7ee787);
    }

    .hljs-subst {
      color: light-dark(#24292e, #c9d1d9);
    }

    .hljs-section {
      color: light-dark(#005cc5, #1f6feb);
      font-weight: bold;
    }

    .hljs-bullet {
      color: light-dark(#735c0f, #f2cc60);
    }

    .hljs-emphasis {
      color: light-dark(#24292e, #c9d1d9);
      font-style: italic;
    }

    .hljs-strong {
      color: light-dark(#24292e, #c9d1d9);
      font-weight: bold;
    }

    .hljs-addition {
      color: light-dark(#22863a, #aff5b4);
      background-color: light-dark(#f0fff4, #033a16);
    }

    .hljs-deletion {
      color: light-dark(#b31d28, #ffdcd7);
      background-color: light-dark(#ffeef0, #67060c);
    }
  }

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
