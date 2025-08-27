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
    const days = Array.from({ length: 42 }, (_, i: number) => {
      const date = new Date(year, month, i - firstDay.getDay() + 1);
      const day = date.getDate();
      const iso =
        date.getFullYear().toString().padStart(4, "0") +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        day.toString().padStart(2, "0");
      const label = date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return { disabled: date.getMonth() != month, day, iso, label };
    });

    const rows = [];
    for (let r = 0; r < 6; r++) {
      rows.push(days.slice(r * 7, (r + 1) * 7));
    }

    return rows;
  };

  let today = $state(new Date());
  setInterval(() => (today = new Date()), 1000 * 60);
</script>

<div class="m3-container" role="grid">
  <div style:display="contents" role="row">
    {#each ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as day}
      <!-- TODO: use a tooltip -->
      <div class="day m3-font-body-small" role="columnheader" aria-label={day}>{day.at(0)}</div>
    {/each}
  </div>
  {#each makeCalendar(focusedYear, focusedMonth) as row}
    <div style:display="contents" role="row">
      {#each row as day (day.iso + (day.disabled ? "-disabled" : ""))}
        {@const disabled = day.disabled || !dateValidator(day.iso)}
        <div style:display="contents" role={disabled ? undefined : "gridcell"}>
          <Item
            {disabled}
            today={!day.disabled &&
              focusedYear == today.getFullYear() &&
              focusedMonth == today.getMonth() &&
              day.day == today.getDate()}
            selected={!day.disabled && day.iso == chosenDate}
            label={day.day.toString()}
            onclick={() => (chosenDate = day.iso)}
            aria-label={day.label}
          />
        </div>
      {/each}
    </div>
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
