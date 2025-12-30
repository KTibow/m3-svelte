<script lang="ts">
  import iconMenuOpen from "@ktibow/iconset-material-symbols/menu-open";
  import iconMenu from "@ktibow/iconset-material-symbols/menu";
  import { onMount } from "svelte";
  
  import Icon from "$lib/misc/Icon.svelte";
  
  let noAnimations = $state<boolean>(true);
  let {
    open = $bindable(),
    mode = 'detached'
  } = $props<{
    open: boolean;
    mode?: 'detached' | 'inline' | 'inline-detached';
  }>();
  
  // Prevent the animation on page load
  onMount(() => setTimeout(() => noAnimations = false));
</script>

<button class="toggle" class:open class:noAnimations type="button" id={(mode === 'detached' ? !open : (mode === 'inline-detached' ? open : true)) ? "m3-navigationtoggle" : undefined} aria-haspopup="true" aria-controls="menu" onclick={() => (open = !open)}>
  <Icon icon={open ? iconMenuOpen : iconMenu} />
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
    border-radius: var(--m3-shape-extra-small);
  }
  
  .toggle:focus-visible {
    animation: none;
    outline: solid;
    outline-color: var(--m3c-on-secondary-container);
    outline-width: 3px;
    outline-offset: 3px;
  }

  .toggle > :global(svg) {
    width: 24px;
    height: 24px;
  }
  
  .toggle.noAnimations {
    --m3-easing: 0s;
  }
  
  .toggle:not(.noAnimations).open > :global(svg) {
    animation: in_spin var(--m3-easing);
  }
  
  .toggle:not(.open) > :global(svg) {
    animation: out_spin var(--m3-easing);
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