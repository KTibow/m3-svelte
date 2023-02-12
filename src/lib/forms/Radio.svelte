<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  /** used to identify the radio button */
  export let value: string;
  /** also used to make only one radio button selectable */
  export let name: string;
  /** mutable variable, contains the current radio's value */
  export let group: string;
  export let disabled = false;
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  <input type="radio" {disabled} {value} {name} bind:group {...extraInputOptions} />
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
    transform: translate(-50%, -50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 3rem;
    transition: all 200ms;
    cursor: pointer;
    --color: var(--m3-scheme-on-surface-variant);
    -webkit-tap-highlight-color: transparent;
  }
  input {
    width: 1.25rem;
    height: 1.25rem;
    margin: 0;
    appearance: none;
    --color: var(--m3-scheme-on-surface-variant);
  }
  input::before {
    width: 1.25rem;
    height: 1.25rem;
    display: inline-block;
    content: " ";
    border-radius: 1.25rem;
    transition: all 200ms;

    padding: 0.5rem;
    border: solid 2px rgb(var(--color));
    background-color: rgb(var(--color));
    background-clip: content-box;
  }
  input:focus-visible {
    --color: var(--m3-scheme-on-surface);
  }
  @media (hover: hover) {
    input:hover {
      --color: var(--m3-scheme-on-surface);
    }
    input:hover + .layer {
      --color: var(--m3-scheme-on-surface);
      background-color: rgb(var(--color) / 0.08);
    }
  }
  input:active + .layer,
  input:focus-visible + .layer {
    background-color: rgb(var(--color) / 0.12);
  }

  input:checked,
  input:checked + .layer {
    --color: var(--m3-scheme-primary);
  }
  input:checked::before {
    padding: 3px;
  }
  input:disabled {
    --color: var(--m3-scheme-on-surface) / 0.38;
  }
  input:disabled + .layer {
    display: none;
  }
</style>
