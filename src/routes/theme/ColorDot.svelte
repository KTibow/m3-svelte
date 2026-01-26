<script lang="ts">
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  import {
    type DynamicColor,
    type DynamicScheme,
    hexFromArgb,
  } from "@ktibow/material-color-utilities-nightly";
  import Icon from "$lib/misc/Icon.svelte";

  let {
    light,
    dark,
    bg,
    grabbing = $bindable(),
  }: {
    light: DynamicScheme;
    dark: DynamicScheme;
    bg: DynamicColor;
    grabbing: boolean;
  } = $props();

  let showCopy = $state(false);
  let bgColorLight = $derived(hexFromArgb(bg.getArgb(light)));
  let bgColorDark = $derived(hexFromArgb(bg.getArgb(dark)));

  $effect(() => {
    if (!grabbing) showCopy = false;
  });

  const rgbToHex = (rgb: string) => {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    const [, r, g, b] = match;
    return "#" + [r, g, b].map((x) => parseInt(x).toString(16).padStart(2, "0")).join("");
  };
</script>

<div
  class="dot"
  style:background-color="light-dark({bgColorLight}, {bgColorDark})"
  role={grabbing ? "button" : undefined}
  onclick={(e) => {
    if (!showCopy) return;
    const styles = getComputedStyle(e.currentTarget);
    navigator.clipboard.writeText(rgbToHex(styles.backgroundColor));
    grabbing = false;
  }}
  onmouseenter={() => {
    if (grabbing) showCopy = true;
  }}
  onmouseleave={() => {
    showCopy = false;
  }}
>
  {#if showCopy}
    <div class="overlay">
      <Icon size={16} icon={iconCopy} />
    </div>
  {/if}
</div>

<style>
  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    position: relative;
    flex-shrink: 0;
  }
  .dot[role="button"] {
    cursor: pointer;
  }
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.5);

    pointer-events: none;
  }
  .overlay :global(svg) {
    color: white;
  }
</style>
