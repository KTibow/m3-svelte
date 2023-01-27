<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let disabled = false;
  export let name: string;
  export let value: string;
  export let group: string;
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  <input type="radio" {value} {disabled} {name} bind:group {...extraInputOptions} />
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
    transition: all 200ms;
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
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.5rem;
    border-radius: 100%;
    content: " ";
    background-color: rgb(var(--md-sys-color-primary));
    border: solid 0.125rem rgb(var(--md-sys-color-on-surface-variant));
    display: inline-block;
    background-clip: content-box;
    transition: all 200ms;
  }
  input:checked::before {
    border-color: rgb(var(--md-sys-color-primary));
    padding: 0.125rem;
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
