<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/_icon.svelte";
  import type { HTMLInputAttributes } from "svelte/elements";

  type TrailingProps =
    | {
        trailingIcon: IconifyIcon;
        trailingClick: () => void;
      }
    | {
        trailingIcon?: undefined;
        trailingClick?: undefined;
      };

  let {
    name,
    label = name,
    leadingIcon,
    trailingIcon,
    trailingClick,
    disabled = false,
    required = false,
    error = false,
    value = $bindable(""),
    enter,
    ...extra
  }: {
    name: string;
    label?: string;
    leadingIcon?: IconifyIcon;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: string;
    enter?: () => void;
  } & TrailingProps &
    HTMLInputAttributes = $props();
  const id = crypto.randomUUID();
</script>

<div
  class="m3-container"
  class:leading-icon={leadingIcon}
  class:trailing-icon={trailingIcon}
  class:error
>
  <input
    class="focus-none m3-font-body-large"
    placeholder=" "
    bind:value
    onkeydown={(e) => e.key == "Enter" && enter?.()}
    {id}
    {name}
    {disabled}
    {required}
    {...extra}
  />
  <label class="m3-font-body-large" for={id}>{label}</label>
  <div class="layer"></div>
  {#if leadingIcon}
    <Icon icon={leadingIcon} class="leading" />
  {/if}
  {#if trailingIcon}
    <button onclick={trailingClick} class="trailing">
      <Icon icon={trailingIcon} />
    </button>
  {/if}
</div>

<style>
  :root {
    --m3-textfield-filled-shape: var(--m3-util-rounding-extra-small);
  }

  .m3-container {
    display: inline-flex;
    position: relative;
    align-items: center;
    height: 3.5rem;
    min-width: 15rem;
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1.5rem 1rem 0.5rem 1rem;
    border-radius: var(--m3-textfield-filled-shape) var(--m3-textfield-filled-shape) 0 0;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    color: rgb(var(--m3-scheme-on-surface));
  }
  label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    pointer-events: none;
    transition:
      all 200ms,
      font-size 300ms,
      line-height 300ms,
      letter-spacing 300ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    border-radius: var(--m3-textfield-filled-shape) var(--m3-textfield-filled-shape) 0 0;
    pointer-events: none;
    transition: all 200ms;
  }
  .layer::after {
    position: absolute;
    content: " ";
    display: block;
    width: 100%;
    bottom: 0;

    height: 1px;
    background-color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    transition: all 200ms;
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    pointer-events: none;
  }
  .m3-container > :global(.leading) {
    position: relative;
    margin-left: 0.75rem;
  }
  .trailing {
    position: absolute;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 100%;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;

    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }

  input:enabled:hover ~ .layer {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
  }
  input:hover ~ label {
    color: rgb(var(--error, var(--m3-scheme-on-surface)));
  }
  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: 0.5rem;
    font-size: var(--m3-font-body-small-size, 0.75rem);
    line-height: var(--m3-font-body-small-height, 1rem);
    letter-spacing: var(--m3-font-body-small-tracking, 0.4);
  }
  input:focus ~ label {
    color: rgb(var(--error, var(--m3-scheme-primary)));
  }
  input:focus ~ .layer::after {
    height: 0.125rem;
    background-color: rgb(var(--error, var(--m3-scheme-primary)));
  }
  @media (hover: hover) {
    button:hover {
      background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.08);
    }
  }
  button:focus-visible,
  button:active {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.12);
  }

  .leading-icon > input {
    padding-left: 3.25rem;
  }
  .leading-icon > label {
    left: 3.25rem;
  }
  .trailing-icon > input {
    padding-right: 3.25rem;
  }
  .error {
    --error: var(--m3-scheme-error);
  }
  .error > input:hover ~ label,
  .error > input:hover ~ .layer {
    --error: var(--m3-scheme-on-error-container);
  }
  input:disabled {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.04);
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ label {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .layer::after {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
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
