<script>
  import Checkbox from "$lib/forms/Checkbox.svelte";
  import CheckboxAnim from "$lib/forms/CheckboxAnim.svelte";

  let animations = true;
  $: component = animations ? CheckboxAnim : Checkbox;
</script>

<div class="container">
  <p>Choose here</p>
  <label>
    <svelte:component this={component}>
      <input type="checkbox" bind:checked={animations} />
    </svelte:component>
    Animation
  </label>
</div>
<div class="container">
  <p>Test here</p>
  <label>
    <svelte:component this={component}>
      <input type="checkbox" />
    </svelte:component>
    Option 1
  </label>
  <label>
    <svelte:component this={component}>
      <input type="checkbox" disabled />
    </svelte:component>
    Option 2
  </label>
  <label>
    <svelte:component this={component}>
      <input type="checkbox" disabled checked />
    </svelte:component>
    Option 3
  </label>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
