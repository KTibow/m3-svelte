<script lang="ts">
  import Card from "./_card.svelte";
  import DateField from "$lib/utils/DateField.svelte";
</script>

<Card>
  <h2 class="m3-font-headline-large">Date field</h2>
  <div slot="demo">
    <DateField name="Date" />
  </div>
</Card>

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
</style>
