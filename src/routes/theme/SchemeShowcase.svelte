<script lang="ts">
  import type { DynamicScheme } from "@material/material-color-utilities";
  import Icon from "$lib/misc/_icon.svelte";
  import iconCopy from "@ktibow/iconset-material-symbols/content-copy-outline";
  import iconLight from "@ktibow/iconset-material-symbols/light-mode-outline";
  import iconDark from "@ktibow/iconset-material-symbols/dark-mode-outline";
  import iconX from "@ktibow/iconset-material-symbols/close";
  import iconGrab from "@ktibow/iconset-material-symbols/unarchive-outline";
  import { onMount } from "svelte";

  import Button from "$lib/buttons/Button.svelte";
  import ColorCard from "./ColorCard.svelte";
  import { styling } from "../themeStore";
  import { genCSS, pairs } from "$lib/misc/utils";
  import { serializeScheme } from "$lib/misc/serializeScheme";

  export let schemeLight: DynamicScheme;
  export let schemeDark: DynamicScheme;
  let showDark = false;
  let grabbing = false;

  $: $styling = genCSS(serializeScheme(schemeLight), serializeScheme(schemeDark));

  const copyUsage = () =>
    navigator.clipboard.writeText(`@import url("m3-svelte/misc/styles.css");
@import url("m3-svelte/misc/recommended-styles.css");
${$styling}`);

  onMount(() => {
    showDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
</script>

<div class="content">
  <h2 class="m3-font-title-large">Your scheme 🎉</h2>
  <div class="color-container">
    {#each pairs as [bgName, fgName]}
      <ColorCard
        scheme={showDark ? schemeDark : schemeLight}
        fg={fgName}
        bg={bgName}
        {grabbing}
        on:grabbed={() => (grabbing = false)}
      />
    {/each}
  </div>
  <div class="buttons">
    <Button variant="filled" iconType="left" click={copyUsage}>
      <Icon icon={iconCopy} />
      Copy
    </Button>
    {#if grabbing}
      <Button variant="tonal" iconType="left" click={() => (grabbing = false)}>
        <Icon icon={iconX} />
        Stop grab
      </Button>
    {:else}
      <Button variant="tonal" iconType="left" click={() => (grabbing = true)}>
        <Icon icon={iconGrab} />
        Grab
      </Button>
    {/if}
    <div class="spacer"></div>
    <Button variant="tonal" iconType="full" click={() => (showDark = !showDark)}>
      <Icon icon={showDark ? iconLight : iconDark} />
    </Button>
  </div>
</div>

<style>
  .content {
    background-color: rgb(var(--m3-scheme-surface-container-low));
    padding: 1rem;
    border-radius: 1rem;
  }
  h2 {
    margin: 0 0 1rem 0;
  }
  .color-container {
    display: grid;
    border-radius: 1rem;
    overflow: hidden;
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
      grid-template-columns: repeat(6, 1fr);
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
