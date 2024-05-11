<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import type { IconifyIcon } from "@iconify/types";
  import iconCheck from "@ktibow/iconset-material-symbols/check";

  export let display = "flex";
  export let extraOptions: HTMLLabelAttributes = {};
  export let input: string;
  export let icon: IconifyIcon | undefined = undefined;
</script>

<label
  for={input}
  class="m3-font-label-large"
  style="display: {display}; overflow: hidden;"
  {...extraOptions}
>
  <div class="layer" />
  {#if icon}
    <div class="custom icon">
      <Icon {icon} />
    </div>
  {/if}
  <div class="check icon">
    <Icon icon={iconCheck} />
  </div>
  <div class="start-pad pad" />
  <slot />
  {#if !icon}
    <div class="end-pad pad" />
  {/if}
</label>

<style>
  label {
    padding: 0 1rem;
    /* flex: 1; */
    min-width: 3rem;
    align-items: center;
    justify-content: center;

    --text: var(--m3-scheme-on-surface);
    color: rgb(var(--text));
    transition: all 200ms;

    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    position: relative;
  }
  :global(label) ~ label {
    border-left: 0.0625rem solid rgb(var(--m3-scheme-outline));
  }
  :global(input:disabled) + label {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: auto;
  }
  .layer {
    position: absolute;
    inset: 0;
    transition: all 200ms;
  }
  .icon {
    height: 1.125rem;
    transition: all 200ms;
    flex-shrink: 0;
    transform-origin: 0.563rem 0.563rem;
  }
  .icon > :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }

  .check.icon {
    width: 0;
    opacity: 0;
  }
  :global(input:checked) + label > .check.icon {
    opacity: 1;
  }
  .custom.icon + .check.icon {
    rotate: -60deg;
  }
  :global(input:checked) + label > .custom.icon + .check.icon {
    rotate: 0deg;
  }
  .custom.icon {
    width: 0;
    opacity: 0;
    rotate: 60deg;
  }
  :global(input:not(:checked)) + label > .custom.icon {
    opacity: 1;
    rotate: 0deg;
  }

  .pad {
    transition: all 200ms;
    flex-shrink: 0;
  }
  .start-pad {
    width: 0.8125rem;
  }
  .end-pad {
    width: 0.8125rem;
  }
  :global(input:checked) + label > .start-pad,
  .custom.icon ~ .start-pad {
    width: 1.625rem;
  }
  :global(input:checked) + label > .end-pad {
    width: 0rem;
  }

  label {
    -webkit-tap-highlight-color: transparent;
  }
  @media (hover: hover) {
    :global(input:not(:disabled)) + label:hover > .layer {
      background-color: rgb(var(--text) / 0.08);
    }
  }

  :global(input:checked) + label {
    background-color: rgb(var(--m3-scheme-secondary-container));
    --text: var(--m3-scheme-on-secondary-container);
  }
  :global(input:enabled:focus-visible) + label > .layer,
  :global(input:enabled) + label:active > .layer {
    background-color: rgb(var(--text) / 0.12);
  }
</style>
