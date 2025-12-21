<script lang="ts">
  import type { DynamicScheme } from "@ktibow/material-color-utilities-nightly";
  import Icon from "$lib/misc/Icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";
  import iconInvert from "@ktibow/iconset-material-symbols/invert-colors-outline";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import iconGrab from "@ktibow/iconset-material-symbols/unarchive-outline";

  import Button from "$lib/buttons/Button.svelte";
  import ColorCard from "./ColorCard.svelte";
  import { appType, styling, density } from "../state";
  import { pairs } from "$lib/misc/colors";
  import { genCSS } from "$lib/misc/utils";

  let {
    light,
    dark,
  }: {
    light: DynamicScheme;
    dark: DynamicScheme;
  } = $props();
  let inverted = $state(false);
  let grabbing = $state(false);

  $effect(() => {
    const style = genCSS(light, dark);
    let fn;
    if ($density == "variable") {
      fn = `@function --m3-density(--size) {
  result: calc(var(--size) + (var(--density) * 0.25rem));
}`;
    } else if ($density < 0) {
      fn = `@function --m3-density(--size) {
  result: calc(var(--size) - ${$density * -0.25}rem);
}`;
    } else if ($density == 0) {
      fn = `@function --m3-density(--size) {
  result: var(--size);
}`;
    } else {
      fn = `@function --m3-density(--size) {
  result: calc(var(--size) + ${$density * 0.25}rem);
}`;
    }
    $styling = fn + "\n" + style;
  });

  const copyUsage = () => {
    const innerStyles = `@import "m3-svelte/misc/styles.css";
@import "m3-svelte/misc/recommended-styles.css";`;
    navigator.clipboard.writeText(
      ($appType == "tailwind"
        ? `@import "tailwindcss";
${innerStyles}
@import "m3-svelte/misc/tailwind-styles.css";`
        : innerStyles) +
        "\n" +
        $styling,
    );
  };
</script>

<div class="content">
  <h2>Your scheme 🎉</h2>
  <div class="color-container" class:inverted>
    {#each pairs as [bgName, fgName]}
      <ColorCard
        {light}
        {dark}
        fg={fgName}
        bg={bgName}
        {grabbing}
        grabbed={() => (grabbing = false)}
      />
    {/each}
  </div>
  <div class="buttons">
    <Button variant="filled" iconType="left" onclick={copyUsage}>
      <Icon icon={iconCopy} />
      Copy
    </Button>
    {#if grabbing}
      <Button variant="tonal" iconType="left" onclick={() => (grabbing = false)}>
        <Icon icon={iconX} />
        Stop grab
      </Button>
    {:else}
      <Button variant="tonal" iconType="left" onclick={() => (grabbing = true)}>
        <Icon icon={iconGrab} />
        Grab
      </Button>
    {/if}
    <div class="spacer"></div>
    <input type="checkbox" id="invert-toggle" bind:checked={inverted} />
    <Button variant="tonal" iconType="full" title="Invert colors" for="invert-toggle">
      <Icon icon={iconInvert} />
    </Button>
  </div>
</div>

<style>
  #invert-toggle {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .content {
    background-color: var(--m3c-surface-container-low);
    padding: 1rem;
    border-radius: 1rem;
  }
  h2 {
    @apply --m3-title-large;
    margin: 0 0 1rem 0;
  }
  .color-container {
    display: grid;
    border-radius: 1rem;
    overflow: hidden;
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: light) {
    .color-container.inverted {
      color-scheme: dark;
    }
  }
  @media (prefers-color-scheme: dark) {
    .color-container.inverted {
      color-scheme: light;
    }
  }
  @media (min-width: 30rem) {
    .color-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 60rem) {
    .color-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media (min-width: 80rem) {
    .color-container {
      grid-template-columns: repeat(6, auto);
    }
  }
  .buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .spacer {
    flex-grow: 1;
  }
</style>
