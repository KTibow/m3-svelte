import { writable } from "svelte/store";
import type { SerializedScheme } from "$lib";
import type { schemes } from "./theme/data";

interface ThemeStore {
  darkTheme: SerializedScheme;
  lightTheme: SerializedScheme;
  currentSourceColor?: number;
  algorithm?: keyof typeof schemes;
  contrast?: number;
}

const defaultLightScheme = {
  primary: 4284831119,
  onPrimary: 4294967295,
  primaryContainer: 4293516799,
  onPrimaryContainer: 4280291399,
  inversePrimary: 4291804670,
  secondary: 4284636017,
  onSecondary: 4294967295,
  secondaryContainer: 4293451512,
  onSecondaryContainer: 4280162603,
  tertiary: 4286468704,
  onTertiary: 4294967295,
  tertiaryContainer: 4294957539,
  onTertiaryContainer: 4281405469,
  error: 4290386458,
  onError: 4294967295,
  errorContainer: 4294957782,
  onErrorContainer: 4282449922,
  background: 4294834175,
  onBackground: 4280097568,
  surface: 4294834175,
  onSurface: 4280097568,
  surfaceVariant: 4293386475,
  onSurfaceVariant: 4282991950,
  inverseSurface: 4281478965,
  inverseOnSurface: 4294307831,
  outline: 4286215551,
  outlineVariant: 4291478735,
  shadow: 4278190080,
  scrim: 4278190080,
  surfaceDim: 4292794592,
  surfaceBright: 4294834175,
  surfaceContainerLowest: 4294967295,
  surfaceContainerLow: 4294505210,
  surfaceContainer: 4294110452,
  surfaceContainerHigh: 4293715694,
  surfaceContainerHighest: 4293320937,
  surfaceTint: 4284831119,
};
const defaultDarkScheme = {
  primary: 4291804670,
  onPrimary: 4281739101,
  primaryContainer: 4283252085,
  onPrimaryContainer: 4293516799,
  inversePrimary: 4284831119,
  secondary: 4291543771,
  onSecondary: 4281544001,
  secondaryContainer: 4283057240,
  onSecondaryContainer: 4293451512,
  tertiary: 4293900488,
  onTertiary: 4283049266,
  tertiaryContainer: 4284693320,
  onTertiaryContainer: 4294957539,
  error: 4294948011,
  onError: 4285071365,
  errorContainer: 4287823882,
  onErrorContainer: 4294957782,
  background: 4279505432,
  onBackground: 4293320937,
  surface: 4279505432,
  onSurface: 4293320937,
  surfaceVariant: 4282991950,
  onSurfaceVariant: 4291478735,
  inverseSurface: 4293320937,
  inverseOnSurface: 4281478965,
  outline: 4287926169,
  outlineVariant: 4282991950,
  shadow: 4278190080,
  scrim: 4278190080,
  surfaceDim: 4279505432,
  surfaceBright: 4282071102,
  surfaceContainerLowest: 4279176467,
  surfaceContainerLow: 4280097568,
  surfaceContainer: 4280360740,
  surfaceContainerHigh: 4281018671,
  surfaceContainerHighest: 4281742394,
  surfaceTint: 4291804670,
};

export const currentColorScheme = writable<ThemeStore>({
  darkTheme: defaultDarkScheme,
  lightTheme: defaultLightScheme,
});
