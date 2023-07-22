<script lang="ts">
  import Slider from "$lib/forms/Slider.svelte";
  import type { schemes } from "./data";

  const algorithms = [
    {
      id: "tonal_spot",
      name: "Tonal Spot (default)",
      desc: "Uses source hue",
    },
    {
      id: "content",
      name: "Content",
      desc: "Uses source hue and chroma",
    },
    {
      id: "fidelity",
      name: "Fidelity",
      desc: "Uses source hue and chroma",
    },
    {
      id: "vibrant",
      name: "Vibrant",
      desc: "Uses source hue, high chroma",
    },
    {
      id: "expressive",
      name: "Expressive",
      desc: "Detached from the source",
    },
    {
      id: "neutral",
      name: "Neutral",
      desc: "Almost grayscale",
    },
    {
      id: "monochrome",
      name: "Monochrome",
      desc: "Grayscale",
    },
  ];
  export let algorithm: keyof typeof schemes;
  export let contrast: number;
</script>

<div class="content">
  <h2 class="m3-font-title-large">Algorithm</h2>
  <div class="algorithms">
    {#each algorithms as a}
      <input
        type="radio"
        bind:group={algorithm}
        name="algorithms"
        value={a.id}
        id="algorithms-{a.id}"
      />
      <label for="algorithms-{a.id}">
        <p>{a.name}</p>
        <p class="m3-font-title-small">{a.desc}</p>
      </label>
    {/each}
  </div>
  <br />
  <h2 class="m3-font-title-large">Contrast</h2>
  <label class="contrast" for={undefined}>
    <Slider min={0} max={6} step={1} bind:value={contrast} />
    {contrast == 0 ? "low" : contrast == 1 ? "normal" : contrast == 2 ? "weird" : "extra"}
  </label>
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
  .algorithms label {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    padding: 1rem 1.25rem;
    border-radius: 2rem;
    background-color: rgb(var(--m3-scheme-surface-container-high));
    cursor: pointer;
    transition: all 200ms;
  }
  input:focus-visible + label {
    outline: 2px solid rgb(var(--m3-scheme-primary));
  }
  input:checked + label {
    border-radius: 1rem;
    background-color: rgb(var(--m3-scheme-primary-container));
    color: rgb(var(--m3-scheme-on-primary-container));
  }
  p {
    margin: 0;
  }
  @media (min-width: 37.5rem) {
    .algorithms {
      flex-direction: row;
    }
  }
  @media (min-width: 75rem) {
    .algorithms {
      flex-wrap: nowrap;
    }
  }

  .contrast {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
</style>
