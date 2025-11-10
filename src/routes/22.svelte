<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";
import Button from "$lib/buttons/Button.svelte";
import iconGo from "@ktibow/iconset-material-symbols/arrow-forward-rounded";
import * as _paths from "$lib/misc/shapes";
import { snackbar } from "$lib/containers/NewSnackbar.svelte";
import ShapeSelector from "./ShapeSelector.svelte";

const paths = _paths as Record<string, string>;
let shape = $state("pathArch");
let otherShape = $state("pathGem");

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
<ShapeSelector class="m3-font-body-large" style="background-color:rgb(var(--m3-scheme-surface-container))" bind:shape />

{#snippet demo()}
  <svg width="4rem" height="4rem" style:margin="auto" viewBox="0 0 380 380">
    <path d={paths[shape]} fill="rgb(var(--m3-scheme-primary))" />
  </svg>
  <div class="morph-to">
    <span class="m3-font-body-medium">Morph to</span>
    <ShapeSelector class="m3-font-body-medium" bind:shape={otherShape} />
    <Button
      variant="tonal"
      iconType="full"
      onclick={async () => {
        const title = `${shape.slice(4)}To${otherShape.slice(4)}`;

        const { interpolate } = await import("flubber");
        const pathA = paths[shape];
        const pathB = paths[otherShape];
        const morph = interpolate(pathA, pathB, { maxSegmentLength: 5 });
        const getPath = (n: number) => morph(n).replace(/(\d+\.\d)\d+,(\d+\.\d)\d+/g, "$1,$2");
        const text = `const Path1${title} = "${getPath(0.001)}";\nconst Path2${title} = "${getPath(0.999)}";`;
        navigator.clipboard.writeText(text);
        snackbar(`Copied ${title} to clipboard`, undefined, true);
      }}
    >
      <Icon icon={iconGo} />
    </Button>
  </div>
{/snippet}

<style>
  .morph-to {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    margin-top: 2rem;
    > span {
      display: flex;
      padding: 0 1rem;
      align-items: center;
      border-radius: var(--m3-util-rounding-small);
      border-start-start-radius: 1.25rem;
      border-end-start-radius: 1.25rem;
      border: none;
    }
    > * {
      background-color: rgb(var(--m3-scheme-surface-container-low));
      color: rgb(var(--m3-scheme-on-surface-variant));
    }
  }
</style>
</InternalCard>
