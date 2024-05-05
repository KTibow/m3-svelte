<script>
  import Icon from "$lib/misc/_icon.svelte";
  import iconStar from "@ktibow/iconset-material-symbols/star-outline";
  import iconRocket from "@ktibow/iconset-material-symbols/rocket-outline";
  import iconChecks from "@ktibow/iconset-material-symbols/done-all";
  let y = 0;
</script>

<svelte:window
  on:mousemove={(e) => {
    y = e.clientY / window.innerHeight;
  }}
/>
<div class="container" style:background-position="0 {y * 100}%">
  <h1 class="m3-font-display-large">M3 Svelte</h1>
  <p class="m3-font-title-large">
    M3 Svelte implements the Material 3 design system in Svelte, from the components to the
    animations to the theming.
  </p>
  <div class="pill m3-font-label-large">
    <Icon icon={iconStar} />
    Celebrating 90+ stars
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
  .container {
    background-image: linear-gradient(
      to bottom,
      rgb(var(--m3-scheme-primary-container)),
      rgb(var(--m3-scheme-tertiary-container))
    );
    background-size: 100% 200%;
    border-radius: 1rem;
    color: rgb(var(--m3-scheme-on-primary-container));

    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    padding: 4rem 1rem 3rem 1rem;
    margin-bottom: 2rem;
  }
  .container h1 {
    font-size: 6rem;
    margin: 0;
  }
  .container p {
    max-width: 50rem;
    align-self: center;
  }
  .container .pill {
    background-color: rgb(var(--m3-scheme-primary) / 0.1);
    align-self: center;

    height: 2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
  }
  @media (min-width: 37.5rem) {
    .container {
      padding: 8rem 1rem 6rem 1rem;
    }
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
