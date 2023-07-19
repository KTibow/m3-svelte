<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";

  export let display = "flex";
  export let extraOptions: HTMLLabelAttributes = {};
  export let input: string;
  export let icon: IconifyIcon | undefined = undefined;
</script>

<label
  class:customIcon={icon}
  for={input}
  class="m3-font-label-large"
  style="display: {display};"
  {...extraOptions}
>
  <div class="layer" />
  <div class="pad" />
  {#if icon}
    <div class="custom icon">
      <Icon {icon} />
    </div>
  {/if}
  <div class="check icon">
    <Icon icon={iconCheck} />
  </div>
  <slot />
  <div class="pad" class:hidden={icon} />
</label>

<style>
  label {
    padding: 0 1rem;
    flex: 1;
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
  .icon,
  .pad {
    transition: all 200ms;
    flex-shrink: 0;
  }
  .icon > :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }
  .pad {
    width: 0.8125rem; /* (1.125 + 0.5) / 2 */
  }

  .customIcon .icon {
    transition: none;
  }
  :global(input:checked) + label > .pad,
  label.customIcon > .pad {
    width: 0;
  }
  .icon {
    width: 0;
    height: 1.125rem;
    overflow: hidden;
  }
  :global(input:checked) + label > .check.icon,
  .custom.icon {
    width: 1.125rem;
    margin-right: 0.5rem;
  }
  :global(input:checked) + label > .custom.icon {
    width: 0;
    margin-right: 0;
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
