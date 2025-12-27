<script lang="ts">
  import {
    hexFromArgb,
    type DynamicColor,
    type DynamicScheme,
    type Variant,
  } from "@ktibow/material-color-utilities-nightly";
  import iconContrast from "@ktibow/iconset-material-symbols/contrast";
  import { materialColors } from "$lib/misc/colors";
  import Slider from "$lib/forms/Slider.svelte";
  import Select from "$lib/forms/Select.svelte";
  import Layer from "$lib/misc/Layer.svelte";
  import ConnectedButtons from "$lib/buttons/ConnectedButtons.svelte";
  import Button from "$lib/buttons/Button.svelte";
  import { appType, density } from "../state";
  import variants from "./variants";

  let {
    schemes,
    variant = $bindable(),
    contrast = $bindable(),
    specVersion = $bindable(),
    includeDimBright = $bindable(),
    includeFixed = $bindable(),
  }: {
    schemes: Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
    variant: Variant;
    contrast: number;
    specVersion: "2021" | "2025";
    includeDimBright: boolean;
    includeFixed: boolean;
  } = $props();

  const variantColor = (scheme: DynamicScheme, color: DynamicColor) => {
    return hexFromArgb(color.getArgb(scheme));
  };
  let showMore = $state(contrast != 0 || $density != 0 || $appType != "vanilla");
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
        <p class="desc">{desc}</p>
      </div>
    </label>
  {/each}
</div>
{#if showMore}
  <div class="content more">
    <div class="long">
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
        <input type="radio" value="2021" id="specversion-2021" bind:group={specVersion} />
        <Button for="specversion-2021" square size="m">2021</Button>
        <input type="radio" value="2025" id="specversion-2025" bind:group={specVersion} />
        <Button for="specversion-2025" square size="m">2025</Button>
      </ConnectedButtons>
      <ConnectedButtons>
        <input type="checkbox" id="enable-dimbright" bind:checked={includeDimBright} />
        <Button for="enable-dimbright" square size="m">Include Dim/Bright</Button>
        <input type="checkbox" id="enable-fixed" bind:checked={includeFixed} />
        <Button for="enable-fixed" square size="m">Include Fixed</Button>
      </ConnectedButtons>
    </div>
    <div>
      <Select
        label="Density"
        width="50%"
        options={[
          { text: "0", value: "0" },
          { text: "Variable", value: "variable" },
          { text: "-3", value: "-3" },
          { text: "-2", value: "-2" },
          { text: "-1", value: "-1" },
          { text: "+1", value: "1" },
          { text: "+2", value: "2" },
          { text: "+3", value: "3" },
        ]}
        bind:value={
          () => String($density),
          (val) => {
            $density = val == "variable" ? "variable" : Number(val);
          }
        }
      />
      <Select
        label="App Type"
        width="50%"
        options={[
          { text: "Vanilla", value: "vanilla" },
          { text: "Tailwind", value: "tailwind" },
        ]}
        bind:value={$appType}
      />
    </div>
  </div>
  {#if $appType == "tailwind"}
    <p style:text-align="center" style:margin-top="0.5rem">
      ⚠️ Tailwind <a href="https://github.com/tailwindlabs/tailwindcss/pull/19427"
        >may not support mixins yet</a
      >. You may need to stay on M3 Svelte v5 for now.
    </p>
  {/if}
{:else}
  <button class="content more" onclick={() => (showMore = true)}>
    <Layer />
    Configure theme and more
  </button>
{/if}

<style>
  .content {
    background-color: var(--m3c-surface-container-low);
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
      animation: var(--m3-refocus);
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
        background-color: var(--m3c-primary);
        color: var(--m3c-on-primary);
      }
    }
  }
  p {
    margin: 0;
  }
  p.desc {
    @apply --m3-body-medium;
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
  button.more {
    @apply --m3-label-large;
  }
  div.more {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    > * {
      display: grid;
      gap: 0.5rem;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      &.long {
        @media (width < 52.5rem) {
          grid-auto-flow: row;
        }
      }
    }
  }
</style>
