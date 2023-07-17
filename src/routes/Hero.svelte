<script>
  import Icon from "@iconify/svelte";
  import iconRocket from "@iconify-icons/ic/outline-rocket";
  import iconChecks from "@iconify-icons/ic/outline-done-all";
</script>

<div class="container">
  <h2 class="m3-font-display-large">M3 Svelte</h2>
  <p class="m3-font-title-large">
    M3 Svelte implements the Material 3 design system in Svelte, from the components to the
    animations to the theming.
  </p>
</div>
<div class="items">
  <div class="item">
    <div class="icon">
      <svg viewBox="0 0 40 40" fill="currentColor">
        <path
          d="M.887 14.467C-2.845 5.875 5.875-2.845 14.467.887l1.42.617a10.323 10.323 0 0 0 8.225 0l1.42-.617c8.593-3.732 17.313 4.988 13.581 13.58l-.617 1.42a10.323 10.323 0 0 0 0 8.225l.617 1.42c3.732 8.593-4.989 17.313-13.58 13.581l-1.42-.617a10.323 10.323 0 0 0-8.225 0l-1.42.617C5.874 42.845-2.846 34.125.886 25.533l.617-1.42a10.323 10.323 0 0 0 0-8.225l-.617-1.42Z"
        />
      </svg>
      <Icon icon={iconRocket} class="fg-icon" />
    </div>
    <div class="content">
      <h3 class="m3-font-headline-medium">Fast</h3>
      <p>M3 Svelte uses minimal CSS, JS, and elements to keep your sites running smooth.</p>
    </div>
  </div>
  <div class="item">
    <div class="icon">
      <svg viewBox="0 0 40 40" fill="currentColor">
        <path
          d="M.887 14.467C-2.845 5.875 5.875-2.845 14.467.887l1.42.617a10.323 10.323 0 0 0 8.225 0l1.42-.617c8.593-3.732 17.313 4.988 13.581 13.58l-.617 1.42a10.323 10.323 0 0 0 0 8.225l.617 1.42c3.732 8.593-4.989 17.313-13.58 13.581l-1.42-.617a10.323 10.323 0 0 0-8.225 0l-1.42.617C5.874 42.845-2.846 34.125.886 25.533l.617-1.42a10.323 10.323 0 0 0 0-8.225l-.617-1.42Z"
        />
      </svg>
      <Icon icon={iconChecks} class="fg-icon" />
    </div>
    <div class="content">
      <h3 class="m3-font-headline-medium">Robust</h3>
      <p>
        Even in some edge cases like being printed, used in high contrast mode, or with JS off, most
        of M3 Svelte is still usable.
      </p>
    </div>
  </div>
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
    margin-bottom: 2rem;
  }
  .container h2 {
    font-size: 6rem;
    margin: 0;
  }
  .container p {
    max-width: 50rem;
    margin: 0 auto;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .item {
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
    border-radius: 2rem;

    flex: 1 1 20rem;
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
  }
  .icon {
    position: relative;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
  .icon > svg {
    position: absolute;
    inset: 0;
  }
  .icon > :global(.fg-icon) {
    position: absolute;
    inset: 0.5rem;
    width: 1rem;
    height: 1rem;
    color: rgb(var(--m3-scheme-secondary-container));
  }
  h3 {
    line-height: 2rem;
    margin: 0;
  }
  .item p {
    margin: 0;
  }
</style>
