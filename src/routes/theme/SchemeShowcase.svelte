<script lang="ts">
  import type { DynamicColor, DynamicScheme } from "@ktibow/material-color-utilities-nightly";
  import Icon from "$lib/misc/Icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";
  import iconInvert from "@ktibow/iconset-material-symbols/invert-colors-outline";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import iconGrab from "@ktibow/iconset-material-symbols/unarchive-outline";

  import Button from "$lib/buttons/Button.svelte";
  import ColorCard from "./ColorCard.svelte";
  import { appType, styling, density } from "../state";
  import {
    colors,
    errorContainerSubtle,
    materialColors,
    onErrorContainerSubtle,
    onPrimaryContainerSubtle,
    onSecondaryContainerSubtle,
    onTertiaryContainerSubtle,
    primaryContainerSubtle,
    secondaryContainerSubtle,
    tertiaryContainerSubtle,
    genCSS,
  } from "$lib/etc/colors";
  import ColorDot from "./ColorDot.svelte";

  let {
    light,
    dark,
    includeDimBright,
    includeFixed,
  }: {
    light: DynamicScheme;
    dark: DynamicScheme;
    includeDimBright: boolean;
    includeFixed: boolean;
  } = $props();
  let inverted = $state(false);
  let grabbing = $state(false);

  $effect(() => {
    let cs = colors;
    if (!includeDimBright) {
      cs = cs.filter((c) => !c.name.includes("dim") && !c.name.includes("bright"));
    }
    if (!includeFixed) {
      cs = cs.filter((c) => !c.name.includes("fixed"));
    }
    const style = genCSS(light, dark, cs);
    let fn;
    if ($density == "variable") {
      fn = `@function --m3-density(--size) {
  result: calc(var(--size) + (var(--density) * 0.25rem));
}`;
    } else if ($density < 0) {
      fn = `@function --m3-density(--size) {
  result: calc(var(--size) - ${$density * -0.25}rem);
}`;
    } else if ($density == 0) {
      fn = `@function --m3-density(--size) {
  result: var(--size);
}`;
    } else {
      fn = `@function --m3-density(--size) {
  result: calc(var(--size) + ${$density * 0.25}rem);
}`;
    }
    $styling = fn + "\n" + style;
  });

  const copyUsage = () => {
    const innerStyles = `@import "m3-svelte/etc/styles.css";
@import "m3-svelte/etc/recommended-styles.css";`;
    navigator.clipboard.writeText(
      ($appType == "tailwind"
        ? `@import "tailwindcss";
${innerStyles}
@import "m3-svelte/etc/tailwind-styles.css";`
        : innerStyles) +
        "\n" +
        $styling,
    );
  };
</script>

{#snippet color(bg: DynamicColor, fg: DynamicColor)}
  <ColorCard {light} {dark} {bg} {fg} bind:grabbing />
{/snippet}
{#snippet colorDot(bg: DynamicColor)}
  <ColorDot {light} {dark} {bg} bind:grabbing />
{/snippet}
<div class="content" class:inverted>
  <h3>
    {@render color(materialColors.primary(), materialColors.onPrimary())}
    <div class="spacer"></div>
    {@render color(materialColors.primaryContainer(), materialColors.onPrimaryContainer())}
    {@render color(primaryContainerSubtle, onPrimaryContainerSubtle)}
  </h3>
  <h3>
    {@render color(materialColors.secondary(), materialColors.onSecondary())}
    <div class="spacer"></div>
    {@render color(materialColors.secondaryContainer(), materialColors.onSecondaryContainer())}
    {@render color(secondaryContainerSubtle, onSecondaryContainerSubtle)}
  </h3>
  <h3>
    {@render color(materialColors.tertiary(), materialColors.onTertiary())}
    <div class="spacer"></div>
    {@render color(materialColors.tertiaryContainer(), materialColors.onTertiaryContainer())}
    {@render color(tertiaryContainerSubtle, onTertiaryContainerSubtle)}
  </h3>
  <h3>
    {@render color(materialColors.error(), materialColors.onError())}
    <div class="spacer"></div>
    {@render color(materialColors.errorContainer(), materialColors.onErrorContainer())}
    {@render color(errorContainerSubtle, onErrorContainerSubtle)}
  </h3>
  <div class="color-pane">
    <h3 class="small">
      Surface {@render colorDot(materialColors.surface())}
    </h3>
    <h3 class="small">
      Surface container lowest {@render colorDot(materialColors.surfaceContainerLowest())}
    </h3>
    <h3 class="small">
      Surface container low {@render colorDot(materialColors.surfaceContainerLow())}
    </h3>
    <h3 class="small">
      Surface container {@render colorDot(materialColors.surfaceContainer())}
    </h3>
    <h3 class="small">
      Surface container high {@render colorDot(materialColors.surfaceContainerHigh())}
    </h3>
    <h3 class="small">
      Surface container highest {@render colorDot(materialColors.surfaceContainerHighest())}
    </h3>
    <h3 class="small">
      On surface variant {@render colorDot(materialColors.onSurfaceVariant())}
    </h3>
    <h3 class="small">
      On surface {@render colorDot(materialColors.onSurface())}
    </h3>
  </div>
  <div class="buttons">
    <Button variant="filled" iconType="left" onclick={copyUsage}>
      <Icon icon={iconCopy} />
      Copy
    </Button>
    {#if grabbing}
      <Button variant="tonal" iconType="left" onclick={() => (grabbing = false)}>
        <Icon icon={iconX} />
        Stop grab
      </Button>
    {:else}
      <Button variant="tonal" iconType="left" onclick={() => (grabbing = true)}>
        <Icon icon={iconGrab} />
        Grab
      </Button>
    {/if}
    <div class="spacer"></div>
    <Button variant="tonal" iconType="full" title="Invert colors" label>
      <input type="checkbox" bind:checked={inverted} />
      <Icon icon={iconInvert} />
    </Button>
  </div>
</div>

<style>
  .content {
    background-color: var(--m3c-surface-container-low);
    padding: 1rem;
    border-radius: var(--m3-shape-large);
    &.inverted {
      @media (prefers-color-scheme: light) {
        color-scheme: dark;
      }
      @media (prefers-color-scheme: dark) {
        color-scheme: light;
      }
    }

    @media (width < 37.5rem) {
      display: flex;
      flex-direction: column;
    }
    @media (width >= 37.5rem) {
      display: grid;
      grid-auto-flow: row;
      grid-template-columns: 1fr auto;
      > * {
        grid-column: 1;
      }
      > .color-pane {
        grid-row: 1 / span 4;
        grid-column: 2;
        align-items: end;
      }
    }
    gap: 0.5rem;
    > .color-pane {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--m3c-on-surface-variant);
    }
  }
  h3 {
    @apply --m3-title-medium;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin: 0;
    &:not(.small) {
      @media (width < 37.5rem) {
        flex-direction: column;
        align-items: start;
      }
    }
    &.small {
      @apply --m3-title-small;
    }
  }
  .buttons {
    display: flex;
    gap: 0.5rem;
    grid-column: 1 / span 2;
  }
  .spacer {
    flex-grow: 1;
  }
</style>
