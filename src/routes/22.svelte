<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import * as _paths from "$lib/misc/shapes";
import { snackbar } from "$lib/containers/NewSnackbar.svelte";
import iconGo from "@ktibow/iconset-material-symbols/arrow-forward-rounded";
const paths = _paths as Record<string, string>;
let shape = $state("archPath");
let otherShape = $state("gemPath");

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}script>
  import { squarePath } from "m3-svelte";
${"<"}/script>

${"<"}!-- go use it in an svg -->`;
const relevantLinks: { title: string; link: string }[] = [];
</script>

<InternalCard title="Shapes" showCode={() => showCode("Shapes", minimalDemo, relevantLinks)}>
{#snippet _shapes()}
  {#each Object.keys(paths) as key}
    {#snippet content()}
      <svg width="1rem" height="1rem" viewBox="0 0 380 380">
        <path d={paths[key]} fill="rgb(var(--m3-scheme-primary))" />
      </svg>
      {key.replace("Path", "")}
    {/snippet}
    <option value={key}>
      {@render content()}
    </option>
  {/each}
{/snippet}

<select class="m3-font-body-medium" bind:value={shape}>
  {@render _shapes()}
</select>

{#snippet demo()}
  <svg width="4rem" height="4rem" style:margin="auto" viewBox="0 0 380 380">
    <path d={paths[shape]} fill="rgb(var(--m3-scheme-primary))" />
  </svg>
  <div class="morph-to">
    <span class="m3-font-body-medium">Morph to</span>
    <select class="m3-font-body-medium" bind:value={otherShape}>
      {@render _shapes()}
    </select>
    <Button
      variant="tonal"
      iconType="full"
      onclick={async () => {
        const title = `${shape.replace("Path", "")}To${otherShape[0].toUpperCase() + otherShape.slice(1).replace("Path","")}`;

        const { interpolate } = await import("flubber");
        const pathA = paths[shape];
        const pathB = paths[otherShape];
        const morph = interpolate(pathA, pathB, { maxSegmentLength: 5 });
        const getPath = (n: number) => morph(n).replace(/(\d+\.\d)\d+,(\d+\.\d)\d+/g, "$1,$2");
        const text = `const ${title}StartPath = "${getPath(0.001)}";\nconst ${title}EndPath = "${getPath(0.999)}";`;
        navigator.clipboard.writeText(text);
        snackbar(`Copied ${title} to clipboard`, undefined, true);
      }}
    >
      <Icon icon={iconGo} />
    </Button>
  </div>
{/snippet}

<style>
  select, ::picker(select) {
    appearance: base-select;
  }
  select {
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
  }
  ::picker(select) {
    border: none;
  }
  .morph-to {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    margin-top: 2rem;
    > * {
      display: flex;
      padding: 0 1rem;
      align-items: center;
      background-color: rgb(var(--m3-scheme-surface-container-low));
      color: rgb(var(--m3-scheme-on-surface-variant));
      border-radius: var(--m3-util-rounding-small);
      &:first-child {
        border-start-start-radius: 1.25rem;
        border-end-start-radius: 1.25rem;
      }
      border: none;
    }
  }
</style>
</InternalCard>
