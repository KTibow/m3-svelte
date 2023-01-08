<script lang="ts">
  import { hexFromArgb } from "@importantimport/material-color-utilities";
  export let headline: string;
  export let sub: string;
  export let bg: number;
  export let fg: number;
</script>

<div style="background-color: {hexFromArgb(bg)}; color: {hexFromArgb(fg)};" class="md-label-large">
  <p class="md-headline-small">{headline}</p>
  <p>{sub}</p>
</div>

<style>
  div {
    padding: 1rem;
    border-radius: 1rem;
    white-space: pre-wrap;
  }
</style>
