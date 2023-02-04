<script lang="ts">
  import { hexFromArgb } from "@importantimport/material-color-utilities";
  export let headline: string;
  export let sub: string;
  export let bg: number;
  export let fg: number;
</script>

<div
  style="background-color: {hexFromArgb(bg)}; color: {hexFromArgb(fg)};"
  class="m3-font-label-large"
>
  <p class="m3-font-headline-small">{headline}</p>
  <p>{sub}</p>
</div>

<style>
  div {
    padding: 1rem;
    border-radius: 1rem;
    white-space: pre-wrap;
  }
</style>
