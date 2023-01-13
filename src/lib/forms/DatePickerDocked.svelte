<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  import iconLeft from "@iconify-icons/ic/outline-chevron-left";
  import iconRight from "@iconify-icons/ic/outline-chevron-right";
  import iconDown from "@iconify-icons/ic/outline-arrow-drop-down";
  import iconCheck from "@iconify-icons/ic/outline-check";
  import Button from "$lib/buttons/Button.svelte";
  import DateItem from "./_DateItem.svelte";

  let now = new Date();
  export let display = "flex";
  export let date: string = "";
  export let clearable = false;
  export let focusedMonth = parseInt(date.slice(5, 7)) - 1 || now.getMonth(),
    focusedYear = parseInt(date.slice(0, 4)) || now.getFullYear(),
    startYear = (Math.floor(now.getFullYear() / 100) - 1) * 100,
    endYear = (Math.floor(now.getFullYear() / 100) + 1) * 100;
  let focusedView: number | null = null,
    focusedOptions: { [key: string]: HTMLElement } = {},
    chosenDate: string;
  $: chosenDate = date;
  $: if (focusedOptions["true"]) focusedOptions["true"].scrollIntoView();
  setInterval(() => (now = new Date()), 1000 * 60);

  const dispatch = createEventDispatcher();
  const getShortMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "short" });
  const getLongMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "short" });
  const getOptions = (focusedView: number) =>
    focusedView == 1
      ? (Array.from({ length: 12 }, (_, i) => [i, getLongMonth(i)]) as [number, string][])
      : (Array.from({ length: endYear - startYear }, (_, i) => [
          startYear + 1 + i,
          startYear + 1 + i,
        ]) as [number, number][]);
  const listDays = (focusedMonth: number, focusedYear: number) => {
    const days = [...Array(6)].map(() => Array(7));
    let currentRow = 0;
    for (let day = 1; ; day++) {
      const date = new Date(focusedYear, focusedMonth, day);
      if (date.getMonth() != focusedMonth) break;
      days[currentRow][date.getDay()] = { day };
      if (date.getDay() == 6) currentRow++;
    }
    for (let day = 0; ; day--) {
      const date = new Date(focusedYear, focusedMonth, day);
      if (days[0][date.getDay()]) break;
      days[0][date.getDay()] = { disabled: true, day: date.getDate() };
    }
    for (let day = 1; ; day++) {
      const date = new Date(focusedYear, focusedMonth + 1, day);
      days[currentRow][date.getDay()] = { disabled: true, day: date.getDate() };
      if (date.getDay() == 6) currentRow++;
      if (currentRow == 6) break;
    }
    return days;
  };
</script>

<div class="m3-container" style="display: {display};">
  <div class="layer" />
  <div class="heading">
    {#if focusedView}
      <div>
        <button
          class="hoverable chooser md-label-large"
          disabled={focusedView != 1}
          on:click={() => (focusedView = null)}
        >
          {getShortMonth(focusedMonth)}
          <Icon icon={iconDown} />
        </button>
      </div>
      <div>
        <button
          class="hoverable chooser md-label-large"
          disabled={focusedView != 2}
          on:click={() => (focusedView = null)}
        >
          {focusedYear}
          <Icon icon={iconDown} />
        </button>
      </div>
    {:else}
      <div>
        <button class="hoverable" on:click={() => (focusedMonth = (focusedMonth - 1 + 12) % 12)}>
          <Icon icon={iconLeft} />
        </button>
        <button class="hoverable chooser md-label-large" on:click={() => (focusedView = 1)}>
          {getShortMonth(focusedMonth)}
          <Icon icon={iconDown} />
        </button>
        <button class="hoverable" on:click={() => (focusedMonth = (focusedMonth + 1) % 12)}>
          <Icon icon={iconRight} />
        </button>
      </div>
      <div>
        <button
          class="hoverable"
          disabled={focusedYear == startYear}
          on:click={() => focusedYear--}
        >
          <Icon icon={iconLeft} />
        </button>
        <button class="hoverable chooser md-label-large" on:click={() => (focusedView = 2)}>
          {focusedYear}
          <Icon icon={iconDown} />
        </button>
        <button class="hoverable" disabled={focusedYear == endYear} on:click={() => focusedYear++}>
          <Icon icon={iconRight} />
        </button>
      </div>
    {/if}
  </div>
  {#if focusedView}
    {@const options = getOptions(focusedView)}
    <div class="chooserMenu">
      {#each options as [number, display]}
        {@const selected = focusedView == 1 ? focusedMonth == number : focusedYear == number}
        <button
          class="hoverable md-body-large"
          class:selected
          bind:this={focusedOptions[selected.toString()]}
          on:click={() => {
            focusedView == 1 ? (focusedMonth = number) : (focusedYear = number);
            focusedView = 0;
          }}
        >
          {#if selected}
            <Icon icon={iconCheck} />
          {/if}
          {display}
        </button>
      {/each}
    </div>
  {:else}
    {@const calendar = listDays(focusedMonth, focusedYear)}
    <div class="grid">
      <div>
        <div class="item md-body-small">S</div>
        <div class="item md-body-small">M</div>
        <div class="item md-body-small">T</div>
        <div class="item md-body-small">W</div>
        <div class="item md-body-small">T</div>
        <div class="item md-body-small">F</div>
        <div class="item md-body-small">S</div>
      </div>
      {#each calendar as row}
        <div>
          {#each row as day}
            {@const date =
              focusedYear.toString().padStart(4, "0") +
              "-" +
              (focusedMonth + 1).toString().padStart(2, "0") +
              "-" +
              day.day.toString().padStart(2, "0")}
            <DateItem
              {day}
              chosen={!day.disabled && chosenDate == date}
              today={focusedYear == now.getFullYear() &&
                focusedMonth == now.getMonth() &&
                day.day == now.getDate()}
              on:click={() => (chosenDate = date)}
            />
          {/each}
        </div>
      {/each}
    </div>
    <div class="actions">
      {#if clearable}
        <span class="left">
          <Button type="text" on:click={() => dispatch("clearDate")}>Clear</Button>
        </span>
      {/if}
      <Button
        type="text"
        on:click={() => {
          chosenDate = date || "";
          dispatch("close");
        }}
      >
        Cancel
      </Button>
      <Button type="text" disabled={!chosenDate} on:click={() => dispatch("setDate", chosenDate)}>
        OK
      </Button>
    </div>
  {/if}
</div>

<style>
  .m3-container {
    position: relative;
    overflow: hidden;
    flex-direction: column;
    background-color: rgb(var(--md-sys-color-surface));
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
    background-color: rgb(var(--md-sys-color-primary) / 0.11);
    pointer-events: none;
  }

  .hoverable {
    cursor: pointer;
  }
  .hoverable:enabled:hover {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.08);
  }
  .hoverable:enabled:focus-visible,
  .hoverable:enabled:active {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.12);
  }
  .hoverable:disabled {
    cursor: auto;
    color: rgb(var(--md-sys-color-on-surface-variant) / 0.38);
  }
  .heading {
    display: flex;
    flex-shrink: 0;
    height: 4rem;
  }
  .heading > div {
    display: flex;
    flex: 1;
  }
  .heading button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface-variant));
    min-width: 3rem;
    padding: 0;
    border: none;
    transition: all 150ms;
  }
  .heading .chooser {
    gap: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.25rem;
    flex-grow: 1;
  }
  .heading :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .heading .chooser :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
  }

  .chooserMenu {
    overflow: scroll;
    margin-bottom: 1.25rem;
  }
  .chooserMenu > button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    padding: 0 0 0 3.5rem;
    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface));
    border: none;
    transition: all 150ms;
  }
  .chooserMenu > .selected {
    padding-left: 0;
  }
  .chooserMenu :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .grid {
    display: flex;
    flex-direction: column;
    padding: 0 0.75rem 0.25rem 0.75rem;
    gap: 0.25rem;
  }
  .grid > div {
    display: flex;
    gap: 0.25rem;
  }
  .grid .item {
    display: inline-flex;
    color: rgb(var(--md-sys-color-on-surface));
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
  }

  .actions {
    display: flex;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
    justify-content: end;
  }
  .actions > .left {
    margin-right: auto;
  }
</style>
