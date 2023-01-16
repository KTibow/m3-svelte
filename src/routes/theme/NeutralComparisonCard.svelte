<script lang="ts">
  import { Hct, type TonalPalette } from "@importantimport/material-color-utilities";

  export let tone: number;
  export let neutralHCT: TonalPalette;
  export let neutralVariantHCT: TonalPalette;
  const createRGB = (argb: number) => {
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `${red} ${green} ${blue}`;
  };
  $: grayTone = createRGB(Hct.from(0, 0, tone).toInt());
  $: neutralTone = createRGB(neutralHCT.tone(tone));
  $: neutralVariantTone = createRGB(neutralVariantHCT.tone(tone));
</script>

<div
  class="m3-container"
  style="--tone-gray: {grayTone};
--tone-neutral: {neutralTone};
--tone-neutral-variant: {neutralVariantTone};
--contrast-color: {tone > 50 ? 'black' : 'white'};"
>
  <span>{tone}</span>
  <div>
    <div class="card gray">Gray <span>({grayTone})</span></div>
    <div class="card neutral">Neutral <span>({neutralTone})</span></div>
    <div class="card neutral-variant">Neutral Variant <span>({neutralVariantTone})</span></div>
  </div>
</div>

<style>
  .m3-container {
    flex: 1;
    display: flex;
    border-radius: 1rem;
    overflow: hidden;
    outline: solid 1px rgb(var(--md-sys-color-outline));
  }
  .m3-container > span {
    align-self: center;
    padding: 0.5rem;
  }
  .m3-container > div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    color: var(--contrast-color);
  }
  .card > span {
    margin-left: auto;
  }
  .gray {
    background-color: rgb(var(--tone-gray));
  }
  .neutral {
    background-color: rgb(var(--tone-neutral));
  }
  .neutral-variant {
    background-color: rgb(var(--tone-neutral-variant));
  }
</style>
