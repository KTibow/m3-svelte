<script lang="ts">
  export let disabled = false;
  export let today = false;
  export let selected = false;
  export let label: string;
</script>

<button
  {disabled}
  class="item m3-font-body-small"
  type="button"
  class:today
  class:selected
  on:click
>
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

    --text: var(--m3-scheme-on-surface);
    background-color: transparent;
    color: rgb(var(--text));
    border: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  @media (hover: hover) {
    button:enabled:hover {
      background-color: rgb(var(--text) / 0.08);
    }
  }
  button:enabled:focus-visible,
  button:enabled:active {
    background-color: rgb(var(--text) / 0.12);
  }
  button:disabled {
    cursor: auto;
    color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
  }
  .today {
    border: solid 0.0625rem rgb(var(--text));
    --text: var(--m3-scheme-primary);
  }
  .selected {
    background-color: rgb(var(--m3-scheme-primary)) !important;
    --text: var(--m3-scheme-on-primary);
  }
</style>
