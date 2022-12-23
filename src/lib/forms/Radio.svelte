<script lang="ts">
  export let disabled = false;
  export let value: string;
  export let display = "inline-flex";
  export let group: string;
  let radio: HTMLElement;
</script>

<div class="container" style="display: {display};">
  <input type="radio" {...$$props} {value} {disabled} bind:this={radio} bind:group />
  <!-- svelte-ignore a11y-click-events-have-key-events (if you have a better idea lmk) -->
  <div class="layer" on:click={radio.click} />
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
  input {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    appearance: none;
  }
  input::before {
    width: 0;
    height: 0;
    padding: 0.5rem;
    border-radius: 100%;
    content: " ";
    border: solid 0.125rem rgb(var(--md-sys-color-on-surface-variant));
    display: inline-block;
    background-clip: content-box;
    transition: all 150ms;
  }
  input:checked::before {
    border-color: rgb(var(--md-sys-color-primary));
    background-color: rgb(var(--md-sys-color-primary));
    width: 0.75rem;
    height: 0.75rem;
    padding: 0.125rem;
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
