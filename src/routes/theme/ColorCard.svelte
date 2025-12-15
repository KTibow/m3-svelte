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
    scheme,
    grabbing,
    grabbed,
  }: {
    bg: DynamicColor;
    fg: DynamicColor;
    scheme: DynamicScheme;
    grabbing: boolean;
    grabbed: () => void;
  } = $props();

  let ui = $state(0);
  let bgColor = $derived(hexFromArgb(bg.getArgb(scheme)));
  let fgColor = $derived(hexFromArgb(fg.getArgb(scheme)));
  $effect(() => {
    if (!grabbing) ui = 0;
  });
</script>

<div
  class="card"
  style="background-color: {bgColor}; color: {fgColor};"
  role={grabbing ? "button" : undefined}
  onclick={() => {
    if (ui) {
      if (ui == 2) {
        navigator.clipboard.writeText(bgColor);
      } else {
        navigator.clipboard.writeText(fgColor);
      }
      grabbed();
    }
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
      style:background-color={ui == 2 ? bgColor : fgColor}
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
