<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import Icon from "$lib/misc/Icon.svelte";
  import Layer from "$lib/misc/Layer.svelte";

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

  let prevTab = $state(tab);
  let wrapper: HTMLElement | undefined = $state();
  $effect(() => {
    if (!wrapper) return;

    const before = prevTab;
    const after = tab;
    const beforeI = items.findIndex((i) => i.value == before) + 1;
    const afterI = items.findIndex((i) => i.value == after) + 1;
    const beforeE = wrapper.querySelector(`a:nth-of-type(${beforeI})`) as HTMLAnchorElement;
    const afterE = wrapper.querySelector(`a:nth-of-type(${afterI})`) as HTMLAnchorElement;

    const bar = wrapper.querySelector(".bar") as HTMLDivElement;
    const beforeX = beforeE.offsetLeft + 0.5 * beforeE.offsetWidth;
    const afterX = afterE.offsetLeft + 0.5 * afterE.offsetWidth;
    const deltaX = afterX - beforeX;

    if (secondary) {
      const factorX = afterE.offsetWidth / beforeE.offsetWidth;
      bar.animate(
        [
          {
            transform: `translateX(${-deltaX}px) scaleX(${1 / factorX})`,
          },
          {
            transform: `translateX(0) scaleX(1)`,
          },
        ],
        {
          duration: 300,
          easing: "ease",
        },
      );
    } else {
      bar.animate(
        [
          {
            transform: `translateX(${-deltaX}px)`,
          },
          {
            transform: `translateX(0)`,
          },
        ],
        {
          duration: 200,
          easing: "ease",
        },
      );
    }

    prevTab = tab;
  });
</script>

<nav
  class="m3-container"
  class:primary={!secondary}
  style:--items={items.length}
  bind:this={wrapper}
>
  <div class="divider" aria-hidden="true"></div>
  {#each items as item, i}
    <a
      href={item.href}
      class:tall={item.icon}
      class:selected={item.value == tab}
      style:grid-column={i + 1}
      aria-current={item.value == tab ? "page" : "false"}
      {...extra}
    >
      <Layer />
      {#if item.icon}
        <Icon icon={item.icon} />
      {/if}
      <span>{item.name}</span>
    </a>
  {/each}
  <div
    class="bar"
    aria-hidden="true"
    style="grid-column: {items.findIndex((i) => i.value == tab) + 1}"
  ></div>
</nav>

<style>
  .m3-container {
    display: grid;
    grid-template-columns: repeat(var(--items), auto);
    position: relative;
    background-color: var(--m3c-surface);
    padding-inline: 1rem;
    justify-content: start;
    overflow-x: auto;
  }
  .divider {
    position: absolute;
    inset: auto 0 0 0;
    height: 1px;
    background-color: var(--m3c-surface-container-highest);
  }
  a {
    height: 3rem;
    white-space: nowrap;
    padding: 0 1rem;

    position: relative;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    color: var(--m3c-on-surface-variant);
    user-select: none;
    cursor: pointer;
    transition: color var(--m3-easing-fast);
  }
  a > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
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

  a,
  .bar {
    grid-row: 1;
  }
  .bar {
    background-color: var(--m3c-primary);
    height: 0.125rem;
    z-index: 1;
    align-self: end;
    pointer-events: none;
  }

  .primary > a {
    flex-direction: column;
    gap: 0;
  }
  .primary > a.tall {
    height: 4rem;
  }
  .primary > a > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .primary > a.selected {
    color: var(--m3c-primary);
  }
  .primary > .bar {
    width: 3rem;
    height: 0.1875rem;
    border-radius: 0.1875rem 0.1875rem 0 0;
    justify-self: center;
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
