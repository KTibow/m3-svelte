<script lang="ts">
  import Icon from "$lib/misc/_icon.svelte";
  import iconLeft from "@ktibow/iconset-material-symbols/chevron-left";
  import iconRight from "@ktibow/iconset-material-symbols/chevron-right";
  import iconDown from "@ktibow/iconset-material-symbols/arrow-drop-down";
  import Layer from "$lib/misc/Layer.svelte";

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
</script>

<div class="m3-container" class:choosing={currentView != "calendar"}>
  <div>
    <button
      type="button"
      class="arrow"
      onclick={() => (focusedMonth = (focusedMonth - 1 + 12) % 12)}
    >
      <Layer />
      <Icon icon={iconLeft} />
    </button>
    <button
      type="button"
      class="chooser m3-font-label-large"
      onclick={monthClick}
      disabled={currentView == "year"}
    >
      <Layer />
      {getShortMonth(focusedMonth)}
      <Icon icon={iconDown} />
    </button>
    <button type="button" class="arrow" onclick={() => (focusedMonth = (focusedMonth + 1) % 12)}>
      <Layer />
      <Icon icon={iconRight} />
    </button>
  </div>
  <div>
    <button
      type="button"
      class="arrow"
      disabled={focusedYear <= startYear}
      onclick={() => focusedYear--}
    >
      <Layer />
      <Icon icon={iconLeft} />
    </button>
    <button
      type="button"
      class="chooser m3-font-label-large"
      onclick={yearClick}
      disabled={currentView == "month"}
    >
      <Layer />
      {focusedYear}
      <Icon icon={iconDown} />
    </button>
    <button
      type="button"
      class="arrow"
      disabled={focusedYear >= endYear}
      onclick={() => focusedYear++}
    >
      <Layer />
      <Icon icon={iconRight} />
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
    color: rgb(var(--m3-scheme-on-surface-variant));
    border: none;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    position: relative;
  }
  button:disabled {
    cursor: auto;
    color: rgb(var(--m3-scheme-on-surface-variant) / 0.38);
  }

  .chooser {
    flex-grow: 1;
  }
  .chooser :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
    margin-right: -0.25rem;
    margin-left: 0.5rem;
  }
  .arrow {
    width: 3rem;
  }
  .arrow :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
  }

  .choosing {
    border-color: rgb(var(--m3-scheme-outline-variant));
  }
  .choosing .arrow {
    opacity: 0;
    width: 0;
  }
</style>
