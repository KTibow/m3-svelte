<script module lang="ts">
  export type SnackbarIn = {
    message: string;
    actions?: Record<string, () => void>;
    closable?: boolean;
    /*
    timeout: undefined/unset -> 4s timeout
    timeout: null -> no timeout
    timeout: 2000 -> 2s timeout
    */
    timeout?: number | null;
  };
</script>

<script lang="ts">
  import { onDestroy, type ComponentProps } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { fade } from "svelte/transition";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import Icon from "$lib/misc/_icon.svelte";
  import SnackbarItem from "./SnackbarItem.svelte";
  import Layer from "$lib/misc/Layer.svelte";

  type SnackbarConfig = Omit<ComponentProps<typeof SnackbarItem>, "children">;

  let {
    config = {},
    closeButtonTitle = "Close",
    ...extra
  }: {
    config?: SnackbarConfig;
    closeButtonTitle?: string;
  } & HTMLAttributes<HTMLDivElement> = $props();
  export const show = ({ message, actions = {}, closable = false, timeout = 4000 }: SnackbarIn) => {
    snackbar = { message, actions, closable, timeout };
    clearTimeout(timeoutId);
    if (timeout)
      timeoutId = setTimeout(() => {
        snackbar = undefined;
      }, timeout);
  };

  let snackbar: Required<SnackbarIn> | undefined = $state();
  let timeoutId: number;
  onDestroy(() => {
    clearTimeout(timeoutId);
  });
</script>

{#if snackbar}
  <div class="holder" out:fade={{ duration: 200 }} {...extra}>
    {#key snackbar}
      <SnackbarItem {...config}>
        <p class="m3-font-body-medium">{snackbar.message}</p>
        {#each Object.entries(snackbar.actions) as [key, action]}
          <button
            type="button"
            class="action m3-font-label-large"
            onclick={() => {
              snackbar = undefined;
              action();
            }}
          >
            {key}
          </button>
        {/each}
        {#if snackbar.closable}
          <button
            type="button"
            class="close"
            title={closeButtonTitle}
            onclick={() => {
              snackbar = undefined;
            }}
          >
            <Layer />
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
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    position: relative;
  }
  button :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .action {
    color: var(--m3-scheme-inverse-primary);
    padding: 0 0.5rem;
  }
  .close {
    color: var(--m3-scheme-inverse-on-surface);
    padding: 0 0.75rem;
    margin-right: -1rem;
  }
</style>
