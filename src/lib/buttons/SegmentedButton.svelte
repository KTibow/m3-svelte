<script lang="ts">
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  interface LabelData {
    icon?: IconifyIcon;
    label: string;
    disabled?: boolean;
  }
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";
  export let display = "inline-flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraInputOptions: HTMLInputAttributes = {};
  export let options: LabelData[];
  export let multiSelect = true;
  export let chosenOptions: number[] | number = [];
  const name = crypto.randomUUID();
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  {#each options as option, i}
    {@const id = crypto.randomUUID()}
    {@const selected =
      chosenOptions instanceof Array ? chosenOptions.includes(i) : chosenOptions == i}
    {@const icon = selected ? iconCheck : option.icon}
    {#if multiSelect}
      <input
        type="checkbox"
        {id}
        value={i}
        disabled={option.disabled}
        bind:group={chosenOptions}
        {...extraInputOptions}
      />
    {:else}
      <input
        type="radio"
        {id}
        {name}
        value={i}
        disabled={option.disabled}
        bind:group={chosenOptions}
        {...extraInputOptions}
      />
    {/if}
    <label class="md-label-large" for={id}>
      <div class="layer" />
      <div class="pad" class:hidden={icon} />
      <div class="icon" class:hidden={!icon}>
        <Icon icon={icon || iconCheck} />
      </div>
      {option.label}
      <div class="pad" class:hidden={icon} />
    </label>
  {/each}
</div>

<style>
  .m3-container {
    border: 1px solid rgb(var(--md-sys-color-outline));
    height: 2.5rem;
    border-radius: 2.5rem;
    overflow: hidden;
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .m3-container > label {
    padding: 0 1rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    white-space: nowrap;

    cursor: pointer;
    --text: var(--md-sys-color-on-surface);
    color: rgb(var(--text));
    transition: all 200ms;
  }

  .m3-container > label ~ label {
    border-left: 1px solid rgb(var(--md-sys-color-outline));
  }
  input:disabled + label {
    color: rgb(var(--md-sys-color-on-surface) / 0.38);
    cursor: auto;
  }
  .m3-container > input:checked + label {
    background-color: rgb(var(--md-sys-color-secondary-container));
    --text: rgb(var(--md-sys-color-on-secondary-container));
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 200ms;
  }
  input:enabled + label:hover > .layer {
    background-color: rgb(var(--text) / 0.08);
  }
  input:enabled:focus-visible + label > .layer,
  input:enabled + label:active > .layer {
    background-color: rgb(var(--text) / 0.12);
  }
  .pad,
  .icon,
  .icon > :global(*) {
    width: 18px;
    height: 18px;
    transition: all 200ms;
    overflow: hidden;
  }
  .pad {
    width: 13px;
  }
  .icon:not(.hidden) {
    margin-right: 0.5rem;
  }
  .hidden {
    width: 0;
  }
</style>
