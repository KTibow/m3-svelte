<script lang="ts">
  import Chip from "$lib/forms/Chip.svelte";
  import type { IconifyIcon } from "@iconify/svelte";
  export let options: { label: string; icon?: IconifyIcon; selected?: boolean }[];
  export let chosenOptions: number[] = [];
</script>

<div class="m3-container">
  {#each options as option, i}
    <Chip
      {...option}
      type="input"
      selected={chosenOptions.includes(i)}
      on:click={() =>
        chosenOptions.includes(i)
          ? (chosenOptions = chosenOptions.filter((option) => option != i))
          : (chosenOptions = [...chosenOptions, i])}
    >
      {option.label}
    </Chip>
  {/each}
</div>

<style>
  .m3-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
