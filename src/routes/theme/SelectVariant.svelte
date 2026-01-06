<script lang="ts">
  import {
    hexFromArgb,
    type DynamicColor,
    type DynamicScheme,
    type Variant,
  } from "@ktibow/material-color-utilities-nightly";
  import { materialColors } from "$lib/etc/colors";
  import variants from "./variants";

  let {
    schemes,
    variant = $bindable(),
  }: {
    schemes: Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
    variant: Variant;
  } = $props();

  const variantColor = (scheme: DynamicScheme, color: DynamicColor) => {
    return hexFromArgb(color.getArgb(scheme));
  };
</script>

{#each variants as { id, name, desc }}
  {@const { light, dark } = schemes[id]}
  <label title={desc}>
    <input type="radio" bind:group={variant} name="variants" value={id} />
    <div
      class="m3-layer"
      style:background-color="light-dark({variantColor(light, materialColors.primaryContainer())}, {variantColor(
        dark,
        materialColors.primaryContainer(),
      )})"
      style:color="light-dark({variantColor(light, materialColors.onPrimaryContainer())}, {variantColor(
        dark,
        materialColors.onPrimaryContainer(),
      )})"
    >
      <p>{name}</p>
    </div>
  </label>
{/each}

<style>
  label {
    display: contents;
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  div {
    @apply --m3-label-large;
    display: flex;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    border-radius: var(--m3-shape-full);
    padding-inline: 0.5rem;
    transition: var(--m3-timing-function-emphasized) 500ms;
    flex-grow: 0;
  }
  input:focus-visible + div {
    @apply --m3-focused-outward;
  }
  input:checked + div {
    flex-grow: 1;
  }
  div:not(input:checked + div) {
    cursor: pointer;
    opacity: 0.8;
    @media (width < 37.5rem) {
      height: 1.5rem;
    }
  }
  p {
    margin: 0;
  }
</style>
