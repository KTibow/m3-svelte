<script lang="ts">
  /* This is a partial implementation. It took way too long to make this, so I'm moving on.
  Things that aren't implemented:
  - disabling
  - showing the bubble at better times
  - a proper value overlay
  - range selection (two bubbles)
  - ticks
  If you need one of these, let me know, or consider contributing to the project with a PR to add them.
  */
  export let display = "inline-flex";
  export let value: number;
  let range: HTMLInputElement, percent: number;
  $: {
    const min = Number(range?.min || 0);
    const max = Number(range?.max || 100);
    percent = ((value - min) * 100) / (max - min);
  }
  /* offset:
  we use calc to include the base percentage
  subtract half the width (1.25) to:
  0%: line up the right of the bubble with the right of the handle
  100%: line up the left of the bubble with the left of the handle
  then based on the width:
  0%: adding 1/4 the width (0.625) lines up the bubble in the center
  100%: subtracting 1/4 the width (0.625) lines up the bubble in the center
  from this we get -1.25 + ((percent - 50) / -50) * 0.625
  which simplifies to -percent / 80 - 0.625
  */
</script>

<div
  class="container"
  style="display: {display};--bubble-offset: calc({percent}% + {-percent / 80 - 0.625}rem);"
>
  <input type="range" bind:value bind:this={range} style="--progress: {percent}%;" {...$$props} />
  <div class="bubble">{percent}</div>
</div>

<style>
  .container {
    position: relative;
  }
  input {
    appearance: none;
    height: 0.25rem;
    background-color: rgb(var(--md-sys-color-surface-variant));
    background-image: linear-gradient(
      to right,
      rgb(var(--md-sys-color-primary)) var(--progress),
      0,
      rgb(var(--md-sys-color-surface-variant)) 100%
    );
    border-radius: 0.125rem;
    margin: 0;
  }
  input::-moz-range-progress {
    background-color: rgb(var(--md-sys-color-primary));
    height: 0.25rem;
    border-radius: 0.125rem;
  }
  input::-moz-range-thumb {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    background-color: rgb(var(--md-sys-color-primary));
    border: none;
    border-radius: 100%;
    box-shadow: var(--md-sys-elevation-1);
    cursor: pointer;
    z-index: 1;
  }
  input::-webkit-slider-thumb {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    background-color: rgb(var(--md-sys-color-primary));
    border: none;
    border-radius: 100%;
    box-shadow: var(--md-sys-elevation-1);
    cursor: pointer;
    z-index: 1;
  }
  .bubble {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    top: -1.125rem;
    left: var(--bubble-offset);
    color: rgb(var(--md-sys-color-on-primary));
    pointer-events: none;
    transition: background-color 150ms;
    opacity: 0;
  }
  input:hover + .bubble {
    background-color: rgb(var(--md-sys-color-primary) / 0.08);
    opacity: 1;
  }
  input:focus + .bubble,
  input:active + .bubble {
    background-color: rgb(var(--md-sys-color-primary) / 0.12);
    opacity: 1;
  }
</style>
