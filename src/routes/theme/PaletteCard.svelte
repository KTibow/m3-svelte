<script lang="ts">
  import { argbFromHex, Hct, TonalPalette } from "@importantimport/material-color-utilities";
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import Button from "$lib/buttons/Button.svelte";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Switch from "$lib/forms/Switch.svelte";

  export let name: string;
  export let hct: TonalPalette;
  const hexCode = (argb: number) => "#" + ((argb & 0xffffff) + 0x1000000).toString(16).slice(1);
  const dispatch = createEventDispatcher();
  let chooserOpen = false,
    newColor: string = hexCode(hct.tone(50)),
    normalizedColor: TonalPalette,
    colorChooser: HTMLInputElement;
  let modifyChroma = false;
  $: {
    if (!newColor) break $;
    const newHct = Hct.fromInt(argbFromHex(newColor));
    normalizedColor = TonalPalette.fromHueAndChroma(
      newHct.hue,
      modifyChroma ? newHct.chroma : hct["chroma"]
    );
  }
</script>

<div
  class="m3-container"
  style="--tone-10: {hexCode(hct.tone(10))};
  --tone-20: {hexCode(hct.tone(20))};
  --tone-50: {hexCode(hct.tone(50))};
  --tone-80: {hexCode(hct.tone(80))};
  --tone-90: {hexCode(hct.tone(90))};"
>
  <div class="top-color" />
  <p class="md-headline-small">
    {name}
    <Button type="text" iconType="full" on:click={() => (chooserOpen = true)}>
      <Icon icon={iconEdit} width="24" height="24" />
    </Button>
  </p>
  <div class="color-discs">
    <div class="tone-10">10</div>
    <div class="tone-20">20</div>
    <div class="tone-50">50</div>
    <div class="tone-80">80</div>
    <div class="tone-90">90</div>
  </div>
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
    <div style="background-color: {hexCode(hct.tone(50))};">Current</div>
    <div style="background-color: {newColor};">Raw</div>
    {#if normalizedColor}
      <div style="background-color: {hexCode(normalizedColor.tone(50))};">Normalized</div>
    {/if}
    <input type="color" bind:value={newColor} bind:this={colorChooser} />
  </label>
  <label for={undefined} class="chroma-switch">
    <Switch bind:checked={modifyChroma} /> Modify chroma
  </label>
</Dialog>

<style>
  .m3-container {
    flex: 1;
    border-radius: 1rem;
    overflow: hidden;
    outline: solid 1px rgb(var(--md-sys-color-outline));
    min-width: 6.625rem;
  }
  .top-color {
    width: 100%;
    height: 1.5rem;
    background-color: var(--tone-50);
  }
  .m3-container p {
    display: flex;
    align-items: center;
    padding: 0 1rem;
  }
  .m3-container p > :global(button) {
    margin-left: auto;
  }
  .color-discs {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .color-discs > div {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
  }
  .tone-10 {
    background-color: var(--tone-10);
    color: white;
  }
  .tone-20 {
    background-color: var(--tone-20);
    color: white;
  }
  .tone-50 {
    background-color: var(--tone-50);
    color: white;
  }
  .tone-80 {
    background-color: var(--tone-80);
    color: black;
  }
  .tone-90 {
    background-color: var(--tone-90);
    color: black;
  }

  .color-regions {
    display: flex;
    min-width: 20rem;
    border-radius: 1rem;
    overflow: hidden;
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
</style>
