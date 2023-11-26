<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  // MUST BE WRAPPED IN A <label>
</script>

<div class="m3-container" style="display: {display};" {...extraOptions}>
  <slot />
  <div class="layer" />
</div>

<style>
  .m3-container {
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
  }
  .m3-container :global(input) {
    position: absolute;
    opacity: 0;
  }
  .layer {
    position: absolute;
    inset: -0.625rem;
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
    inset: 0.625rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--m3-util-rounding-full);
    border: solid 0.125rem rgb(var(--color));
    transition: all 0.3s;
  }
  .layer::after {
    content: " ";
    display: block;
    position: absolute;
    inset: 1.25rem;
    width: 0rem;
    height: 0rem;
    border-radius: var(--m3-util-rounding-full);
    background-color: rgb(var(--color));
    transition: all 0.3s;
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
  :global(input:enabled) + .layer:active::before {
    transform: scale(0.9);
  }
  :global(input:checked) + .layer {
    --color: var(--m3-scheme-primary);
  }
  :global(input:checked) + .layer::after {
    inset: 0.9375rem;
    width: 0.625rem;
    height: 0.625rem;
  }

  :global(input:disabled) + .layer {
    background-color: transparent;
    --color: var(--m3-scheme-on-surface) / 0.38;
    pointer-events: none;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    :global(input:checked) + .layer::before {
      border-color: selecteditem;
    }
    .layer::after {
      background-color: selecteditem;
    }
    :global(input:disabled) + .layer {
      opacity: 0.38;
    }
  }
</style>
