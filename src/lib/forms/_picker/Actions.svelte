<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";

  let {
    clearable,
    chosenDate,
    clear,
    cancel,
    ok,
  }: {
    clearable: boolean;
    chosenDate: boolean;
    clear: () => void;
    cancel: () => void;
    ok: () => void;
  } = $props();
</script>

<div class="m3-container">
  {#if clearable}
    <span class="left">
      <Button variant="text" onclick={clear} type="button">Clear</Button>
    </span>
  {/if}
  <Button variant="text" onclick={cancel} type="button">Cancel</Button>
  <Button variant="text" disabled={!clearable && !chosenDate} onclick={ok} type="button">OK</Button>
</div>

<style>
  .m3-container {
    display: flex;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    justify-content: flex-end;
  }
  .m3-container > .left {
    margin-right: auto;
  }
</style>
