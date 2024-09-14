<script>
  import { browser } from "$app/environment";
  import Button from "$lib/buttons/Button.svelte";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Icon from "$lib/misc/_icon.svelte";
  import iconCode from "@ktibow/iconset-material-symbols/code";
  import Highlight from "svelte-highlight";
  import xmlLanguage from "svelte-highlight/languages/xml";
  import github from "svelte-highlight/styles/github";
  import githubDark from "svelte-highlight/styles/github-dark";

  /** @type {string} */
  export let title = "";
  /** @type {string} */
  export let code = "";
  let showCode = false;

  $: mediaPrefersDark = browser && window.matchMedia("(prefers-color-scheme: dark)");
</script>

<svelte:head>
  {#if mediaPrefersDark}
    {@html githubDark}
  {:else}
    {@html github}
  {/if}
</svelte:head>

<div class="container">
  <div class="content">
    <div>
      <Button type="text" on:click={() => (showCode = true)}>
        <Icon icon={iconCode} width="1.5em" height="1.5em" />
      </Button>
      <Dialog icon={iconCode} headline="Source Code" bind:open={showCode}>
        <div class="highlight">
          <Highlight language={xmlLanguage} {code} />
        </div>
        <svelte:fragment slot="buttons">
          <Button type="tonal" on:click={() => (showCode = false)}>Close</Button>
        </svelte:fragment>
      </Dialog>
    </div>
    <h2 class="m3-font-headline-large">{title}</h2>
    <slot />
  </div>
  <div class="content">
    <slot name="demo" />
  </div>
</div>

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 1rem;
    background-color: rgb(var(--m3-scheme-surface-container));
    color: rgb(var(--m3-scheme-on-surface));
  }
  .content:first-child {
    flex-grow: 1;
    border-radius: 1.5rem 1.5rem 0.5rem 0.5rem;
  }
  .content:last-child {
    border-radius: 0.5rem 0.5rem 1.5rem 1.5rem;
  }
  .highlight {
    border-radius: var(--m3-card-shape);
    overflow: hidden;
  }
  .highlight :global(pre) {
    margin: 0;
  }
</style>
