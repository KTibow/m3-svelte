<script lang="ts">
  import iconMenuOpen from "@ktibow/iconset-material-symbols/menu-open";
  import iconMenu from "@ktibow/iconset-material-symbols/menu";
  import { onMount } from "svelte";
  
  import Icon from "$lib/misc/_icon.svelte";
  
  let noAnimations = $state<boolean>(true);
  let {
    active
  } = $props<{
    active: boolean;
  }>();
  
  // Prevent the animation on page load
  onMount(() => setTimeout(() => noAnimations = false));
  $effect(() => {
    console.log(active);
  });
</script>

<button class="toggle" class:active class:noAnimations type="button" aria-haspopup="true" aria-controls="menu" onclick={() => (active = !active)}>
    <Icon icon={active ? iconMenuOpen : iconMenu} />
</button>

<style>
  .toggle {
    background: none;
    padding: 0;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin: 1rem;
    border-radius: var(--m3-util-rounding-extra-small);
  }
  
  .toggle:focus-visible {
    animation: none;
    outline: solid;
    outline-color: rgb(var(--m3-scheme-on-secondary-container));
    outline-width: 3px;
    outline-offset: 3px;
  }

  .toggle > :global(svg) {
    width: 24px;
    height: 24px;
  }
  
  .toggle.noAnimations {
    --m3-util-easing-spatial: 0s;
  }
  
  .toggle:not(.noAnimations).active > :global(svg) {
    animation: in_spin var(--m3-util-easing-spatial);
  }
  
  .toggle:not(.active) > :global(svg) {
    animation: out_spin var(--m3-util-easing-spatial);
  }
  
  @keyframes in_spin {
    0% { 
      transform: rotate(180deg);
      opacity: .8;
    }
    
    100% { 
      transform: rotate(360deg);
    }
  }
  
  @keyframes out_spin {
    0% {
      opacity: .8;
    }
    
    100% { 
      transform: rotate(-180deg);
    }
  }
</style>