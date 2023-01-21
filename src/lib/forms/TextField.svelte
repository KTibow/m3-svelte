<script lang="ts">
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconError from "@iconify-icons/ic/error-outline";
  export let display = "inline-flex";
  export let inputStyle: "filled" | "outlined";
  export let icon: IconifyIcon | null = null;
  export let name: string;
  export let value = "";
  export let error = false;
  export let supportingText: null | string = null;
  let focused: boolean;
  let id = `input-${crypto.randomUUID()}`;
</script>

<div class:error>
  <div class="m3-container type-{inputStyle}" class:has-icon={icon} style="display: {display};">
    <input
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}
      bind:value
      required
      class="md-body-large"
      class:value
      {id}
      {...$$props}
    />
    <div class="layer" />
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
    <label for={id} class={focused || value ? "md-body-small" : "md-body-large"}>{name}</label>
    <fieldset>
      <legend class="md-body-small">{name}</legend>
    </fieldset>
  </div>
  {#if supportingText}
    <p class="supporting md-body-small">{supportingText}</p>
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
  .leadingIcon,
  .trailingIcon {
    display: inline-flex;
    pointer-events: none;
  }
  .leadingIcon {
    margin: 0 1rem 0 0.75rem;
    align-self: center;
  }
  .trailingIcon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translate(0, -50%);
    color: rgb(var(--error));
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
    border-radius: inherit;
    pointer-events: none;
  }
  input {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    top: 0;
    bottom: 0;
    height: 100%;
    background-color: transparent;
    border: none;
    color: rgb(var(--md-sys-color-on-surface));
    outline: none;
    padding: 0 1rem;
  }
  label {
    left: 1rem;
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
    transition: all 300ms;
    pointer-events: none;
    color: rgb(var(--error));
  }
  legend {
    opacity: 0;
  }
  fieldset {
    position: absolute;
    top: -0.5rem;
    bottom: -1px;
    left: -1px;
    right: -1px;
    margin: 0;
    padding: 0 0.75rem;
    border-radius: inherit;
    color: rgb(var(--error, var(--md-sys-color-outline)));
    border: solid 2px currentColor;
    opacity: 0;
    transition: all 300ms;
    pointer-events: none;
  }
  .supporting {
    color: rgb(var(--md-sys-color-on-surface-variant));
    margin: 0.25rem 0 0 1rem;
  }
  .type-filled {
    background-color: rgb(var(--md-sys-color-surface-variant));
    border-radius: 0.25rem 0.25rem 0 0;
  }
  .type-filled > .layer {
    border-bottom: solid 1px rgb(var(--error, var(--md-sys-color-on-surface-variant)));
  }
  .type-filled:focus-within > .layer {
    border-bottom: solid 2px rgb(var(--error, var(--md-sys-color-primary)));
  }
  .type-filled:focus-within > label {
    color: rgb(var(--error, var(--md-sys-color-primary)));
  }
  .type-filled:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .type-filled > input:is(:focus, .value, :required:valid) {
    padding-top: 1.25rem;
    padding-bottom: 0.5rem;
  }
  .type-outlined {
    border-radius: 0.25rem;
  }
  .type-outlined > .layer {
    border: solid 1px rgb(var(--error, var(--md-sys-color-outline)));
  }
  .type-outlined > input:is(:focus, .value, :required:valid) + .layer {
    border: none;
  }
  .type-outlined > input:is(:focus, .value, :required:valid) ~ fieldset {
    opacity: 1;
  }
  .type-outlined > input:is(:focus, .value, :required:valid) ~ label {
    left: 15px;
    top: -0.5rem;
    transform: none;
  }
  .type-outlined:hover > .layer {
    border-color: rgb(var(--error, var(--md-sys-color-on-surface)));
  }
  .type-outlined:hover > fieldset,
  .type-outlined:hover > label {
    color: rgb(var(--error, var(--md-sys-color-on-surface)));
  }
  .type-outlined:focus-within > fieldset {
    color: rgb(var(--error, var(--md-sys-color-primary)));
  }
  .error {
    --error: var(--md-sys-color-error);
  }
  .error:hover {
    --error: var(--md-sys-color-on-error-container);
  }
  .error > .supporting {
    color: rgb(var(--md-sys-color-error));
  }
  .has-icon > input {
    padding-left: 3.25rem;
  }
  .has-icon > label {
    left: 3.25rem;
  }
  input:is(:focus, .value, :required:valid) ~ label {
    top: 0.5rem;
    transform: none;
  }
</style>
