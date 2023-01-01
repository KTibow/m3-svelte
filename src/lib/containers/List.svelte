<script lang="ts">
  import Divider from "$lib/misc/Divider.svelte";
  import Checkbox from "$lib/forms/Checkbox.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Icon, { type IconifyIcon } from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  interface Item {
    headline: string;
    desc?: string;
    tapAction?: boolean;
    leading?:
      | { type: "icon"; content: IconifyIcon }
      | { type: "avatar"; content: string }
      | { type: "photo"; content: string };
    trailing?:
      | { type: "text"; content: string }
      | { type: "icon"; content: IconifyIcon }
      | { type: "checkbox"; checked?: boolean }
      | { type: "switch"; checked?: boolean };
  }
  export let display = "flex";
  export let items: Item[];
  export let divider: "full" | "inset" | null = null;
  export let lines: 1 | 2 | 3;
  const dispatch = createEventDispatcher();
  const isItemTogglable = (item: Item) =>
    item.trailing && ["checkbox", "switch"].includes(item.trailing.type);
  /*
  the list docs are crazy
  i dont have any fancy touch gestures, like swiping for actions,
  dragging around, holding/hovering to select, or expanding items
  you need to bind: items in order to access checked
  you need to set tapAction: true to get a chosen event
  */
</script>

<div class="m3-container lines-{lines}" style="display: {display};">
  {#each items as item, i}
    {@const clickAction = item.tapAction && (() => dispatch("chosen", item))}
    {#if divider && i != 0}
      <Divider
        inset={divider == "full" ? "none" : "list-inset"}
        verticalSpace={false}
        color="surface"
      />
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <svelte:element
      this={item.tapAction ? "button" : isItemTogglable(item) ? "label" : "div"}
      on:click={clickAction || null}
      class="item"
    >
      {#if item.leading?.type == "icon"}
        <Icon icon={item.leading.content} />
      {:else if item.leading?.type == "avatar"}
        <img
          class="avatar"
          src={item.leading.content}
          alt="Avatar for the list item {item.headline}"
          width="40"
          height="40"
        />
      {:else if item.leading?.type == "photo"}
        <img
          class="photo"
          src={item.leading.content}
          alt="Photo for the list item {item.headline}"
          width="40"
          height="40"
        />
      {/if}
      <div class="body">
        <p class="headline md-body-large">{item.headline}</p>
        {#if item.desc}
          <p class="desc md-body-medium">{item.desc}</p>
        {/if}
      </div>
      {#if item.trailing?.type == "text"}
        <span class="trailing md-label-small">{item.trailing.content}</span>
      {:else if item.trailing?.type == "icon"}
        <span class="trailing"><Icon icon={item.trailing.content} /></span>
      {:else if item.trailing?.type == "checkbox"}
        <span class="trailing">
          <Checkbox bind:checked={item.trailing.checked} />
        </span>
      {:else if item.trailing?.type == "switch"}
        <span class="trailing">
          <Switch bind:checked={item.trailing.checked} />
        </span>
      {/if}
    </svelte:element>
  {/each}
</div>

<style>
  .m3-container {
    flex-direction: column;
    background-color: rgb(var(--md-sys-color-surface));
    padding: 0.5rem 0;
  }
  .item {
    display: flex;
    gap: 1rem;
    padding: 0.5rem 1.5rem 0.5rem 1rem;
    transition: all 150ms;
  }
  button {
    border: none;
    background-color: transparent;
    margin: 0;
    text-align: left;
  }
  .lines-1 > .item {
    height: 3.5rem;
  }
  .lines-2 > .item {
    height: 4.5rem;
  }
  .lines-3 > .item {
    height: 5.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .item:is(button, label) {
    cursor: pointer;
  }
  .item:is(button, label):hover {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.08);
  }
  .item:is(button, label):focus-visible,
  .item:is(button, label):active {
    background-color: rgb(var(--md-sys-color-on-surface) / 0.12);
  }

  :is(.item, .trailing) > :global(svg) {
    align-self: center;
    color: rgb(var(--md-sys-color-on-surface-variant));
    width: 1.5rem;
    height: 1.5rem;
  }
  .lines-3 > .item > :global(svg) {
    align-self: flex-start;
  }
  .avatar {
    align-self: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
  }
  .photo {
    align-self: center;
    width: auto;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
  .lines-3 :is(.avatar, .photo) {
    align-self: flex-start;
  }

  .body {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: auto 0;
    overflow: hidden;
  }
  .lines-3 .body {
    justify-content: start;
  }
  .body > * {
    margin: 0;
  }
  .headline {
    color: rgb(var(--md-sys-color-on-surface));
  }
  .desc {
    color: rgb(var(--md-sys-color-on-surface-variant));
  }
  :is(.lines-1, .lines-2) :is(.headline, .desc) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .trailing {
    display: inline-flex;
    color: rgb(var(--md-sys-color-on-surface-variant));
    align-self: center;
  }
  .lines-3 .trailing {
    align-self: flex-start;
  }
</style>
