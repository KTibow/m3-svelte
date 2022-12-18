<script>
  import Icon from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";
  export let options;
  export let maxOptions = 0;
  export let chosenOptions = [];
  export let display = "inline-flex";
</script>

<div class="container" style="display: {display};">
  {#each options as option}
    {@const icon = chosenOptions.includes(option) ? iconCheck : option.icon}
    <button
      class="label-large"
      class:selected={chosenOptions.includes(option)}
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
    border-radius: 1.25rem;
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
  button:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  button.selected:hover > .layer {
    background-color: rgb(var(--md-sys-color-on-secondary-container) / 0.08);
  }
  button:focus > .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  button.selected:focus > .layer {
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
