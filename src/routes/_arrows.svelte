<script lang="ts">
  let {
    list,
    value = $bindable(),
    initialIndex = 0,
  }: {
    list: string[];
    value?: string;
    initialIndex?: number;
  } = $props();

  let index = $state(initialIndex);
  $effect(() => {
    value = list[index];
  });

  const left = () => {
    index = (index == 0 ? list.length : index) - 1;
  };
  const right = () => {
    index = (index + 1 == list.length ? -1 : index) + 1;
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="container"
  onkeydown={({ key }) => {
    if (key == "ArrowLeft") left();
    if (key == "ArrowRight") right();
  }}
>
  <button class="left" onclick={left}>&lt;</button>
  <button class="right" onclick={right}>&gt;</button>
</div>

<style>
  .container {
    display: flex;
    gap: 0.25rem;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  button {
    @apply --m3-label-large;
    flex: 1;
    font-size: 1rem;
    min-width: 1.5rem;
    height: 2rem;
    padding: 0;

    border: none;
    background-color: var(--m3c-primary);
    color: var(--m3c-on-primary);
    cursor: pointer;
  }
  button.left {
    border-radius: 0.75rem 0.25rem 0.25rem 0.75rem;
  }
  button.right {
    border-radius: 0.25rem 0.75rem 0.75rem 0.25rem;
  }
</style>
