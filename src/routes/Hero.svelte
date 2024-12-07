<script>
  import Icon from "$lib/misc/_icon.svelte";
  import iconBook from "@ktibow/iconset-material-symbols/book-2-rounded";
  import iconRocket from "@ktibow/iconset-material-symbols/rocket-outline";
  import iconChecks from "@ktibow/iconset-material-symbols/done-all";
  let y = 0;
</script>

<svelte:window
  on:mousemove={(e) => {
    y = e.clientY / window.innerHeight;
  }}
/>
<div class="wrapper">
  <div class="container" style:background-position="0 {y * 100}%">
    <h1 class="m3-font-display-large">M3 Svelte</h1>
  </div>
  <p class="subtitle m3-font-title-large">
    M3 Svelte implements the Material 3 design system in Svelte, from the components to the
    animations to the theming.
  </p>
  <div class="pill m3-font-label-large">
    <Icon icon={iconBook} />
    Updated docs, plus 269 stars
  </div>
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
      <h2 class="m3-font-headline-medium">Fast</h2>
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
      <h2 class="m3-font-headline-medium">Robust</h2>
      <p>
        Even in some edge cases like being printed, used in high contrast mode, or with JS off, most
        of M3 Svelte is still usable.
      </p>
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4.5rem 0;
  }
  .container {
    background-image: linear-gradient(
      to bottom,
      rgb(var(--m3-scheme-primary-container)),
      rgb(var(--m3-scheme-tertiary-container))
    );
    background-size: 100% 200%;
    color: rgb(var(--m3-scheme-on-primary-container));

    display: flex;
    align-items: center;
    text-align: center;
    height: 10rem;

    padding: 0 3rem;
    border-radius: 5rem;
    margin-bottom: 1.5rem;
    position: relative;
  }
  .container h1 {
    font-size: 6rem;
    margin: 0;
  }
  .subtitle {
    max-width: 50rem;
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }
  .pill {
    background-color: rgb(var(--m3-scheme-surface-container-low));

    height: 2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .item {
    background-color: rgb(var(--m3-scheme-primary-container) / 0.5);
    color: rgb(var(--m3-scheme-on-primary-container));
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
  h2 {
    line-height: 2rem;
    margin: 0;
  }
  .item p {
    margin: 0;
  }
</style>
