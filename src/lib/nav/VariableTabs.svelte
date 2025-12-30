<script lang="ts">
  import type { IconifyIcon } from "@iconify/types";
  import type { HTMLInputAttributes } from "svelte/elements";
  import Icon from "$lib/misc/Icon.svelte";

  let {
    secondary = false,
    tab = $bindable(),
    items,
    ...extra
  }: {
    secondary?: boolean;
    tab: string;
    items: {
      icon?: IconifyIcon;
      name: string;
      value: string;
    }[];
  } & HTMLInputAttributes = $props();

  const name = $props.id();
  let wrapper: HTMLDivElement | undefined = $state();
  const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const before = tab;
    const after = e.currentTarget.value;
    const beforeE = wrapper!.querySelector(`input[value="${before}"] + label`) as HTMLInputElement;
    const afterE = wrapper!.querySelector(`input[value="${after}"] + label`) as HTMLInputElement;

    const bar = wrapper!.querySelector(".bar") as HTMLDivElement;
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
          duration: 350,
          easing: "cubic-bezier(0.42, 1.67, 0.21, 0.9)",
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
          duration: 350,
          easing: "cubic-bezier(0.42, 1.67, 0.21, 0.9)",
        },
      );
    }
  };
</script>

<div
  class="m3-container"
  class:primary={!secondary}
  style:--items={items.length}
  bind:this={wrapper}
>
  <div class="divider"></div>
  {#each items as item}
    {@const id = name + item.value}
    <input
      type="radio"
      {name}
      {id}
      value={item.value}
      bind:group={tab}
      oninput={handleInput}
      {...extra}
    />
    <label for={id} class:tall={item.icon} class="m3-layer">
      {#if item.icon}
        <Icon icon={item.icon} />
      {/if}
      <span>{item.name}</span>
    </label>
  {/each}
  <div class="bar"></div>
</div>

<style>
  .m3-container {
    display: grid;
    position: relative;
    background-color: var(--m3c-surface);
    grid-template-columns: repeat(var(--items), auto);
    padding-inline: 1rem;
    justify-content: start;
    overflow-x: auto;
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .divider {
    position: absolute;
    inset: auto 0 0 0;
    height: 1px;
    background-color: var(--m3c-surface-container-highest);
  }
  label {
    height: 3rem;
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
  label > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  label > span {
    @apply --m3-title-small;
  }

  @media (hover: hover) {
    label:hover {
      color: var(--m3c-on-surface);
    }
  }
  input:focus-visible + label,
  input:active + label,
  input:checked + label {
    color: var(--m3c-on-surface);
  }

  label,
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
  label:nth-of-type(1) {
    grid-column: 1;
  }
  input:checked:nth-of-type(1) ~ .bar {
    grid-column: 1;
  }
  label:nth-of-type(2) {
    grid-column: 2;
  }
  input:checked:nth-of-type(2) ~ .bar {
    grid-column: 2;
  }
  label:nth-of-type(3) {
    grid-column: 3;
  }
  input:checked:nth-of-type(3) ~ .bar {
    grid-column: 3;
  }
  label:nth-of-type(4) {
    grid-column: 4;
  }
  input:checked:nth-of-type(4) ~ .bar {
    grid-column: 4;
  }
  label:nth-of-type(5) {
    grid-column: 5;
  }
  input:checked:nth-of-type(5) ~ .bar {
    grid-column: 5;
  }

  .primary > label {
    flex-direction: column;
    gap: 0;
  }
  .primary > label.tall {
    height: 4rem;
  }
  .primary > label > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .primary > input:checked + label {
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
