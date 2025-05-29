<script lang="ts">
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  import {
    type DynamicScheme,
    MaterialDynamicColors,
    hexFromArgb,
  } from "@ktibow/material-color-utilities-nightly";
  import Icon from "$lib/misc/_icon.svelte";

  let {
    fg,
    bg,
    scheme,
    grabbing,
    grabbed,
  }: {
    fg: string;
    bg: string;
    scheme: DynamicScheme;
    grabbing: boolean;
    grabbed: () => void;
  } = $props();

  type Color =
    | "primary"
    | "onPrimary"
    | "primaryContainer"
    | "onPrimaryContainer"
    | "inversePrimary"
    | "secondary"
    | "onSecondary"
    | "secondaryContainer"
    | "onSecondaryContainer"
    | "tertiary"
    | "onTertiary"
    | "tertiaryContainer"
    | "onTertiaryContainer"
    | "error"
    | "onError"
    | "errorContainer"
    | "onErrorContainer"
    | "background"
    | "onBackground"
    | "surface"
    | "onSurface"
    | "surfaceVariant"
    | "onSurfaceVariant"
    | "inverseSurface"
    | "inverseOnSurface"
    | "outline"
    | "outlineVariant"
    | "shadow"
    | "scrim"
    | "surfaceDim"
    | "surfaceBright"
    | "surfaceContainerLowest"
    | "surfaceContainerLow"
    | "surfaceContainer"
    | "surfaceContainerHigh"
    | "surfaceContainerHighest"
    | "surfaceTint";

  let ui = $state(0);
  let bgColor = $derived(hexFromArgb(MaterialDynamicColors[bg as Color].getArgb(scheme)));
  let fgColor = $derived(hexFromArgb(MaterialDynamicColors[fg as Color].getArgb(scheme)));
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
  <p class="m3-font-headline-small">{bg}</p>
  <p class="m3-font-body-large">{fg} text</p>
  {#if ui}
    <div
      class="overlay"
      class:invert={ui == 1}
      style:background-color={ui == 2 ? bgColor : fgColor}
    >
      <Icon width="1.5rem" height="1.5rem" icon={iconCopy} />
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
</style>
