<script lang="ts">
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  export let display = "inline-flex";
  export let type: "filled" | "outlined";
  export let icon: IconifyIcon | null = null;
  export let name = "";
  export let value = "";
  let input: HTMLInputElement;
  let focused: boolean;
  let id = `input-${crypto.randomUUID()}`;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events (if you have a better idea lmk) -->
<div
  class="container type-{type}"
  class:focused
  class:move-label={focused || value}
  class:has-icon={icon}
  style="display: {display};"
>
  <div class="layer" />
  {#if icon}
    <Icon {icon} />
  {/if}
  <label for={id} class={focused || value ? "md-body-small" : "md-body-large"}>{name}</label>
  <input
    on:focus={() => (focused = true)}
    on:blur={() => (focused = false)}
    bind:this={input}
    bind:value
    class="md-body-large"
    {id}
    {...$$props}
  />
  <fieldset>
    <legend class="md-body-small">{name}</legend>
  </fieldset>
</div>

<style>
  .container {
    min-width: 15rem;
    height: 3.5rem;
    transition: all 150ms;
    position: relative;
  }
  .container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    align-self: center;
  }
  .container :global(svg) {
    margin: 0 1rem 0 0.75rem;
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
    color: inherit;
    outline: none;
    padding: 0 1rem;
  }
  label {
    left: 1rem;
    top: 50%;
    transform: translate(0, -50%);
    position: absolute;
    transition: all 150ms;
    color: rgb(var(--md-sys-color-on-surface-variant));
    pointer-events: none;
  }
  fieldset {
    position: absolute;
    top: -0.5rem;
    bottom: -1px;
    left: -1px;
    right: -2px;
    margin: 0;
    padding: 0 0.75rem;
    border-radius: inherit;
    color: rgb(var(--md-sys-color-outline));
    border: solid 2px currentColor;
    opacity: 0;
    transition: all 150ms;
    pointer-events: none;
  }
  .type-filled {
    background-color: rgb(var(--md-sys-color-surface-variant));
    border-radius: 0.25rem 0.25rem 0 0;
  }
  .type-filled > .layer {
    border-bottom: solid 1px rgb(var(--md-sys-color-on-surface-variant));
  }
  .focused.type-filled > .layer {
    border-bottom: solid 2px rgb(var(--md-sys-color-primary));
  }
  .type-filled .layer:hover {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .type-filled.move-label > input {
    padding-top: 1.25rem;
    padding-bottom: 0.5rem;
  }
  .type-outlined {
    border-radius: 0.25rem;
  }
  .type-outlined > .layer {
    border: solid 1px rgb(var(--md-sys-color-outline));
  }
  .type-outlined:hover {
    border-color: rgb(var(--md-sys-color-on-surface));
  }
  .type-outlined:hover fieldset {
    color: rgb(var(--md-sys-color-on-surface));
  }
  .type-outlined:hover label {
    color: rgb(var(--md-sys-color-on-surface));
  }
  .move-label.type-outlined > .layer {
    border: none;
  }
  .type-outlined.move-label fieldset {
    opacity: 1;
  }
  .type-outlined.focused fieldset {
    color: rgb(var(--md-sys-color-primary));
  }
  .move-label.type-outlined label {
    left: 0.5rem;
    top: -0.5rem;
    transform: none;
    opacity: 0;
  }
  .has-icon input {
    padding-left: 3.25rem;
  }
  .has-icon label {
    left: 3.25rem;
  }
  .move-label label {
    top: 0.5rem;
    transform: none;
  }
  .focused label {
    color: rgb(var(--md-sys-color-primary));
  }
</style>
