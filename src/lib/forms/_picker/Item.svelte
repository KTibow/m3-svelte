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

<button type="button" class="item m3-font-body-small" class:today class:selected {...extra}>
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
