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
// Custom colors for you to use
const primaryContainerSubtle = DynamicColor.fromPalette({
  name: "primary_container_subtle",
  palette: (s) => s.primaryPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
const onPrimaryContainerSubtle = DynamicColor.fromPalette({
  name: "on_primary_container_subtle",
  palette: (s) => s.primaryPalette,
  background: () => primaryContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});
const tertiaryContainerSubtle = DynamicColor.fromPalette({
  name: "tertiary_container_subtle",
  palette: (s) => s.tertiaryPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
const onTertiaryContainerSubtle = DynamicColor.fromPalette({
  name: "on_tertiary_container_subtle",
  palette: (s) => s.tertiaryPalette,
  background: () => tertiaryContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});
const errorContainerSubtle = DynamicColor.fromPalette({
  name: "error_container_subtle",
  palette: (s) => s.errorPalette,
  isBackground: true,
  background: (s) => materialColors.highestSurface(s),
  contrastCurve: () => undefined,
});
const onErrorContainerSubtle = DynamicColor.fromPalette({
  name: "on_error_container_subtle",
  palette: (s) => s.errorPalette,
  background: () => errorContainerSubtle,
  contrastCurve: () => new ContrastCurve(6, 6, 7, 11),
});

export const colors = [
  ...materialColors.allColors,
  materialColors.shadow(),
  materialColors.scrim(),
  onOnPrimary,
  primaryContainerSubtle,
  onPrimaryContainerSubtle,
  tertiaryContainerSubtle,
  onTertiaryContainerSubtle,
  errorContainerSubtle,
  onErrorContainerSubtle,
];

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
