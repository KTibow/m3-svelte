<script lang="ts">
  import Layer from "$lib/misc/Layer.svelte";

  let {
    disabled,
    today,
    selected,
    label,
    onclick,
  }: {
    disabled: boolean;
    today: boolean;
    selected: boolean;
    label: string;
    onclick: () => void;
  } = $props();
</script>

<button
  {disabled}
  class="item m3-font-body-small"
  type="button"
  class:today
  class:selected
  {onclick}
>
  <Layer />
  {label}
</button>

<style>
  .item {
    display: inline-flex;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));
    border: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: var(--m3-util-easing-fast);
    position: relative;
  }
  button:disabled {
    cursor: auto;
    color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
  }
  .today {
    border: solid 1px rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-primary));
  }
  .selected {
    background-color: rgb(var(--m3-scheme-primary)) !important;
    color: rgb(var(--m3-scheme-on-primary));
  }
</style>
