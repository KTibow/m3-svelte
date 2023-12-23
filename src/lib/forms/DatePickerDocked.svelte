<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Actions from "./_picker/Actions.svelte";
  import CalendarPicker from "./_picker/CalendarPicker.svelte";
  import FocusPicker from "./_picker/FocusPicker.svelte";
  import Header from "./_picker/Header.svelte";

  const now = new Date();

  export let display = "flex";
  export let date = "";
  export let clearable: boolean;
  export let focusedMonth = parseInt(date.slice(5, 7)) - 1 || now.getMonth(),
    focusedYear = parseInt(date.slice(0, 4)) || now.getFullYear(),
    startYear = now.getFullYear() - 50,
    endYear = now.getFullYear() + 10;
  export let dateValidator = (_date: string) => true;

  let currentView: "calendar" | "year" | "month" = "calendar",
    chosenDate: string;
  $: chosenDate = date;

  const getLongMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "long" });
  const dispatch = createEventDispatcher();
</script>

<div class="m3-container" style="display: {display};">
  <Header bind:currentView bind:focusedMonth bind:focusedYear {startYear} {endYear} />
  {#if currentView == "calendar"}
    <CalendarPicker {focusedMonth} {focusedYear} {dateValidator} bind:chosenDate />
    <Actions
      {clearable}
      chosenDate={Boolean(chosenDate)}
      on:clear={() => (chosenDate = "")}
      on:cancel={() => {
        chosenDate = date;
        dispatch("close");
      }}
      on:ok={() => {
        dispatch("setDate", chosenDate);
        dispatch("close");
      }}
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
        else focusedYear = e.detail;
        currentView = "calendar";
      }}
    />
  {/if}
</div>

<style>
  :root {
    --m3-date-picker-shape: var(--m3-util-rounding-large);
  }

  .m3-container {
    position: relative;
    overflow: hidden;
    flex-direction: column;
    background-color: rgb(var(--m3-scheme-surface-container-high));
    width: 20.5rem;
    height: 26.75rem;
    border-radius: var(--m3-date-picker-shape);
  }
</style>
