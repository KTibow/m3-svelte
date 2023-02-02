<script lang="ts">
  import Icon from "@iconify/svelte";
  import iconLeft from "@iconify-icons/ic/outline-chevron-left";
  import iconRight from "@iconify-icons/ic/outline-chevron-right";
  import iconDown from "@iconify-icons/ic/outline-arrow-drop-down";

  export let currentView: "calendar" | "year" | "month", focusedMonth: number, focusedYear: number;
  export let startYear: number, endYear: number;
  const yearClick = () => (currentView = currentView == "calendar" ? "year" : "calendar");
  const monthClick = () => (currentView = currentView == "calendar" ? "month" : "calendar");
  const getShortMonth = (month: number) =>
    new Date(0, month).toLocaleDateString(undefined, { month: "short" });
</script>

<div class="m3-container" class:choosing={currentView != "calendar"}>
  <div>
    <button class="mover" on:click={() => (focusedMonth = (focusedMonth - 1 + 12) % 12)}>
      <Icon icon={iconLeft} />
    </button>
    <button class="chooser md-label-large" on:click={monthClick} disabled={currentView == "year"}>
      {getShortMonth(focusedMonth)}
      <Icon icon={iconDown} />
    </button>
    <button class="mover" on:click={() => (focusedMonth = (focusedMonth + 1) % 12)}>
      <Icon icon={iconRight} />
    </button>
  </div>
  <div>
    <button class="mover" disabled={focusedYear <= startYear} on:click={() => focusedYear--}>
      <Icon icon={iconLeft} />
    </button>
    <button class="chooser md-label-large" on:click={yearClick} disabled={currentView == "month"}>
      {focusedYear}
      <Icon icon={iconDown} />
    </button>
    <button class="mover" disabled={focusedYear >= endYear} on:click={() => focusedYear++}>
      <Icon icon={iconRight} />
    </button>
  </div>
</div>

<style>
  .m3-container {
    display: flex;
    height: 4rem;
    transition: all 200ms;
    border-bottom: solid 1px transparent;
    flex-shrink: 0;
  }
  .m3-container > div {
    display: flex;
    flex: 1;
  }
  .choosing {
    border-color: rgb(var(--md-sys-color-outline-variant));
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: rgb(var(--md-sys-color-on-surface-variant));
    border: none;
    padding: 0;
    transition: all 200ms;
    cursor: pointer;
  }
  button:enabled:hover {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.08);
  }
  button:enabled:is(:focus-visible, :active) {
    background-color: rgb(var(--md-sys-color-on-surface-variant) / 0.12);
  }
  button:disabled {
    cursor: auto;
    color: rgb(var(--md-sys-color-on-surface-variant) / 0.38);
  }

  .chooser {
    flex-grow: 1;
  }
  .chooser :global(svg) {
    width: 18px;
    height: 18px;
    margin-right: -0.25rem;
    margin-left: 0.5rem;
  }
  .mover {
    width: 3rem;
  }
  .mover :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }
  .choosing .mover {
    opacity: 0;
    width: 0;
  }
</style>
