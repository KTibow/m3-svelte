<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { IconifyIcon } from "@iconify/svelte";
  import type { HTMLAttributes, HTMLInputAttributes } from "svelte/elements";
  export let display = "flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraOptions: HTMLInputAttributes = {};
  export let tab: string;
  export let items: {
    icon?: IconifyIcon;
    name: string;
    value: string;
  }[];
  const name = crypto.randomUUID();
</script>

<div class="m3-container" style="display: {display};" {...extraWrapperOptions}>
  <div class="divider" />
  {#each items as item}
    {@const id = name + item.value}
    <input type="radio" {name} {id} value={item.value} bind:group={tab} {...extraOptions} />
    <label class="item" for={id} class:tall={item.icon}>
      <div class="bar" />
      {#if item.icon}
        <Icon icon={item.icon} />
      {/if}
      <span class="m3-font-title-small">{item.name}</span>
    </label>
  {/each}
</div>

<style>
  .m3-container {
    position: relative;
    background-color: rgb(var(--m3-scheme-surface));
  }
  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .divider {
    position: absolute;
    inset: auto 0 0 0;
    height: 0.0625rem;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
  }
  .item {
    flex: 1 0;
    height: 3rem;
    min-width: 5rem;
    padding: 0 1rem;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: rgb(var(--text));
    --text: var(--m3-scheme-on-surface-variant);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  .bar {
    position: absolute;
    inset: auto 0 0 0;
    margin: 0 auto;
    background-color: rgb(var(--m3-scheme-primary));
    border-radius: 0.1875rem 0.1875rem 0 0;
    width: 3rem;
    height: 0;
    transition: all 200ms;
  }
  .item.tall {
    height: 4rem;
  }
  .item > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (hover: hover) {
    .item:hover {
      --text: var(--m3-scheme-on-surface);
      background-color: rgb(var(--text) / 0.08);
    }
  }
  input:focus-visible + .item,
  input:active + .item {
    --text: var(--m3-scheme-on-surface);
    background-color: rgb(var(--text) / 0.12);
  }
  input:checked + .item {
    --text: var(--m3-scheme-primary);
  }
  input:checked + .item > .bar {
    height: 0.1875rem;
  }

  .bar {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    input:checked + .item > .bar {
      background-color: selecteditem;
    }
  }
</style>
