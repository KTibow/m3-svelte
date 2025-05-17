<script lang="ts">
  import { createBubbler } from "svelte/legacy";

  const bubble = createBubbler();
  import Icon from "$lib/misc/_icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import type { IconifyIcon } from "@iconify/types";

  interface Props {
    icon?: IconifyIcon | "space" | undefined;
    disabled?: boolean;
    children?: import("svelte").Snippet;
  }

  let { icon = undefined, disabled = false, children }: Props = $props();
</script>

<button class="item m3-font-label-large" {disabled} onclick={bubble("click")}>
  <Layer />
  {#if icon == "space"}
    <span class="icon"></span>
  {:else if icon}
    <span class="icon">
      <Icon {icon} />
    </span>
  {/if}
  {@render children?.()}
</button>

<style>
  .item {
    display: flex;
    align-items: center;
    height: 3rem;
    padding: 0 0.75rem;
    white-space: nowrap;

    border: none;
    position: relative;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface));

    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.75rem;
  }
  .icon > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
  }

  .item:disabled {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
    cursor: auto;
  }
  .item:disabled > .icon > :global(svg) {
    color: rgb(var(--m3-scheme-on-surface) / 0.38);
  }
</style>
