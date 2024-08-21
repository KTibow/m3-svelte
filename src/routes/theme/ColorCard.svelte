<script lang="ts">
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";

  import {
    type DynamicScheme,
    MaterialDynamicColors,
    hexFromArgb,
  } from "@material/material-color-utilities";
  import { createEventDispatcher } from "svelte";
  import Icon from "$lib/misc/_icon.svelte";

  export let fg: string;
  export let bg: string;
  export let scheme: DynamicScheme;
  export let grabbing: boolean;

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

  let state = 0;
  const dispatch = createEventDispatcher();
  $: bgColor = hexFromArgb(MaterialDynamicColors[bg as Color].getArgb(scheme));
  $: fgColor = hexFromArgb(MaterialDynamicColors[fg as Color].getArgb(scheme));
  $: if (!grabbing) state = 0;
</script>

<div
  class="card"
  style="background-color: {bgColor}; color: {fgColor};"
  role={grabbing ? "button" : undefined}
  on:click={(e) => {
    if (state) {
      if (state == 2) {
        navigator.clipboard.writeText(bgColor);
      } else {
        navigator.clipboard.writeText(fgColor);
      }
      dispatch("grabbed");
    }
  }}
  on:mousemove={(e) => {
    if (grabbing) {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height) / rect.height;
      state = y < 0.3 ? 1 : 2;
    }
  }}
  on:mouseleave={() => {
    state = 0;
  }}
>
  <p class="m3-font-headline-small">{bg}</p>
  <p class="m3-font-body-large">{fg} text</p>
  {#if state}
    <div
      class="overlay"
      class:invert={state == 1}
      style:background-color={state == 2 ? bgColor : fgColor}
    >
      <Icon width="1.5rem" height="1.5rem" icon={iconCopy} />
    </div>
  {/if}
</div>

<style>
  .card {
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
