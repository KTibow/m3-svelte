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
  type="button"
  class="item m3-font-body-small"
  {disabled}
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
    color: var(--color-on-surface);
    border: none;
    cursor: pointer;
    transition: var(--m3-util-easing-fast);
    position: relative;
  }
  button:disabled {
    cursor: auto;
    color: --translucent(var(--color-on-surface-variant), 0.38);
  }
  .today {
    border: solid 1px var(--color-primary);
    color: var(--color-primary);
  }
  .selected {
    background-color: var(--color-primary) !important;
    color: var(--color-on-primary);
  }
</style>
