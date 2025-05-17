<script lang="ts">
  import Chip from "$lib/forms/Chip.svelte";
  import type { IconifyIcon } from "@iconify/types";
  interface Props {
    options: { label: string; value: string; icon?: IconifyIcon }[];
    chosenOptions?: string[];
  }

  let { options, chosenOptions = $bindable([]) }: Props = $props();
</script>

<div class="m3-container">
  {#each options as option}
    <Chip
      {...option}
      type="input"
      selected={chosenOptions.includes(option.value)}
      on:click={() =>
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
