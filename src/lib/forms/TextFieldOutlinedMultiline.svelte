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
  <textarea
    class="focus-none"
    placeholder=" "
    bind:value
    {id}
    {disabled}
    {required}
    {...extra}
  ></textarea>
  <div class="layer"></div>
  <label for={id}>{label}</label>
  {#if leadingIcon}
    <Icon icon={leadingIcon} />
  {/if}
</div>

<style>
  /*
  want to customize the label's background?
  do this: <TextFieldOutlinedMultiline --m3v-background="var(--m3c-surface-container)" />
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
    min-height: --m3-density(5rem);
    min-width: 15rem;
  }
  textarea {
    @apply --m3-body-large;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1rem;
    border-radius: var(--m3-field-outlined-shape);
    background-color: transparent;
    color: var(--m3c-on-surface);
    resize: none;
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
    &:is(textarea:enabled:hover ~ .layer) {
      border-color: var(--error, var(--m3c-on-surface));
    }
    &:is(textarea:enabled:focus ~ .layer) {
      border-color: var(--error, var(--m3c-primary));
      border-width: 0.125rem;
    }
  }
  .m3-container > :global(svg) {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-start: 0.75rem;
    color: var(--m3c-on-surface-variant);
    pointer-events: none;
  }

  .leading-icon > textarea {
    padding-inline-start: 3.25rem;
  }
  .leading-icon > textarea:not(:focus):placeholder-shown ~ label {
    inset-inline-start: 3rem;
  }

  .error {
    --error: var(--m3c-error);
  }
  .error > textarea:hover ~ label,
  .error > textarea:hover ~ .layer {
    --error: var(--m3c-on-error-container);
  }

  textarea:disabled {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
  textarea:disabled ~ .layer {
    border-color: --translucent(var(--m3c-on-surface), 0.38);
  }
  textarea:disabled ~ :global(svg) {
    color: --translucent(var(--m3c-on-surface), 0.38);
  }

  .m3-container {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
</style>
