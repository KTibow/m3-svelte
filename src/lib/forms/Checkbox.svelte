<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconChecked from "@iconify-icons/ic/outline-check";

  export let disabled = false;
  export let checked = false;
  export let display = "inline-flex";
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};">
  <input type="checkbox" bind:checked {disabled} {...$$props} />
  {#if checked}
    <Icon icon={iconChecked} />
  {/if}
  <div class="layer" />
</div>

<style>
  .m3-container {
    position: relative;
  }
  .layer {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    transition: all 150ms;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .m3-container :global(svg) {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1rem;
    height: 1rem;
    transform: translate(-50%, -50%);
    color: rgb(var(--md-sys-color-on-primary));
  }
  input {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    appearance: none;
  }
  input::before {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.125rem;
    content: " ";
    border: solid 0.125rem rgb(var(--md-sys-color-on-surface-variant));
    display: inline-block;
    background-clip: content-box;
    transition: all 150ms;
  }
  input:checked::before {
    border-color: rgb(var(--md-sys-color-primary));
    background-color: rgb(var(--md-sys-color-primary));
  }

  .m3-container:hover > input:not(:checked):enabled::before {
    border-color: rgb(var(--md-sys-color-on-surface));
  }
  .layer:hover {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  input:checked + .layer:hover {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
  }

  input:not(:checked):enabled:focus-visible::before {
    border-color: rgb(var(--md-sys-color-on-surface));
  }
  input:focus-visible + .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  input:focus-visible:checked + .layer {
    background-color: rgb(var(--md-sys-color-primary) / 0.12);
  }

  .layer:active {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  input:checked + .layer:active {
    background-color: rgb(var(--md-sys-color-primary) / 0.12);
  }

  input:disabled + .layer {
    display: none;
  }
  input:disabled::before {
    border-color: rgb(var(--md-sys-color-on-surface) / 0.38);
  }
  input:disabled:checked:before {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.38);
  }
</style>
