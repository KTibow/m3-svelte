<script>
  import iconPlus from "@ktibow/iconset-material-symbols/add-rounded";
  import iconSquoosh from "@ktibow/iconset-material-symbols/fullscreen-exit-rounded";
  import Icon from "$lib/misc/Icon.svelte";
  import Branding from "./Branding.svelte";
</script>

<div class="wrapper">
  <Branding />
  <div class="pills m3-font-label-large">
    <div class="pill">
      <Icon icon={iconPlus} />
      Now with Material 3 Expressive
    </div>
    <div class="pill">
      <Icon icon={iconSquoosh} />
      Tokens are shakeable
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
