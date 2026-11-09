<script lang="ts">
  import iconX from "@ktibow/iconset-material-symbols/close";
  import Button from "#lib/buttons/Button.svelte";
  import Icon from "#lib/misc/Icon.svelte";
  import { page } from "$app/state";

  let dialog: HTMLDialogElement | undefined = $state();
  // Stays mounted after the first open, so reopening keeps the chosen variant.
  let loaded = $state(false);

  $effect(() => {
    if (!dialog) return;
    if (page.state.themeModal) {
      loaded = true;
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  });

  // Every way of closing goes through history, so Back and the URL stay correct.
  const close = () => {
    if (page.state.themeModal) history.back();
  };
</script>

<dialog bind:this={dialog} closedby="any" aria-labelledby="theme-modal-title" onclose={close}>
  <header>
    <h2 id="theme-modal-title">Theme</h2>
    <Button variant="text" iconType="full" title="Close" onclick={close}>
      <Icon icon={iconX} />
    </Button>
  </header>
  {#if loaded}
    {#await import("./ThemeEditor.svelte") then { default: ThemeEditor }}
      <ThemeEditor />
    {/await}
  {/if}
</dialog>

<style>
  dialog {
    box-sizing: border-box;
    width: min(64rem, 100% - 3rem);
    max-width: none;
    max-height: calc(100dvh - 3rem);
    margin: auto;
    padding: 1rem 1.5rem 1.5rem;
    overflow: auto;
    border: none;
    border-radius: var(--m3-shape-extra-large);
    background-color: var(--m3c-surface);
    color: var(--m3c-on-surface);
    @media (width < 37.5rem) {
      width: 100%;
      height: 100dvh;
      max-height: none;
      border-radius: 0;
      padding: 0.5rem 1rem 1rem;
    }
  }
  dialog[open] {
    display: flex;
    flex-direction: column;
    --theme-editor-gap: 1rem;
  }
  dialog::backdrop {
    background-color: --translucent(var(--m3c-scrim), 0.3);
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  h2 {
    @apply --m3-title-large;
    margin: 0;
  }
</style>
