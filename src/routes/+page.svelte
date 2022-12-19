<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import SegmentedButton, { type ButtonData } from "$lib/buttons/SegmentedButton.svelte";
  import FAB from "$lib/buttons/FAB.svelte";

  import LinearProgress from "$lib/forms/LinearProgress.svelte";
  import CircularProgress from "$lib/forms/CircularProgress.svelte";
  import Radio from "$lib/forms/Radio.svelte";
  import Slider from "$lib/forms/Slider.svelte";
  import Chip from "$lib/forms/Chip.svelte";

  import Card from "$lib/containers/Card.svelte";

  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import iconTriangle from "@iconify-icons/ic/outline-change-history";
  import iconSquare from "@iconify-icons/ic/outline-square";
  import iconCircle from "@iconify-icons/ic/outline-circle";
  let chosen1: ButtonData[] = [];
  let chosen2: ButtonData[] = [];
  let chosen3 = "o1";
  let chosen4 = 60;
</script>

<svelte:head>
  <title>M3 Svelte</title>
</svelte:head>
<h1 class="md-display-large">M3 Svelte</h1>
<p>A project by KTibow. See the GitHub for code examples.</p>
<h2 class="md-headline-small">Button-related components</h2>
<div class="container">
  <div>
    <p>Elevated</p>
    <Button type="elevated" on:click={() => alert("Pressed")}>Enabled</Button>
    <Button type="elevated" disabled>Disabled</Button>
  </div>
  <div>
    <p>Filled</p>
    <Button type="filled" on:click={() => alert("Pressed")}>Enabled</Button>
    <Button type="filled" disabled>Disabled</Button>
  </div>
  <div>
    <p>Tonal</p>
    <Button type="tonal" on:click={() => alert("Pressed")}>Enabled</Button>
    <Button type="tonal" disabled>Disabled</Button>
  </div>
  <div>
    <p>Outlined</p>
    <Button type="outlined" on:click={() => alert("Pressed")}>Enabled</Button>
    <Button type="outlined" disabled>Disabled</Button>
  </div>
  <div>
    <p>Text</p>
    <Button type="text" on:click={() => alert("Pressed")}>Enabled</Button>
    <Button type="text" disabled>Disabled</Button>
  </div>
  <div>
    <p>Icon</p>
    <Button type="filled" on:click={() => alert("Pressed")}>
      <Icon icon={iconEdit} style="height: 18px; width: 18px;" /> Filled
    </Button>
    <Button type="text" on:click={() => alert("Pressed")}>
      <Icon icon={iconEdit} style="height: 18px; width: 18px;" />
    </Button>
  </div>
  <div>
    <p>Segmented Chooser</p>
    <SegmentedButton
      options={[{ label: "$" }, { label: "$$" }, { label: "$$$" }, { label: "$$$$" }]}
      bind:chosenOptions={chosen1}
    />
    <p>Chose {chosen1.map((o) => o.label)}</p>
    <SegmentedButton
      options={[
        { label: "Tab A", icon: iconTriangle },
        { label: "Tab B", icon: iconSquare },
        { label: "Tab C", icon: iconCircle },
      ]}
      maxOptions={1}
      bind:chosenOptions={chosen2}
    />
    <p>Chose {chosen2.map((o) => o.label)}</p>
  </div>
  <div>
    <p>Floating</p>
    <div class="container">
      <FAB icon={iconEdit} on:click={() => alert("Pressed")} size="small" />
      <FAB icon={iconEdit} on:click={() => alert("Pressed")} size="normal" color="surface" />
      <FAB icon={iconEdit} on:click={() => alert("Pressed")} size="large" color="secondary" />
      <FAB text="extended fab" on:click={() => alert("Pressed")} color="tertiary" />
      <FAB icon={iconEdit} text="extended fab" on:click={() => alert("Pressed")} />
    </div>
  </div>
</div>

<h2 class="md-headline-small">Form-related components</h2>
<div class="container">
  <div>
    <p>Progress</p>
    <LinearProgress percent={60} />
    <LinearProgress />
    <CircularProgress percent={60} />
    <CircularProgress />
  </div>
  <div>
    <p>Radio</p>
    <p>Chose {chosen3}</p>
    <p>
      <label for={undefined}><Radio name="r1" value="o1" bind:group={chosen3} /> Option 1</label>
    </p>
    <p>
      <label for={undefined}><Radio name="r1" value="o2" bind:group={chosen3} /> Option 2</label>
    </p>
    <p>
      <label for={undefined}><Radio name="r1" value="o3" bind:group={chosen3} /> Option 3</label>
    </p>
    <p>
      <label for={undefined}>
        <Radio name="r1" value="o4" bind:group={chosen3} disabled /> Option 4
      </label>
    </p>
  </div>
  <div>
    <p>Slider</p>
    <p>Chose {chosen4}</p>
    <Slider bind:value={chosen4} />
  </div>
  <div class="container">
    <p>Chip(s)</p>
    <Chip text="Assist w/ action" type="assist" />
    <Chip text="Filter" type="input" icon={iconEdit} selected />
  </div>
</div>
<h2 class="md-headline-small">Containers</h2>
<div class="container">
  <div>
    <p>Card</p>
    <Card type="elevated" clickable>Text</Card>
    <Card type="filled" clickable>Text</Card>
    <Card type="outlined" clickable>Text</Card>
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  label {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
