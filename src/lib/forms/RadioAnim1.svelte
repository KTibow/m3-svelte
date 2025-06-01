<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";

  // MUST BE WRAPPED IN A <label>
  let {
    children,
    ...extra
  }: {
    children: Snippet;
  } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="m3-container" {...extra}>
  {@render children()}
  <div class="layer-container">
    <Layer />
    <div class="radio-circle"></div>
    <div class="radio-dot"></div>
  </div>
</div>

<style>
  .m3-container {
    display: inline-flex;
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
  }

  .m3-container :global(input) {
    position: absolute;
    opacity: 0;
  }

  .layer-container {
    position: absolute;
    inset: -0.625rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--m3-util-rounding-full);
    color: rgb(var(--m3-scheme-on-surface-variant));
    cursor: pointer;
  }

  .radio-circle {
    position: absolute;
    inset: 0.625rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--m3-util-rounding-full);
    border: solid 0.125rem currentColor;
    transition: border var(--m3-util-easing-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .radio-dot {
    position: absolute;
    inset: 0.9375rem;
    width: 0.625rem;
    height: 0.625rem;
    scale: 0;
    border-radius: var(--m3-util-rounding-full);
    background-color: currentColor;
    transition: scale var(--m3-util-easing-fast-spatial);
    -webkit-tap-highlight-color: transparent;
  }

  :global(input:focus-visible) + .layer-container {
    color: rgb(var(--m3-scheme-on-surface));
  }

  :global(input:checked) + .layer-container {
    color: rgb(var(--m3-scheme-primary));
  }

  :global(input:checked) + .layer-container .radio-dot {
    scale: 1;
  }

  :global(input:disabled) + .layer-container {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: not-allowed;
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  @media screen and (forced-colors: active) {
    :global(input:checked) + .layer-container .radio-circle {
      border-color: selecteditem;
    }
    .radio-dot {
      background-color: selecteditem;
    }
    :global(input:disabled) + .layer-container {
      opacity: 0.38;
    }
  }
</style>
