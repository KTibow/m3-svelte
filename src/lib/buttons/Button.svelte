<script lang="ts">
  export let disabled = false;
  export let iconType: "none" | "left" | "full" = "none";
  export let type: "elevated" | "filled" | "tonal" | "outlined" | "text";
  export let display = "inline-flex";
  export let href = "";
</script>

{#if href}
  <a
    on:click|stopPropagation
    {href}
    {disabled}
    class="container md-label-large {type} icon-{iconType}"
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
    class="container md-label-large {type} icon-{iconType}"
    style="display: {display};"
    {...$$props}
  >
    <div class="layer tonal" />
    <div class="layer state" />
    <slot />
  </button>
{/if}

<style>
  .container {
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
  .container.icon-left {
    padding-left: 1rem;
  }
  .container.icon-full {
    width: 2.5rem;
    padding: 0;
  }
  .container:disabled {
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

  .container:not(:disabled).elevated {
    background-color: rgb(var(--md-sys-color-surface));
    --text: var(--md-sys-color-primary);
    box-shadow: var(--md-sys-elevation-1);
  }
  .container:not(:disabled).elevated > .layer.tonal {
    background-color: rgb(var(--text) / 0.05);
  }
  .container:not(:disabled).elevated:hover > .layer.tonal {
    background-color: rgb(var(--text) / 0.08);
  }
  .container:not(:disabled).elevated:hover {
    box-shadow: var(--md-sys-elevation-2);
  }

  .container:not(:disabled).filled {
    background-color: rgb(var(--md-sys-color-primary));
    --text: var(--md-sys-color-on-primary);
  }
  .container:not(:disabled).filled:hover {
    box-shadow: var(--md-sys-elevation-1);
  }

  .container:not(:disabled).tonal {
    background-color: rgb(var(--md-sys-color-secondary-container));
    --text: var(--md-sys-color-on-secondary-container);
  }
  .container:not(:disabled).tonal:hover {
    box-shadow: var(--md-sys-elevation-1);
  }

  .container.outlined {
    background-color: transparent;
    border: 1px solid rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  .container:not(:disabled).outlined {
    border: 1px solid rgb(var(--md-sys-color-outline));
    --text: var(--md-sys-color-primary);
  }

  .container.text {
    background-color: transparent;
    padding: 0 0.75rem;
    --text: var(--md-sys-color-primary);
  }
  .container.text.icon-left {
    padding-right: 1rem;
  }

  .container:not(:disabled):hover > .layer.state {
    background-color: rgb(var(--text) / 0.08);
  }
  .container:not(:disabled):focus-visible > .layer.state,
  .container:not(:disabled):active > .layer.state {
    background-color: rgb(var(--text) / 0.12);
  }
</style>
