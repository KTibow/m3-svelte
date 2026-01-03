<script lang="ts">
  import {
    argbFromHex,
    hexFromArgb,
    sourceColorFromImage,
  } from "@ktibow/material-color-utilities-nightly";
  import iconColorLens from "@ktibow/iconset-material-symbols/palette-outline";
  import iconImage from "@ktibow/iconset-material-symbols/wallpaper";
  import Icon from "$lib/misc/Icon.svelte";
  import Button from "$lib/buttons/Button.svelte";

  let {
    sourceColor = $bindable(),
  }: {
    sourceColor: number;
  } = $props();
</script>

<div style:background-color={hexFromArgb(sourceColor)} class="color-disc"></div>
<Button variant="filled" iconType="full" title="Pick a color" label>
  <input
    type="color"
    value="#000000"
    oninput={(e) => (sourceColor = argbFromHex(e.currentTarget.value))}
  />
  <Icon icon={iconColorLens} />
</Button>
<Button variant="tonal" iconType="full" title="Pick from an image" label>
  <input
    type="file"
    accept="image/*"
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
  <Icon icon={iconImage} />
</Button>

<style>
  .color-disc {
    border-radius: var(--m3-shape-full);
    flex-grow: 1;
  }
</style>
