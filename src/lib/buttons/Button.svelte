<script lang="ts">
  export let disabled = false;
  export let iconType: "none" | "left" | "full" = "none";
  export let type: "elevated" | "filled" | "tonal" | "outlined" | "text";
  export let display = "inline-flex";
  export let href = "";
  $: if (href && disabled) console.warn("links cant be disabled");
</script>

{#if href}
  <a
    on:click|stopPropagation
    {href}
    class="m3-container md-label-large {type} icon-{iconType}"
    style="display: {display};"
    {...$$props}
  >
    <div class="layer tonal" />
    <div class="layer state" />
    <slot />
  </a>
{:else}
  <button
    on:click|stopPropagation
    {disabled}
    class="m3-container md-label-large {type} icon-{iconType}"
    style="display: {display};"
    {...$$props}
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
    transition: all 150ms;
  }
  .m3-container.icon-left {
    padding-left: 1rem;
  }
  .m3-container.icon-full {
    width: 2.5rem;
    padding: 0;
  }
  .m3-container:disabled {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
    color: rgb(var(--md-sys-color-on-surface) / 0.38);
    box-shadow: var(--md-sys-elevation-0);
    cursor: auto;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
  }

  .m3-container:not(:disabled).elevated {
    background-color: rgb(var(--md-sys-color-surface));
    --text: var(--md-sys-color-primary);
    box-shadow: var(--md-sys-elevation-1);
  }
  .m3-container:not(:disabled).elevated > .layer.tonal {
    background-color: rgb(var(--text) / 0.05);
  }
  .m3-container:not(:disabled).elevated:hover > .layer.tonal {
    background-color: rgb(var(--text) / 0.08);
  }
  .m3-container:not(:disabled).elevated:hover {
    box-shadow: var(--md-sys-elevation-2);
  }

  .m3-container:not(:disabled).filled {
    background-color: rgb(var(--md-sys-color-primary));
    --text: var(--md-sys-color-on-primary);
  }
  .m3-container:not(:disabled).filled:hover {
    box-shadow: var(--md-sys-elevation-1);
  }

  .m3-container:not(:disabled).tonal {
    background-color: rgb(var(--md-sys-color-secondary-container));
    --text: var(--md-sys-color-on-secondary-container);
  }
  .m3-container:not(:disabled).tonal:hover {
    box-shadow: var(--md-sys-elevation-1);
  }

  .m3-container.outlined {
    background-color: transparent;
    border: 1px solid rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  .m3-container:not(:disabled).outlined {
    border: 1px solid rgb(var(--md-sys-color-outline));
    --text: var(--md-sys-color-primary);
  }

  .m3-container.text {
    background-color: transparent;
    padding: 0 0.75rem;
    --text: var(--md-sys-color-primary);
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
</style>
