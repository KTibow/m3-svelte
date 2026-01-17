<script lang="ts">
  import type { Snippet } from "svelte";
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/Icon.svelte";
  import type { AnchorAttrs, ButtonAttrs, NotLink } from "$lib/misc/typing-utils";
  import type { HTMLLabelAttributes } from "svelte/elements";

  type ActionProps = AnchorAttrs | (NotLink<HTMLLabelAttributes> & { label: true }) | ButtonAttrs;

  let {
    variant,
    icon,
    trailingIcon,
    elevated = false,
    selected = false,
    children,
    ...extra
  }: {
    /**
     * general is filter/suggestion since they're the same.
     * | name       | use              | example                       | phrasing           |
     * |------------|------------------|-------------------------------|--------------------|
     * | input      | information item | like a person in the to field | user-entered thing |
     * | assist     | smart actions    | like add to calendar          | start with a verb  |
     * | filter     | selection        | like in a search page         | category           |
     * | suggestion | smart actions    | like a chat response          | query/message      |
     */
    variant: "input" | "assist" | "general";
    icon?: IconifyIcon | undefined;
    trailingIcon?: IconifyIcon | undefined;
    elevated?: boolean;
    selected?: boolean;
    children: Snippet;
  } & ActionProps = $props();
</script>

{#snippet content()}
  {#if icon}
    <Icon {icon} size={18} class="leading" />
  {/if}
  <span>{@render children()}</span>
  {#if trailingIcon}
    <Icon icon={trailingIcon} class="trailing" />
  {/if}
{/snippet}

{#if extra.href != undefined}
  <a class="m3-container {variant} m3-layer" class:elevated class:selected {...extra}>
    {@render content()}
  </a>
{:else if "label" in extra}
  <label class="m3-container {variant} m3-layer" class:elevated class:selected {...extra}>
    {@render content()}
  </label>
{:else}
  <button
    class="m3-container {variant} m3-layer"
    class:elevated
    class:selected
    {...extra}
    type="button"
  >
    {@render content()}
  </button>
{/if}

<style>
  @layer tokens {
    :root {
      --m3-chip-shape: var(--m3-shape-small);
    }
  }
  .m3-container {
    display: flex;
    height: 2rem;
    border-radius: var(--m3-chip-shape);
    padding: 0 1rem;
    gap: 0.5rem;
    align-items: center;

    background-color: var(--m3c-surface);
    color: var(--m3c-on-surface-variant);
    border: solid 1px var(--m3c-outline);
    cursor: pointer;
    transition: var(--m3-easing-fast);
  }

  .m3-container::before,
  .m3-container::after,
  .m3-container > :global(.active-ripple) {
    inset: -1px !important;
    width: calc(100% + 2px) !important;
    height: calc(100% + 2px) !important;
  }
  .m3-container:enabled:not(.input):not(.selected) > :global(.leading) {
    color: var(--m3c-primary);
  }
  .m3-container > :global(.leading) {
    margin-left: -0.5rem;
  }
  .m3-container > :global(.trailing) {
    margin-right: -0.5rem;
  }
  .input > :global(.leading) {
    margin-left: -0.25rem;
  }
  .input > :global(.trailing) {
    margin-right: -0.25rem;
  }

  span {
    @apply --m3-label-large;
  }

  .assist {
    color: var(--m3c-on-surface);
  }
  .input {
    padding: 0 0.75rem;
  }
  .elevated {
    border-color: transparent;
    background-color: var(--m3c-surface-container-low);
    box-shadow: var(--m3-elevation-1);
  }
  .selected {
    border-color: transparent;
    background-color: var(--m3c-secondary-container);
    color: var(--m3c-on-secondary-container);
  }

  .layer {
    background-color: currentColor;
    opacity: 0;
  }
  @media (hover: hover) {
    .selected:hover:enabled {
      box-shadow: var(--m3-elevation-1);
    }
    .elevated:hover:enabled {
      box-shadow: var(--m3-elevation-2);
    }
  }

  .m3-container:disabled {
    cursor: auto;
    box-shadow: none;
    border-color: --translucent(var(--m3c-on-surface), 0.12);
    background-color: var(--m3c-surface);
    color: --translucent(var(--m3c-on-surface), 0.38);
  }
  .selected:disabled,
  .elevated:disabled {
    border-color: transparent;
  }
  .selected:disabled,
  .elevated:disabled {
    background-color: --translucent(var(--m3c-on-surface), 0.12);
  }

  .m3-container {
    print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .selected {
      background-color: selecteditem !important;
    }
    .m3-container.disabled {
      opacity: 0.38;
    }
  }
</style>
