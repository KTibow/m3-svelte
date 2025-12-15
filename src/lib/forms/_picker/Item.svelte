<script lang="ts">
  import Layer from "$lib/misc/Layer.svelte";

  let {
    today,
    selected,
    label,
    ...extra
  }: {
    disabled: boolean;
    today: boolean;
    selected: boolean;
    label: string;
    onclick: () => void;
    "aria-label": string;
  } = $props();
</script>

<button type="button" class="item" class:today class:selected {...extra}>
  <Layer />
  {label}
</button>

<style>
  .item {
    @apply --m3-body-small;
    display: inline-flex;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: var(--m3c-on-surface);
    border: none;
    cursor: pointer;
    transition: var(--m3-easing-fast);
    position: relative;
  }
  button:disabled {
    cursor: auto;
    color: --translucent(var(--m3c-on-surface-variant), 0.38);
  }
  .today {
    border: solid 1px var(--m3c-primary);
    color: var(--m3c-primary);
  }
  .selected {
    background-color: var(--m3c-primary) !important;
    color: var(--m3c-on-primary);
  }
</style>
