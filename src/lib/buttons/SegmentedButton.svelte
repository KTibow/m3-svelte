<script lang="ts" context="module">
  export interface ButtonData {
    icon?: IconifyIcon;
    label?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  // TODO: Update to use input checkbox/radio
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";
  export let options: ButtonData[];
  export let minOptions = 1;
  export let maxOptions = 0;
  export let chosenOptions: ButtonData[] = [];
  export let display = "inline-flex";
</script>

<div class="container" style="display: {display};" {...$$props}>
  {#each options as option}
    {@const icon = chosenOptions.includes(option) ? iconCheck : option.icon}
    <button
      class="md-label-large"
      class:selected={chosenOptions.includes(option)}
      disabled={option.disabled ||
        (chosenOptions.includes(option) && chosenOptions.length <= minOptions)}
      on:click={() => {
        if (chosenOptions.includes(option))
          chosenOptions = chosenOptions.filter((opt) => opt != option);
        else chosenOptions = [...chosenOptions, option];
        if (maxOptions && chosenOptions.length > maxOptions)
          chosenOptions = chosenOptions.slice(-maxOptions);
      }}
    >
      <div class="layer" />
      <div class="pad" class:hidden={icon} />
      <div class="icon" class:hidden={!icon}>
        <Icon {icon} />
      </div>
      {option.label}
      <div class="pad" class:hidden={icon} />
    </button>
  {/each}
</div>

<style>
  .container {
    border: 1px solid rgb(var(--md-sys-color-outline));
    height: 2.5rem;
    border-radius: 2.5rem;
    overflow: hidden;
  }
  .container > button {
    padding: 0 1rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    cursor: pointer;
    background-color: transparent;
    border: none;
    color: rgb(var(--md-sys-color-on-surface));
    transition: all 150ms;
  }
  .container > button + button {
    border-left: 1px solid rgb(var(--md-sys-color-outline));
  }
  button:disabled {
    color: rgb(var(--md-sys-color-on-surface) / 0.38);
    cursor: auto;
  }
  .container > .selected {
    background-color: rgb(var(--md-sys-color-secondary-container));
    color: rgb(var(--md-sys-color-on-secondary-container));
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 150ms;
  }
  button:hover:enabled > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  button.selected:hover:enabled > .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container) / 0.08);
  }
  button:focus-visible:enabled > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  button.selected:focus-visible:enabled > .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container) / 0.12);
  }
  .pad,
  .icon,
  .icon > :global(*) {
    width: 18px;
    height: 18px;
    transition: all 150ms;
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
