<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import type { HTMLAttributes } from "svelte/elements";
  import Icon from "@iconify/svelte";
  import iconX from "@iconify-icons/ic/outline-close";
  import { enterExit } from "$lib/utils/animation";
  import { easeEmphasizedDecel } from "$lib/utils/easing";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  export let open = false;
  export let action: string | null = null;
  export let showClose = false;
  export let timeout = 4000;
  const dispatch = createEventDispatcher();
  let currentTimeout: ReturnType<typeof setTimeout>;
  $: if (open) {
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
      open = false;
      dispatch("closed", { method: "timeout" });
    }, timeout);
  }
</script>

{#if open}
  <div
    class="m3-container"
    in:enterExit={{ duration: 400, start: "bottom", easing: easeEmphasizedDecel }}
    out:fade={{ duration: 200 }}
    style="display: {display};"
    class:showClose
    {...extraOptions}
  >
    <p class="m3-font-body-medium"><slot /></p>
    {#if action}
      <button
        class="action m3-font-label-large"
        on:click={() => {
          open = false;
          dispatch("closed", { method: "action" });
        }}
      >
        {action}
      </button>
    {/if}
    {#if showClose}
      <button
        class="closeIcon"
        on:click={() => {
          open = false;
          dispatch("closed", { method: "closeIcon" });
        }}
      >
        <Icon icon={iconX} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .m3-container {
    display: flex;
    min-width: 20rem;
    max-width: 60rem;
    min-height: 3rem;
    padding: 0 1rem;
    align-items: center;
    box-shadow: var(--m3-util-elevation-3);
    background-color: rgb(var(--m3-scheme-inverse-surface));
    color: rgb(var(--m3-scheme-inverse-on-surface));
    border-radius: 0.25rem;
    position: relative;
    z-index: 3;
  }
  .showClose {
    padding-right: 0;
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
    cursor: pointer;
    transition: all 200ms;
    -webkit-tap-highlight-color: transparent;
  }
  button:hover {
    background-color: rgb(var(--text) / 0.08);
  }
  button:focus-visible,
  button:active {
    background-color: rgb(var(--text) / 0.12);
  }
  p + * {
    margin-left: auto;
  }
  .action {
    --text: var(--m3-scheme-inverse-primary);
    padding: 0 0.5rem;
  }
  .closeIcon {
    --text: var(--m3-scheme-inverse-on-surface);
    padding: 0 0.75rem;
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media screen and (forced-colors: active) {
    .m3-container {
      outline: solid 2px;
    }
  }
</style>
