<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/Icon.svelte";
  import type { ButtonAttrs } from "$lib/misc/typing-utils";
  import { slide } from "svelte/transition";
  import { easeEmphasized } from "$lib/misc/easing";

  type ContentProps =
    | {
        icon: IconifyIcon;
        text?: undefined;
      }
    | {
        icon?: undefined;
        text: string;
      }
    | {
        icon: IconifyIcon;
        text: string;
      };

  let {
    color = "primary",
    elevation = "normal",
    size = "normal",
    icon,
    text,
    ...extra
  }: {
    // small is deprecated

    // normal means "baseline" normal fab or "small" extended fab
    size?: "small" | "normal" | "medium" | "large";
    color?:
      | "primary-container"
      | "secondary-container"
      | "tertiary-container"
      | "primary"
      | "secondary"
      | "tertiary";
    elevation?: "normal" | "lowered" | "none";
  } & ContentProps &
    ButtonAttrs = $props();
</script>

<button
  type="button"
  class="m3-container color-{color} size-{size} elevation-{elevation} m3-layer"
  {...extra}
>
  {#if icon}
    <Icon {icon} size={size == "large" ? 36 : size == "medium" ? 28 : 24} />
  {/if}
  {#if text}
    <span transition:slide={{ axis: "x", duration: 500, easing: easeEmphasized }}>{text}</span>
  {/if}
</button>

<style>
  @layer tokens {
    :root {
      --m3-fab-small-shape: var(--m3-shape-small);
      --m3-fab-normal-shape: var(--m3-shape-large);
      --m3-fab-medium-shape: var(--m3-shape-large-increased);
      --m3-fab-large-shape: var(--m3-shape-extra-large);
    }
  }
  button {
    display: inline-flex;
    border: none;
    overflow: hidden;

    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .elevation-normal {
    box-shadow: var(--m3-elevation-3);
  }
  .elevation-lowered {
    box-shadow: var(--m3-elevation-1);
  }

  /* deprecated */
  .size-small {
    height: 2.5rem;
    padding-inline: 0.5rem;
    border-radius: var(--m3-fab-small-shape);
  }
  .size-small > :global(svg + span) {
    margin-inline-start: 0.5rem;
  }
  .size-normal {
    @apply --m3-title-medium;
    height: 3.5rem;
    padding-inline: 1rem;
    border-radius: var(--m3-fab-normal-shape);
  }
  .size-normal > :global(svg + span) {
    margin-inline-start: 0.5rem;
  }
  .size-medium {
    @apply --m3-title-large;
    height: 5rem;
    padding-inline: 1.625rem;
    border-radius: var(--m3-fab-medium-shape);
  }
  .size-medium > :global(svg + span) {
    margin-inline-start: 0.75rem;
  }
  .size-large {
    @apply --m3-headline-small;
    height: 6rem;
    padding-inline: 1.75rem;
    border-radius: var(--m3-fab-large-shape);
  }
  .size-large > :global(svg + span) {
    margin-inline-start: 1rem;
  }

  .color-primary {
    background-color: var(--m3c-primary);
    color: var(--m3c-on-primary);
  }
  .color-secondary {
    background-color: var(--m3c-secondary);
    color: var(--m3c-on-secondary);
  }
  .color-tertiary {
    background-color: var(--m3c-tertiary);
    color: var(--m3c-on-tertiary);
  }
  .color-primary-container {
    background-color: var(--m3c-primary-container);
    color: var(--m3c-on-primary-container);
  }
  .color-secondary-container {
    background-color: var(--m3c-secondary-container);
    color: var(--m3c-on-secondary-container);
  }
  .color-tertiary-container {
    background-color: var(--m3c-tertiary-container);
    color: var(--m3c-on-tertiary-container);
  }

  @media (hover: hover) {
    .elevation-normal:hover {
      box-shadow: var(--m3-elevation-4);
    }
    .elevation-lowered:hover {
      box-shadow: var(--m3-elevation-2);
    }
  }

  .m3-container {
    print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    button {
      outline: solid 0.25rem;
    }
  }
</style>
