<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import BottomSheet from "$lib/containers/BottomSheet.svelte";
  import Card from "./_card.svelte";

  let open = false;
</script>

<Card>
  <h2 class="m3-font-headline-large">Bottom sheet</h2>
  <div slot="demo">
    <Button type="tonal" on:click={() => (open = true)}>Open</Button>
    {#if open}
      <BottomSheet on:close={() => (open = false)}>
        <div class="contents">
          <div class="inputs">
            <div class="date-input">
              <input type="date" class="m3-font-body-large" id="d-start" />
              <label class="m3-font-body-small" for="d-start">Start</label>
            </div>
            <div class="date-input">
              <input type="date" class="m3-font-body-large" id="d-end" />
              <label class="m3-font-body-small" for="d-end">End</label>
            </div>
          </div>
          <Button type="filled">Add event</Button>
        </div>
      </BottomSheet>
    {/if}
  </div>
</Card>

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .contents {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 1rem;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media (min-width: 37.5rem) {
    .inputs {
      flex-direction: row;
    }
  }

  .date-input {
    position: relative;
    flex-grow: 1;
    height: 3.5rem;
    min-width: 10rem;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    border-radius: 0.25rem 0.25rem 0 0;
    border-bottom: solid 0.0625rem rgb(var(--m3-scheme-on-surface-variant));
  }
  .date-input input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1.5rem 1rem 0.5rem 1rem;
    background-color: inherit;
    border-radius: inherit;
    color: rgb(var(--m3-scheme-on-surface));
  }
  .date-input label {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    pointer-events: none;
  }
  .date-input input {
    padding-left: 0.875rem;
  }
  @supports (-moz-appearance: none) {
    .date-input input {
      padding-left: 0.75rem;
    }
  }
</style>
