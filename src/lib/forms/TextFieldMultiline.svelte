<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/Icon.svelte";
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
  <textarea placeholder=" " bind:value {id} {disabled} {required} {...extra}></textarea>
  <label for={id}>{label}</label>
  <div class="layer"></div>
  {#if leadingIcon}
    <Icon icon={leadingIcon} size={24} />
  {/if}
</div>

<style>
  @layer tokens {
    :root {
      --m3-field-filled-shape: var(--m3-shape-extra-small);
    }
  }
  .m3-container {
    display: inline-flex;
    position: relative;
    align-items: center;
    min-height: --m3-density(5rem);
    min-width: 15rem;
  }
  textarea {
    @apply --m3-body-large;
    @apply --m3-focus-none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    padding: 1.5rem 1rem 0.5rem 1rem;
    border-radius: var(--m3-field-filled-shape) var(--m3-field-filled-shape) 0 0;
    background-color: var(--m3c-surface-container-highest);
    color: var(--m3c-on-surface);
    resize: none;
  }
  label {
    @apply --m3-body-large;
    position: absolute;
    inset-inline-start: 1rem;
    top: 50%;
    translate: 0 -50%;
    color: var(--error, var(--m3c-on-surface-variant));
    &:is(textarea:hover ~ label) {
      color: var(--error, var(--m3c-on-surface));
    }
    &:is(textarea:focus ~ label) {
      color: var(--error, var(--m3c-primary));
    }
    &:is(textarea:disabled ~ label) {
      color: --translucent(var(--m3c-on-surface), 0.38);
    }
    &:is(textarea:focus ~ label, textarea:not(:placeholder-shown) ~ label) {
      @apply --m3-body-small;
      top: 0.5rem;
      translate: 0 0;
    }
    pointer-events: none;
    transition:
      color 100ms,
      top 100ms,
      translate 100ms,
      font-size 300ms,
      line-height 300ms,
      letter-spacing 300ms;
  }
  .layer {
    position: absolute;
    inset: 0;
    border-radius: var(--m3-field-filled-shape) var(--m3-field-filled-shape) 0 0;
    pointer-events: none;
    transition: all 100ms;
    &:is(textarea:enabled:hover ~ .layer) {
      background-color: --translucent(var(--m3c-on-surface), 0.08);
    }
  }
  .layer::after {
    position: absolute;
    content: " ";
    display: block;
    width: 100%;
    bottom: 0;

    height: 1px;
    background-color: var(--error, var(--m3c-on-surface-variant));
    transition: all 100ms;
  }
  .m3-container > :global(svg) {
    position: relative;
    margin-inline-start: 0.75rem;
    color: var(--m3c-on-surface-variant);
    pointer-events: none;
  }

  textarea:focus ~ .layer::after {
    height: 0.125rem;
    background-color: var(--error, var(--m3c-primary));
  }

  .leading-icon > textarea {
    padding-inline-start: 3.25rem;
  }
  .leading-icon > label {
    inset-inline-start: 3.25rem;
  }
  .error {
    --error: var(--m3c-error);
  }
  .error > textarea:hover ~ label,
  .error > textarea:hover ~ .layer {
    --error: var(--m3c-on-error-container);
  }
  textarea:disabled {
    background-color: --translucent(var(--m3c-on-surface), 0.04);
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
  textarea:disabled ~ .layer::after {
    background-color: --translucent(var(--m3c-on-surface), 0.38);
  }
  textarea:disabled ~ :global(svg) {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
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
