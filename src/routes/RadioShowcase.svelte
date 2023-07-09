<script>
  import RadioAnim1 from "$lib/forms/RadioAnim1.svelte";
  import RadioAnim2 from "$lib/forms/RadioAnim2.svelte";
  import RadioAnim3 from "$lib/forms/RadioAnim3.svelte";

  let animationName = "1";
  $: animationComponent =
    animationName == "1" ? RadioAnim1 : animationName == "2" ? RadioAnim2 : RadioAnim3;
</script>

<div class="container">
  <p>Choose here</p>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-a" value="1" checked bind:group={animationName} />
    </svelte:component>
    Animation 1
  </label>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-a" value="2" bind:group={animationName} />
    </svelte:component>
    Animation 2
  </label>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-a" value="3" bind:group={animationName} />
    </svelte:component>
    Animation 3
  </label>
</div>
<div class="container">
  <p>Test here</p>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-b" value="1" checked />
    </svelte:component>
    Option 1
  </label>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-b" value="2" />
    </svelte:component>
    Option 2
  </label>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-b" value="3" />
    </svelte:component>
    Option 3
  </label>
  <label>
    <svelte:component this={animationComponent}>
      <input type="radio" name="radio-b" value="4" disabled />
    </svelte:component>
    Option 4
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
