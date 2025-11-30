<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLInputAttributes } from "svelte/elements";
  import Icon from "$lib/misc/Icon.svelte";
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
  <!-- TODO/deprecated: once https://github.com/sveltejs/svelte/pull/16481 is finished, remove the defaultvalue thing -->
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
  do this: <TextFieldOutlined --m3-util-background="var(--color-surface-container)" />
  */
  :root {
    /* "textfield" is deprecated */
    --m3-field-outlined-shape: var(
      --m3-textfield-outlined-shape,
      var(--m3-util-rounding-extra-small)
    );
  }
  .m3-container {
    display: inline-flex;
    position: relative;
    align-items: center;
    height: calc(3.5rem + var(--m3-util-density-term));
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
    border-radius: var(--m3-field-outlined-shape);
    background-color: transparent;
    color: var(--color-on-surface);
  }
  label {
    position: absolute;
    inset-inline-start: 0.75rem;
    top: 50%;
    translate: 0 -50%;
    color: var(--error, var(--color-on-surface-variant));
    background-color: var(--m3-util-background, var(--color-surface));
    padding: 0 0.25rem;
    &:is(input:hover ~ label) {
      color: var(--error, var(--color-on-surface));
    }
    &:is(input:enabled:focus ~ label) {
      color: var(--error, var(--color-primary));
    }
    &:is(input:disabled ~ label) {
      color: --translucent(var(--color-on-surface), 0.38);
    }
    &:is(input:focus ~ label, input:not(:placeholder-shown) ~ label) {
      top: 0;
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
    border: 1px solid var(--error, var(--color-outline));
    border-radius: var(--m3-field-outlined-shape);
    pointer-events: none;
    transition: all 100ms;
    &:is(input:enabled:hover ~ .layer) {
      border-color: var(--error, var(--color-on-surface));
    }
    &:is(input:enabled:focus ~ .layer) {
      border-color: var(--error, var(--color-primary));
      border-width: 0.125rem;
    }
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-on-surface-variant);
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

  .leading-icon > input {
    padding-inline-start: 3.25rem;
  }
  .leading-icon > input:not(:focus):placeholder-shown ~ label {
    inset-inline-start: 3rem;
  }
  .trailing-icon > input {
    padding-inline-end: 3.25rem;
  }

  .error {
    --error: var(--color-error);
  }
  .error > input:hover ~ label,
  .error > input:hover ~ .layer {
    --error: var(--color-on-error-container);
  }

  input:disabled {
    color: --translucent(var(--color-on-surface), 0.38);
  }
  input:disabled ~ .layer {
    border-color: --translucent(var(--color-on-surface), 0.38);
  }
  input:disabled ~ :global(svg) {
    color: --translucent(var(--color-on-surface), 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
</style>
