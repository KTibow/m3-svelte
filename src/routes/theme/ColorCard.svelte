<script lang="ts">
  import {
    type DynamicScheme,
    MaterialDynamicColors,
    hexFromArgb,
  } from "@material/material-color-utilities";
  export let fg: string;
  export let bg: string;
  export let scheme: DynamicScheme;
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
  $: bgColor = hexFromArgb(MaterialDynamicColors[bg as Color].getArgb(scheme));
  $: fgColor = hexFromArgb(MaterialDynamicColors[fg as Color].getArgb(scheme));
</script>

<div style="background-color: {bgColor}; color: {fgColor};">
  <p class="m3-font-headline-small">{bg}</p>
  <p class="m3-font-body-large">{fg} text</p>
</div>

<style>
  div {
    padding: 1rem;
    white-space: pre-wrap;
  }
  p {
    margin: 0;
  }
</style>
