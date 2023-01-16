<script lang="ts">
  import type { TonalPalette } from "@importantimport/material-color-utilities";

  export let name: string;
  export let hct: TonalPalette;
  const createRGB = (argb: number) => {
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `${red} ${green} ${blue}`;
  };
</script>

<div
  class="m3-container"
  style="--tone-10: {createRGB(hct.tone(10))};
  --tone-20: {createRGB(hct.tone(20))};
  --tone-50: {createRGB(hct.tone(50))};
  --tone-80: {createRGB(hct.tone(80))};
  --tone-90: {createRGB(hct.tone(90))};"
>
  <div class="top-color" />
  <p>{name}</p>
  <div class="color-discs">
    <div class="tone-10">10</div>
    <div class="tone-20">20</div>
    <div class="tone-50">50</div>
    <div class="tone-80">80</div>
    <div class="tone-90">90</div>
  </div>
</div>

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
    background-color: rgb(var(--tone-50));
  }
  p {
    padding: 0 1rem;
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
    background-color: rgb(var(--tone-10));
    color: white;
  }
  .tone-20 {
    background-color: rgb(var(--tone-20));
    color: white;
  }
  .tone-50 {
    background-color: rgb(var(--tone-50));
    color: white;
  }
  .tone-80 {
    background-color: rgb(var(--tone-80));
    color: black;
  }
  .tone-90 {
    background-color: rgb(var(--tone-90));
    color: black;
  }
</style>
