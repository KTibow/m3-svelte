<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAnchorAttributes & HTMLButtonAttributes = {};
  export let iconType: "none" | "left" | "full" = "none";
  export let type: "elevated" | "filled" | "tonal" | "outlined" | "text";
  export let href = "";
  export let disabled = false;
  $: if (href && disabled) console.warn("links cant be disabled");
</script>

{#if href}
  <a
    on:click|stopPropagation
    {href}
    class="m3-container m3-font-label-large {type} icon-{iconType}"
    style="display: {display};"
    {...extraOptions}
  >
    <div class="layer tonal" />
    <div class="layer state" />
    <slot />
  </a>
{:else}
  <button
    on:click|stopPropagation
    {disabled}
    class="m3-container m3-font-label-large {type} icon-{iconType}"
    style="display: {display};"
    {...extraOptions}
  >
    <div class="layer tonal" />
    <div class="layer state" />
    <slot />
  </button>
{/if}

<style>
  .m3-container {
    border: none;
    height: 2.5rem;
    padding: 0 1.5rem;
    border-radius: 2.5rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: rgb(var(--text));
    transition: all 200ms;
  }
  .m3-container.icon-left {
    padding-left: 1rem;
  }
  .m3-container.icon-full {
    width: 2.5rem;
    padding: 0;
  }
  .m3-container:disabled {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    box-shadow: var(--m3-util-elevation-0);
    cursor: auto;
  }
  .m3-container > :global(*) {
    flex-shrink: 0;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 200ms;
  }

  .icon-left > :global(svg) {
    width: 18px;
    height: 18px;
  }
  .icon-full > :global(svg) {
    width: 24px;
    height: 24px;
  }

  .m3-container:not(:disabled).elevated {
    background-color: rgb(var(--m3-scheme-surface));
    --text: var(--m3-scheme-primary);
    box-shadow: var(--m3-util-elevation-1);
  }
  .m3-container:not(:disabled).elevated > .layer.tonal {
    background-color: rgb(var(--text) / 0.05);
  }
  .m3-container:not(:disabled).elevated:hover > .layer.tonal {
    background-color: rgb(var(--text) / 0.08);
  }
  .m3-container:not(:disabled).elevated:hover {
    box-shadow: var(--m3-util-elevation-2);
  }

  .m3-container:not(:disabled).filled {
    background-color: rgb(var(--m3-scheme-primary));
    --text: var(--m3-scheme-on-primary);
  }
  .m3-container:not(:disabled).filled:hover {
    box-shadow: var(--m3-util-elevation-1);
  }

  .m3-container:not(:disabled).tonal {
    background-color: rgb(var(--m3-scheme-secondary-container));
    --text: var(--m3-scheme-on-secondary-container);
  }
  .m3-container:not(:disabled).tonal:hover {
    box-shadow: var(--m3-util-elevation-1);
  }

  .m3-container.outlined {
    background-color: transparent;
    border: 1px solid rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  .m3-container:not(:disabled).outlined {
    border: 1px solid rgb(var(--m3-scheme-outline));
    --text: var(--m3-scheme-primary);
  }

  .m3-container.text {
    background-color: transparent;
    padding: 0 0.75rem;
    --text: var(--m3-scheme-primary);
  }
  .m3-container.text.icon-left {
    padding-right: 1rem;
  }

  .m3-container:not(:disabled):hover > .layer.state {
    background-color: rgb(var(--text) / 0.08);
  }
  .m3-container:not(:disabled):focus-visible > .layer.state,
  .m3-container:not(:disabled):active > .layer.state {
    background-color: rgb(var(--text) / 0.12);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media (forced-colors: active) {
    .m3-container:is(.elevated, .filled, .tonal) {
      background-color: transparent;
      border: 1px solid;
    }
    .m3-container:disabled {
      opacity: 0.38;
    }
    a.m3-container {
      color: buttontext;
    }
  }
</style>
