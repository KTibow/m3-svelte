<script lang="ts">
  import { Button, Snackbar, type SnackbarIn } from "$lib";
  import Icon from "$lib/misc/_icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  export let code: string;

  let snackbar: (data: SnackbarIn) => void;

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
    snackbar({ closable: true, message: "Text copied to clipboard", timeout: 2000 });
  }
</script>

<div class="snippet">
  <div class="button-container">
    <Button on:click={copyToClipboard} type="text" iconType="full">
      <Icon icon={iconCopy} />
    </Button>
    <svelte:component this={Snackbar} bind:show={snackbar} />
  </div>
  <pre>{code}</pre>
</div>

<style>
  .snippet {
    width: 100%;
    position: relative;
  }

  pre {
    border-radius: var(--m3-util-rounding-large);
    background-color: rgb(var(--m3-scheme-surface-container));
    margin: 0;
    height: fit-content;
    width: 100%;
    padding-inline-start: 1rem;
    box-sizing: border-box;
    padding-block: 1rem;
    word-break: break-word;
    white-space: pre-wrap;
    min-height: 3.5rem;
  }

  .button-container {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
</style>
