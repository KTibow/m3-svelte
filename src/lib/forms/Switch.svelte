<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import iconCheck from "@ktibow/iconset-material-symbols/check";
  import type { HTMLInputAttributes } from "svelte/elements";

  // MUST BE WRAPPED IN A <label>
  let {
    checked = $bindable(false),
    disabled = false,
    ...extra
  }: {
    checked?: boolean;
    disabled?: boolean;
  } & HTMLInputAttributes = $props();

  let startX: number | undefined = $state();
  const handleMouseUp = (e: MouseEvent) => {
    if (!startX) return;
    const distance = e.clientX - startX;
    if (distance > 16 && !checked) checked = true;
    if (distance < -16 && checked) checked = false;
    startX = undefined;
  };
</script>

<svelte:window onpointerup={handleMouseUp} />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="m3-container"
  onpointerdown={(e) => {
    if (!disabled) {
      startX = e.clientX;
    }
  }}
  ondragstart={(e) => {
    e.preventDefault();
  }}
>
  <input
    type="checkbox"
    role="switch"
    {disabled}
    bind:checked
    {...extra}
    onkeydown={(e) => {
      if (e.code == "Enter") checked = !checked;
      if (e.code == "ArrowLeft") checked = false;
      if (e.code == "ArrowRight") checked = true;
    }}
  />
  <div class="handle">
    <Icon icon={iconCheck} />
  </div>
  <div class="hover"></div>
</div>

<style>
  :root {
    --m3-switch-track-shape: var(--m3-util-rounding-full);
    --m3-switch-handle-shape: var(--m3-util-rounding-full);
  }
  .m3-container {
    display: inline-flex;
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
    transition: var(--m3-util-easing);
  }
  .handle {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: var(--m3-switch-handle-shape);

    background-color: rgb(var(--m3-scheme-outline));
    /* Fallback for those without on on primary */
    color: rgb(var(--m3-scheme-on-on-primary, var(--m3-scheme-on-primary-container)));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: var(--m3-util-easing-fast-spatial);

    left: 0.5rem;
    top: 50%;
    translate: 0 -50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .handle > :global(svg) {
    width: 1rem;
    height: 1rem;
    opacity: 0;
    transition:
      opacity var(--m3-util-easing-fast-spatial),
      scale var(--m3-util-easing-fast-spatial);
  }
  .hover {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: var(--m3-util-rounding-full);

    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: var(--m3-util-easing-fast);

    left: 1rem;
    top: 50%;
    translate: -50% -50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .m3-container:hover > input:enabled + .handle,
  .m3-container > input:enabled:is(:global(:active, :focus-visible)) + .handle {
    background-color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .m3-container:hover > input:enabled:checked + .handle,
  .m3-container > input:enabled:checked:is(:global(:active, :focus-visible)) + .handle {
    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
  }
  .m3-container:hover > input ~ .hover {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
  }
  .m3-container:hover > input:checked ~ .hover {
    background-color: rgb(var(--m3-scheme-primary) / 0.08);
  }

  input:checked {
    background-color: rgb(var(--m3-scheme-primary));
    border-color: rgb(var(--m3-scheme-primary));
  }
  input:checked + .handle {
    background-color: rgb(var(--m3-scheme-on-primary));
    scale: 1.5;
    left: 1.75rem;
  }
  input:checked + .handle > :global(svg) {
    scale: 0.667;
    opacity: 1;
  }
  input:checked ~ .hover {
    left: 2.25rem;
  }
  .m3-container:active > input:enabled + .handle {
    scale: 1.75;
  }
  .m3-container:active > input:enabled + .handle > :global(svg) {
    scale: 0.571;
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
  input:disabled + .handle {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: auto;
  }
  input:disabled:checked + .handle {
    background-color: rgb(var(--m3-scheme-surface));
  }
  input:disabled:checked + .handle > :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .hover {
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
    .handle {
      background-color: canvastext !important;
    }
    input:checked + .handle {
      background-color: canvas !important;
    }
    input:disabled,
    input:disabled + .handle {
      opacity: 0.38;
    }
  }
</style>
