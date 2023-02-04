<script lang="ts">
  export let isButton = false;
  export let disabled = false;
  export let today = false;
  export let selected = false;
  export let label: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
  this={isButton ? "button" : "span"}
  {disabled}
  class="item m3-font-body-small"
  class:today
  class:selected
  on:click
>
  {label}
</svelte:element>

<style>
  .item {
    display: inline-flex;
    --text: var(--m3-scheme-on-surface);
    color: rgb(var(--text));
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    transition: all 200ms;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  button:enabled:hover {
    background-color: rgb(var(--text) / 0.08);
  }
  button:enabled:is(:focus-visible, :active) {
    background-color: rgb(var(--text) / 0.12);
  }
  button:disabled {
    cursor: auto;
    color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
  }
  .today {
    border: solid 1px rgb(var(--text));
    --text: var(--m3-scheme-primary);
  }
  .selected {
    background-color: rgb(var(--m3-scheme-primary)) !important;
    --text: var(--m3-scheme-on-primary);
  }
</style>
