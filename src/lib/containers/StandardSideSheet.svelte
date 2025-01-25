<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import Button from "$lib/buttons/Button.svelte";
  import Icon from "$lib/misc/_icon.svelte";

  export let headline: string;
  export let display = "flex";

  const dispatch = createEventDispatcher();
</script>

<div class="m3-container" style="display: {display};">
  <div class="header">
    <span class="m3-font-title-large">{headline}</span>
    <Button type="text" iconType="full" on:click={() => dispatch("close")}>
      <Icon icon={iconX} />
    </Button>
  </div>
  <slot />
</div>

<style>
  .m3-container {
    flex-direction: column;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1.5rem;
  }
  .header > :global(button.m3-container) {
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
</style>
