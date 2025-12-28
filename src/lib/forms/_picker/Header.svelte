<script lang="ts">
  import Icon from "$lib/misc/Icon.svelte";
  import iconLeft from "@ktibow/iconset-material-symbols/chevron-left";
  import iconRight from "@ktibow/iconset-material-symbols/chevron-right";
  import iconDown from "@ktibow/iconset-material-symbols/arrow-drop-down";

  let {
    currentView = $bindable(),
    focusedMonth = $bindable(),
    focusedYear = $bindable(),
    startYear,
    endYear,
  }: {
    currentView: "calendar" | "year" | "month";
    focusedMonth: number;
    focusedYear: number;
    startYear: number;
    endYear: number;
  } = $props();

  const yearClick = () => (currentView = currentView == "calendar" ? "year" : "calendar");
  const monthClick = () => (currentView = currentView == "calendar" ? "month" : "calendar");
  const getShortMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "short" });

  let prevMonth = $derived((focusedMonth - 1 + 12) % 12);
  let nextMonth = $derived((focusedMonth + 1) % 12);
  let prevYear = $derived(focusedYear - 1);
  let nextYear = $derived(focusedYear + 1);
</script>

<div class="m3-container" class:choosing={currentView != "calendar"}>
  <div>
    <button
      type="button"
      class="arrow m3-layer"
      onclick={() => (focusedMonth = prevMonth)}
      title={getShortMonth(prevMonth)}
    >
      <Icon icon={iconLeft} size={24} />
    </button>
    <button
      type="button"
      class="chooser m3-layer"
      onclick={monthClick}
      disabled={currentView == "year"}
    >
      {getShortMonth(focusedMonth)}
      <Icon icon={iconDown} size={18} style="margin-inline: 0.5rem -0.25rem" />
    </button>
    <button
      type="button"
      class="arrow m3-layer"
      onclick={() => (focusedMonth = nextMonth)}
      title={getShortMonth(nextMonth)}
    >
      <Icon icon={iconRight} size={24} />
    </button>
  </div>
  <div>
    <button
      type="button"
      class="arrow m3-layer"
      disabled={focusedYear <= startYear}
      onclick={() => (focusedYear = prevYear)}
      title={prevYear.toString()}
    >
      <Icon icon={iconLeft} size={24} />
    </button>
    <button
      type="button"
      class="chooser m3-layer"
      onclick={yearClick}
      disabled={currentView == "month"}
    >
      {focusedYear}
      <Icon icon={iconDown} size={18} style="margin-inline: 0.5rem -0.25rem" />
    </button>
    <button
      type="button"
      class="arrow m3-layer"
      disabled={focusedYear >= endYear}
      title={nextYear.toString()}
      onclick={() => (focusedYear = nextYear)}
    >
      <Icon icon={iconRight} size={24} />
    </button>
  </div>
</div>

<style>
  .m3-container {
    display: flex;
    height: 4rem;
    border-bottom: solid 1px transparent;
    flex-shrink: 0;
  }
  .m3-container > div {
    display: flex;
    flex: 1;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: var(--m3c-on-surface-variant);
    border: none;
    padding: 0;
    cursor: pointer;
  }
  button:disabled {
    cursor: auto;
    color: --translucent(var(--m3c-on-surface-variant), 0.38);
  }

  .chooser {
    @apply --m3-label-large;
    flex-grow: 1;
  }
  .arrow {
    width: 3rem;
  }

  .choosing {
    border-color: var(--m3c-outline-variant);
  }
  .choosing .arrow {
    opacity: 0;
    width: 0;
  }
</style>
