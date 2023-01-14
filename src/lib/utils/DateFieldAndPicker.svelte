<script lang="ts">
  import DateField from "$lib/forms/DateField.svelte";
  import DatePickerDocked from "$lib/forms/DatePickerDocked.svelte";
  import type { ComponentProps } from "svelte";
  import { fade } from "svelte/transition";
  export let fieldOptions: Omit<ComponentProps<DateField>, "dateValidator">;
  export let clearable = true;
  export let value: string;
  export let align: "left" | "auto" | "right" = "auto";
  export let dateValidator: (date: string) => boolean = () => false; /* return true if invalid */
  let showingPicker = false;
  let container: HTMLElement;
  function clickOutside(_: Node) {
    const handleClick = (event: Event) => {
      if (!container.contains(event.target as Node)) {
        showingPicker = false;
      }
    };
    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div class="m3-container" bind:this={container}>
  <DateField
    {...fieldOptions}
    {dateValidator}
    bind:value
    on:showPicker={() => (showingPicker = !showingPicker)}
  />
  {#if showingPicker}
    <div class="picker align-{align}" transition:fade={{ duration: 150 }} use:clickOutside>
      <DatePickerDocked
        {clearable}
        {dateValidator}
        date={value}
        on:close={() => (showingPicker = false)}
        on:setDate={(e) => {
          value = e.detail;
          showingPicker = false;
        }}
        on:clearDate={() => (value = "")}
      />
    </div>
  {/if}
</div>

<style>
  .m3-container {
    position: relative;
  }
  .picker {
    position: absolute;
    top: 4.5rem;
    z-index: 3;
  }
  .align-left {
    left: 0;
  }
  .align-right,
  .align-auto {
    right: 0;
  }
  @media (orientation: portrait) {
    .align-auto {
      left: 0;
      right: unset;
    }
  }
</style>
