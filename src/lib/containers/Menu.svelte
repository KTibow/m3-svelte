<script lang="ts">
  import type { LabelledAria } from "$lib/misc/typing-utils";
  import type { Snippet } from "svelte";

  let { children, ...extra }: { children: Snippet } & LabelledAria = $props();
</script>

<div class="m3-container" role="menu" {...extra}>
  {@render children()}
</div>

<style>
  @layer tokens {
    :root {
      --m3-menu-shape: var(--m3-shape-extra-small);
    }
  }
  .m3-container {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 0.5rem 0;
    border-radius: var(--m3-menu-shape);
    min-width: 7rem;
    max-width: 17.5rem;
    background-color: var(--m3c-surface-container);
    z-index: 2;
    box-shadow: var(--m3-elevation-2);
  }
</style>
