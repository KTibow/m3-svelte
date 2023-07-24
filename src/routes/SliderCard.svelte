<script lang="ts">
  import Card from "$lib/containers/Card.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import Slider from "$lib/forms/Slider.svelte";
  import Arrows from "./Arrows.svelte";
  import SliderTicks from "$lib/forms/SliderTicks.svelte";

  let precision = "continuous";
  let enabled = true;
  let value = 0;
</script>

<Card type="elevated">
  <h2 class="m3-font-headline-large">Slider</h2>
  <table>
    <tr>
      <td>
        <Arrows list={["continuous", "discrete", "discrete-ticks"]} bind:value={precision} />
      </td>
      <td>
        {precision == "continuous"
          ? "Continuous"
          : precision == "discrete"
          ? "Discrete"
          : "Discrete (ticks)"}
      </td>
    </tr>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={enabled} /></label>
      </td>
      <td>{enabled ? "Enabled" : "Disabled"}</td>
    </tr>
  </table>
  <div class="area">
    {#if precision == "discrete-ticks"}
      <SliderTicks step={1} max={6} disabled={!enabled} bind:value />
    {:else}
      <Slider step={precision == "continuous" ? "any" : 10} disabled={!enabled} bind:value />
    {/if}
  </div>
</Card>

<style>
  .area {
    margin: auto -1rem -1rem -1rem;
    padding: 1rem;
    border-top: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
  }
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  label {
    display: flex;
  }
  table {
    margin-bottom: 1rem;
  }
  td + td {
    border-left: solid 0.5rem transparent;
    width: 100%;
  }
</style>
