<svelte:options runes />

<div class="tint"></div>

<style>
  .tint {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;

    background-color: currentColor;
    opacity: 0;
    transition: opacity 200ms;
  }

  :global(:not(input:disabled + label, input:disabled + .layer-container, :disabled)) {
    @media (hover: hover) {
      &:hover > .tint {
        opacity: 0.08;
      }
    }

    &:is(:global(input:focus-visible + label)) > .tint,
    &:focus-visible > .tint,
    &:active > .tint {
      opacity: 0.12;
    }
  }
</style>
