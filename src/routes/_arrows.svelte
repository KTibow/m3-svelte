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

<div class="container">
  <button class="m3-font-label-large left" onclick={left}>&lt;</button>
  <button class="m3-font-label-large right" onclick={right}>&gt;</button>
</div>

<style>
  .container {
    display: flex;
    gap: 0.25rem;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  button {
    flex: 1;
    font-size: 1rem;
    min-width: 1.5rem;
    height: 2rem;
    padding: 0;

    border: none;
    background-color: rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-on-primary));
    cursor: pointer;
  }
  button.left {
    border-radius: 0.75rem 0.25rem 0.25rem 0.75rem;
  }
  button.right {
    border-radius: 0.25rem 0.75rem 0.75rem 0.25rem;
  }
</style>
