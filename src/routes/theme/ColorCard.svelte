<script lang="ts">
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  import {
    type DynamicColor,
    type DynamicScheme,
    hexFromArgb,
  } from "@ktibow/material-color-utilities-nightly";
  import Icon from "$lib/misc/Icon.svelte";

  let {
    bg,
    fg,
    light,
    dark,
    grabbing,
    grabbed,
  }: {
    bg: DynamicColor;
    fg: DynamicColor;
    light: DynamicScheme;
    dark: DynamicScheme;
    grabbing: boolean;
    grabbed: () => void;
  } = $props();

  let ui = $state(0);
  let bgColorLight = $derived(hexFromArgb(bg.getArgb(light)));
  let fgColorLight = $derived(hexFromArgb(fg.getArgb(light)));
  let bgColorDark = $derived(hexFromArgb(bg.getArgb(dark)));
  let fgColorDark = $derived(hexFromArgb(fg.getArgb(dark)));
  $effect(() => {
    if (!grabbing) ui = 0;
  });

  const rgbToHex = (rgb: string) => {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    const [, r, g, b] = match;
    return "#" + [r, g, b].map((x) => parseInt(x).toString(16).padStart(2, "0")).join("");
  };
</script>

<div
  class="card"
  style:background-color="light-dark({bgColorLight}, {bgColorDark})"
  style:color="light-dark({fgColorLight}, {fgColorDark})"
  role={grabbing ? "button" : undefined}
  onclick={(e) => {
    if (!ui) return;
    const styles = getComputedStyle(e.currentTarget);
    if (ui == 2) {
      navigator.clipboard.writeText(rgbToHex(styles.backgroundColor));
    } else {
      navigator.clipboard.writeText(rgbToHex(styles.color));
    }
    grabbed();
  }}
  onmousemove={(e) => {
    if (grabbing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height) / rect.height;
      ui = y < 0.3 ? 1 : 2;
    }
  }}
  onmouseleave={() => {
    ui = 0;
  }}
>
  <p class="bg">{bg.name.replaceAll("_", " ")}</p>
  <p class="fg">{fg.name.replaceAll("_", " ")} text</p>
  {#if ui}
    <div
      class="overlay"
      class:invert={ui == 1}
      style:background-color={ui == 2 ? "inherit" : "currentColor"}
    >
      <Icon size={24} icon={iconCopy} />
    </div>
  {/if}
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    padding: 1rem;
    white-space: pre-wrap;
    position: relative;
  }
  .card[role="button"] {
    cursor: pointer;
  }
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    inset: 0;

    pointer-events: none;
  }
  .overlay.invert :global(svg) {
    mix-blend-mode: difference;
  }
  p {
    margin: 0;
  }
  p.bg {
    @apply --m3-headline-small;
  }
  p.fg {
    @apply --m3-body-large;
  }
</style>
