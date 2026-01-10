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
  <div class="layer"></div>
  <label for={id}>{label}</label>
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
  /*
  want to customize the label's background?
  do this: <TextFieldOutlined --m3v-background="var(--m3c-surface-container)" />
  */
  @layer tokens {
    :root {
      --m3-field-outlined-shape: var(--m3-shape-extra-small);
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
    padding: 1rem;
    border-radius: var(--m3-field-outlined-shape);
    background-color: transparent;
    color: var(--m3c-on-surface);
  }
  label {
    @apply --m3-body-large;
    position: absolute;
    inset-inline-start: 0.75rem;
    top: 50%;
    translate: 0 -50%;
    color: var(--error, var(--m3c-on-surface-variant));
    background-color: var(--m3v-background);
    padding: 0 0.25rem;
    &:is(input:hover ~ label) {
      color: var(--error, var(--m3c-on-surface));
    }
    &:is(input:enabled:focus ~ label) {
      color: var(--error, var(--m3c-primary));
    }
    &:is(input:disabled ~ label) {
      color: --translucent(var(--m3c-on-surface), 0.38);
    }
    &:is(input:focus ~ label, input:not(:placeholder-shown) ~ label) {
      @apply --m3-body-small;
      top: 0;
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
    border: 1px solid var(--error, var(--m3c-outline));
    border-radius: var(--m3-field-outlined-shape);
    pointer-events: none;
    transition: all 100ms;
    &:is(input:enabled:hover ~ .layer) {
      border-color: var(--error, var(--m3c-on-surface));
    }
    &:is(input:enabled:focus ~ .layer) {
      border-color: var(--error, var(--m3c-primary));
      border-width: 0.125rem;
    }
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
    --error: var(--m3c-error);
  }
  .error > input:hover ~ label,
  .error > input:hover ~ .layer {
    --error: var(--m3c-on-error-container);
  }

  input:disabled {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
  input:disabled ~ .layer {
    border-color: --translucent(var(--m3c-on-surface), 0.38);
  }
  input:disabled ~ :global(svg) {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
  }
</style>
