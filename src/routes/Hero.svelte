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
  <div class="containerr" style:background-position="0 {y * 100}%">
    <h1 class="m3-font-display-large">M3 Svelte</h1>
  </div>
  <div class="pills">
    <div class="pill m3-font-label-large">
      <Icon icon={iconBook} />
      New component browsing experience
    </div>
    <div class="pill m3-font-label-large">
      <Icon icon={iconRocket} />
      Fast with minimal code
    </div>
    <div class="pill m3-font-label-large">
      <Icon icon={iconChecks} />
      Robust across environments
    </div>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 6rem 0;
  }
  .containerr {
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
    min-height: 10rem;

    padding: 0 3rem;
    border-radius: 5rem;
    position: relative;
  }
  .containerr h1 {
    font-size: 6rem;
    margin: 0;
  }
  .pills {
    display: flex;
    justify-content: center;

    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .pill {
    background-color: rgb(var(--m3-scheme-surface-container-low));

    height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-radius: 2rem;
  }
</style>
