<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconCalendar from "@iconify-icons/ic/outline-calendar-today";
  import { onMount } from "svelte";
  import type { TransitionConfig } from "svelte/transition";
  import DatePickerDocked from "$lib/forms/DatePickerDocked.svelte";
  import { easeEmphasized } from "$lib/misc/easing";

  export let name: string;
  export let date = "";
  export let required = false;
  const id = crypto.randomUUID();
  let hasJs = false;
  onMount(() => {
    hasJs = true;
  });

  let picker = false;
  let container: HTMLDivElement;
  const clickOutside = (_: Node) => {
    const handleClick = (event: Event) => {
      if (!container.contains(event.target as Node)) {
        picker = false;
      }
    };
    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  };
  const enterExit = (_: Node): TransitionConfig => {
    return {
      duration: 400,
      easing: easeEmphasized,
      css: (t, u) => `clip-path: inset(-100% 0 ${u * 100}% 0 round 1rem);
transform-origin: top;
transform: scaleY(${(t * 0.3 + 0.7) * 100}%);
opacity: ${Math.min(t * 3, 1)};`,
    };
  };
</script>

<div class="m3-container" class:has-js={hasJs} bind:this={container}>
  <input type="date" class="m3-font-body-large" {required} {id} bind:value={date} />
  <label class="m3-font-body-small" for={id}>{name}</label>
  <button on:click={() => (picker = !picker)}><Icon icon={iconCalendar} /></button>
  {#if picker}
    <div class="picker" use:clickOutside transition:enterExit>
      <DatePickerDocked
        clearable={!required}
        bind:date
        on:close={() => (picker = false)}
        on:setDate={(e) => (date = e.detail)}
      />
    </div>
  {/if}
</div>

<style>
  .m3-container {
    position: relative;
    height: 3.5rem;
    min-width: 15rem;
    background-color: rgb(var(--m3-scheme-surface-container-highest));
    border-radius: 0.25rem 0.25rem 0 0;
    border-bottom: solid 0.0625rem rgb(var(--m3-scheme-on-surface-variant));
  }
  input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 1.5rem 1rem 0.5rem 1rem;
    background-color: inherit;
    border-radius: inherit;
    color: rgb(var(--m3-scheme-on-surface));
  }
  label {
    position: absolute;
    left: 1rem;
    top: 0.5rem;
    color: rgb(var(--m3-scheme-on-surface-variant));
    pointer-events: none;
  }
  input {
    padding-left: 0.875rem;
  }
  @supports (-moz-appearance: none) {
    input {
      padding-left: 0.75rem;
    }
  }

  button {
    display: none;
    position: absolute;
    width: 3.5rem;
    height: 100%;
    right: 0;

    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: rgb(var(--m3-scheme-on-surface-variant));
    border-top-right-radius: 0.25rem;

    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  button > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .picker {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    z-index: 1;
  }

  @media (hover: hover) {
    button:hover {
      background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.08);
    }
  }
  button:focus-visible,
  button:active {
    background-color: rgb(var(--m3-scheme-on-surface-variant) / 0.12);
  }
  @media (min-width: 37.5rem) {
    .has-js button {
      display: flex;
    }
    .has-js input {
      clip-path: inset(0 3.5rem 0 0);
    }
  }
</style>
