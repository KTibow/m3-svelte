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
import { snackbar } from "$lib/containers/NewSnackbar.svelte";
import ShapeSelector from "./ShapeSelector.svelte";

const paths = _paths as Record<string, string>;
const pathsAnimatable = _pathsAnimatable as Record<string, string>;
let shape = $state("pathArch");
let animatable = $state(false);

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
<label>
  <Switch bind:checked={animatable} />
  {animatable ? "Animatable path" : "Normal path"}
</label>

{#snippet demo()}
  <svg width="4rem" height="4rem" style:margin="auto" viewBox="0 0 380 380">
    <path class="shape" d="{animatable ? pathsAnimatable[shape.replace("path", "pathAnimatable")] : paths[shape]}" fill="rgb(var(--m3-scheme-primary))" />
  </svg>
{/snippet}

<style>
  path.shape {
    transition: d 200ms;
  }
</style>
</InternalCard>
