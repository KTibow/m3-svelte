<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import iconCheck from "@ktibow/iconset-material-symbols/check";
  import type { HTMLAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  export let checked = false;
  export let disabled = false;
  // MUST BE WRAPPED IN A <label>

  let startX: number | undefined;
  const handleMouseUp = (e: MouseEvent) => {
    if (!startX) return;
    const distance = e.clientX - startX;
    if (distance > 16 && !checked) checked = true;
    if (distance < -16 && checked) checked = false;
    startX = undefined;
  };
</script>

<svelte:window on:mouseup={handleMouseUp} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="m3-container"
  style="display: {display};"
  {...extraWrapperOptions}
  on:mousedown={(e) => {
    if (!disabled) {
      startX = e.clientX;
    }
  }}
>
  <input
    type="checkbox"
    role="switch"
    {disabled}
    bind:checked
    {...extraOptions}
    on:keydown={(e) => {
      if (e.code == "Enter") checked = !checked;
      if (e.code == "ArrowLeft") checked = false;
      if (e.code == "ArrowRight") checked = true;
    }}
  />
  <div class="layer">
    <Icon icon={iconCheck} />
  </div>
</div>

<style>
  @keyframes switch {
    0% {
      left: 0.5rem;
      width: 1.5rem;
    }
    20% {
      left: 0.75rem;
      width: 2.5rem;
      height: 1.25rem;
    }
    80% {
      width: 1.5rem;
      height: 1.52rem;
      left: 1.5rem;
    }
    100% {
      left: 1.5rem;
      width: 1.5rem;
    }
  }

  :root {
    --m3-switch-track-shape: var(--m3-util-rounding-full);
    --m3-switch-handle-shape: var(--m3-util-rounding-full);
  }
  .m3-container {
    position: relative;
    width: 3.25rem;
    height: 2rem;
  }
  input {
    appearance: none;
    width: 3.25rem;
    height: 2rem;
    margin: 0;
    border-radius: var(--m3-switch-track-shape);

    background-color: rgb(var(--m3-scheme-surface-container-highest));
    border: solid 0.125rem rgb(var(--m3-scheme-outline));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: all 300ms;
  }
  .layer {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: var(--m3-switch-handle-shape);

    background-color: rgb(var(--m3-scheme-outline));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    left: 0.5rem;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: transform;
    transition: 300ms cubic-bezier(0.271, -0.011, 0, 1.449);
  }
  .layer > :global(svg) {
    width: 1rem;
    height: 1rem;
    color: rgb(var(--m3-scheme-on-primary-container));
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0.271, -0.011, 0, 1.449);
  }
  .layer::before {
    content: " ";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--m3-util-rounding-full);
    transition: all 200ms;
  }

  .m3-container > input:checked + .layer {
    animation: switch 300ms cubic-bezier(0.271, -0.011, 0, 1.449);
  }

  .m3-container:hover > input:enabled + .layer,
  .m3-container > input:enabled:is(:active, :focus-visible) + .layer {
    background-color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .m3-container:hover > input:enabled:checked + .layer,
  .m3-container > input:enabled:checked:is(:active, :focus-visible) + .layer {
    background-color: rgb(var(--m3-scheme-primary-container));
  }
  .m3-container:hover > input + .layer::before {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
  }
  .m3-container:hover > input:checked + .layer::before {
    background-color: rgb(var(--m3-scheme-primary) / 0.08);
  }
  .m3-container > input:is(:active, :focus-visible) + .layer::before {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  .m3-container > input:checked:is(:active, :focus-visible) + .layer::before {
    background-color: rgb(var(--m3-scheme-primary) / 0.12);
  }

  input:checked {
    background-color: rgb(var(--m3-scheme-primary));
    border-color: rgb(var(--m3-scheme-primary));
  }
  input:checked + .layer {
    background-color: rgb(var(--m3-scheme-on-primary));
    width: 1.5rem;
    height: 1.5rem;
    left: 1.5rem; /* 1.5 + 1.5 + 0.25 = 3.25 */
  }
  input:checked + .layer > :global(svg) {
    opacity: 1;
  }
  .m3-container:active > input:enabled + .layer {
    width: 1.75rem;
    height: 1.75rem;
    transform: translate(-0.375rem, -50%); /* 0.75 / 2 */
  }
  .m3-container:active > input:enabled:checked + .layer {
    transform: translate(-0.125rem, -50%); /* 0.25 / 2 */
  }

  input:disabled {
    background-color: rgb(var(--m3-scheme-surface-container-highest) / 0.12);
    border-color: rgb(var(--m3-scheme-outline) / 0.12);
    cursor: auto;
  }
  input:disabled:checked {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
    border-color: transparent;
  }
  input:disabled + .layer {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: auto;
  }
  input:disabled:checked + .layer {
    background-color: rgb(var(--m3-scheme-surface));
  }
  input:disabled:checked + .layer > :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled + .layer::before {
    display: none;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    input:checked {
      background-color: canvastext !important;
    }
    .layer {
      background-color: canvastext !important;
    }
    input:checked + .layer {
      background-color: canvas !important;
    }
    input:disabled,
    input:disabled + .layer {
      opacity: 0.38;
    }
  }
</style>
