<script lang="ts">
  // TODO: better icon support
  export let disabled = false;
  export let type: "elevated" | "filled" | "tonal" | "outlined" | "text";
  export let display = "inline-flex";
</script>

<button
  on:click|stopPropagation
  {...$$props}
  {disabled}
  class="md-label-large {type}"
  style="display: {display};"
>
  <div class="layer" />
  <slot />
</button>

<style>
  button {
    border: none;
    height: 2.5rem;
    padding: 0 1.5rem;
    border-radius: 1.25rem;
    transition: all 150ms;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    align-items: center;
    gap: 0.5rem;
  }
  button:disabled {
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

  button:enabled.elevated {
    background-color: rgb(var(--md-sys-color-surface));
    color: rgb(var(--md-sys-color-primary));
    box-shadow: var(--md-sys-elevation-1);
  }
  button:enabled.elevated:hover {
    box-shadow: var(--md-sys-elevation-2);
  }
  button:enabled.elevated:hover > .layer {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
  }

  button:enabled.filled {
    background-color: rgb(var(--md-sys-color-primary));
    color: rgb(var(--md-sys-color-on-primary));
  }
  button:enabled.filled:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  button:enabled.filled:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-primary) / 0.08);
  }

  button:enabled.tonal {
    background-color: rgb(var(--md-sys-color-secondary-container));
    color: rgb(var(--md-sys-color-on-secondary-container));
  }
  button:enabled.tonal:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  button:enabled.tonal:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container) / 0.08);
  }

  button.outlined {
    background-color: transparent;
    border: 1px solid rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  button:enabled.outlined {
    border: 1px solid rgb(var(--md-sys-color-outline));
    color: rgb(var(--md-sys-color-primary));
  }
  button:enabled.outlined:hover > .layer {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
  }

  button.text {
    background-color: transparent;
    padding: 0 0.75rem;
  }
  button:enabled.text {
    color: rgb(var(--md-sys-color-primary));
  }
  button:enabled.text:hover > .layer {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
  }

  button:enabled:focus > .layer,
  button:enabled:active > .layer {
    background-color: rgb(var(--md-sys-color-primary) / 0.12);
  }
</style>
