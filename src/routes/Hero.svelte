<div class="container">
  <h2 class="m3-font-display-large">M3 Svelte</h2>
  <p class="m3-font-title-large">
    M3 Svelte implements the Material 3 design system, from the components to the animations to the
    theming. It's written in Svelte, and it's designed to be efficient.
  </p>
</div>

<style>
  .container {
    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
    border-radius: 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 8rem 0 6rem 0;
    margin-bottom: 4rem;
  }
  h2 {
    font-size: 6rem;
    margin: 0;
  }
  p {
    max-width: 50rem;
    margin: 0 auto;
  }
</style>
