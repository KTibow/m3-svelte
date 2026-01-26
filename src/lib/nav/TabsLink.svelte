<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import Icon from "$lib/misc/Icon.svelte";

  let {
    secondary = false,
    tab,
    items,
    ...extra
  }: {
    secondary?: boolean;
    tab: string;
    items: {
      icon?: IconifyIcon;
      name: string;
      value: string;
      href: string;
    }[];
  } & HTMLAnchorAttributes = $props();
</script>

<div
  class="m3-container"
  class:primary={!secondary}
  style:--items={items.length}
  style:--i={items.findIndex((i) => i.value == tab)}
>
  <div class="divider"></div>
  {#each items as item}
    <a
      href={item.href}
      class:tall={item.icon}
      class:selected={item.value == tab}
      class="m3-layer"
      {...extra}
    >
      {#if item.icon}
        <Icon icon={item.icon} size={24} />
      {/if}
      <span>{item.name}</span>
    </a>
  {/each}
  <div class="bar"></div>
</div>

<style>
  .m3-container {
    display: flex;
    position: relative;
    background-color: var(--m3c-surface);
  }
  .divider {
    position: absolute;
    inset: auto 0 0 0;
    height: 1px;
    background-color: var(--m3c-surface-container-highest);
  }
  a {
    flex: 1 0;
    height: 3rem;
    min-width: 5rem;
    white-space: nowrap;
    padding: 0 1rem;

    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    color: var(--m3c-on-surface-variant);
    user-select: none;
    cursor: pointer;
    transition: color var(--m3-easing-fast);
  }
  a > span {
    @apply --m3-title-small;
  }

  @media (hover: hover) {
    a:hover {
      color: var(--m3c-on-surface);
    }
  }
  a:focus-visible,
  a:active,
  a.selected {
    color: var(--m3c-on-surface);
  }

  .bar {
    position: absolute;
    background-color: var(--m3c-primary);
    width: calc(100% / var(--items));
    height: 0.125rem;
    left: calc(100% / var(--items) * var(--i));
    bottom: 0;
    pointer-events: none;
    transition: var(--m3-easing-fast-spatial);
  }

  .primary > a {
    flex-direction: column;
    gap: 0;
  }
  .primary > a.tall {
    height: 4rem;
  }
  .primary > a.selected {
    color: var(--m3c-primary);
  }
  .primary > .bar {
    width: 3rem;
    height: 0.1875rem;
    border-radius: 0.1875rem 0.1875rem 0 0;
    margin-left: calc(50% / var(--items));
    transform: translateX(-50%);
  }

  .bar {
    print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .bar {
      background-color: selecteditem;
    }
  }
</style>
