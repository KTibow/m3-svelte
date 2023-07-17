<script>
  import { containerTransform } from "$lib";
  import Button from "$lib/buttons/Button.svelte";

  let open = false;
  const [send, receive] = containerTransform({});
</script>

<p>Comparison:</p>
<ul>
  <li>
    Svelte crossfade: Takes 2 elements, uses scaling and translate, and fades them through the
    animation (both of them are always the same size)
  </li>
  <li>
    Old m3-svelte container transform: Based on crossfade, but instead of scaling it uses clip-path
  </li>
  <li>
    New m3-svelte container transform: Kinda based on crossfade, maintains a background element and
    uses scaling, clip-path, and translate to transition the elements
  </li>
  <li>
    Actual container transform: Fades the content through. Content is anchored at top center. The
    content is scaled as needed to match the smaller sides and clipped.<br />For example if
    something that was already the full width was expanding, it would clip vertically. If it was
    skinnier but tall enough, it would scale to match heights and clip horizontally. If it was a
    FAB, it would scale to match widths and clip vertically.
  </li>
</ul>
<main class="m3-container">
  {#if open}
    <div class="expanded" in:receive={{ key: "container" }} out:send={{ key: "container" }}>
      <div class="bar" />
      <p>Cool you have more info now</p>
      <p><Button type="outlined" on:click={() => (open = false)}>Close</Button></p>
    </div>
  {:else}
    <button
      class="card m3-font-label-large"
      on:click={() => (open = true)}
      in:receive={{ key: "container" }}
      out:send={{ key: "container" }}
    >
      Click
    </button>
  {/if}
</main>

<style>
  main {
    position: relative;
    width: 100%;
    min-height: 100vh;
  }
  main > * {
    position: absolute;
  }
  .card {
    display: inline-flex;
    background-color: rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-on-primary));
    border: none;
    padding: 1rem;
    border-radius: 0.75rem;
    cursor: pointer;
  }
  .expanded {
    display: flex;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface));
  }
  .bar {
    background-image: linear-gradient(
      to right,
      rgb(var(--m3-scheme-primary)),
      rgb(var(--m3-scheme-tertiary))
    );
    height: 1rem;
  }
</style>
