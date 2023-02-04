<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import Icon from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let checked = false;
  export let disabled = false;
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  <input type="checkbox" bind:checked {disabled} {...extraInputOptions} />
  <Icon icon={iconCheck} />
  <div class="layer" />
</div>

<style>
  .m3-container {
    position: relative;
  }
  .layer {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 3rem;
    cursor: pointer;
    --color: var(--m3-scheme-on-surface-variant);
  }
  .m3-container :global(svg) {
    width: 100%;
    height: 100%;
    color: rgb(var(--m3-scheme-on-primary));
    opacity: 0;
  }
  .layer,
  .m3-container :global(svg) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: all 200ms;
  }
  input {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0;
    appearance: none;
    --color: var(--m3-scheme-on-surface-variant);
  }
  input::before {
    width: 1.125rem;
    height: 1.125rem;
    display: inline-block;
    content: " ";
    border-radius: 0.125rem;
    transition: all 200ms;

    background-clip: content-box;
    border: solid 0.125rem rgb(var(--color));
  }

  input:hover,
  input:focus-visible {
    --color: var(--m3-scheme-on-surface);
  }
  input:hover ~ .layer {
    --color: var(--m3-scheme-on-surface);
    background-color: rgb(var(--color) / 0.08);
  }
  input:active ~ .layer,
  input:focus-visible ~ .layer {
    background-color: rgb(var(--color) / 0.12);
  }
  input:checked::before,
  input:checked + .layer {
    --color: var(--m3-scheme-primary);
  }
  input:checked::before {
    background-color: rgb(var(--color));
  }
  input:checked + :global(svg) {
    opacity: 1;
  }
  input:disabled::before {
    --color: var(--m3-scheme-on-surface) / 0.38;
  }
  input:disabled + :global(svg) {
    color: rgb(var(--m3-scheme-surface));
  }
  input:disabled ~ .layer {
    display: none;
  }
</style>
