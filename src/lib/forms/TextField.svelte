<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLInputAttributes } from "svelte/elements";
  import Icon from "$lib/misc/Icon.svelte";
  import type { ButtonAttrs } from "$lib/misc/typing-utils";

  let {
    label,
    leadingIcon,
    trailing,
    disabled = false,
    required = false,
    error = false,
    value = $bindable(),
    enter,
    ...extra
  }: {
    label: string;
    leadingIcon?: IconifyIcon;
    trailing?: { icon: IconifyIcon } & ButtonAttrs;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: string;
    enter?: () => void;
  } & HTMLInputAttributes = $props();
  const id = $props.id();
</script>

<div
  class="m3-container"
  class:leading-icon={leadingIcon}
  class:trailing-icon={trailing}
  class:error
>
  <input
    placeholder=" "
    bind:value
    onkeydown={(e) => e.key == "Enter" && enter?.()}
    {id}
    {disabled}
    {required}
    {...extra}
  />
  <label for={id}>{label}</label>
  <div class="layer"></div>
  {#if leadingIcon}
    <Icon icon={leadingIcon} class="leading" size={24} />
  {/if}
  {#if trailing}
    {@const { icon, ...extra } = trailing}
    <button type="button" class="trailing m3-layer" {...extra}>
      <Icon {icon} size={24} />
    </button>
  {/if}
</div>

<style>
  @layer tokens {
    :root {
      --m3-field-filled-shape: var(--m3-shape-extra-small);
    }
  }

  .m3-container {
    display: inline-flex;
    position: relative;
    align-items: center;
    height: --m3-density(3.5rem);
    min-width: 15rem;
  }
  input {
    @apply --m3-body-large;
    @apply --m3-focus-none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    padding: 1.5rem 1rem 0.5rem 1rem;
    border-radius: var(--m3-field-filled-shape) var(--m3-field-filled-shape) 0 0;
    background-color: var(--m3c-surface-container-highest);
    color: var(--m3c-on-surface);
  }
  label {
    @apply --m3-body-large;
    position: absolute;
    inset-inline-start: 1rem;
    top: 50%;
    translate: 0 -50%;
    color: var(--error, var(--m3c-on-surface-variant));
    input:hover ~ & {
      color: var(--error, var(--m3c-on-surface));
    }
    input:focus ~ & {
      color: var(--error, var(--m3c-primary));
    }
    input:disabled ~ & {
      color: --translucent(var(--m3c-on-surface), 0.38);
    }
    input:focus ~ &,
    input:not(:placeholder-shown) ~ & {
      @apply --m3-body-small;
      top: 0.5rem;
      translate: 0 0;
    }
    pointer-events: none;
    transition:
      color 100ms,
      top 100ms,
      translate 100ms,
      font-size 300ms,
      line-height 300ms,
      letter-spacing 300ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    border-radius: var(--m3-field-filled-shape) var(--m3-field-filled-shape) 0 0;
    pointer-events: none;
    transition: all 100ms;
    input:enabled:hover ~ & {
      background-color: --translucent(var(--m3c-on-surface), 0.08);
    }
  }
  .layer::after {
    position: absolute;
    content: " ";
    display: block;
    width: 100%;
    bottom: 0;

    height: 1px;
    background-color: var(--error, var(--m3c-on-surface-variant));
    transition: all 100ms;
  }
  .m3-container :global(svg) {
    color: var(--m3c-on-surface-variant);
    pointer-events: none;
  }
  .m3-container > :global(.leading) {
    position: relative;
    margin-inline-start: 0.75rem;
  }
  .trailing {
    position: absolute;
    padding-inline: 0.75rem;
    height: 100%;
    inset-inline-end: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-start-end-radius: 0.25rem;
    border-end-end-radius: 0.25rem;

    cursor: pointer;
  }

  input:focus ~ .layer::after {
    height: 0.125rem;
    background-color: var(--error, var(--m3c-primary));
  }

  .leading-icon > input {
    padding-inline-start: 3.25rem;
  }
  .leading-icon > label {
    inset-inline-start: 3.25rem;
  }
  .trailing-icon > input {
    padding-inline-end: 3.25rem;
  }
  .error {
    --error: var(--m3c-error);
  }
  .error > input:hover ~ label,
  .error > input:hover ~ .layer {
    --error: var(--m3c-on-error-container);
  }
  input:disabled {
    background-color: --translucent(var(--m3c-on-surface), 0.04);
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
  input:disabled ~ .layer::after {
    background-color: --translucent(var(--m3c-on-surface), 0.38);
  }
  input:disabled ~ :global(svg) {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    input {
      background-color: field;
    }
    .layer::after,
    input:focus ~ .layer::after {
      background-color: canvastext;
    }
  }
</style>
