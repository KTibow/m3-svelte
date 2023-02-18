<script lang="ts">
  import { argbFromHex, Hct, TonalPalette } from "@importantimport/material-color-utilities";
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Switch from "$lib/forms/Switch.svelte";

  const hexCode = (argb: number) => "#" + ((argb & 0xffffff) + 0x1000000).toString(16).slice(1);
  const dispatch = createEventDispatcher();
  export let name: string;
  export let hct: TonalPalette;
  let chooserOpen = false,
    modifyChroma = false,
    newColor: string = hexCode(hct.tone(30)),
    normalizedColor: TonalPalette;
  $: {
    if (!newColor) break $;
    const newHct = Hct.fromInt(argbFromHex(newColor));
    normalizedColor = TonalPalette.fromHueAndChroma(
      newHct.hue,
      modifyChroma ? newHct.chroma : hct["chroma"]
    );
  }
</script>

<div class="m3-container" style="--color: {hexCode(hct.tone(30))}">
  <p class="m3-font-headline-small">{name}</p>
  <button class="swatch" on:click={() => (chooserOpen = true)}>
    <Icon icon={iconEdit} />
  </button>
</div>
<Dialog
  title="Change color"
  cancelLabel="Cancel"
  confirmLabel="OK"
  bind:open={chooserOpen}
  on:closed={(e) => {
    if (e.detail.method == "clickConfirm") dispatch("changeColor", normalizedColor);
  }}
>
  <label class="color-regions">
    <div style="background-color: {hexCode(hct.tone(30))};">Current</div>
    <div style="background-color: {newColor};">Raw</div>
    {#if normalizedColor}
      <div style="background-color: {hexCode(normalizedColor.tone(30))};">Normalized</div>
    {/if}
    <input type="color" bind:value={newColor} />
  </label>
  <label for={undefined} class="chroma-switch">
    <Switch bind:checked={modifyChroma} /> Modify chroma
  </label>
</Dialog>

<style>
  .m3-container {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .swatch {
    align-self: stretch;
    aspect-ratio: 1 / 1;
    margin: 0.5rem;
    margin-left: auto;
    border-radius: 1rem;
    background-color: var(--color);
    color: white;
    border: none;
    cursor: pointer;
  }
  .swatch > :global(svg) {
    opacity: 0;
    width: 1.5rem;
    height: 1.5rem;
    transition: all 200ms;
  }
  .swatch:is(:hover, :focus-visible, :active) > :global(svg) {
    opacity: 1;
  }
  .color-regions {
    display: flex;
    min-width: 20rem;
    border-radius: 1rem;
    overflow: hidden;
    color: white;
    cursor: pointer;
  }
  .color-regions > * {
    display: inline-flex;
    justify-content: center;
    padding: 1rem;
    flex: 1;
  }
  .color-regions input {
    display: none;
  }
  .chroma-switch {
    display: flex;
    margin-top: 1rem;
    gap: 0.5rem;
    align-items: center;
  }
  @media (orientation: landscape) {
    .m3-container {
      flex-direction: column;
    }
    .swatch {
      width: 6rem;
      align-self: center;
      margin-left: 0.5rem;
    }
  }
</style>
