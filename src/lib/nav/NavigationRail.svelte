<script lang="ts">
  import type { Snippet } from "svelte";

  import iconMenuOpen from "@ktibow/iconset-material-symbols/menu-open";
  import iconMenu from "@ktibow/iconset-material-symbols/menu";

  import Icon from "$lib/misc/_icon.svelte";

  let {
    open = false,
    collapse = 'normal',
    modal = false,
    fab,
    children,
  }: {
    open?: boolean;
    collapse?: 'normal' | 'full' | 'none' | boolean;
    modal?: boolean;
    fab?: Snippet<[open: boolean]>;
    children: Snippet;
  } = $props();
</script>

<div class="m3-container">
  <div class="rail" class:open={open && (collapse !== 'none' && collapse !== false)} class:fullyCollapse={collapse === 'full'} class:modal>
    <div class="top">
      {#if collapse !== 'none' && collapse !== false}
        <button class="collapse" onclick={() => (open = !open)}>
          <Icon icon={open ? iconMenuOpen : iconMenu} />
        </button>
      {/if}

      {#if fab}
        <div>
          {@render fab(open && (collapse !== 'none' && collapse !== false))}
        </div>
      {/if}
    </div>

    <div class="items">
      {@render children()}
    </div>
  </div>
  
  {#if modal}
    <!--svelte-ignore a11y_no_static_element_interactions--><!--svelte-ignore a11y_click_events_have_key_events-->
    <div class="shadow" onclick={() => open = false}></div>
  {/if}
</div>

<style>
  .m3-container {
    width: 96px;
    height: 100%;
  }

  .m3-container:has(.fullyCollapse) {
    width: 0;
  }

  .rail.fullyCollapse:not(.open) {
    background: none !important;
  }

  .rail.fullyCollapse {
    position: fixed;
  }

  .rail.fullyCollapse:not(.open) > .items,
  .rail.fullyCollapse:not(.open) > .top > div {
    opacity: 0;
    pointer-events: none;
  }

  .rail {
    width: 96px;
    height: 100%;
    padding: 40px 0px;
    transition: all 200ms;
    overflow: hidden;
    overflow-y: auto;
  }

  .rail.modal {
    border-start-end-radius: var(--m3-util-rounding-large);
    border-end-end-radius: var(--m3-util-rounding-large);
  }

  .rail.modal.open,
  .rail:not(.modal) {
    background: rgb(var(--m3-scheme-surface-container));
  }

  .rail.open {
    width: 220px;
  }

  .top {
    margin-block-end: 46px;
    margin-inline-start: 20px;
    display: flex;
    flex-direction: column;
  }

  .collapse {
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin: 1rem;
    pointer-events: auto;
  }

  .collapse > :global(svg) {
    width: 24px;
    height: 24px;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-inline-start: 20px;
    width: 56px;
    container: items / inline-size;
  }

  .rail.open > .items {
    width: 180px;
    gap: 0px;
  }
  
  .shadow {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: rgb(var(--m3-scheme-scrim) / 0.5);
    transition: all 200ms;
  }
  
  .rail:not(.open) + .shadow {
    opacity: 0;
    pointer-events: none;
  }

  @media (width <= 300px) {
    .rail.open {
      border-radius: 0px !important;
      width: 100%;
    }
  }
</style>
