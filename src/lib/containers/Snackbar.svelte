<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import iconX from "@iconify-icons/ic/outline-close";
  import { slideFade } from "$lib/utils/animation";
  import { easeEmphasized } from "$lib/utils/easing";

  export let display = "flex";
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
  <div class="wrapper" in:slideFade={{ duration: 500, easing: easeEmphasized }} out:fade={{ duration: 100 }} style="display: {display};">
    <div class="m3-container" class:showClose>
      <p class="md-body-medium"><slot /></p>
      {#if action}
        <button
          class="action md-label-large"
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
  </div>
{/if}

<style>
  .wrapper {
    position: relative;
    z-index: 3;
  }
  .m3-container {
    display: flex;
    min-width: 20rem;
    max-width: 60rem;
    min-height: 3rem;
    padding: 0 1rem;
    align-items: center;
    box-shadow: var(--md-sys-elevation-3);
    background-color: rgb(var(--md-sys-color-inverse-surface));
    color: rgb(var(--md-sys-color-inverse-on-surface));
    border-radius: 0.25rem;
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
    transition: all 150ms;
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
    --text: var(--md-sys-color-inverse-primary);
    padding: 0 0.5rem;
  }
  .closeIcon {
    --text: var(--md-sys-color-inverse-on-surface);
    padding: 0 0.75rem;
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
