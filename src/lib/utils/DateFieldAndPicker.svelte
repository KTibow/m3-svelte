<script lang="ts">
  import type { ComponentProps } from "svelte";
  import iconCalendar from "@iconify-icons/ic/outline-calendar-today";
  import TextField from "$lib/forms/TextField.svelte";
  import DatePickerDocked from "$lib/forms/DatePickerDocked.svelte";
  import { enterExit } from "./animation";

  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
  export let fieldOptions: Optional<ComponentProps<TextField>, "style">;
  export let clearable = true;
  export let value: string;
  export let dateValidator: (date: string) => boolean = () => false; /* return true if invalid */
  let showingPicker = false,
    container: HTMLDivElement;
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
  <TextField
    style="outlined"
    isDate={true}
    bind:value
    trailingIcon={iconCalendar}
    on:trailingClicked={() => (showingPicker = !showingPicker)}
    {...fieldOptions}
  />
  <!-- TODO: add error states when text field is invalid
  problems:
  - error icon overlaps
  - im using a custom thing, ill need to move it to :valid
  - might need to move to https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity-->
  {#if showingPicker}
    <div class="picker" transition:enterExit={{ duration: 400, moveY: false }} use:clickOutside>
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
    border-radius: 1rem;
  }
</style>
