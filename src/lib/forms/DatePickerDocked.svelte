<script lang="ts">
  import Actions from "./_picker/Actions.svelte";
  import CalendarPicker from "./_picker/CalendarPicker.svelte";
  import FocusPicker from "./_picker/FocusPicker.svelte";
  import Header from "./_picker/Header.svelte";

  const now = new Date();

  let {
    date = "",
    clearable,
    // eslint and svelte disagree
    // eslint-disable-next-line svelte/no-unused-svelte-ignore
    // svelte-ignore state_referenced_locally
    focusedMonth = $bindable(parseInt(date.slice(5, 7)) - 1 || now.getMonth()),
    // eslint and svelte disagree
    // eslint-disable-next-line svelte/no-unused-svelte-ignore
    // svelte-ignore state_referenced_locally
    focusedYear = $bindable(parseInt(date.slice(0, 4)) || now.getFullYear()),
    startYear = now.getFullYear() - 50,
    endYear = now.getFullYear() + 10,
    dateValidator = (_date: string) => true,
    close,
    setDate,
  }: {
    date?: string;
    clearable: boolean;
    focusedMonth?: number;
    focusedYear?: number;
    startYear?: number;
    endYear?: number;
    dateValidator?: (date: string) => boolean;
    close: () => void;
    setDate: (date: string) => void;
  } = $props();

  let currentView: "calendar" | "year" | "month" = $state("calendar");
  // svelte-ignore state_referenced_locally
  let chosenDate = $state(date);
  $effect(() => {
    chosenDate = date;
  });

  const getLongMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "long" });
</script>

<div class="m3-container">
  <Header bind:currentView bind:focusedMonth bind:focusedYear {startYear} {endYear} />
  {#if currentView == "calendar"}
    <CalendarPicker {focusedMonth} {focusedYear} {dateValidator} bind:chosenDate />
    <Actions
      {clearable}
      chosenDate={Boolean(chosenDate)}
      clear={() => (chosenDate = "")}
      cancel={() => {
        chosenDate = date;
        close();
      }}
      ok={() => {
        setDate(chosenDate);
        close();
      }}
    />
  {:else if currentView == "month"}
    <FocusPicker
      options={Array.from({ length: 12 }, (_, i) => ({
        name: getLongMonth(i),
        selected: i == focusedMonth,
        activate: () => {
          focusedMonth = i;
          currentView = "calendar";
        },
      }))}
    />
  {:else}
    <FocusPicker
      options={Array.from({ length: endYear - startYear }, (_, i) => ({
        name: (startYear + i + 1).toString(),
        selected: startYear + i + 1 == focusedYear,
        activate: () => {
          focusedYear = startYear + i + 1;
          currentView = "calendar";
        },
      }))}
    />
  {/if}
</div>

<style>
  @layer tokens {
    :root {
      --m3-date-picker-shape: var(--m3-shape-large);
    }
  }

  .m3-container {
    display: flex;
    position: relative;
    overflow: hidden;
    flex-direction: column;
    background-color: var(--m3c-surface-container-high);
    width: 20.5rem;
    height: 26.75rem;
    border-radius: var(--m3-date-picker-shape);
  }
</style>
