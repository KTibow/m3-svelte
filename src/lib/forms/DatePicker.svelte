<script lang="ts">
  export let name: string;
  export let value = "";
  let focused: boolean;
</script>

<div class="m3-container">
  <input
    type="date"
    required
    class:value
    bind:value
    on:focus={() => (focused = true)}
    on:blur={() => (focused = false)}
    on:click|preventDefault
  />
  <fieldset>
    <legend class="md-body-small">{name}</legend>
  </fieldset>
</div>

<style>
  .m3-container {
    min-width: 15rem;
    height: 3.5rem;
    position: relative;
    border-radius: 0.25rem;
  }
  fieldset {
    position: absolute;
    left: 0;
    right: 0;
    top: -0.5rem;
    bottom: 0;
    pointer-events: none;
    transition: all 150ms;
    margin: 0;
    padding: 0 15px;
    color: rgb(var(--md-sys-color-outline));
    border: solid 1px currentColor;
    border-radius: inherit;
  }
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    color: rgb(var(--md-sys-color-on-surface));
    outline: none;
    padding: 0 1rem;
  }
  input::-webkit-calendar-picker-indicator {
    display: none;
  }
  .m3-container:hover > fieldset {
    color: rgb(var(--md-sys-color-on-surface));
  }
  input:is(:focus, .value) + fieldset {
    border-width: 2px;
    padding: 0 14px;
  }
  .m3-container:focus-within > fieldset {
    color: rgb(var(--md-sys-color-primary));
  }
</style>
