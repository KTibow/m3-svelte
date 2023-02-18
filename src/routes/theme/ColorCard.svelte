<script lang="ts">
  import { hexFromArgb } from "@importantimport/material-color-utilities";
  export let headline: string;
  export let sub: string;
  export let bg: number;
  export let fg: number;
</script>

<div style="background-color: {hexFromArgb(bg)}; color: {hexFromArgb(fg)};">
  <p class="m3-font-headline-small">{headline}</p>
  <p class="m3-font-body-large">{sub}</p>
</div>

<style>
  div {
    padding: 1rem;
    white-space: pre-wrap;
  }
  p {
    margin: 0;
  }
</style>
