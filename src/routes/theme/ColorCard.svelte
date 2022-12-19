<script lang="ts">
  import { hexFromArgb } from "@importantimport/material-color-utilities";
  export let text: string;
  export let bg: number;
  export let fg: number;
</script>

<div style="background-color: {hexFromArgb(bg)}; color: {hexFromArgb(fg)};" class="label-large">
  {text}
</div>

<style>
  div {
    padding: 1rem;
    border-radius: 1rem;
    white-space: pre-wrap;
  }
</style>
