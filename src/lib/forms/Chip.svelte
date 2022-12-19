<script lang="ts">
  export let display = "inline-flex";
  export let elevated = false;
  export let selected = false;
  export let type: "assist" | "filter" | "input" | "suggestion";
</script>

<button class="container type-{type}" class:elevated style="display: {display};"><slot /></button>

<style>
</style>
