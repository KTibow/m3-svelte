<script>
  import SegmentedButtonContainer from "$lib/buttons/SegmentedButtonContainer.svelte";
  import SegmentedButtonItem from "$lib/buttons/SegmentedButtonItem.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import iconTriangle from "@ktibow/iconset-material-symbols/change-history-outline";
  import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
  import iconSquare from "@ktibow/iconset-material-symbols/square-outline";
  import Card from "./_card.svelte";
  let multiSelect = false;
</script>

<Card
  title="Segmented button"
  code={`<SegmentedButtonContainer>
  <input type="checkbox" id="segmented-0" />
  <SegmentedButtonItem input="segmented-0">Tab A</SegmentedButtonItem>
  <input type="checkbox" id="segmented-1" />
  <SegmentedButtonItem input="segmented-1">Tab B</SegmentedButtonItem>
</SegmentedButtonContainer>
<SegmentedButtonContainer>
  <input type="radio" id="segmented-0" />
  <SegmentedButtonItem input="segmented-0">Tab A</SegmentedButtonItem>
  <input type="radio" id="segmented-1" />
  <SegmentedButtonItem input="segmented-1">Tab B</SegmentedButtonItem>
</SegmentedButtonContainer>`}
>
  <table>
    <tr>
      <td>
        <label for={undefined}><Switch bind:checked={multiSelect} /></label>
      </td>
      <td>{multiSelect ? "Multi-select" : "Single-select"}</td>
    </tr>
  </table>
  <div slot="demo">
    {#if multiSelect}
      <SegmentedButtonContainer>
        <input type="checkbox" id="segmented-a-0" />
        <SegmentedButtonItem input="segmented-a-0" icon={iconTriangle}>Tab A</SegmentedButtonItem>
        <input type="checkbox" id="segmented-a-1" />
        <SegmentedButtonItem input="segmented-a-1" icon={iconSquare}>Tab B</SegmentedButtonItem>
        <input type="checkbox" id="segmented-a-2" disabled />
        <SegmentedButtonItem input="segmented-a-2" icon={iconCircle}>Tab C</SegmentedButtonItem>
      </SegmentedButtonContainer>
    {:else}
      <SegmentedButtonContainer>
        <input type="radio" name="segmented-b" id="segmented-b-0" checked />
        <SegmentedButtonItem input="segmented-b-0" icon={iconTriangle}>Tab A</SegmentedButtonItem>
        <input type="radio" name="segmented-b" id="segmented-b-1" />
        <SegmentedButtonItem input="segmented-b-1" icon={iconSquare}>Tab B</SegmentedButtonItem>
        <input type="radio" name="segmented-b" id="segmented-b-2" disabled />
        <SegmentedButtonItem input="segmented-b-2" icon={iconCircle}>Tab C</SegmentedButtonItem>
      </SegmentedButtonContainer>
    {/if}
  </div>
</Card>

<style>
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
