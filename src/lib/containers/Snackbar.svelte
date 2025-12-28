<script module lang="ts">
  export const snackbar = (
    message: string,
    actions?: Record<string, () => void>,
    closable?: boolean,
    /*
    undefined/unset -> 4s timeout
    2000 -> 2s timeout
    -1 -> no timeout
    */
    timeout?: number,
  ) => {
    _show(message, actions, closable, timeout);
  };
  let _show: typeof snackbar;
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import Icon from "$lib/misc/Icon.svelte";
  import SnackbarItem from "./SnackbarItem.svelte";

  let { closeTitle = "Close" }: { closeTitle?: string } = $props();
  let shown:
    | { message: string; actions: Record<string, () => void>; closable: boolean }
    | undefined = $state();
  let timeoutId: ReturnType<typeof setTimeout>;
  _show = (message, actions = {}, closable = false, timeout = 4000) => {
    clearTimeout(timeoutId);
    shown = { message, actions, closable };
    if (timeout && timeout > 0)
      timeoutId = setTimeout(() => {
        shown = undefined;
      }, timeout);
  };
  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

{#if shown}
  <div class="holder" out:fade={{ duration: 200 }}>
    {#key shown}
      <SnackbarItem>
        <p>{shown.message}</p>
        {#each Object.entries(shown.actions) as [key, action]}
          <button
            type="button"
            class="action"
            onclick={() => {
              shown = undefined;
              action();
            }}
          >
            {key}
          </button>
        {/each}
        {#if shown.closable}
          <button
            type="button"
            class="close m3-layer"
            title={closeTitle}
            onclick={() => {
              shown = undefined;
            }}
          >
            <Icon icon={iconX} />
          </button>
        {/if}
      </SnackbarItem>
    {/key}
  </div>
{/if}

<style>
  .holder {
    position: fixed;
    padding-bottom: 1rem;
    bottom: var(--m3v-bottom-offset, 0);
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 3;
  }
  p {
    @apply --m3-body-medium;
    margin-right: auto;
  }
  button {
    display: flex;
    align-self: stretch;
    align-items: center;
    margin: 0;
    padding: 0;
    border: none;

    background-color: transparent;
    color: unset;
    cursor: pointer;
  }
  button :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .action {
    @apply --m3-label-large;
    color: var(--m3c-inverse-primary);
    padding: 0 0.5rem;
  }
  .close {
    padding: 0 0.75rem;
    margin-right: -1rem;
  }
</style>
