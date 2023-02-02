<script lang="ts">
  import Item from "./Item.svelte";
  export let focusedMonth: number, focusedYear: number, dateValidator: (date: string) => boolean;
  export let chosenDate: string;
  const makeCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    return Array.from({ length: 42 }, (_, i: number) => {
      const date = new Date(year, month, i - firstDay.getDay() + 1);
      return { disabled: date.getMonth() != month, day: date.getDate() };
    });
  };
  const chunkCalendar = (calendar: any[]) => [
    calendar.slice(0, 7),
    calendar.slice(7, 14),
    calendar.slice(14, 21),
    calendar.slice(21, 28),
    calendar.slice(28, 35),
    calendar.slice(35, 42),
  ];
  const getDate = (year: number, month: number, day: number) =>
    `${year.toString().padStart(4, "0")}-${(month + 1).toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  const getNowList = (): [number, number, number] => {
    const now = new Date();
    return [now.getFullYear(), now.getMonth(), now.getDate()];
  };
  let nowList = getNowList();
  setInterval(() => (nowList = getNowList()), 1000 * 60);
</script>

<div class="m3-container">
  <div>
    {#each "SMTWTFS" as day}
      <Item label={day} />
    {/each}
  </div>
  {#each chunkCalendar(makeCalendar(focusedYear, focusedMonth)) as chunk}
    <div>
      {#each chunk as day}
        {@const dateStr = getDate(focusedYear, focusedMonth, day.day)}
        <Item
          isButton={true}
          disabled={day.disabled || !dateValidator(dateStr)}
          today={!day.disabled &&
            getDate(focusedYear, focusedMonth, day.day) == getDate(...nowList)}
          selected={!day.disabled && dateStr == chosenDate}
          label={day.day.toString()}
          on:click={() => (chosenDate = dateStr)}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .m3-container {
    display: flex;
    flex-direction: column;
    padding: 0 0.75rem 0.25rem 0.75rem;
    gap: 0.25rem;
  }
  .m3-container > div {
    display: flex;
    gap: 0.25rem;
  }
</style>
