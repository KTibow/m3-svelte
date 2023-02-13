<script>
  import { containerTransform } from "$lib";
  import Button from "$lib/buttons/Button.svelte";

  let open = false;
  const [send, receive] = containerTransform({});
</script>

<p>This container transform isn't very good. I plan to replace it later. For comparison:</p>
<ul>
  <li>
    Svelte crossfade: Takes 2 elements, uses scaling and translate, and fades them through the
    animation (both of them are always the same size)
  </li>
  <li>
    This container transform: Based on Svelte crossfade code, and uses clip-path and translate
    (tries to center each one and tries to keep them the same size, but clip-path can't be negative)
  </li>
  <li>
    Actual container transform: Fades the content through. Content is anchored at top center. The
    content is scaled as needed to match the smaller sides and clipped.<br />For example if
    something that was already the full width was expanding, it would clip vertically. If it was
    skinnier but tall enough, it would scale to match heights and clip horizontally. If it was a
    FAB, it would scale to match widths and clip vertically.
  </li>
</ul>
<main>
  {#if open}
    <div class="expanded" in:receive={{ key: "container" }} out:send={{ key: "container" }}>
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
    background-color: rgb(var(--m3-scheme-surface-variant));
    color: rgb(var(--m3-scheme-on-surface-variant));
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
</style>
