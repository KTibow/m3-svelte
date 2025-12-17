<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLLabelAttributes } from "svelte/elements";
  import Layer from "$lib/misc/Layer.svelte";
  import type { ButtonAttrs, DivAttrs, NotButton } from "$lib/misc/typing-utils";

  type ActionProps =
    | DivAttrs
    | ButtonAttrs
    | ({ label: true } & NotButton<HTMLLabelAttributes>)
    | ({ href: string } & NotButton<HTMLAnchorAttributes>);

  let {
    leading,
    overline = "",
    headline = "",
    supporting = "",
    trailing,
    lines: _lines,
    ...props
  }: {
    leading?: Snippet;
    overline?: string;
    headline?: string;
    supporting?: string;
    trailing?: Snippet;
    lines?: number;
  } & ActionProps = $props();

  let lines = $derived(_lines ?? (overline && supporting ? 3 : overline || supporting ? 2 : 1));
</script>

{#snippet content()}
  {#if leading}
    <div class="leading">
      {@render leading()}
    </div>
  {/if}
  <div class="body">
    {#if overline}
      <!-- Renamed to not conflict with Tailwind -->
      <p class="overline-">{overline}</p>
    {/if}
    <p class="headline">{headline}</p>
    {#if supporting}
      <p class="supporting">{supporting}</p>
    {/if}
  </div>
  {#if trailing}
    <div class="trailing">
      {@render trailing()}
    </div>
  {/if}
{/snippet}

<li style:display="flex">
  {#if "label" in props}
    {@const { label: _, ...extra } = props}
    <label class="m3-container focus-inset lines-{lines}" {...extra}>
      <Layer />
      {@render content()}
    </label>
  {:else if "onclick" in props}
    <button type="button" class="m3-container focus-inset lines-{lines}" {...props}>
      <Layer />
      {@render content()}
    </button>
  {:else if "href" in props}
    <a class="m3-container focus-inset lines-{lines}" {...props}>
      <Layer />
      {@render content()}
    </a>
  {:else}
    <div class="m3-container lines-{lines}" {...props}>
      {@render content()}
    </div>
  {/if}
</li>

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
    color: inherit;
  }
  button.m3-container,
  label.m3-container {
    cursor: pointer;
  }
  .lines-1 {
    height: --m3-density(3.5rem);
  }
  .lines-2 {
    height: --m3-density(4.5rem);
  }
  .lines-3 {
    height: --m3-density(5.5rem);
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
    color: var(--m3c-on-surface-variant);
  }
  .trailing {
    @apply --m3-label-small;
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
  .supporting {
    @apply --m3-body-medium;
    color: var(--m3c-on-surface-variant);
  }
  .overline- {
    @apply --m3-label-small;
    color: var(--m3c-on-surface-variant);
  }
  .headline {
    @apply --m3-body-large;
    color: var(--m3c-on-surface);
  }
</style>
