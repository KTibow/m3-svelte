<script>
  import Icon from "$lib/misc/_icon.svelte";
  import iconArrow from "@ktibow/iconset-material-symbols/arrow-downward";
</script>

<div>
  <Icon icon={iconArrow} />
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }
  div > :global(svg) {
    width: 3rem;
    height: 3rem;
  }
</style>
