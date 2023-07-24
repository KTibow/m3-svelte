<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import DateField from "$lib/utils/DateField.svelte";
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">Date field</h2>
  <div class="area">
    <DateField name="Date" />
  </div>
</Card>

<style>
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
</style>
