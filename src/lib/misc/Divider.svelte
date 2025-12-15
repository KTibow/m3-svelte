<script lang="ts">
  let {
    inset = false,
  }: {
    inset?: boolean;
  } = $props();
</script>

<hr class:inset />

<style>
  hr {
    margin: 0;
    height: 0;
    border: none;
    border-bottom: solid 1px var(--m3c-outline-variant);
  }
  .inset {
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
