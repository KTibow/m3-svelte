<script>
  import Icon from "@iconify/svelte";

  export let color = "primary";
  export let size = "normal";
  export let elevation = "normal";
  export let icon = null;
  export let text = null;
  export let display = "inline-flex";
</script>

<button
  on:click
  {...$$props}
  class="md-label-large color-{color} size-{size} elevation-{elevation}"
  style="display: {display};"
>
  <div class="layer" />
  {#if icon}
    <Icon {icon} />
  {/if}
  {#if text}
    {text}
  {/if}
</button>

<style>
  button {
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    align-items: center;
    transition: all 150ms;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
    opacity: 0;
  }
  button:hover .layer {
    opacity: 0.08;
  }
  button:focus .layer,
  button:active .layer {
    opacity: 0.12;
  }
  .elevation-normal {
    box-shadow: var(--md-sys-elevation-3);
  }
  .elevation-normal:hover {
    box-shadow: var(--md-sys-elevation-4);
  }
  .elevation-lowered {
    box-shadow: var(--md-sys-elevation-1);
  }
  .elevation-lowered:hover {
    box-shadow: var(--md-sys-elevation-2);
  }
  .size-small {
    height: 2.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
    border-radius: 0.5rem;
  }
  .size-small > :global(svg),
  .size-normal > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .size-normal {
    height: 3.5rem;
    padding: 1rem;
    gap: 1rem;
    border-radius: 1rem;
  }
  .size-large {
    height: 6rem;
    padding: 1.875rem;
    gap: 1.875rem;
    border-radius: 1.875rem;
  }
  .size-large > :global(svg) {
    width: 2.25rem;
    height: 2.25rem;
  }
  .color-primary {
    background-color: rgb(var(--md-sys-color-primary-container));
    color: rgb(var(--md-sys-color-on-primary-container));
  }
  .color-primary .layer {
    background-color: rgb(var(--md-sys-color-on-primary-container));
  }
  .color-surface {
    background-color: rgb(var(--md-sys-color-surface));
    color: rgb(var(--md-sys-color-primary));
  }
  .color-surface .layer {
    background-color: rgb(var(--md-sys-color-primary));
  }
  .color-secondary {
    background-color: rgb(var(--md-sys-color-secondary-container));
    color: rgb(var(--md-sys-color-on-secondary-container));
  }
  .color-secondary .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container));
  }
  .color-tertiary {
    background-color: rgb(var(--md-sys-color-tertiary-container));
    color: rgb(var(--md-sys-color-on-tertiary-container));
  }
  .color-tertiary .layer {
    background-color: rgb(var(--md-sys-color-on-tertiary-container));
  }
</style>
