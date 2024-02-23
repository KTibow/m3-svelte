<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/buttons/Button.svelte";

  export let clearable: boolean;
  export let chosenDate: boolean;
  const dispatch = createEventDispatcher();
</script>

<div class="m3-container">
  {#if clearable}
    <span class="left">
      <Button type="text" on:click={() => dispatch("clear")} extraOptions={{ type: "button" }}>
        Clear
      </Button>
    </span>
  {/if}
  <Button type="text" on:click={() => dispatch("cancel")} extraOptions={{ type: "button" }}>
    Cancel
  </Button>
  <Button
    type="text"
    disabled={!clearable && !chosenDate}
    on:click={() => dispatch("ok")}
    extraOptions={{ type: "button" }}
  >
    OK
  </Button>
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
