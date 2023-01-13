<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconCheck from "@iconify-icons/ic/outline-check";
  export let disabled = false;
  export let checked = false;
  export let display = "inline-flex";

  let startX: number | null;
  const handleMouseUp = (e: MouseEvent) => {
    if (!startX) return;
    const distance = e.clientX - startX;
    if (distance > 16 && !checked) checked = true;
    if (distance < -16 && checked) checked = false;
    startX = null;
  };
</script>

<svelte:window on:mouseup={handleMouseUp} />
<div class="m3-container" style="display: {display};" on:mousedown={(e) => (startX = e.clientX)}>
  <input
    type="checkbox"
    bind:checked
    {disabled}
    on:keydown={(e) => {
      if (e.code == "Enter") checked = !checked;
      if (e.code == "ArrowLeft") checked = false;
      if (e.code == "ArrowRight") checked = true;
    }}
    {...$$props}
  />
  <!-- svelte-ignore a11y-click-events-have-key-events (if you have a better idea lmk) -->
  <div class="layer" on:mousedown={(e) => (startX = e.clientX)} />
  <Icon icon={iconCheck} />
</div>

<style>
  .m3-container {
    position: relative;
  }
  input {
    appearance: none;
    width: 3.25rem;
    height: 2rem;
    margin: 0;
    border-radius: 2rem;
    border: solid 2px rgb(var(--md-sys-color-outline));
    background-color: rgb(var(--md-sys-color-surface-variant));
    cursor: pointer;
    position: relative;
    transition: all 150ms;
  }
  input:checked {
    border: none;
  }
  input:disabled:checked {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  input:enabled:checked {
    background-color: rgb(var(--md-sys-color-primary));
  }
  input:disabled {
    background-color: rgb(var(--md-sys-color-surface-variant) / 0.12);
    border-color: rgb(var(--md-sys-color-outline) / 0.12);
    cursor: auto;
  }
  input::before {
    content: " ";
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    display: inline-block;
    position: relative;
    left: 0.5rem;
    top: 50%;
    transform: translate(0%, -50%);
    background-color: rgb(var(--md-sys-color-outline));
    transition: all 150ms;
  }
  input:checked::before {
    background-color: rgb(var(--md-sys-color-on-primary));
    left: calc(100% - 1.5rem - 0.25rem);
    width: 1.5rem;
    height: 1.5rem;
  }
  input:disabled::before {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.38);
  }
  input:disabled:checked:before {
    background-color: rgb(var(--md-sys-color-surface));
  }

  .layer {
    position: absolute;
    left: -0.5rem;
    top: 50%;
    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    transition: all 150ms;
    transform: translate(0, -50%);
    cursor: pointer;
  }
  input:checked + .layer {
    left: calc(100% - 1.5rem - 0.75rem - 0.25rem);
  }

  input:hover + .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  input:checked:hover + .layer {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
  }
  input:enabled:is(:hover, :focus-visible)::before {
    background-color: rgb(var(--md-sys-color-on-surface-variant));
  }
  input:enabled:checked:is(:hover, :focus-visible)::before {
    background-color: rgb(var(--md-sys-color-primary-container));
  }
  input:focus-visible + .layer,
  .layer:active {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }
  input:focus-visible:checked + .layer,
  input:checked + .layer:active {
    background-color: rgb(var(--md-sys-color-primary) / 0.12);
  }

  .m3-container:active input:enabled:before {
    width: 1.75rem;
    height: 1.75rem;
    left: 0;
    background-color: rgb(var(--md-sys-color-on-surface-variant));
  }
  .m3-container:active input:enabled:checked::before {
    left: calc(100% - 1.75rem - 0.125rem);
    background-color: rgb(var(--md-sys-color-primary-container));
  }

  .m3-container > :global(svg) {
    position: absolute;
    left: 0.625rem;
    top: 50%;
    transform: translate(0, -50%);
    width: 1rem;
    height: 1rem;
    opacity: 0;
    pointer-events: none;
    color: rgb(var(--md-sys-color-surface-variant));
    transition: all 150ms;
  }
  .m3-container > :global(:checked ~ svg) {
    left: calc(100% - 1rem - 0.5rem);
    color: rgb(var(--md-sys-color-on-primary-container));
    opacity: 1;
  }

  input:disabled + .layer {
    display: none;
  }
</style>
