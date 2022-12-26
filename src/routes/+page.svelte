<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import SegmentedButton from "$lib/buttons/SegmentedButton.svelte";

  import Card from "$lib/containers/Card.svelte";

  import Checkbox from "$lib/forms/Checkbox.svelte";
  import Chip from "$lib/forms/Chip.svelte";
  import CircularProgress from "$lib/forms/CircularProgress.svelte";
  import LinearProgress from "$lib/forms/LinearProgress.svelte";
  import Radio from "$lib/forms/Radio.svelte";
  import Slider from "$lib/forms/Slider.svelte";
  import Switch from "$lib/forms/Switch.svelte";
  import TextField from "$lib/forms/TextField.svelte";

  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/ic/outline-edit";
  import iconTriangle from "@iconify-icons/ic/outline-change-history";
  import iconSquare from "@iconify-icons/ic/outline-square";
  import iconCircle from "@iconify-icons/ic/outline-circle";
  import iconX from "@iconify-icons/ic/outline-close";
  let chosen1: number[] = [];
  let chosen2: number[] = [];
  let chosen3 = "o1";
  let chosen4 = false;
  let chosen5 = false;
  let chosen6 = 60;
  let chosen7 = "";
  let chosen8 = "";
</script>

<svelte:head>
  <title>M3 Svelte</title>
</svelte:head>
<h1 class="md-display-large">M3 Svelte</h1>
<p>A project by KTibow. See the GitHub for code examples.</p>
<h2 class="md-headline-medium">Button-related components</h2>
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
    <p>Link</p>
    <Button type="outlined" href="https://google.com" target="_blank">Enabled</Button>
  </div>
  <div>
    <p>Icon</p>
    <Button type="filled" on:click={() => alert("Pressed")} iconType="left">
      <Icon icon={iconEdit} style="height: 18px; width: 18px;" /> Filled
    </Button>
    <Button type="text" on:click={() => alert("Pressed")} iconType="full">
      <Icon icon={iconEdit} style="height: 24px; width: 24px;" />
    </Button>
  </div>
  <div>
    <p>Segmented Chooser</p>
    <SegmentedButton
      options={[
        { label: "$" },
        { label: "$$" },
        { label: "$$$" },
        { label: "$$$$", disabled: true },
      ]}
      bind:chosenOptions={chosen1}
    />
    <p>Chose {chosen1}</p>
    <SegmentedButton
      options={[
        { label: "Tab A", icon: iconTriangle },
        { label: "Tab B", icon: iconSquare },
        { label: "Tab C", icon: iconCircle },
      ]}
      multiSelect={false}
      bind:chosenOptions={chosen2}
    />
    <p>Chose {chosen2}</p>
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

<h2 class="md-headline-medium">Form-related components</h2>
<div class="container">
  <div>
    <p>Progress</p>
    <LinearProgress percent={60} />
    <LinearProgress />
    <CircularProgress percent={60} />
    <CircularProgress />
  </div>
  <div>
    <p>Radio, checkbox, switch</p>
    <p>Chose {chosen3}</p>
    <label for={undefined}><Radio name="r1" value="o1" bind:group={chosen3} /> Option 1</label>
    <label for={undefined}><Radio name="r1" value="o2" bind:group={chosen3} /> Option 2</label>
    <p>Chose {chosen4}</p>
    <label for={undefined}><Checkbox bind:checked={chosen4} /> Option 1</label>
    <p>Chose {chosen5}</p>
    <label for={undefined}><Switch bind:checked={chosen5} /> Option 1</label>
  </div>
  <div>
    <p>Slider</p>
    <p>Chose {chosen6}</p>
    <Slider bind:value={chosen6} />
    <Slider bind:value={chosen6} step={10} accuracy="ticks" />
  </div>
  <div class="container">
    <p>Chip(s)</p>
    <Chip type="assist" on:click={() => alert("Pressed")} icon={iconEdit}>Assist</Chip>
    <Chip type="filter" on:click={() => alert("Pressed")} icon={iconEdit} selected>Filter</Chip>
    <Chip
      type="input"
      on:click={() => alert("Pressed")}
      icon={iconEdit}
      selected
      trailingIcon={iconX}
    >
      Input
    </Chip>
    <Chip type="suggestion" on:click={() => alert("Pressed")}>Suggestion</Chip>
  </div>
  <div class="container col">
    <p>Text field</p>
    <p>Chose {chosen7}, {chosen8}</p>
    <TextField type="filled" name="Option" icon={iconTriangle} bind:value={chosen7} />
    <TextField type="outlined" name="Other option" icon={iconTriangle} bind:value={chosen8} />
  </div>
</div>
<h2 class="md-headline-medium">Containers</h2>
<div class="container">
  <div class="container">
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
  .col {
    flex-direction: column;
  }
  label {
    display: flex;
    gap: 0.5rem;
    margin: 0.5rem 0;
    align-items: center;
  }
</style>
