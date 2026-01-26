<script lang="ts">
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

<button type="button" class="item m3-layer" {disabled} class:today class:selected {onclick}>
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
