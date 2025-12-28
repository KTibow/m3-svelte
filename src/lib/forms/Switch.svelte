<script lang="ts">
  import Icon from "$lib/misc/Icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import iconCheck from "@ktibow/iconset-material-symbols/check";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import type { HTMLInputAttributes } from "svelte/elements";

  // MUST BE WRAPPED IN A <label>
  let {
    checked = $bindable(false),
    disabled = false,
    uncheckedIcon = iconX,
    checkedIcon = iconCheck,
    icons = "checked",
    ...extra
  }: {
    checked?: boolean;
    disabled?: boolean;
    uncheckedIcon?: IconifyIcon;
    checkedIcon?: IconifyIcon;
    icons?: "checked" | "both" | "none";
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
    {#if icons != "none"}
      <Icon icon={checkedIcon} />
      {#if icons == "both"}
        <Icon icon={uncheckedIcon} />
      {/if}
    {/if}
  </div>
  <div class="hover"></div>
</div>

<style>
  @layer tokens {
    :root {
      --m3-switch-track-shape: var(--m3-shape-full);
      --m3-switch-handle-shape: var(--m3-shape-full);
    }
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

    background-color: var(--m3c-surface-container-highest);
    border: solid 0.125rem var(--m3c-outline);
    cursor: pointer;
    transition: var(--m3-easing);
  }
  .handle {
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: var(--m3-switch-handle-shape);

    background-color: var(--m3c-outline);
    color: var(--m3c-on-on-primary);
    cursor: pointer;
    transition: var(--m3-easing-fast-spatial);

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
      opacity var(--m3-easing-fast-spatial),
      scale var(--m3-easing-fast-spatial);
  }
  input:not(:checked) + :global(.handle:has(:nth-child(2))) {
    scale: 1.5;
    > :global(svg) {
      color: var(--m3c-surface-container-highest);
      scale: 0.667;
      opacity: 1;
    }
  }

  input:checked + :global(.handle) > :global(svg:nth-child(2)),
  input:not(:checked) + :global(.handle) > :global(svg:first-child) {
    display: none;
  }

  .hover {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: var(--m3-shape-full);

    cursor: pointer;
    transition: var(--m3-easing-fast);

    left: 1rem;
    top: 50%;
    translate: -50% -50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .m3-container:hover > input:not(:checked):not(:disabled) + .handle,
  .m3-container:active > input:not(:checked):not(:disabled) + .handle {
    background-color: var(--m3c-on-surface-variant);
  }
  .m3-container:hover > input:enabled:checked + .handle,
  .m3-container > input:enabled:checked:is(:global(:active, :focus-visible)) + .handle {
    background-color: var(--m3c-primary-container);
    color: var(--m3c-on-primary-container);
  }
  .m3-container:hover > input ~ .hover {
    background-color: --translucent(var(--m3c-on-surface), 0.08);
  }
  .m3-container:hover > input:checked ~ .hover {
    background-color: --translucent(var(--m3c-primary), 0.08);
  }

  input:checked {
    background-color: var(--m3c-primary);
    border-color: var(--m3c-primary);
  }
  input:checked + .handle {
    background-color: var(--m3c-on-primary);
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
    background-color: --translucent(var(--m3c-surface-container-highest), 0.12);
    border-color: --translucent(var(--m3c-outline), 0.12);
    cursor: auto;
  }
  input:disabled:checked {
    background-color: --translucent(var(--m3c-on-surface), 0.12);
    border-color: transparent;
  }
  input:disabled + .handle {
    background-color: --translucent(var(--m3c-on-surface), 0.38);
    cursor: auto;
  }
  input:disabled:checked + .handle {
    background-color: var(--m3c-surface);
  }
  input:disabled:checked + .handle > :global(svg) {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
  input:disabled ~ .hover {
    display: none;
  }

  .m3-container {
    print-color-adjust: exact;
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
