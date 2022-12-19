<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconChecked from "@iconify-icons/ic/outline-check";

  export let disabled = false;
  export let checked = false;
  export let display = "inline-flex";
  let checkbox: HTMLElement;
</script>

<div class="container" style="display: {display};">
  <input type="checkbox" {...$$props} bind:checked {disabled} bind:this={checkbox} />
  {#if checked}
    <Icon icon={iconChecked} />
  {/if}
  <!-- svelte-ignore a11y-click-events-have-key-events (if you have a better idea lmk) -->
  <div class="layer" on:click={checkbox.click} />
</div>

<style>
  .container {
    position: relative;
  }
  .layer {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
    transition: all 150ms;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .container :global(svg) {
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
    width: 1rem;
    height: 1rem;
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

  .container:hover > input:not(:checked):not(:disabled)::before {
    border-color: rgb(var(--md-sys-color-on-surface));
  }
  .layer:hover {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  input:checked + .layer:hover {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
  }

  input:not(:checked):not(:disabled):focus::before {
    border-color: rgb(var(--md-sys-color-on-surface));
  }
  input:focus + .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  input:focus:checked + .layer {
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
