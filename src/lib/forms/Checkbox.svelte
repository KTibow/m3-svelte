<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let checked = false;
  export let disabled = false;
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  <input type="checkbox" bind:checked {disabled} {...extraInputOptions} />
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 4.83 13.41 L 9 17.585 L 19.59 7"
      fill="none"
      stroke="currentColor"
      stroke-width="1.41"
    />
  </svg>
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
  svg {
    width: 100%;
    height: 100%;
    color: rgb(var(--m3-scheme-on-primary));
  }
  path {
    stroke-dasharray: 20.874 20.874;
    opacity: 0;
    transition: all 200ms;
  }
  .layer,
  svg {
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
  input:checked ~ .layer {
    --color: var(--m3-scheme-primary);
  }
  input:checked::before {
    background-color: rgb(var(--color));
  }
  input:checked + svg > path {
    opacity: 1;
    animation: check 400ms;
  }
  input:disabled::before {
    --color: var(--m3-scheme-on-surface) / 0.38;
  }
  input:disabled + svg {
    color: rgb(var(--m3-scheme-surface));
  }
  input:disabled ~ .layer {
    display: none;
  }
  @keyframes check {
    0% {
      stroke-dashoffset: 20.874;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    input:checked::before {
      background-color: selecteditem;
      border-color: selecteditem;
    }
    input:disabled {
      opacity: 0.38;
    }
  }
</style>
