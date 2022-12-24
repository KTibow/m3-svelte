<script lang="ts">
  // Tip from Material: Avoid using a navigation drawer with other primary navigation components,
  // such as a navigation bar. Instead, choose a single navigation component based on product requirements
  // and device size: Navigation bars for small screens, navigation rails for tablet screens,
  // and standard navigation drawers for desktop screens.
  import { createEventDispatcher } from "svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import iconHamburger from "@iconify-icons/ic/outline-menu";

  export let display = "flex";
  export let hamburger = false;
  export let fab: false | object = false;
  export let horizontal = false;
  export let mainItems: {
    active: boolean;
    activeIcon: IconifyIcon;
    inactiveIcon: IconifyIcon;
    name: string;
  }[];

  const dispatch = createEventDispatcher();
</script>

<div class="container" class:horizontal style="display: {display};">
  {#if hamburger}
    <button
      class="menuItem relative"
      on:click={(event) => dispatch("chosen", { name: "hamburger", event })}
    >
      <div class="layer circle" />
      <Icon icon={iconHamburger} />
    </button>
  {/if}
  {#if fab}
    <div class="menuItem no-pointer">
      <FAB
        elevation="none"
        {...fab}
        on:click={(event) => dispatch("chosen", { name: "fab", data: fab, event })}
      />
    </div>
  {/if}
  <div class="navAligner">
    {#each mainItems as item}
      <button
        class="menuItem"
        class:active={item.active}
        on:click={(event) => dispatch("chosen", { name: "item", data: item, event })}
      >
        <div class="pill relative">
          <div class="layer full" />
          <Icon icon={item.active ? item.activeIcon : item.inactiveIcon} />
        </div>
        <span class="md-label-medium">{item.name}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .container {
    background-color: rgb(var(--md-sys-color-surface));
    width: 5rem;
    gap: 0.75rem;
    flex-direction: column;
    flex-grow: 1;
    padding-top: 1rem;
  }
  .horizontal {
    flex-direction: row;
    width: unset;
    height: 5rem;
    padding-top: 0.75rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
  }
  .container :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .menuItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border: none;
    color: rgb(var(--md-sys-color-on-surface-variant));
    cursor: pointer;
  }

  .relative {
    position: relative;
  }
  .no-pointer {
    cursor: auto;
  }
  .layer {
    position: absolute;
    transition: all 150ms;
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
  .menuItem:hover .layer {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.08);
  }
  .menuItem:focus-visible .layer,
  .menuItem:active .layer {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.12);
  }
  .menuItem.active:hover .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .menuItem.active:focus-visible .layer,
  .menuItem.active:active .layer {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }

  .navAligner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    max-height: 48rem;
    gap: 0.75rem;
  }
  .horizontal .navAligner {
    flex-direction: row;
    justify-content: space-around;
  }
  .pill {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 2rem;
    border-radius: 1rem;
    overflow: hidden;
  }
  .horizontal .pill {
    width: 4rem;
  }
  .active {
    color: rgb(var(--md-sys-color-on-surface));
  }
  .active .pill {
    background-color: rgb(var(--md-sys-color-secondary-container));
  }
  .menuItem .md-label-medium {
    margin-top: 0.25rem;
  }
</style>
