<script lang="ts">
  import {
    hexFromArgb,
    type DynamicColor,
    type DynamicScheme,
    type Variant,
  } from "@ktibow/material-color-utilities-nightly";
  import iconContrast from "@ktibow/iconset-material-symbols/contrast";
  import iconDensityLarge from "@ktibow/iconset-material-symbols/density-large-rounded";
  import iconDensitySmall from "@ktibow/iconset-material-symbols/density-small-rounded";
  import iconDensityMedium from "@ktibow/iconset-material-symbols/density-medium-rounded";
  import { materialColors } from "$lib";
  import Slider from "$lib/forms/Slider.svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { appType } from "../state";
  import variants from "./variants";

  let {
    schemes,
    variant = $bindable(),
    contrast = $bindable(),
    specVersion = $bindable(),
    density = $bindable(),
  }: {
    schemes: Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
    variant: Variant;
    contrast: number;
    specVersion: "2021" | "2025";
    density: number;
  } = $props();

  const variantColor = (scheme: DynamicScheme, color: DynamicColor) => {
    return hexFromArgb(color.getArgb(scheme));
  };
  let showMore = $state(contrast != 0 || density != 0 || $appType != "vanilla");
</script>

<div class="content variants">
  {#each variants as { id, name, desc }}
    {@const { light, dark } = schemes[id]}
    <input type="radio" bind:group={variant} name="variants" value={id} id="variants-{id}" />
    <label for="variants-{id}">
      <div
        style:--light-background={variantColor(light, materialColors.primaryContainer())}
        style:--dark-background={variantColor(dark, materialColors.primaryContainer())}
        style:--light-foreground={variantColor(light, materialColors.onPrimaryContainer())}
        style:--dark-foreground={variantColor(dark, materialColors.onPrimaryContainer())}
      >
        <p>{name}</p>
      </div>
      <div
        style:--light-background={variantColor(light, materialColors.surfaceContainerLow())}
        style:--dark-background={variantColor(dark, materialColors.surfaceContainerLow())}
      >
        <p class="m3-font-body-medium">{desc}</p>
      </div>
    </label>
  {/each}
</div>
{#if showMore}
  <div class="content more">
    <Slider
      min={-1}
      max={1}
      step={0.05}
      size="m"
      leadingIcon={iconContrast}
      format={(n) => n.toString()}
      bind:value={
        () => contrast,
        (n) => {
          if (n <= -0.5) n = -1;
          else if (n > -0.5 && n < 0) n = 0;
          contrast = n;
        }
      }
    />
    <ConnectedButtons>
      <input
        type="radio"
        name="specversion"
        value="2021"
        id="specversion-2021"
        bind:group={specVersion}
      />
      <Button for="specversion-2021" square>2021</Button>
      <input
        type="radio"
        name="specversion"
        value="2025"
        id="specversion-2025"
        bind:group={specVersion}
      />
      <Button for="specversion-2025" square>2025</Button>
    </ConnectedButtons>
    <Slider
      min={-3}
      max={3}
      step={1}
      size="m"
      leadingIcon={density > 0
        ? iconDensityLarge
        : density < 0
          ? iconDensitySmall
          : iconDensityMedium}
      format={(n) => new Intl.NumberFormat(undefined, { signDisplay: "exceptZero" }).format(n)}
      bind:value={density}
    />
    <ConnectedButtons>
      <input
        type="radio"
        name="apptype"
        value="vanilla"
        id="apptype-vanilla"
        bind:group={$appType}
      />
      <Button for="apptype-vanilla" square>Vanilla</Button>
      <input
        type="radio"
        name="apptype"
        value="tailwind"
        id="apptype-tailwind"
        bind:group={$appType}
      />
      <Button for="apptype-tailwind" square>Tailwind</Button>
    </ConnectedButtons>
  </div>
{:else}
  <button class="content more m3-font-label-large" onclick={() => (showMore = true)}>
    <Layer />
    Contrast, version, density, Tailwind
  </button>
{/if}

<style>
  .content {
    background-color: var(--color-surface-container-low);
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .variants {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.5rem;
    @media (min-width: 52.5rem) {
      flex-direction: row;
    }
    @media (min-width: 100rem) {
      flex-wrap: nowrap;
    }
    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-radius: 0.5rem;
    flex-grow: 1;
    cursor: pointer;
    &:is(input:focus-visible + label) {
      animation: var(--m3-util-refocus);
    }
    > * {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 1rem;
      flex-grow: 1;
      transition: border-radius cubic-bezier(0.42, 5, 0.21, 0.9) 350ms;
      &:first-child {
        border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;
        padding-top: 0.75rem;
      }
      &:last-child {
        border-radius: 0.25rem 0.25rem 0.5rem 0.5rem;
        padding-bottom: 0.75rem;
      }
      @media (prefers-color-scheme: light) {
        background-color: var(--light-background);
        color: var(--light-foreground);
      }
      @media (prefers-color-scheme: dark) {
        background-color: var(--dark-background);
        color: var(--dark-foreground);
      }
    }
    &:is(input:checked + label) {
      border-radius: 1rem;
      > :first-child {
        border-radius: 1rem 1rem 0.25rem 0.25rem;
      }
      > :last-child {
        border-radius: 0.25rem 0.25rem 1rem 1rem;
        background-color: var(--color-primary);
        color: var(--color-on-primary);
      }
    }
  }
  p {
    margin: 0;
  }

  .content.variants {
    border-start-start-radius: 1rem;
    border-start-end-radius: 1rem;
  }
  .more {
    margin-top: 0.5rem;
    position: relative;
    border: none;
    border-end-start-radius: 1rem;
    border-end-end-radius: 1rem;
  }
  div.more {
    display: grid;
    align-items: center;
    gap: 0.5rem;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
</style>
