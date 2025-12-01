<script lang="ts">
import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
import Switch from "$lib/forms/Switch.svelte";
import Icon from "$lib/misc/Icon.svelte";
import Arrows from "./_arrows.svelte";
import InternalCard from "./_card.svelte";

import { containerTransform, sharedAxisTransition } from "$lib/misc/animation";
let mode: "X" | "Y" | "Z" | "container" = $state("X");
let affected = $state(false);
const [send, receive] = containerTransform({ duration: 1000 });

let { showCode }: { showCode: (
  name: string,
  minimalDemo: string,
  relevantLinks: { title: string; link: string }[],
) => void } = $props();

const minimalDemo = `${"<"}script>
  import { containerTransform, sharedAxisTransition } from "m3-svelte";
${"<"}/script>`;
const relevantLinks: { title: string; link: string }[] = [];
</script>

<InternalCard title="UI transitions" showCode={() => showCode("UI transitions", minimalDemo, relevantLinks)}>
<label>
  <Arrows list={["X", "Y", "Z", "container"]} bind:value={mode} />
  {mode[0].toUpperCase() + mode.slice(1)}
</label>

{#snippet demo()}
  <article>
    {#if mode == "container"}
      {#if affected}
        <div class="expanded" in:receive={{ key: "container" }} out:send={{ key: "container" }}>
          <p>More info now!</p>
          <button onclick={() => (affected = false)}>Close</button>
        </div>
      {:else}
        <button
          class="btn m3-font-label-large"
          onclick={() => (affected = true)}
          in:receive={{ key: "container" }}
          out:send={{ key: "container" }}
        >
          Click
        </button>
      {/if}
    {:else if mode == "Z"}
      {#if affected}
        <div
          class="pane"
          in:sharedAxisTransition={{
            direction: "Z",
            leaving: false,
          }}
          out:sharedAxisTransition={{
            direction: "Z",
            leaving: true,
          }}
        >
          <button class="btn m3-font-label-large" onclick={() => (affected = false)}> Beta </button>
        </div>
      {:else}
        <div
          class="pane"
          in:sharedAxisTransition={{
            direction: "Z",
            leaving: false,
          }}
          out:sharedAxisTransition={{
            direction: "Z",
            leaving: true,
          }}
        >
          <button class="btn m3-font-label-large" onclick={() => (affected = true)}> Alpha </button>
        </div>
      {/if}
    {:else if affected}
      <div
        class="pane"
        transition:sharedAxisTransition={{
          direction: mode,
          rightSeam: false,
        }}
      >
        <button class="btn m3-font-label-large" onclick={() => (affected = false)}> Beta </button>
      </div>
    {:else}
      <div
        class="pane"
        transition:sharedAxisTransition={{
          direction: mode,
          rightSeam: true,
        }}
      >
        <button class="btn m3-font-label-large" onclick={() => (affected = true)}> Alpha </button>
      </div>
    {/if}
  </article>
{/snippet}

<style>
  article {
    display: grid;
    height: 4rem;
    > * {
      grid-column: 1;
      grid-row: 1;
    }
  }
  .pane {
    display: grid;
    background-color: rgb(var(--m3-scheme-background));
    overflow: hidden;
  }
  .btn {
    display: flex;
    align-items: center;
    place-self: center;

    background-color: rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-on-primary));
    border: none;
    height: 2.5rem;
    border-radius: 1.25rem;
    padding: 0 1rem;
    cursor: pointer;
  }
  .expanded {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-image: linear-gradient(
      to bottom right,
      rgb(var(--m3-scheme-primary-container-subtle)),
      rgb(var(--m3-scheme-tertiary-container-subtle))
    );
    > p {
      margin: 0;
    }
    > button {
      background-color: unset;
      border: none;
      padding: 0;
      margin: 0;
      font: unset;
      font-weight: bold;
      text-align: start;
      cursor: pointer;
    }
  }
</style>
</InternalCard>
