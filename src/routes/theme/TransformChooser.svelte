<script lang="ts">
  import { materialColors } from "$lib";
  import Slider from "$lib/forms/Slider.svelte";
  import variants from "./variants";
  import {
    hexFromArgb,
    type DynamicColor,
    type DynamicScheme,
    type Variant,
  } from "@ktibow/material-color-utilities-nightly";

  let {
    schemes,
    variant = $bindable(),
    contrast = $bindable(),
  }: {
    schemes: Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
    variant: Variant;
    contrast: number;
  } = $props();

  const variantColor = (scheme: DynamicScheme, color: DynamicColor) => {
    return hexFromArgb(color.getArgb(scheme));
  };
</script>

<div class="content">
  <h2 class="m3-font-title-large">Algorithm</h2>
  <div class="algorithms">
    {#each variants as { id, name, desc }}
      {@const { light, dark } = schemes[id]}
      <input type="radio" bind:group={variant} name="algorithms" value={id} id="algorithms-{id}" />
      <label for="algorithms-{id}">
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
  <br />
  <h2 class="m3-font-title-large">Contrast</h2>
  <Slider min={-1} max={1} step={0.05} format={(n) => n.toString()} bind:value={contrast} />
</div>

<style>
  .content {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    padding: 1rem;
    border-radius: 1rem;
  }
  h2 {
    margin: 0 0 0.5rem 0;
  }

  .algorithms {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .algorithms input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
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
        background-color: rgb(var(--m3-scheme-primary));
        color: rgb(var(--m3-scheme-on-primary));
      }
    }
  }
  p {
    margin: 0;
  }
  @media (min-width: 52.5rem) {
    .algorithms {
      flex-direction: row;
    }
  }
  @media (min-width: 100rem) {
    .algorithms {
      flex-wrap: nowrap;
    }
  }
</style>
