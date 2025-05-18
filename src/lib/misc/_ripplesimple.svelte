<script lang="ts">
  let _: { morph: boolean } = $props();
</script>

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

    &:focus-visible > .tint {
      opacity: 0.12;
    }

    &:active > .tint {
      opacity: 0.12;
    }
  }
</style>
