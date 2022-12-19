<script lang="ts">
  export let display = "block";
  export let type: "elevated" | "filled" | "outlined";
  export let clickable = false;
</script>

{#if clickable}
  <button class="container type-{type} clickable" style="display: {display};" on:click>
    <div class="layer" />
    <slot />
  </button>
{:else}
  <div class="container type-{type}" style="display: {display};">
    <slot />
  </div>
{/if}

<style>
  .container {
    border-radius: 0.75rem;
    padding: 1rem;
    position: relative;
    border: none;
    text-align: left;
    overflow: hidden;
    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface));
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
    border: solid 1px rgb(var(--md-sys-color-border));
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
  }
  .clickable {
    cursor: pointer;
  }
  .clickable:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  .clickable.type-elevated:hover {
    box-shadow: var(--md-sys-elevation-1);
  }
  .clickable:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .clickable:focus > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  .clickable:active > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
</style>
