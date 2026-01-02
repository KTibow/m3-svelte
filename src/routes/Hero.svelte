<script>
  import iconSquoosh from "@ktibow/iconset-material-symbols/fullscreen-exit-rounded";
  import iconInject from "@ktibow/iconset-material-symbols/vaccines-outline-rounded";
  import Icon from "$lib/misc/Icon.svelte";
  import Branding from "./Branding.svelte";
</script>

<div class="wrapper">
  <Branding />
  <div class="pills">
    <div class="pill">
      <Icon icon={iconInject} />
      Now injecting globals
    </div>
    <div class="pill">
      <Icon icon={iconSquoosh} />
      Smallest CSS yet
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
    @apply --m3-label-large;
    display: flex;
    justify-content: center;

    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .pill {
    background-color: var(--m3c-surface-container-low);

    height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-radius: 2rem;
  }
</style>
