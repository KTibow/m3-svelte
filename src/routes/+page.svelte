<script>
  import Button from "$lib/buttons/Button.svelte";
  import SegmentedButton from "$lib/buttons/SegmentedButton.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import LinearProgress from "$lib/forms/LinearProgress.svelte";
  import CircularProgress from "$lib/forms/CircularProgress.svelte";
  import Icon from "@iconify/svelte";
  import iconEdit from "@iconify-icons/mdi/edit";
  import iconTriangle from "@iconify-icons/mdi/triangle";
  import iconSquare from "@iconify-icons/mdi/square";
  import iconCircle from "@iconify-icons/mdi/circle";
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
    <Button type="elevated">Enabled</Button>
    <Button type="elevated" disabled>Disabled</Button>
  </div>
  <div>
    <p>Filled</p>
    <Button type="filled">Enabled</Button>
    <Button type="filled" disabled>Disabled</Button>
  </div>
  <div>
    <p>Tonal</p>
    <Button type="tonal">Enabled</Button>
    <Button type="tonal" disabled>Disabled</Button>
  </div>
  <div>
    <p>Outlined</p>
    <Button type="outlined">Enabled</Button>
    <Button type="outlined" disabled>Disabled</Button>
  </div>
  <div>
    <p>Text</p>
    <Button type="text">Enabled</Button>
    <Button type="text" disabled>Disabled</Button>
  </div>
  <div>
    <p>Icon</p>
    <Button type="filled"><Icon icon={iconEdit} style="height: 18px; width: 18px;" />Filled</Button>
    <Button type="text"><Icon icon={iconEdit} style="height: 18px; width: 18px;" /></Button>
  </div>
  <div>
    <p>Chooser</p>
    <SegmentedButton
      options={[{ label: "$" }, { label: "$$" }, { label: "$$$" }, { label: "$$$$" }]}
    />
    <SegmentedButton
      options={[
        { label: "Tab A", icon: iconTriangle },
        { label: "Tab B", icon: iconSquare },
        { label: "Tab C", icon: iconCircle },
      ]}
      maxOptions="1"
    />
  </div>
  <div>
    <p>Floating</p>
    <div class="container">
      <FAB icon={iconEdit} size="small" />
      <FAB icon={iconEdit} size="normal" color="surface" />
      <FAB icon={iconEdit} size="large" color="secondary" />
      <FAB text="extended fab" color="tertiary" />
      <FAB icon={iconEdit} text="extended fab" />
    </div>
  </div>
</div>

<h2 class="md-headline-small">Form-related components</h2>
<div class="container">
  <div>
    <p>Progress</p>
    <LinearProgress percent="60" />
    <LinearProgress />
    <CircularProgress percent="60" />
    <CircularProgress />
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
</style>
