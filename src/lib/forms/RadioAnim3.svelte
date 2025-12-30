<script lang="ts">
  import type { Snippet } from "svelte";
  import type { DivAttrs } from "$lib/misc/typing-utils";

  // MUST BE WRAPPED IN A <label>
  let {
    children,
    ...extra
  }: {
    children: Snippet;
  } & DivAttrs = $props();
</script>

<div class="m3-container" {...extra}>
  {@render children()}
  <div class="layer-container m3-layer">
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
    pointer-events: none;
  }

  .layer-container {
    position: absolute;
    inset: -0.625rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--m3-shape-full);
    color: var(--m3c-on-surface-variant);
    cursor: pointer;
  }

  .radio-circle {
    position: absolute;
    inset: 0.625rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--m3-shape-full);
    border: solid 0.125rem currentColor;
    transition: border var(--m3-easing-fast);
  }

  .radio-dot {
    position: absolute;
    inset: 0.75rem;
    width: 1rem;
    height: 1rem;
    border-radius: var(--m3-shape-full);
    outline: solid 0 currentColor;
    transition: var(--m3-easing);
  }

  :global(input:focus-visible) + .layer-container {
    color: var(--m3c-on-surface);
  }

  :global(input:checked) + .layer-container {
    color: var(--m3c-primary);
  }

  :global(input:checked) + .layer-container .radio-dot {
    outline-width: 0.3125rem;
    outline-offset: -0.5rem;
  }

  :global(input:disabled) + .layer-container {
    color: --translucent(var(--m3c-on-surface), 0.38);
    cursor: not-allowed;
  }

  .m3-container {
    print-color-adjust: exact;
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
