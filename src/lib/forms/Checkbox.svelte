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
    <div class="checkbox-box"></div>
  </div>
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
    display: inline-flex;
    position: relative;
    width: 1.125rem;
    height: 1.125rem;
  }
  .m3-container :global(input) {
    position: absolute;
    opacity: 0;
  }

  .layer-container {
    position: absolute;
    inset: -0.6875rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--m3-util-rounding-full);
    color: rgb(var(--m3-scheme-on-surface-variant));
    cursor: pointer;
  }

  .checkbox-box {
    position: absolute;
    inset: 0.6875rem;
    border-radius: 0.125rem;
    border: solid 0.125rem currentColor;
    transition: var(--m3-util-easing-fast);
    -webkit-tap-highlight-color: transparent;
  }

  svg {
    position: absolute;
    inset: 0;
    color: rgb(var(--m3-scheme-on-primary));
    opacity: 0;
    pointer-events: none;
    transition: var(--m3-util-easing-fast);
    path {
      stroke-dasharray: 20.874 20.874;
      stroke-dashoffset: 20.874;
      transition: stroke-dashoffset 0ms 300ms;
    }
  }

  :global(input:focus-visible) + .layer-container {
    color: rgb(var(--m3-scheme-on-surface));
  }

  :global(input:checked) + .layer-container {
    color: rgb(var(--m3-scheme-primary));
  }
  :global(input:checked) + .layer-container .checkbox-box {
    background-color: rgb(var(--m3-scheme-primary));
  }

  :global(input:checked) ~ svg {
    opacity: 1;
    path {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset var(--m3-util-easing-slow);
    }
  }

  :global(input:disabled) + .layer-container {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: not-allowed;
  }

  :global(input:disabled:checked) + .layer-container {
    color: transparent;
  }
  :global(input:disabled:checked) + .layer-container .checkbox-box {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }

  :global(input:disabled) ~ svg {
    color: rgb(var(--m3-scheme-surface));
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    :global(input:checked) + .layer-container .checkbox-box {
      background-color: selecteditem;
      border-color: selecteditem !important;
    }
    :global(input:disabled) + .layer-container {
      opacity: 0.38;
    }
  }
</style>
