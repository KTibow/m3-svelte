<script lang="ts">
  import type { Color } from "$lib/misc/utils";
  import Slider from "$lib/forms/Slider.svelte";
  import { Variant } from "@ktibow/material-color-utilities-nightly";

  const algorithms = [
    {
      id: Variant.TONAL_SPOT, // 2
      name: "Tonal Spot",
      desc: "Classic",
    },
    {
      id: Variant.CONTENT, // 6
      name: "Content",
      desc: "Exact source color",
    },
    {
      id: Variant.FIDELITY, // 5
      name: "Fidelity",
      desc: "Exact source color",
    },
    {
      id: Variant.VIBRANT, // 3
      name: "Vibrant",
      desc: "Vivid colors all around",
    },
    {
      id: Variant.EXPRESSIVE, // 4
      name: "Expressive",
      desc: "Harmoniously rotated",
    },
    {
      id: Variant.RAINBOW, // 7
      name: "Rainbow",
      desc: "Vivid primary, drab rest",
    },
    {
      id: Variant.FRUIT_SALAD, // 8
      name: "Fruit salad",
      desc: "Spin the chroma around",
    },
    {
      id: Variant.NEUTRAL, // 1
      name: "Neutral",
      desc: "Almost grayscale",
    },
    {
      id: Variant.MONOCHROME, // 0
      name: "Monochrome",
      desc: "Grayscale",
    },
  ];

  let {
    variant = $bindable(),
    contrast = $bindable(),
    variantColor,
  }: {
    variant: Variant;
    contrast: number;
    variantColor: (
      variant: Variant,
      color: Color,
    ) => {
      light: string;
      dark: string;
    };
  } = $props();
</script>

<div class="content">
  <h2 class="m3-font-title-large">Algorithm</h2>
  <div class="algorithms">
    {#each algorithms as { id, name, desc }}
      <input type="radio" bind:group={variant} name="algorithms" value={id} id="algorithms-{id}" />
      <label for="algorithms-{id}">
        <div
          style:--light-background={variantColor(id, "primaryContainer").light}
          style:--dark-background={variantColor(id, "primaryContainer").dark}
          style:--light-foreground={variantColor(id, "onPrimaryContainer").light}
          style:--dark-foreground={variantColor(id, "onPrimaryContainer").dark}
        >
          <p>{name}</p>
        </div>
        <div
          style:--light-background={variantColor(id, "surfaceContainerLow").light}
          style:--dark-background={variantColor(id, "surfaceContainerLow").dark}
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
