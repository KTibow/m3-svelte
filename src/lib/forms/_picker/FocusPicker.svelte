<script lang="ts">
  import Icon from "$lib/misc/Icon.svelte";
  import iconCheck from "@ktibow/iconset-material-symbols/check";

  const conditionalScroll = (node: Element, shouldScroll: boolean) => {
    if (shouldScroll) node.scrollIntoView({ block: "nearest" });
  };

  let {
    options,
  }: {
    options: { name: string; selected: boolean; activate: () => void }[];
  } = $props();
</script>

<div class="m3-container">
  {#each options as { name, selected, activate }}
    <button type="button" class="m3-layer" onclick={activate} use:conditionalScroll={selected}>
      {#if selected}
        <Icon icon={iconCheck} />
      {/if}
      {name}
    </button>
  {/each}
</div>

<style>
  .m3-container {
    display: flex;
    flex-direction: column;
    flex: 1 0;
    overflow: auto;
    margin-bottom: 1.25rem;
  }
  button {
    @apply --m3-body-large;
    display: inline-flex;
    align-items: center;
    height: 3rem;
    padding-left: 3.5rem;
    flex-shrink: 0;

    background-color: transparent;
    color: var(--m3c-on-surface);
    border: none;
    cursor: pointer;
  }
  button > :global(svg) {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 1rem;
    top: 50%;
    translate: 0 -50%;
  }
</style>
