<script lang="ts">
  import type { Color } from "$lib/misc/utils";
  import Slider from "$lib/forms/Slider.svelte";
  import variants from "./variants";
  import {
    hexFromArgb,
    MaterialDynamicColors,
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

  const variantColor = (scheme: DynamicScheme, color: Color) => {
    return hexFromArgb(MaterialDynamicColors[color].getArgb(scheme));
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
          style:--light-background={variantColor(light, "primaryContainer")}
          style:--dark-background={variantColor(dark, "primaryContainer")}
          style:--light-foreground={variantColor(light, "onPrimaryContainer")}
          style:--dark-foreground={variantColor(dark, "onPrimaryContainer")}
        >
          <p>{name}</p>
        </div>
        <div
          style:--light-background={variantColor(light, "surfaceContainerLow")}
          style:--dark-background={variantColor(dark, "surfaceContainerLow")}
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
    flex-grow: 1;

    cursor: pointer;
  }
  input:focus-visible + label {
    animation: var(--m3-util-refocus);
  }
  label > * {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    flex-grow: 1;
    transition: all 200ms;
    &:first-child {
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      padding-top: 0.75rem;
    }
    &:last-child {
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
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
  input:checked + label {
    > :first-child {
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
    }
    > :last-child {
      border-bottom-left-radius: 1.5rem;
      border-bottom-right-radius: 1.5rem;
      background-color: rgb(var(--m3-scheme-primary));
      color: rgb(var(--m3-scheme-on-primary));
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
