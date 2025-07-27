<script lang="ts">
  import type { Snippet } from "svelte";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import Button from "$lib/buttons/Button.svelte";
  import Icon from "$lib/misc/_icon.svelte";

  let {
    headline,
    children,
    close,
  }: {
    headline: string;
    children: Snippet;
    close: () => void;
  } = $props();
</script>

<div class="m3-container">
  <div class="header">
    <span class="m3-font-title-large">{headline}</span>
    <Button variant="text" iconType="full" onclick={close}>
      <Icon icon={iconX} />
    </Button>
  </div>
  {@render children()}
</div>

<style>
  .m3-container {
    display: flex;
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
