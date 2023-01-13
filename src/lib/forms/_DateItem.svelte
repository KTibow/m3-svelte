<script lang="ts">
  export let day: { disabled?: boolean; day: string };
  export let chosen: boolean;
  export let today: boolean;
</script>

<button class="md-body-small" class:chosen class:today disabled={day.disabled} on:click>
  {day.day}
</button>

<style>
  button {
    display: inline-flex;
    background-color: transparent;
    --text: var(--md-sys-color-on-surface);
    color: rgb(var(--text));
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 2.5rem;
    cursor: pointer;
    transition: all 150ms;
  }
  button:enabled:hover {
    background-color: rgb(var(--text) / 0.08);
  }
  button:enabled:focus-visible,
  button:enabled:active {
    background-color: rgb(var(--text) / 0.12);
  }
  button:disabled {
    color: rgb(
      var(--text) / 0.38
    ); /* strayed from the spec because it's hard to see what's disabled */
    cursor: auto;
  }
  button.today {
    border: solid 1px rgb(var(--text));
    --text: var(--md-sys-color-primary);
  }
  button.chosen {
    background-color: rgb(var(--md-sys-color-primary)) !important;
    --text: var(--md-sys-color-on-primary);
  }
</style>
