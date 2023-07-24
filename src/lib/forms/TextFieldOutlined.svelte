<script lang="ts">
  import type { IconifyIcon } from "@iconify/svelte";
  import Icon from "@iconify/svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: HTMLInputAttributes = {};
  export let name: string;
  export let leadingIcon: IconifyIcon | undefined = undefined;

  export let disabled = false;
  export let error = false;
  export let value = "";
  const id = crypto.randomUUID();
</script>

<div
  class="m3-container"
  class:leading-icon={leadingIcon}
  class:error
  style="display: {display}"
  {...extraWrapperOptions}
>
  <input class="m3-font-body-large" placeholder=" " bind:value {id} {disabled} {...extraOptions} />
  <div class="layer" />
  <label class="m3-font-body-large" for={id}>{name}</label>
  {#if leadingIcon}
    <Icon icon={leadingIcon} />
  {/if}
</div>

<style>
  .m3-container {
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
    border-radius: 0.25rem;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));
  }
  label {
    position: absolute;
    left: 0.75rem;
    top: 1rem;
    color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    background-color: rgb(var(--m3-util-background, var(--m3-scheme-surface)));
    padding: 0 0.25rem;
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
    border: 0.0625rem solid rgb(var(--error, var(--m3-scheme-outline)));
    border-radius: 0.25rem;
    pointer-events: none;
    transition: all 200ms;
  }
  .m3-container > :global(svg) {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.75rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    pointer-events: none;
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    top: calc(var(--m3-font-body-small-height, 1rem) * -0.5);
    font-size: var(--m3-font-body-small-size, 0.75rem);
    line-height: var(--m3-font-body-small-height, 1rem);
    letter-spacing: var(--m3-font-body-small-tracking, 0.4);
  }
  input:hover ~ label {
    color: rgb(var(--error, var(--m3-scheme-on-surface)));
  }
  input:hover ~ .layer {
    border-color: rgb(var(--error, var(--m3-scheme-on-surface)));
  }
  input:focus ~ label {
    color: rgb(var(--error, var(--m3-scheme-primary)));
  }
  input:focus ~ .layer {
    border-color: rgb(var(--error, var(--m3-scheme-primary)));
    border-width: 0.125rem;
  }

  .leading-icon > input {
    padding-left: 3.25rem;
  }
  .leading-icon > input:not(:focus):placeholder-shown ~ label {
    left: 3rem;
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
  input:disabled ~ label {
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
