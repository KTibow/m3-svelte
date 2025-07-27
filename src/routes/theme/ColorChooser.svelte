<script lang="ts">
  import {
    argbFromHex,
    hexFromArgb,
    sourceColorFromImage,
  } from "@ktibow/material-color-utilities-nightly";
  import iconColorLens from "@ktibow/iconset-material-symbols/palette-outline";
  import iconImage from "@ktibow/iconset-material-symbols/wallpaper";
  import Icon from "$lib/misc/_icon.svelte";
  import Button from "$lib/buttons/Button.svelte";

  let sourceColorInput: HTMLInputElement | undefined = $state(),
    sourceFileInput: HTMLInputElement | undefined = $state();

  let {
    sourceColor = $bindable(),
  }: {
    sourceColor: number;
  } = $props();
</script>

<div style:background-color={hexFromArgb(sourceColor)} class="color-disc">
  <div class="color-text">Color</div>
  <div>
    <Button variant="text" iconType="full" onclick={() => sourceColorInput!.click()}>
      <Icon icon={iconColorLens} />
    </Button>
    <Button variant="text" iconType="full" onclick={() => sourceFileInput!.click()}>
      <Icon icon={iconImage} />
    </Button>
  </div>
</div>
<input
  type="color"
  value="#000"
  bind:this={sourceColorInput}
  oninput={(e) => (sourceColor = argbFromHex(e.currentTarget.value))}
/>
<input
  type="file"
  accept="image/*"
  bind:this={sourceFileInput}
  onchange={(e) => {
    if (!e.currentTarget.files) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const image = new Image();
      image.src = String(reader.result);
      sourceColor = await sourceColorFromImage(image);
    };
    reader.readAsDataURL(e.currentTarget.files[0]);
  }}
/>

<style>
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .color-disc {
    display: flex;
    align-items: center;
    height: 2.5rem;
    border-radius: 1.25rem;
  }
  .color-disc > * {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    border-radius: 2.5rem;
    background-color: rgb(var(--m3-scheme-background) / 0.5);
  }
  .color-text {
    height: 100%;
    padding: 0 1rem;
    margin-right: auto;
  }
</style>
