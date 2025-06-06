import {
  MaterialDynamicColors,
  DynamicColor,
  ContrastCurve,
} from "@ktibow/material-color-utilities-nightly";

export const materialColors = new MaterialDynamicColors();
// Custom color role used for switch
const onOnPrimary = DynamicColor.fromPalette({
  name: "on_on_primary",
  palette: (s) => s.primaryPalette,
  background: () => materialColors.onPrimary(),
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});

export const colors = [...materialColors.allColors, onOnPrimary];

export const pairs = [
  [materialColors.primary(), materialColors.onPrimary()],
  [materialColors.primaryContainer(), materialColors.onPrimaryContainer()],
  [materialColors.secondary(), materialColors.onSecondary()],
  [materialColors.secondaryContainer(), materialColors.onSecondaryContainer()],
  [materialColors.tertiary(), materialColors.onTertiary()],
  [materialColors.tertiaryContainer(), materialColors.onTertiaryContainer()],
  [materialColors.background(), materialColors.onBackground()],
  [materialColors.surface(), materialColors.onSurface()],
  [materialColors.inverseSurface(), materialColors.inverseOnSurface()],
  [materialColors.surfaceVariant(), materialColors.onSurfaceVariant()],
  [materialColors.error(), materialColors.onError()],
  [materialColors.errorContainer(), materialColors.onErrorContainer()],
];
