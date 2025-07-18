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
    label: _label,
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
    label: string;
    leadingIcon?: IconifyIcon;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: string;
    enter?: () => void;
  } & TrailingProps &
    HTMLInputAttributes = $props();
  const id = $props.id();

  let label = $derived(_label || extra.name); // TODO: next breaking version, drop name backsupport
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
    {disabled}
    {required}
    {...extra}
  />
  <div class="layer"></div>
  <label class="m3-font-body-large" for={id}>{label}</label>
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
  /*
  want to customize the label's background?
  do this: <TextFieldOutlined --m3-util-background="var(--m3-scheme-surface-container)" />
  */
  :root {
    --m3-textfield-outlined-shape: var(--m3-util-rounding-extra-small);
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
    padding: 1rem;
    border-radius: var(--m3-textfield-outlined-shape);
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));
  }
  label {
    position: absolute;
    left: 0.75rem;
    top: 1rem;
    color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    background-color: rgb(
      var(--m3-util-background, var(--m3-scheme-surface))
    ); /* TODO: next breaking change, make --m3-util-background a full color and update the comment above */
    padding: 0 0.25rem;
    &:is(input:hover ~ label) {
      color: rgb(var(--error, var(--m3-scheme-on-surface)));
    }
    &:is(input:focus ~ label) {
      color: rgb(var(--error, var(--m3-scheme-primary)));
    }
    &:is(input:disabled ~ label) {
      color: rgb(var(--m3-scheme-on-surface) / 0.38);
    }
    &:is(input:focus ~ label, input:not(:placeholder-shown) ~ label) {
      top: calc(var(--m3-font-body-small-height, 1rem) * -0.5);
      font-size: var(--m3-font-body-small-size, 0.75rem);
      line-height: var(--m3-font-body-small-height, 1);
      letter-spacing: var(--m3-font-body-small-tracking, 0.4);
    }
    pointer-events: none;
    transition:
      color 100ms,
      top 100ms,
      font-size 300ms,
      line-height 300ms,
      letter-spacing 300ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    border: 1px solid rgb(var(--error, var(--m3-scheme-outline)));
    border-radius: var(--m3-textfield-outlined-shape);
    pointer-events: none;
    transition: all 100ms;
    &:is(input:hover ~ .layer) {
      border-color: rgb(var(--error, var(--m3-scheme-on-surface)));
    }
    &:is(input:focus ~ .layer) {
      border-color: rgb(var(--error, var(--m3-scheme-primary)));
      border-width: 0.125rem;
    }
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
  .leading-icon > input:not(:focus):placeholder-shown ~ label {
    left: 3rem;
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
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ .layer {
    border-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  input:disabled ~ :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
</style>
