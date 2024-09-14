<script lang="ts">
  import DateField from "$lib/utils/DateField.svelte";
  import Card from "./_card.svelte";
</script>

<Card title="Date field" code={`<DateField bind:date />`}>
  <div slot="demo">
    <DateField name="Date" />
  </div>
</Card>
