<script lang="ts">
  import { hexFromArgb } from "@material/material-color-utilities";
  import type { Scheme } from "mcu-extra";
  export let fg: string;
  export let bg: string;
  export let scheme: Scheme;
  type Color =
    | "primary"
    | "onPrimary"
    | "primaryContainer"
    | "onPrimaryContainer"
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
    | "outline"
    | "outlineVariant"
    | "shadow"
    | "scrim"
    | "inverseSurface"
    | "inverseOnSurface"
    | "inversePrimary";
  $: bgColor = hexFromArgb(scheme[bg as Color]);
  $: fgColor = hexFromArgb(scheme[fg as Color]);
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
