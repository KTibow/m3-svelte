<script>
  import Icon from "@iconify/svelte";
  import iconArrow from "@iconify-icons/ic/outline-arrow-downward";
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
