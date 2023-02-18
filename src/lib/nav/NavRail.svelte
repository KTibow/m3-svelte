<script lang="ts">
  // Tip from Material: Avoid using a navigation drawer with other primary navigation components,
  // such as a navigation bar. Instead, choose a single navigation component based on product requirements
  // and device size: Navigation bars for small screens, navigation rails for tablet screens,
  // and standard navigation drawers for desktop screens.
  import { createEventDispatcher, type ComponentProps } from "svelte";
  import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconHamburger from "@iconify-icons/ic/outline-menu";
  import FAB from "$lib/buttons/FAB.svelte";

  export let display = "flex";
  export let extraWrapperOptions: HTMLAttributes<HTMLDivElement> = {};
  export let extraItemOptions: HTMLAnchorAttributes & HTMLButtonAttributes = {};
  export let alignment: "top" | "center" | "bottom" = "center";
  export let hamburger = false;
  export let fab: false | ComponentProps<FAB> = false;
  export let horizontal: boolean | "auto" = false;
  export let mainItems: {
    active: boolean;
    activeIcon: IconifyIcon;
    inactiveIcon: IconifyIcon;
    name: string;
    href?: string;
  }[];

  const dispatch = createEventDispatcher();
</script>

<div
  class="m3-container relative horizontal-{horizontal}"
  style="display: {display};"
  {...extraWrapperOptions}
>
  {#if hamburger}
    <div class="menuItem">
      <button
        class="relative hoverable"
        on:click={(event) => dispatch("chosen", { name: "hamburger", event })}
      >
        <div class="layer circle" />
        <Icon icon={iconHamburger} />
      </button>
    </div>
  {/if}
  {#if fab}
    <div class="menuItem">
      <FAB
        elevation="none"
        {...fab}
        on:click={(event) => dispatch("chosen", { name: "fab", data: fab, event })}
      />
    </div>
  {/if}
  <div class="aligner {alignment}">
    {#each mainItems as item}
      {#if item.href}
        <a
          href={item.href}
          class="menuItem hoverable"
          class:active={item.active}
          {...extraItemOptions}
        >
          <div class="pill relative">
            <div class="layer full" />
            <Icon icon={item.active ? item.activeIcon : item.inactiveIcon} />
          </div>
          <span class="m3-font-label-medium">{item.name}</span>
        </a>
      {:else}
        <button
          class="menuItem hoverable"
          class:active={item.active}
          on:click={(event) => dispatch("chosen", { name: "item", data: item, event })}
          {...extraItemOptions}
        >
          <div class="pill relative">
            <div class="layer full" />
            <Icon icon={item.active ? item.activeIcon : item.inactiveIcon} />
          </div>
          <span class="m3-font-label-medium">{item.name}</span>
        </button>
      {/if}
    {/each}
  </div>
</div>

<style>
  .m3-container,
  .aligner {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .m3-container {
    width: 5rem;
    padding-top: 3.5rem;
    background-color: rgb(var(--m3-scheme-surface));
  }
  .aligner {
    padding: 3.5rem 0;
  }
  .aligner.center {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
  }
  .aligner.bottom {
    flex-grow: 1;
    justify-content: end;
  }
  @media (max-height: 30rem) {
    .aligner,
    .aligner.center {
      position: static;
      flex-grow: 1;
      padding: 0;
    }
  }
  .horizontal-true.m3-container,
  .horizontal-true .aligner {
    flex-direction: row;
  }
  .horizontal-true.m3-container {
    width: 100%;
    height: 5rem;
    padding-top: 0;
  }
  .horizontal-true .aligner {
    padding-top: 0.75rem;
    padding-bottom: 1rem;
    justify-content: space-evenly;
  }
  @media (orientation: portrait) {
    .horizontal-auto.m3-container,
    .horizontal-auto .aligner {
      flex-direction: row;
    }
    .horizontal-auto.m3-container {
      width: 100%;
      height: 5rem;
      padding-top: 0;
    }
    .horizontal-auto .aligner {
      padding-top: 0.75rem;
      padding-bottom: 1rem;
      justify-content: space-evenly;
    }
  }
  .menuItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    --text: var(--m3-scheme-on-surface-variant);
    color: rgb(var(--text));
    z-index: 1;
  }
  .m3-container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  button,
  a {
    display: inline-flex;
    background-color: transparent;
    color: inherit;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .relative {
    position: relative;
  }
  .layer {
    position: absolute;
    transition: all 200ms;
  }
  .layer.circle {
    left: 50%;
    top: 50%;
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
    transform: translate(-50%, -50%);
  }
  .layer.full {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .menuItem > span {
    margin: 0.25rem 0;
  }
  .horizontal-true .menuItem > span {
    margin-bottom: 0;
  }
  .pill {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 2rem;
    border-radius: 2rem;
    overflow: hidden;
    transition: all 300ms;
  }
  .horizontal-true .pill {
    width: 4rem;
  }
  @media (orientation: portrait) {
    .horizontal-auto .menuItem > span {
      margin-bottom: 0;
    }
    .horizontal-auto .pill {
      width: 4rem;
    }
  }

  .menuItem.active {
    --text: var(--m3-scheme-on-surface);
  }
  .menuItem.active > .pill {
    background-color: rgb(var(--m3-scheme-secondary-container));
    color: rgb(var(--m3-scheme-on-secondary-container));
  }
  @media (hover: hover) {
    .hoverable:hover .layer {
      background-color: rgb(var(--text) / 0.08);
    }
  }
  .hoverable:focus-visible .layer,
  .hoverable:active .layer {
    background-color: rgb(var(--text) / 0.12);
  }

  .menuItem.active {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  @media screen and (forced-colors: active) {
    .menuItem,
    .menuItem > .pill {
      color: canvastext;
    }
    .menuItem.active > .pill {
      background-color: selecteditem;
      color: selecteditemtext;
    }
  }
</style>
