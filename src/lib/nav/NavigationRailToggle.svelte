<script lang="ts">
  import iconMenuOpen from "@ktibow/iconset-material-symbols/menu-open";
  import iconMenu from "@ktibow/iconset-material-symbols/menu";
  import { onMount } from "svelte";

  import Icon from "$lib/misc/Icon.svelte";

  let noAnimations = $state(true);
  let {
    open = $bindable(),
    mode = "detached",
  }: {
    open: boolean;
    mode?: "detached" | "inline" | "inline-detached";
  } = $props();

  // Prevent the animation on page load
  onMount(() => setTimeout(() => (noAnimations = false)));
</script>

<button
  class="toggle"
  class:noAnimations
  class:detached={mode != "inline"}
  class:inline={mode == "inline-detached"}
  class:open
  type="button"
  id={(mode == "detached" ? !open : mode == "inline-detached" ? open : true)
    ? "m3-navigationtoggle"
    : undefined}
  aria-haspopup="true"
  aria-controls="menu"
  onclick={() => (open = !open)}
>
  <Icon icon={open ? iconMenuOpen : iconMenu} size={24} />
</button>

<style>
  .toggle {
    display: flex;
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    margin: 1rem;
    color: var(--m3c-on-surface-container);
    border-radius: var(--m3-shape-extra-small);
    width: 24px;
  }

  .toggle.detached {
    position: fixed;
    z-index: 9;
    top: 44px;
    left: 20px;
  }

  .toggle.detached.inline {
    position: absolute;
  }

  .toggle:focus-visible {
    animation: none;
    outline: solid;
    outline-color: var(--m3c-on-secondary-container);
    outline-width: 3px;
    outline-offset: 3px;
  }

  .toggle.open > :global(svg) {
    animation: in_spin var(--m3-easing);
  }

  .toggle:not(.open) > :global(svg) {
    animation: out_spin var(--m3-easing);
  }

  .toggle.noAnimations > :global(svg) {
    animation-duration: 0ms !important;
  }

  @keyframes in_spin {
    0% {
      transform: rotate(180deg);
      opacity: 0.8;
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes out_spin {
    0% {
      opacity: 0.8;
    }

    100% {
      transform: rotate(-180deg);
    }
  }
</style>
