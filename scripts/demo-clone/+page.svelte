<script lang="ts">
  import { Icon } from "m3-svelte";
  import iconInfo from "@ktibow/iconset-material-symbols/info";
  import iconSpecs from "@ktibow/iconset-material-symbols/rule";
  import iconGuidelines from "@ktibow/iconset-material-symbols/lightbulb";
  import iconAccessibility from "@ktibow/iconset-material-symbols/accessibility";

  let currentTab = "overview";
  const tabs = [
    { icon: iconInfo, label: "Overview", id: "overview" },
    { icon: iconSpecs, label: "Specs", id: "specs" },
    { icon: iconGuidelines, label: "Guidelines", id: "guidelines" },
    { icon: iconAccessibility, label: "Accessibility", id: "accessibility" },
  ];
</script>

<div class="header">
  <div class="info">
    <h1>Lists</h1>
    <p>Lists are continuous, vertical indexes of text and images</p>
  </div>
  <img
    src="https://picsum.photos/id/12/1000/562"
    alt="A list in a recipe app"
    class="preview-image"
  />
</div>

<div class="tabs">
  {#each tabs as tab}
    <button disabled={currentTab == tab.id} onclick={() => (currentTab = tab.id)}>
      <Icon icon={tab.icon} size={24} />
      {tab.label}
    </button>
  {/each}
</div>

<article>
  {Array.from({ length: 200 }, () => "Lorem ipsum.").join(" ")}
</article>

<style>
  .header {
    display: flex;
    gap: 0.5rem;

    > * {
      border-radius: var(--m3-shape-large);
      min-width: 0;
      flex: 1;
    }
    > .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: var(--m3c-surface-container);
      padding: 2rem;

      > * {
        margin: 0;
      }
      > h1 {
        @apply --m3-display-large;
      }
      > p {
        @apply --m3-title-large;
      }
    }
  }

  .tabs {
    display: flex;
    flex-direction: column;
    background-color: var(--m3c-surface-container);
    border-radius: 3rem;
    margin-top: 0.5rem;
    flex-shrink: 0;

    @media (width >= 37.5rem) {
      flex-direction: row;

      > * {
        flex: 1;
      }
    }

    > * {
      @apply --m3-title-medium;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      padding: 0;
      border: none;
      height: 6rem;
      border-radius: inherit;
      background-color: inherit;
      color: inherit;
      flex-shrink: 0;

      transition: 200ms;
      cursor: pointer;

      &:disabled {
        background-color: var(--m3c-secondary-container);
        color: var(--m3c-on-surface-container);
      }
    }
  }
</style>
