<script lang="ts">
  import type { Snippet } from "svelte";

  import NavigationToggle from "./NavigationToggle.svelte";

  let {
    open = $bindable(false),
    collapse = 'normal',
    modal = false,
    alignment = 'top',
    fab,
    children,
  } = $props<{
    open?: boolean;
    collapse?: 'normal' | 'full' | 'no' | boolean;
    modal?: boolean;
    alignment?: 'top' | 'center';
    fab?: Snippet<[open: boolean]>;
    children: Snippet;
  }>();
  
  const onkeydown = (e: KeyboardEvent) => {
    if (modal && open && e.key === 'Escape') {
      e.preventDefault();
      
      open = false;
    }
  }
</script>

<svelte:window {onkeydown} />

<div class="m3-container">
  <div class="rail" class:open={open && (collapse !== 'no' && collapse !== false)} class:centered={alignment === 'center'} class:fullyCollapse={collapse === 'full'} class:modal>
    {#if (collapse !== 'no' && collapse !== false) || fab}
      <div class="top">
        {#if collapse !== 'no' && collapse !== false}
          <NavigationToggle bind:active={open} />
        {/if}

        {#if fab}
          <div>
            {@render fab(open && (collapse !== 'no' && collapse !== false))}
          </div>
        {/if}
      </div>
    {/if}

    <div class="items" role="menu" aria-labelledby="m3-menubutton">
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
    transition: width var(--m3-util-easing-spatial);
  }

  .m3-container:has(>.rail.fullyCollapse) {
    width: 0;
  }
  
  .rail.open,
  .m3-container:has(>.rail.open:not(.modal)),
  .rail.fullyCollapse {
    width: 220px;
  }
  
  .rail {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 96px;
    height: 100%;
    padding: 44px 0px 56px 0px;
    transition: all var(--m3-util-easing-spatial);
    overflow: hidden;
    overflow-y: auto;
  }

  .rail:not(.open).fullyCollapse {
    pointer-events: none;
    width: 0px;
  }
  
  .rail:not(.open).fullyCollapse > .top > :not(:global(.toggle)),
  .rail:not(.open).fullyCollapse > .items {
    opacity: 0;
  }

  .rail.modal {
    border-start-end-radius: var(--m3-util-rounding-large);
    border-end-end-radius: var(--m3-util-rounding-large);
  }

  .rail.modal.open,
  .rail:not(.modal) {
    background: rgb(var(--m3-scheme-surface-container));
  }

  .top {
    margin-inline: 20px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
  
  .items {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 96px;
    height: 100%;
    container: items / inline-size;
    align-self: stretch;
    transition: gap var(--m3-util-easing-fast), opacity var(--m3-util-easing);
    height: 100%;
  }

  .rail.open > .items,
  .rail.fullyCollapse > .items {
    gap: 0px;
    width: 220px;
  }
  
  .rail.centered > .items {
    justify-content: center;
  }
  
  .shadow {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: rgb(var(--m3-scheme-scrim) / 0.5);
    transition: all var(--m3-util-easing);
  }
  
  .rail:not(.open) + .shadow {
    opacity: 0;
    pointer-events: none;
  }

  @media (width <= 300px) {
    .rail.open {
      border-radius: 0px !important;
      width: 100vw;
    }
  }
</style>
