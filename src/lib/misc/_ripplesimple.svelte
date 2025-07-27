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
    transition: opacity var(--m3-util-easing-fast);

    &:not(
      :global(input:disabled + label) > .tint,
      :global(input:disabled + .layer-container) > .tint,
      :global(:disabled) > .tint
    ) {
      @media (hover: hover) {
        &:is(:global(:hover) > .tint) {
          opacity: 0.08;
        }
      }
      &:is(:global(input:focus-visible + label) > .tint),
      &:is(:global(:focus-visible) > .tint),
      &:is(:global(:active) > .tint) {
        opacity: 0.12;
      }
    }
  }
</style>
