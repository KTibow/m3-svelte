<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLInputAttributes } from "svelte/elements";
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";
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
    class="focus-none m3-font-body-large"
    placeholder=" "
    bind:value
    onkeydown={(e) => e.key == "Enter" && enter?.()}
    {id}
    {disabled}
    {required}
    {...extra}
    defaultValue={extra.defaultValue}
  />
  <!-- TODO: once https://github.com/sveltejs/svelte/pull/16481 is finished, remove the defaultvalue thing -->
  <div class="layer"></div>
  <label class="m3-font-body-large" for={id}>{label}</label>
  {#if leadingIcon}
    <Icon icon={leadingIcon} class="leading" />
  {/if}
  {#if trailing}
    {@const { icon, ...extra } = trailing}
    <button type="button" class="trailing" {...extra}>
      <Layer />
      <Icon {icon} />
    </button>
  {/if}
</div>

<style>
  /*
  want to customize the label's background?
  do this: <TextFieldOutlined --m3-util-background="rgb(var(--m3-scheme-surface-container))" />
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
    background-color: var(--m3-util-background, rgb(var(--m3-scheme-surface)));
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
      line-height: var(--m3-font-body-small-height, 1.333);
      letter-spacing: var(--m3-font-body-small-tracking, 0.025rem);
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
