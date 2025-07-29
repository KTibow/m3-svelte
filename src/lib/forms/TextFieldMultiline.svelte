<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/_icon.svelte";
  import type { HTMLTextareaAttributes } from "svelte/elements";

  let {
    label,
    leadingIcon,
    disabled = false,
    required = false,
    error = false,
    value = $bindable(),
    ...extra
  }: {
    label: string;
    leadingIcon?: IconifyIcon;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: string;
  } & HTMLTextareaAttributes = $props();
  const id = $props.id();
  const resize = (node: HTMLElement) => {
    const update = () => {
      const textarea = node.firstElementChild as HTMLTextAreaElement;
      node.style.height = "unset";
      node.style.height = textarea.scrollHeight + "px";
    };
    node.addEventListener("input", update);

    return {
      destroy() {
        node.removeEventListener("input", update);
      },
    };
  };
</script>

<div class="m3-container" class:leading-icon={leadingIcon} class:error use:resize>
  <textarea
    class="focus-none m3-font-body-large"
    placeholder=" "
    bind:value
    {id}
    {disabled}
    {required}
    {...extra}
    defaultValue={extra.defaultValue}
  ></textarea>
  <!-- TODO: once https://github.com/sveltejs/svelte/pull/16481 is finished, remove the defaultvalue thing -->
  <label class="m3-font-body-large" for={id}>{label}</label>
  <div class="layer"></div>
  {#if leadingIcon}
    <Icon icon={leadingIcon} />
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
    min-height: 5rem;
    min-width: 15rem;
  }
  textarea {
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
    resize: none;
  }
  label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    &:is(textarea:hover ~ label) {
      color: rgb(var(--error, var(--m3-scheme-on-surface)));
    }
    &:is(textarea:focus ~ label) {
      color: rgb(var(--error, var(--m3-scheme-primary)));
    }
    &:is(textarea:disabled ~ label) {
      color: rgb(var(--m3-scheme-on-surface) / 0.38);
    }
    &:is(textarea:focus ~ label, textarea:not(:placeholder-shown) ~ label) {
      top: 0.5rem;
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
    border-radius: var(--m3-textfield-filled-shape) var(--m3-textfield-filled-shape) 0 0;
    pointer-events: none;
    transition: all 100ms;
    &:is(textarea:enabled:hover ~ .layer) {
      background-color: rgb(var(--m3-scheme-on-surface) / 0.08);
    }
  }
  .layer::after {
    position: absolute;
    content: " ";
    display: block;
    width: 100%;
    bottom: 0;

    height: 1px;
    background-color: rgb(var(--error, var(--m3-scheme-on-surface-variant)));
    transition: all 100ms;
  }
  .m3-container > :global(svg) {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 0.75rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    pointer-events: none;
  }

  textarea:focus ~ .layer::after {
    height: 0.125rem;
    background-color: rgb(var(--error, var(--m3-scheme-primary)));
  }

  .leading-icon > textarea {
    padding-left: 3.25rem;
  }
  .leading-icon > label {
    left: 3.25rem;
  }
  .error {
    --error: var(--m3-scheme-error);
  }
  .error > textarea:hover ~ label,
  .error > textarea:hover ~ .layer {
    --error: var(--m3-scheme-on-error-container);
  }
  textarea:disabled {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.04);
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  textarea:disabled ~ .layer::after {
    background-color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
  textarea:disabled ~ :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    textarea {
      background-color: field;
    }
    .layer::after,
    textarea:focus ~ .layer::after {
      background-color: canvastext;
    }
  }
</style>
