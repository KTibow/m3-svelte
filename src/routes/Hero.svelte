<script>
  import iconSpeed from "@ktibow/iconset-material-symbols/blur-medium-rounded";
  import Icon from "$lib/misc/_icon.svelte";
  import Branding from "./Branding.svelte";
</script>

<div class="wrapper">
  <Branding />
  <div class="pills">
    <div class="pill m3-font-label-large">
      <Icon icon={iconSpeed} />
      Material 3 Expressive coming soon
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
