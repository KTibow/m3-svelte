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
    border-bottom: solid 1px rgb(var(--m3-scheme-outline-variant));
  }
  .inset {
    margin-inline: 1rem;
  }
</style>
