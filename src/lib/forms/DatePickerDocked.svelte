<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Actions from "./_picker/Actions.svelte";
  import CalendarPicker from "./_picker/CalendarPicker.svelte";
  import FocusPicker from "./_picker/FocusPicker.svelte";
  import Header from "./_picker/Header.svelte";

  let now = new Date();
  export let display = "flex";
  export let date: string = "";
  export let clearable = false;
  export let dateValidator: (date: string) => boolean;
  export let focusedMonth = parseInt(date.slice(5, 7)) - 1 || now.getMonth(),
    focusedYear = parseInt(date.slice(0, 4)) || now.getFullYear(),
    startYear = (Math.floor(now.getFullYear() / 100) - 1) * 100,
    endYear = (Math.floor(now.getFullYear() / 100) + 1) * 100;
  const getLongMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "short" });
  const dispatch = createEventDispatcher();
  let currentView: "calendar" | "year" | "month" = "calendar",
    chosenDate: string;
  $: chosenDate = date;
</script>

<div class="m3-container" style="display: {display};">
  <div class="layer" />
  <Header bind:currentView bind:focusedMonth bind:focusedYear {startYear} {endYear} />
  {#if currentView == "calendar"}
    <CalendarPicker {focusedMonth} {focusedYear} {dateValidator} bind:chosenDate />
    <Actions
      {clearable}
      chosenDate={Boolean(chosenDate)}
      on:clear={() => (chosenDate = "")}
      on:cancel={() => {
        chosenDate = date || "";
        dispatch("close");
      }}
      on:ok={() => dispatch("setDate", chosenDate)}
    />
  {:else}
    <FocusPicker
      options={currentView == "month"
        ? Array.from({ length: 12 }, (_, i) => ({
            id: i,
            name: getLongMonth(i),
            selected: i == focusedMonth,
          }))
        : Array.from({ length: endYear - startYear }, (_, i) => ({
            id: startYear + i + 1,
            name: (startYear + i + 1).toString(),
            selected: startYear + i + 1 == focusedYear,
          }))}
      on:chosen={(e) => {
        if (currentView == "month") focusedMonth = e.detail;
        else if (currentView == "year") focusedYear = e.detail;
        currentView = "calendar";
      }}
    />
  {/if}
</div>

<style>
  .m3-container {
    position: relative;
    overflow: hidden;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface));
    width: 20.5rem;
    height: 26.75rem;
    border-radius: 1rem;
  }
  .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(var(--m3-scheme-primary) / 0.11);
    pointer-events: none;
  }
</style>
