<script lang="ts">
  export let display = "flex";
  export let type: "elevated" | "filled" | "outlined";
  export let clickable = false;
</script>

{#if clickable}
  <button class="m3-container type-{type}" style="display: {display};" on:click {...$$props}>
    <div class="layer tonal" />
    <div class="layer state" />
    <slot />
  </button>
{:else}
  <div class="m3-container type-{type}" style="display: {display};" {...$$props}>
    <div class="layer tonal" />
    <slot />
  </div>
{/if}

<style>
  .m3-container {
    border-radius: 0.75rem;
    padding: 1rem;
    position: relative;
    border: none;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    overflow: hidden;
    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface));
    transition: all 150ms;
  }
  .type-elevated {
    background-color: rgb(var(--md-sys-color-surface));
    box-shadow: var(--md-sys-elevation-1);
  }
  .type-filled {
    background-color: rgb(var(--md-sys-color-surface-variant));
  }
  .type-outlined {
    background-color: rgb(var(--md-sys-color-surface));
    border: solid 1px rgb(var(--md-sys-color-outline));
  }
  .type-elevated > .layer.tonal {
    background-color: rgb(var(--md-sys-color-primary) / 0.05);
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
    pointer-events: none;
  }
  button {
    font: inherit;
    cursor: pointer;
  }
  button:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  button.type-elevated:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  button:hover > .layer.state {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  button:focus-visible > .layer.state {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  button:active > .layer.state {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
</style>
