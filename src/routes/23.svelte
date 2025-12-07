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
import * as _pathsAnimatable from "$lib/misc/shapesAnimatable";
import * as _pathsAnimatableSmall from "$lib/misc/shapesAnimatableSmall";
import { snackbar } from "$lib/containers/Snackbar.svelte";
import ShapeSelector from "./ShapeSelector.svelte";

const paths = _paths as Record<string, string>;
const pathsAnimatable = _pathsAnimatable as Record<string, string>;
const pathsAnimatableSmall = _pathsAnimatableSmall as Record<string, string>;
let shape = $state("pathArch");
let mode: "normal" | "animatable" | "animatable small" = $state("normal");

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
<ShapeSelector style="background-color:var(--m3c-surface-container)" bind:shape />
<label>
  <Arrows list={["normal", "animatable", "animatable small"]} bind:value={mode} />
  {mode[0].toUpperCase() + mode.slice(1)} paths
</label>

{#snippet demo()}
  <svg width="4rem" height="4rem" style:margin="auto" viewBox={mode == "animatable small" ? "0 0 48 48" : "0 0 380 380"}>
    <path class="shape" d="{mode == "animatable small" ? pathsAnimatableSmall[shape.replace("path", "pathAnimatableSmall")] : mode == "animatable" ? pathsAnimatable[shape.replace("path", "pathAnimatable")] : paths[shape]}" fill="var(--m3c-primary)" />
  </svg>
{/snippet}

<style>
  path.shape {
    transition: d 200ms;
  }
</style>
</InternalCard>
