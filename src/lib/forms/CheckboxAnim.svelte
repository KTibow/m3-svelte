<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};" {...extraOptions}>
  <slot />
  <div class="layer" />
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 4.83 13.41 L 9 17.585 L 19.59 7"
      fill="none"
      stroke="currentColor"
      stroke-width="1.41"
    />
  </svg>
</div>

<style>
  .m3-container {
    position: relative;
    width: 1.125rem;
    height: 1.125rem;
  }
  .m3-container :global(input) {
    position: absolute;
    opacity: 0;
  }
  .layer {
    position: absolute;
    inset: -0.6875rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--m3-util-rounding-full);

    transition: all 200ms;
    cursor: pointer;
    --color: var(--m3-scheme-on-surface-variant);
    -webkit-tap-highlight-color: transparent;
  }
  .layer::before {
    content: " ";
    display: block;
    position: absolute;
    inset: 0.6875rem;
    border-radius: 0.125rem;
    border: solid 0.125rem rgb(var(--color));
    transition: all 200ms;
  }
  svg {
    position: absolute;
    inset: 0;
    color: rgb(var(--m3-scheme-on-primary));
    pointer-events: none;
  }
  path {
    stroke-dasharray: 20.874 20.874;
    stroke-dashoffset: 20.874;
    opacity: 0;
    transition:
      opacity 200ms,
      stroke-dashoffset 0ms 200ms;
  }

  @media (hover: hover) {
    .layer:hover {
      --color: var(--m3-scheme-on-surface);
      background-color: rgb(var(--color) / 0.08);
    }
  }
  .layer:active,
  :global(input:focus-visible) + .layer {
    --color: var(--m3-scheme-on-surface);
    background-color: rgb(var(--color) / 0.12);
  }
  :global(input:checked) + .layer {
    --color: var(--m3-scheme-primary);
  }
  :global(input:checked) + .layer::before {
    background-color: rgb(var(--color));
  }
  :global(input:checked) ~ svg > path {
    stroke-dashoffset: 0;
    opacity: 1;
    transition: stroke-dashoffset 200ms;
  }

  :global(input:disabled) + .layer {
    background-color: transparent;
    --color: var(--m3-scheme-on-surface) / 0.38;
    pointer-events: none;
  }
  :global(input:disabled) ~ svg {
    color: rgb(var(--m3-scheme-surface));
  }
  :global(input:disabled:checked) + .layer::before {
    border-color: transparent;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    :global(input:checked) + .layer::before {
      background-color: selecteditem;
      border-color: selecteditem !important;
    }
    :global(input:disabled) + .layer {
      opacity: 0.38;
    }
  }
</style>
