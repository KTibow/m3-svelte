<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { createEventDispatcher } from "svelte";
  import NavRail from "$lib/nav/NavRail.svelte";
  import FAB from "$lib/buttons/FAB.svelte";

  export let railOptions: ComponentProps<NavRail>;
  export let fabOptions: false | ComponentProps<FAB>;
  const dispatch = createEventDispatcher();
  let windowWidth: number;
  let windowHeight: number;
  $: portrait = windowHeight > windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<div class="parent" class:navBarOffset={portrait}>
  <div class="railSpace">
    <div class="rail">
      <NavRail
        {...railOptions}
        hamburger={false}
        fab={portrait ? false : fabOptions}
        horizontal="auto"
        on:chosen
      />
    </div>
  </div>
  <div class="content">
    <slot />
    {#if portrait && fabOptions}
      <div class="fab">
        <FAB
          {...fabOptions}
          on:click={(event) => dispatch("chosen", { name: "fab", data: fabOptions, event })}
        />
      </div>
    {/if}
  </div>
</div>

<style>
  .parent {
    display: flex;
    overflow-x: auto;
    min-height: 100vh;
  }
  .railSpace {
    width: 5rem;
  }
  .rail {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
  }
  @media (orientation: portrait) {
    .parent {
      flex-direction: column-reverse;
    }
    .railSpace {
      width: unset;
      height: 5rem;
    }
    .rail {
      z-index: 2;
      top: unset;
      width: 100%;
    }
  }
  .content {
    flex: 1;
    position: relative;
    margin: 1rem;
  }
  .fab {
    position: fixed;
    bottom: 6rem;
    right: 1rem;
  }
</style>
