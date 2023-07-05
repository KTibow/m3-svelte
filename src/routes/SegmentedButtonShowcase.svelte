<script>
  import iconTriangle from "@iconify-icons/ic/outline-change-history";
  import iconSquare from "@iconify-icons/ic/outline-square";
  import iconCircle from "@iconify-icons/ic/outline-circle";
  import SegmentedButtonContainer from "$lib/buttons/SegmentedButtonContainer.svelte";
  import SegmentedButtonItem from "$lib/buttons/SegmentedButtonItem.svelte";
</script>

<SegmentedButtonContainer>
  <input type="checkbox" id="segmented-a-0" />
  <SegmentedButtonItem input="segmented-a-0" label="$" />
  <input type="checkbox" id="segmented-a-1" />
  <SegmentedButtonItem input="segmented-a-1" label="$$" />
  <input type="checkbox" id="segmented-a-2" disabled />
  <SegmentedButtonItem input="segmented-a-2" label="Disabled" />
</SegmentedButtonContainer>
<SegmentedButtonContainer>
  <input type="radio" name="segmented-b" id="segmented-b-0" checked />
  <SegmentedButtonItem input="segmented-b-0" icon={iconTriangle} label="Tab A" />
  <input type="radio" name="segmented-b" id="segmented-b-1" />
  <SegmentedButtonItem input="segmented-b-1" icon={iconSquare} label="Tab B" />
  <input type="radio" name="segmented-b" id="segmented-b-2" />
  <SegmentedButtonItem input="segmented-b-2" icon={iconCircle} label="Tab C" />
</SegmentedButtonContainer>
