<script lang="ts">
  import type {
    HTMLAttributes,
    HTMLInputAttributes,
    HTMLTextareaAttributes,
  } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconError from "@iconify-icons/ic/error-outline";
  import { createEventDispatcher } from "svelte";

  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes & HTMLTextareaAttributes = {};
  export let style: "filled" | "outlined";
  export let error = false;
  export let icon: IconifyIcon | null = null;
  export let trailingIcon: IconifyIcon | null = null;
  export let name: string;
  export let supportingText: null | string = null;
  export let value = "";
  export let isDate = false;
  export let isTextarea = false;
  const dispatch = createEventDispatcher();
  let id = `input-${crypto.randomUUID()}`;
  let wrapper: HTMLDivElement, textarea: HTMLTextAreaElement;
  const resize = () => {
    textarea.style.height = "unset";
    wrapper.style.height = "unset";
    const height = textarea.scrollHeight + "px";
    textarea.style.height = height;
    wrapper.style.height = height;
  };
</script>

<div>
  <div
    class="m3-container style-{style}"
    class:has-icon={icon}
    class:has-trailing-icon={error || trailingIcon}
    class:error
    style="display: {display}"
    bind:this={wrapper}
    {...extraWrapperOptions}
  >
    {#if isTextarea}
      <textarea
        bind:value
        bind:this={textarea}
        required
        {id}
        class="m3-font-body-large input"
        class:value
        {...extraInputOptions}
        rows="1"
        on:input={resize}
      />
    {:else}
      <input
        bind:value
        required
        {id}
        class="m3-font-body-large input"
        class:value
        on:click={(e) => {
          if (isDate && window.innerWidth > window.innerHeight) e.preventDefault();
        }}
        {...isDate ? { type: "date" } : {}}
        {...extraInputOptions}
      />
    {/if}
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
    {#if trailingIcon}
      <button class="trailingButton" on:click={() => dispatch("trailingClicked")}>
        <Icon icon={trailingIcon} />
      </button>
    {/if}
    <div class="layer" />
    <label class="m3-font-body-large" for={id}>{name}</label>
  </div>
  {#if supportingText}
    <p class="supporting m3-font-body-small" class:error>{supportingText}</p>
  {/if}
</div>

<style>
  .m3-container {
    min-width: 15rem;
    height: 3.5rem;
    position: relative;
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    background-color: transparent;
    border: none;
    outline: none;
    color: rgb(var(--m3-scheme-on-surface));
  }
  textarea {
    resize: none;
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
    --error: var(--m3-scheme-error);
  }
  .supporting {
    color: rgb(var(--m3-scheme-on-surface-variant));
    margin: 0.25rem 0 0 0;
    padding: 0 1rem;
  }
  .supporting.error {
    color: rgb(var(--m3-scheme-error));
  }

  .style-filled {
    background-color: rgb(var(--m3-scheme-surface-variant));
    border-radius: 0.25rem 0.25rem 0 0;
  }
  .style-filled > .layer {
    color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    border-bottom: solid 1px currentColor;
  }
  .style-filled > .input {
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
  }
  .style-filled .input:is(:focus, .value, :required:valid, [type="date"]) ~ label {
    top: 0.5rem;
  }

  .style-outlined {
    border-radius: 0.25rem;
  }
  .style-outlined > .layer {
    color: rgb(var(--error, var(--m3-scheme-outline)));
    border: solid 1px currentColor;
  }
  .style-outlined > .input {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .style-outlined .input:is(:focus, .value, :required:valid, [type="date"]) ~ label {
    top: -0.5rem;
    left: 0.75rem;
    padding: 0 0.25rem;
    background-color: rgb(var(--m3-scheme-surface));
  }

  .m3-container:focus-within > :is(label, .layer) {
    border-width: 2px;
    color: rgb(var(--error, var(--m3-scheme-primary)));
  }
  .input:is(:focus, .value, :required:valid, [type="date"]) ~ label {
    font-size: var(--m3-font-body-small-size, 12px);
    line-height: var(--m3-font-body-small-height, 16px);
    letter-spacing: var(--m3-font-body-small-tracking, 0.4);
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
  .trailingButton {
    position: absolute;
    width: 3.25rem;
    top: 0;
    bottom: 0;
    right: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: var(--m3-scheme-on-surface-variant);
    transition: all 200ms;
    border: none;
    cursor: pointer;
  }
  .trailingButton:is(:focus-visible, :active) {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.12);
  }
  .has-icon > .input {
    padding-left: 3.25rem;
  }
  .has-icon > label {
    left: 3.25rem;
  }
  .has-trailing-icon > .input {
    padding-right: 3.25rem;
  }

  @media (hover: hover) {
    .error:hover {
      --error: var(--m3-scheme-on-error-container);
    }
    .m3-container:hover > :is(label, .layer) {
      color: rgb(var(--error, var(--m3-scheme-on-surface)));
    }
    .style-filled:hover > .layer {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
    }
    .trailingButton:hover {
      background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.08);
    }
  }
  input[type="date"] {
    padding-left: 0.875rem;
  }
  .has-icon > input[type="date"] {
    padding-left: 3.125rem;
  }
  @supports (-moz-appearance: none) {
    input[type="date"] {
      padding-left: 0.75rem;
    }
    .has-icon > input[type="date"] {
      padding-left: 3rem;
    }
  }
  @media (orientation: landscape) {
    input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
    }
    @supports not selector(::-webkit-calendar-picker-indicator) {
      input[type="date"] {
        clip-path: inset(0 3.25rem 0 0);
      }
      .has-trailing-icon input[type="date"] {
        padding-right: 0;
      }
    }
  }
  @media (orientation: portrait) {
    input[type="date"] {
      padding-right: 1rem;
    }
    input[type="date"] ~ .trailingButton {
      display: none;
    }
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .style-filled {
      background-color: field;
    }
  }
</style>
