<script context="module" lang="ts">
  export type SnackbarIn = {
    message: string;
    actions?: Record<string, () => void>;
    closable?: boolean;
    timeout?: number | null;
    /*
    timeout: undefined/unset -> 4s timeout
    timeout: null -> no timeout
    timeout: 2000 -> 2s timeout
    */
  };
</script>

<script lang="ts">
  import { onDestroy, type ComponentProps } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { fade } from "svelte/transition";
  import Icon from "$lib/misc/_icon.svelte";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import SnackbarItem from "./SnackbarItem.svelte";
  type SnackbarData = {
    message: string;
    actions: Record<string, () => void>;
    closable: boolean;
    timeout: number | null;
  };

  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: ComponentProps<SnackbarItem> = {};
  export const show = ({ message, actions = {}, closable = false, timeout = 4000 }: SnackbarIn) => {
    snackbar = { message, actions, closable, timeout };
    clearTimeout(timeoutId);
    if (timeout)
      timeoutId = setTimeout(() => {
        snackbar = undefined;
      }, timeout);
  };

  let snackbar: SnackbarData | undefined;
  let timeoutId: number;
  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

{#if snackbar}
  <div class="holder" out:fade={{ duration: 200 }} {...extraWrapperOptions}>
    <SnackbarItem {...extraOptions}>
      <p class="m3-font-body-medium">{snackbar.message}</p>
      {#each Object.entries(snackbar.actions) as [key, action]}
        <button
          class="action m3-font-label-large"
          on:click={() => {
            snackbar = undefined;
            action();
          }}
        >
          {key}
        </button>
      {/each}
      {#if snackbar.closable}
        <button
          class="close"
          on:click={() => {
            snackbar = undefined;
          }}
        >
          <Icon icon={iconX} />
        </button>
      {/if}
    </SnackbarItem>
  </div>
{/if}

<style>
  .holder {
    position: fixed;
    padding-bottom: 1rem;
    bottom: var(--m3-util-bottom-offset);
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 3;
  }
  p {
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
    color: rgb(var(--text));
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  button :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .action {
    --text: var(--m3-scheme-inverse-primary);
    padding: 0 0.5rem;
  }
  .close {
    --text: var(--m3-scheme-inverse-on-surface);
    padding: 0 0.75rem;
    margin-right: -1rem;
  }
  @media (hover: hover) {
    button:hover {
      background-color: rgb(var(--text) / 0.08);
    }
  }
  button:focus-visible,
  button:active {
    background-color: rgb(var(--text) / 0.12);
  }
</style>
