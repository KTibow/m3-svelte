<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes, HTMLButtonAttributes, HTMLLabelAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";

  type ActionProps =
    | HTMLAttributes<HTMLDivElement>
    | ({ click: () => void } & HTMLButtonAttributes)
    | ({ label: true } & HTMLLabelAttributes);

  let props: {
    leading?: Snippet;
    overline?: string;
    headline?: string;
    supporting?: string;
    trailing?: Snippet;
    lines?: number;
  } & ActionProps = $props();
  let _lines = $derived(
    props.lines ||
      (props.overline && props.supporting ? 3 : props.overline || props.supporting ? 2 : 1),
  );
</script>

{#snippet content(
  leading: Snippet | undefined,
  overline: string,
  headline: string,
  supporting: string,
  trailing: Snippet | undefined,
)}
  {#if leading}
    <div class="leading">
      {@render leading()}
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
  {#if trailing}
    <div class="trailing m3-font-label-small">
      {@render trailing()}
    </div>
  {/if}
{/snippet}

{#if "label" in props}
  {@const {
    leading,
    overline = "",
    headline = "",
    supporting = "",
    trailing,
    label,
    ...extra
  } = props}
  <label class="m3-container lines-{_lines}" {...extra}>
    <Layer />
    {@render content(leading, overline, headline, supporting, trailing)}
  </label>
{:else if "click" in props}
  {@const {
    leading,
    overline = "",
    headline = "",
    supporting = "",
    trailing,
    click,
    ...extra
  } = props}
  <button class="m3-container lines-{_lines}" onclick={click} {...extra}>
    <Layer />
    {@render content(leading, overline, headline, supporting, trailing)}
  </button>
{:else}
  {@const { leading, overline = "", headline = "", supporting = "", trailing, ...extra } = props}
  <div class="m3-container lines-{_lines}" {...extra}>
    {@render content(leading, overline, headline, supporting, trailing)}
  </div>
{/if}

<style>
  .m3-container {
    display: flex;
    padding: 0.5rem 1.5rem 0.5rem 1rem;
    align-items: center;
    gap: 1rem;

    text-align: inherit;
    border: none;
    position: relative;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
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
  .body {
    flex-grow: 1;
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
