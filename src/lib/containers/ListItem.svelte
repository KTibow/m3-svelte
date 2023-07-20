<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export let display = "flex";
  export let extraOptions: HTMLAttributes<HTMLDivElement> = {};
  export let overline = "";
  export let headline = "";
  export let supporting = "";
  export let lines: number | undefined = undefined;
  $: _lines = lines || (overline && supporting ? 3 : overline || supporting ? 2 : 1);
</script>

<div class="m3-container lines-{_lines}" style="display: {display}" {...extraOptions}>
  {#if $$slots.leading}
    <div class="leading">
      <slot name="leading" />
    </div>
  {/if}
  <div class="body">
    {#if overline}
      <p class="overline m3-font-label-small">{overline}</p>
    {/if}
    <p class="headline m3-font-body-large">{headline}</p>
    {#if supporting}
      <p class="supporting m3-font-body-medium">{supporting}</p>
    {/if}
  </div>
  {#if $$slots.trailing}
    <div class="trailing m3-font-label-small">
      <slot name="trailing" />
    </div>
  {/if}
</div>

<style>
  .m3-container {
    padding: 0.5rem 1.5rem 0.5rem 1rem;
    align-items: center;
    gap: 1rem;
  }
  .lines-1 {
    height: 3.5rem;
  }
  .lines-2 {
    height: 4.5rem;
  }
  .lines-3 {
    height: 5.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    align-items: flex-start;
  }
  .leading,
  .trailing {
    display: contents;
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .leading > :global(svg),
  .trailing > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  p {
    margin: 0;
  }
  .supporting,
  .overline {
    color: rgb(var(--m3-scheme-on-surface-variant));
  }
  .headline {
    color: rgb(var(--m3-scheme-on-surface));
  }
</style>
