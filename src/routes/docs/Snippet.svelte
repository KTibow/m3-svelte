<script lang="ts">
  import { Button, Snackbar, type SnackbarIn } from "$lib";
  import Icon from "$lib/misc/_icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  export let code: string;
  export let name: string | undefined;

  let snackbar: (data: SnackbarIn) => void;

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    snackbar({ closable: true, message: "Text copied to clipboard", timeout: 2000 });
  }
</script>

<div class="snippet">
  {#if name}
    <p>{name}</p>
  {/if}
  <div class="button-container">
    <Button on:click={copyToClipboard} type="text" iconType="full">
      <Icon icon={iconCopy} />
    </Button>
    <Snackbar bind:show={snackbar} />
  </div>
  <pre>{code}</pre>
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

  p {
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    margin: -1rem -1rem 1rem -1rem;
    padding: 0.5rem 1rem;
  }
  pre {
    margin: 0;
    width: 100%;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .button-container {
    position: absolute;
    top: 0;
    right: 0.25rem;
  }
</style>
