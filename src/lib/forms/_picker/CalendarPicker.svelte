<script lang="ts">
  import Item from "./Item.svelte";

  let {
    focusedMonth,
    focusedYear,
    dateValidator,
    chosenDate = $bindable(),
  }: {
    focusedMonth: number;
    focusedYear: number;
    dateValidator: (date: string) => boolean;
    chosenDate: string;
  } = $props();

  const makeCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    return Array.from({ length: 42 }, (_, i: number) => {
      const date = new Date(year, month, i - firstDay.getDay() + 1);
      const day = date.getDate();
      const iso =
        year.toString().padStart(4, "0") +
        "-" +
        (month + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");
      return { disabled: date.getMonth() != month, day, iso };
    });
  };

  let today = $state(new Date());
  setInterval(() => (today = new Date()), 1000 * 60);
</script>

<div class="m3-container">
  {#each "SMTWTFS" as day}
    <div class="day m3-font-body-small">{day}</div>
  {/each}
  {#each makeCalendar(focusedYear, focusedMonth) as day (day.iso + (day.disabled ? "-disabled" : ""))}
    <Item
      disabled={day.disabled || !dateValidator(day.iso)}
      today={!day.disabled &&
        focusedYear == today.getFullYear() &&
        focusedMonth == today.getMonth() &&
        day.day == today.getDate()}
      selected={!day.disabled && day.iso == chosenDate}
      label={day.day.toString()}
      onclick={() => (chosenDate = day.iso)}
    />
  {/each}
</div>

<style>
  .m3-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 0 0.75rem 0.25rem 0.75rem;
    gap: 0.25rem;
  }
  .day {
    display: inline-flex;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    align-items: center;
    justify-content: center;

    color: rgb(var(--m3-scheme-on-surface));
  }
</style>
