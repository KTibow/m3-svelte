<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import Icon from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let disabled = false;
  export let checked = false;

  let startX: number | null;
  const handleMouseUp = (e: MouseEvent) => {
    if (!startX) return;
    const distance = e.clientX - startX;
    if (distance > 16 && !checked) checked = true;
    if (distance < -16 && checked) checked = false;
    startX = null;
  };
</script>

<svelte:window on:mouseup={handleMouseUp} />
<div
  class="m3-container"
  style="display: {display};"
  on:mousedown={(e) => (startX = e.clientX)}
  {...extraWrapperOptions}
>
  <input
    type="checkbox"
    bind:checked
    {disabled}
    on:keydown={(e) => {
      if (e.code == "Enter") checked = !checked;
      if (e.code == "ArrowLeft") checked = false;
      if (e.code == "ArrowRight") checked = true;
    }}
    {...extraInputOptions}
  />
  <!-- svelte-ignore a11y-click-events-have-key-events (if you have a better idea lmk) -->
  <div class="layer" on:mousedown={(e) => (startX = e.clientX)} />
  <Icon icon={iconCheck} />
</div>

<style>
  .m3-container {
    position: relative;
  }
  input {
    appearance: none;
    width: 3.25rem;
    height: 2rem;
    margin: 0;
    border-radius: 2rem;
    outline: solid 2px rgb(var(--m3-scheme-outline));
    outline-offset: -2px;
    background-color: rgb(var(--m3-scheme-surface-variant));
    cursor: pointer;
    position: relative;
    transition: all 300ms;
  }
  input:disabled {
    background-color: rgb(var(--m3-scheme-surface-variant) / 0.12);
    outline-color: rgb(var(--m3-scheme-outline) / 0.12);
    cursor: auto;
  }
  input:checked {
    outline-color: transparent;
  }
  input:disabled:checked {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  input:enabled:checked {
    background-color: rgb(var(--m3-scheme-primary));
  }
  input::before {
    content: " ";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    display: inline-block;
    position: relative;
    left: 0.5rem;
    top: 50%;
    transform: translate(0%, -50%);
    background-color: rgb(var(--m3-scheme-outline));
    transition: all 300ms;
  }
  input:checked::before {
    background-color: rgb(var(--m3-scheme-on-primary));
    left: calc(100% - 1.5rem - 0.25rem);
    width: 1.5rem;
    height: 1.5rem;
  }
  input:disabled::before {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled:checked:before {
    background-color: rgb(var(--m3-scheme-surface));
  }

  .layer {
    position: absolute;
    left: -0.5rem;
    top: 50%;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    transition: all 200ms;
    transform: translate(0, -50%);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  input:checked + .layer {
    left: calc(100% - 1.5rem - 0.75rem - 0.25rem);
  }

  input:hover + .layer {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
  }
  input:checked:hover + .layer {
    background-color: rgb(var(--m3-scheme-primary) / 0.08);
  }
  input:enabled:is(:hover, :focus-visible)::before {
    background-color: rgb(var(--m3-scheme-on-surface-variant));
  }
  input:enabled:checked:is(:hover, :focus-visible)::before {
    background-color: rgb(var(--m3-scheme-primary-container));
  }
  input:focus-visible + .layer,
  .layer:active {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  input:focus-visible:checked + .layer,
  input:checked + .layer:active {
    background-color: rgb(var(--m3-scheme-primary) / 0.12);
  }

  .m3-container:active input:enabled:before {
    width: 1.75rem;
    height: 1.75rem;
    left: 0;
    background-color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .m3-container:active input:enabled:checked::before {
    left: calc(100% - 1.75rem - 0.125rem);
    background-color: rgb(var(--m3-scheme-primary-container));
  }

  .m3-container > :global(svg) {
    position: absolute;
    left: 0.625rem;
    top: 50%;
    transform: translate(0, -50%);
    width: 1rem;
    height: 1rem;
    opacity: 0;
    pointer-events: none;
    color: rgb(var(--m3-scheme-surface-variant));
    transition: all 300ms;
  }
  .m3-container > :global(:checked ~ svg) {
    left: calc(100% - 1rem - 0.5rem);
    color: rgb(var(--m3-scheme-on-primary-container));
    opacity: 1;
  }

  input:disabled + .layer {
    display: none;
  }
</style>
