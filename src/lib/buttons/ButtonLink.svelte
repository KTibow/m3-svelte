<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  export let display = "inline-flex";
  export let extraOptions: HTMLAnchorAttributes = {};
  export let iconType: "none" | "left" | "full" = "none";
  export let type: "elevated" | "filled" | "tonal" | "outlined" | "text";
  export let href: string;
</script>

<a
  {href}
  class="m3-container m3-font-label-large {type} icon-{iconType}"
  style="display: {display};"
  {...extraOptions}
>
  <div class="layer" />
  <slot />
</a>

<style>
  :root {
    --m3-button-shape: var(--m3-util-rounding-full);
  }

  .m3-container {
    height: 2.5rem;
    padding: 0 1.5rem;
    border-radius: var(--m3-button-shape);
    color: rgb(var(--text));
    transition: all 200ms;

    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    user-select: none;
  }
  .layer {
    position: absolute;
    inset: 0;
    transition: all 200ms;
  }

  .m3-container > :global(*) {
    flex-shrink: 0;
  }
  .icon-left {
    padding-left: 1rem;
    gap: 0.5rem;
  }
  .icon-left > :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }
  .icon-full {
    width: 2.5rem;
    padding: 0;
  }
  .icon-full > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .m3-container.elevated {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    --text: var(--m3-scheme-primary);
    box-shadow: var(--m3-util-elevation-1);
  }

  .m3-container.filled {
    background-color: rgb(var(--m3-scheme-primary));
    --text: var(--m3-scheme-on-primary);
  }

  .m3-container.tonal {
    background-color: rgb(var(--m3-scheme-secondary-container));
    --text: var(--m3-scheme-on-secondary-container);
  }

  .m3-container.outlined {
    background-color: transparent;
    border: 0.0625rem solid rgb(var(--m3-scheme-outline));
    --text: var(--m3-scheme-primary);
  }

  .m3-container.text {
    background-color: transparent;
    padding: 0 0.75rem;
    --text: var(--m3-scheme-primary);
  }
  .m3-container.text.icon-left {
    padding-right: 1rem;
  }

  .m3-container {
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    .m3-container:hover > .layer {
      background-color: rgb(var(--text) / 0.08);
    }
    .m3-container.elevated:hover {
      box-shadow: var(--m3-util-elevation-2);
    }
    .m3-container.filled:hover {
      box-shadow: var(--m3-util-elevation-1);
    }
    .m3-container.tonal:hover {
      box-shadow: var(--m3-util-elevation-1);
    }
  }
  .m3-container:focus-visible > .layer,
  .m3-container:active > .layer {
    background-color: rgb(var(--text) / 0.12);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .m3-container:is(.elevated, .filled, .tonal) {
      background-color: transparent;
      border: 0.0625rem solid;
    }
  }
</style>
