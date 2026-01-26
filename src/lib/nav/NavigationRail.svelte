<script lang="ts">
  import type { Snippet } from "svelte";

  import NavigationRailToggle from "./NavigationRailToggle.svelte";

  let {
    open = $bindable(false),
    collapse = "normal",
    modal = false,
    alignment = "top",
    iconType = "left",
    fab,
    children,
  }: {
    open?: boolean;
    collapse?: "normal" | "full" | "no" | boolean;
    modal?: boolean;
    alignment?: "top" | "center";
    iconType?: "left" | "full";
    fab?: Snippet<[open: boolean]>;
    children: Snippet;
  } = $props();

  const onkeydown = (e: KeyboardEvent) => {
    if (modal && open && e.key == "Escape") {
      e.preventDefault();

      open = false;
    }
  };
</script>

<svelte:window {onkeydown} />

<div class="m3-container">
  <div
    class:rail={true}
    class:open
    class:centered={alignment == "center"}
    class:collapse={collapse == "full"}
    class:icon={iconType == "full"}
    class:modal
  >
    {#if (collapse != "no" && collapse != false) || fab}
      <div class="top">
        {#if collapse != "no" && collapse != false}
          <NavigationRailToggle
            mode={collapse == "full" ? "inline-detached" : "inline"}
            bind:open
          />
        {/if}

        {#if fab}
          <div>
            {@render fab(open)}
          </div>
        {/if}
      </div>
    {/if}

    <div class="items" role="menu" aria-labelledby="m3-navigationtoggle">
      {@render children()}
    </div>
  </div>

  {#if modal}
    <!--svelte-ignore a11y_no_static_element_interactions--><!--svelte-ignore a11y_click_events_have_key_events-->
    <div class="shadow" onclick={() => (open = false)}></div>
  {/if}
</div>

<style>
  .m3-container {
    width: 96px;
    height: 100%;
    transition: width var(--m3-easing-spatial);
  }

  .m3-container:has(> .rail.collapse) {
    width: 0;
  }

  .rail.open,
  .m3-container:has(> .rail.open:not(.modal)),
  .rail.collapse {
    width: 220px;
  }

  .rail {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 96px;
    height: 100%;
    padding: 44px 0px 56px 0px;
    transition: all var(--m3-easing-spatial);
    overflow: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .rail.open,
  .rail.icon {
    gap: 32px;
  }

  .rail:not(.open).collapse {
    width: 0px;
  }

  .rail:not(.open).collapse > :global(*:not(.top)),
  .rail:not(.open).collapse .top > :global(*:not(.toggle)) {
    pointer-events: none;
  }

  .rail:not(.open).collapse > .top > :not(:global(.toggle)),
  .rail:not(.open).collapse > .items {
    opacity: 0;
  }

  .rail.modal {
    border-start-end-radius: var(--m3-shape-large);
    border-end-end-radius: var(--m3-shape-large);
  }

  .rail.modal.open,
  .rail:not(.modal) {
    background: var(--m3c-surface-container);
  }

  .rail.collapse > .top {
    margin-top: 56px;
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
    gap: 12px;
    width: 96px;
    height: 100%;
    align-self: stretch;
    transition:
      gap var(--m3-easing),
      width 0.2s;
    height: 100%;
  }

  .rail.open > .items,
  .rail.collapse > .items {
    gap: 0px;
    width: 220px;
  }

  .rail.icon > .items {
    gap: 0px;
  }

  .rail.centered > .items {
    justify-content: center;
  }

  .shadow {
    position: fixed;
    inset: 0;
    z-index: -1;
    background-color: --translucent(var(--m3c-scrim), 0.5);
    transition: opacity var(--m3-easing);
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
