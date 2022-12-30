<div class="m3-container"><slot /></div>

<style>
  .m3-container {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 3;
  }
  :global(.navBarOffset) .m3-container {
    bottom: 6rem;
  }
</style>
