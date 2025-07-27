<script lang="ts">
  import Chip from "$lib/forms/Chip.svelte";
  import type { IconifyIcon } from "@iconify/types";

  let {
    options,
    chosenOptions,
  }: {
    options: { label: string; value: string; icon?: IconifyIcon }[];
    chosenOptions: string[];
  } = $props();
</script>

<div class="m3-container">
  {#each options as option}
    <Chip
      {...option}
      variant="input"
      selected={chosenOptions.includes(option.value)}
      onclick={() =>
        chosenOptions.includes(option.value)
          ? (chosenOptions = chosenOptions.filter((o) => o != option.value))
          : (chosenOptions = [...chosenOptions, option.value])}
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
