<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconError from "@iconify-icons/ic/error-outline";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let style: "filled" | "outlined";
  export let error = false;
  export let icon: IconifyIcon | null = null;
  export let name: string;
  export let supportingText: null | string = null;
  export let value = "";
  let id = `input-${crypto.randomUUID()}`;
</script>

<div>
  <div
    class="m3-container style-{style}"
    class:has-icon={icon}
    class:error
    style="display: {display}"
    {...extraWrapperOptions}
  >
    <input bind:value required {id} class="md-body-large" class:value {...extraInputOptions} />
    {#if icon}
      <span class="leadingIcon">
        <Icon {icon} />
      </span>
    {/if}
    {#if error}
      <span class="trailingIcon">
        <Icon icon={iconError} />
      </span>
    {/if}
    <div class="layer" />
    <label class="md-body-large" for={id}>{name}</label>
  </div>
  {#if supportingText}
    <p class="supporting md-body-small" class:error>{supportingText}</p>
  {/if}
</div>

<style>
  .m3-container {
    min-width: 15rem;
    height: 3.5rem;
    position: relative;
    color: rgb(var(--md-sys-color-on-surface-variant));
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    background-color: transparent;
    border: none;
    outline: none;
    color: rgb(var(--md-sys-color-on-surface));
  }
  .layer {
    position: absolute;
    inset: 0;
    transition: all 200ms;
    border-radius: inherit;
    pointer-events: none;
  }
  label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    transition: all 200ms, font 400ms;
    pointer-events: none;
    color: rgb(var(--error, currentColor));
  }
  .error {
    --error: var(--md-sys-color-error);
  }
  .error:hover {
    --error: var(--md-sys-color-on-error-container);
  }
  .supporting {
    color: rgb(var(--md-sys-color-on-surface-variant));
    margin: 0.25rem 0 0 0;
    padding: 0 1rem;
  }
  .supporting.error {
    color: rgb(var(--md-sys-color-error));
  }

  .style-filled {
    background-color: rgb(var(--md-sys-color-surface-variant));
    border-radius: 0.25rem 0.25rem 0 0;
  }
  .style-filled > .layer {
    color: rgb(var(--error, var(--md-sys-color-on-surface-variant)));
    border-bottom: solid 1px currentColor;
  }
  .style-filled:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .style-filled > input {
    padding-top: 1.25rem;
    padding-bottom: 0.5rem;
  }
  .style-filled input:is(:focus, .value, :required:valid) ~ label {
    top: 0.5rem;
  }

  .style-outlined {
    border-radius: 0.25rem;
  }
  .style-outlined > .layer {
    color: rgb(var(--error, var(--md-sys-color-outline)));
    border: solid 1px currentColor;
  }
  .style-outlined input:is(:focus, .value, :required:valid) ~ label {
    top: -0.5rem;
    left: 0.75rem;
    padding: 0 0.25rem;
    background-color: rgb(var(--md-sys-color-surface));
  }

  .m3-container:hover > :is(label, .layer) {
    color: rgb(var(--error, var(--md-sys-color-on-surface)));
  }
  .m3-container:focus-within > :is(label, .layer) {
    border-width: 2px;
    color: rgb(var(--error, var(--md-sys-color-primary)));
  }
  input:is(:focus, .value, :required:valid) ~ label {
    font-size: var(--md-sys-typescale-body-small-size, 12px);
    line-height: var(--md-sys-typescale-body-small-height, 16px);
    letter-spacing: var(--md-sys-typescale-body-small-tracking, 0.4);
  }

  .leadingIcon,
  .trailingIcon {
    display: inline-flex;
    pointer-events: none;
    align-self: center;
  }
  .leadingIcon {
    margin: 0 1rem 0 0.75rem;
  }
  .trailingIcon {
    margin: 0 0.75rem 0 auto;
    color: rgb(var(--error));
  }
  .has-icon > input {
    padding-left: 3.25rem;
  }
  .has-icon > label {
    left: 3.25rem;
  }
  .error > input {
    padding-right: 3.25rem;
  }
</style>
