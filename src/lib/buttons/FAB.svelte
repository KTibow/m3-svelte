<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import Icon from "$lib/misc/Icon.svelte";
  import type { ButtonAttrs } from "$lib/misc/typing-utils";

  type ContentProps =
    | {
        size?: "normal";
        icon?: IconifyIcon;
        text: string;
      }
    | {
        size?: "small" | "normal" | "large";
        icon: IconifyIcon;
        text?: undefined;
      };

  let {
    color = "primary",
    elevation = "normal",
    size = "normal",
    icon,
    text,
    ...extra
  }: {
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
    <Icon {icon} />
  {/if}
  {#if text}
    {text}
  {/if}
</button>

<style>
  @layer tokens {
    :root {
      --m3-fab-small-shape: var(--m3-shape-small);
      --m3-fab-normal-shape: var(--m3-shape-large);
      --m3-fab-large-shape: var(--m3-shape-extra-large);
    }
  }
  button {
    @apply --m3-label-large;
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

  .size-small {
    height: 2.5rem;
    padding: 0.5rem;
    gap: 0.5rem;
    border-radius: var(--m3-fab-small-shape);
  }
  .size-normal {
    height: 3.5rem;
    padding: 1rem;
    gap: 0.75rem;
    border-radius: var(--m3-fab-normal-shape);
  }
  .size-large {
    height: 6rem;
    padding: 1.875rem;
    gap: 1.875rem;
    border-radius: var(--m3-fab-large-shape);
  }
  .size-small > :global(svg),
  .size-normal > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .size-large > :global(svg) {
    width: 2.25rem;
    height: 2.25rem;
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
