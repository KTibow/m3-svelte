<script lang="ts">
  export let list: string[];
  export let value: string;
  export let index = 0;
  $: value = list[index];
  const left = () => {
    index = (index == 0 ? list.length : index) - 1;
  };
  const right = () => {
    index = (index + 1 == list.length ? -1 : index) + 1;
  };
</script>

<div class="container">
  <button class="m3-font-label-large" on:click={left}>&lt;</button>
  <button class="m3-font-label-large" on:click={right}>&gt;</button>
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
    padding: 0;
    min-width: 1.5rem;
    height: 2rem;
    border: none;
    background-color: rgb(var(--m3-scheme-primary));
    color: rgb(var(--m3-scheme-on-primary));
    border-radius: 0.5rem;
    cursor: pointer;
  }
</style>
