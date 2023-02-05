<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import FAB from "$lib/buttons/FAB.svelte";
  import SegmentedButton from "$lib/buttons/SegmentedButton.svelte";

  import BottomSheet from "$lib/containers/BottomSheet.svelte";
  import Card from "$lib/containers/Card.svelte";
  import Dialog from "$lib/containers/Dialog.svelte";
  import List from "$lib/containers/List.svelte";
  import Snackbar from "$lib/containers/Snackbar.svelte";

  import Tabs from "$lib/nav/Tabs.svelte";
  import Divider from "$lib/misc/Divider.svelte";
  import DateFieldAndPicker from "$lib/utils/DateFieldAndPicker.svelte";
  import SnackbarPlacer from "$lib/utils/SnackbarPlacer.svelte";

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

  let showProgress = false;
  let chosen3 = "o1";
  let chosen4 = false;
  let chosen5 = false;
  let chosen6 = 60;
  let chosen7 = "";
  let chosen8 = "";
  let chosen14 = "";
  let chosen12 = "";

  let chosen9 = false;
  let chosen10 = false;
  let chosen11 = 0;
  let chosen13 = false;
</script>

<svelte:head>
  <title>M3 Svelte</title>
  <meta name="description" content="The home of M3 Svelte, with many components from Material 3." />
</svelte:head>
<h1 class="m3-font-display-large">M3 Svelte</h1>
<p>A project by KTibow. See the GitHub for code examples.</p>
<Divider />
<h2 class="m3-font-headline-medium">Button-related components</h2>
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
    <Button type="outlined" href="https://google.com" extraOptions={{ target: "_blank" }}>
      Enabled
    </Button>
  </div>
  <div>
    <p>Icon</p>
    <Button type="filled" on:click={() => alert("Pressed")} iconType="left">
      <Icon icon={iconEdit} /> Filled
    </Button>
    <Button type="text" on:click={() => alert("Pressed")} iconType="full">
      <Icon icon={iconEdit} />
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

<h2 class="m3-font-headline-medium">Form-related components</h2>
<div class="container">
  <div>
    <p>Progress</p>
    {#if showProgress}
      <LinearProgress percent={60} />
      <LinearProgress />
      <CircularProgress percent={60} />
      <CircularProgress />
    {:else}
      <Button type="outlined" on:click={() => (showProgress = true)}>
        Show progress indicators
      </Button>
    {/if}
  </div>
  <div>
    <p>Radio, checkbox, switch</p>
    <p>Chose {chosen3}</p>
    <label for={undefined}><Radio name="r1" value="o1" bind:group={chosen3} /> Option 1</label>
    <label for={undefined}><Radio name="r1" value="o2" bind:group={chosen3} /> Option 2</label>
    <label for={undefined}>
      <Radio name="r1" value="o3" bind:group={chosen3} disabled /> Option 3
    </label>
    <p>Chose {chosen4}</p>
    <label for={undefined}><Checkbox bind:checked={chosen4} /> Option 1</label>
    <label for={undefined}><Checkbox bind:checked={chosen4} disabled /> Option 1</label>
    <p>Chose {chosen5}</p>
    <label for={undefined}><Switch bind:checked={chosen5} /> Option 1</label>
    <label for={undefined}><Switch bind:checked={chosen5} disabled /> Option 1</label>
  </div>
  <div class="container col">
    <p>Slider</p>
    <p>Chose {chosen6}</p>
    <Slider bind:value={chosen6} />
    <Slider bind:value={chosen6} step={10} accuracy="ticks" />
    <Slider bind:value={chosen6} disabled />
  </div>
  <div class="container">
    <p>Chip(s)</p>
    <table>
      <tr>
        <th />
        <th>Nothing</th>
        <th>Elevated</th>
        <th>Icon</th>
        <th>Elevated + icon</th>
      </tr>
      {#each Object.entries( { Nothing: {}, Selected: { selected: true }, Disabled: { disabled: true }, "Selected + Disabled": { selected: true, disabled: true } } ) as [name, options]}
        <tr>
          <td>{name}</td>
          <td><Chip type="suggestion" {...options}>Hello</Chip></td>
          <td><Chip type="suggestion" elevated {...options}>Hello</Chip></td>
          <td>
            <Chip type="suggestion" icon={iconTriangle} trailingIcon={iconX} {...options}>
              Hello
            </Chip>
          </td>
          <td>
            <Chip type="suggestion" elevated icon={iconTriangle} trailingIcon={iconX} {...options}>
              Hello
            </Chip>
          </td>
        </tr>
      {/each}
    </table>
  </div>
  <div class="container col">
    <p>Text field</p>
    <p>Chose {chosen7}, {chosen8}, {chosen14}, {chosen12}</p>
    <TextField style="filled" name="Option" icon={iconTriangle} bind:value={chosen7} />
    <TextField
      style="outlined"
      name="Other option"
      icon={iconTriangle}
      bind:value={chosen8}
      supportingText="sus"
    />
    <TextField
      style="outlined"
      name="wow its a <textfield>"
      bind:value={chosen14}
      isTextarea={true}
    />
    <DateFieldAndPicker
      fieldOptions={{ name: "Date" }}
      clearable={true}
      dateValidator={(d) => {
        const lastChar = d.charCodeAt(9);
        return Boolean(lastChar && lastChar % 2);
      }}
      bind:value={chosen12}
    />
  </div>
</div>
<h2 class="m3-font-headline-medium">Containers</h2>
<div class="container parent">
  <div class="container">
    <p>Card</p>
    <Card type="elevated" clickable>Text</Card>
    <Card type="filled" clickable>Text</Card>
    <Card type="outlined" clickable>Text</Card>
  </div>
  <div>
    <p>Modals</p>
    <label for={undefined}>
      <Checkbox bind:checked={chosen9} /> Dialog
    </label>
    <Dialog title="Lorem" bind:open={chosen9} icon={iconEdit} cancelLabel="nah" confirmLabel="GO">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni velit ea sunt iste ullam dolor
      atque numquam nemo aspernatur, quae mollitia, officiis repudiandae consectetur nulla, alias
      tempore recusandae eum assumenda. Nulla eveniet ab impedit delectus voluptatibus, error
      dolorem sint autem. Impedit debitis labore recusandae eius aspernatur reiciendis, saepe harum
      molestiae?
    </Dialog>
    <SnackbarPlacer>
      <Snackbar bind:open={chosen10} action="Undo">Hi</Snackbar>
    </SnackbarPlacer>
    <Button type="outlined" on:click={() => (chosen10 = true)}>Show snackbar</Button>
  </div>
  <div>
    <p>List</p>
    <div class="max-w-body">
      <List
        items={[
          { headline: "Lorem", desc: '"desc" >', trailing: { type: "text", content: "123" } },
          {
            headline: "Ipsum",
            desc: '"supporting text"',
            leading: { type: "icon", content: iconEdit },
            trailing: { type: "icon", content: iconCircle },
            tapAction: true,
          },
          {
            headline: "Dolor",
            desc: "dolorem sint autem. Impedit debitis labore recusandae eius aspernatur reiciendis, saepe harum dolorem sint autem. Impedit debitis labore recusandae eius aspernatur reiciendis, saepe harum",
            leading: { type: "avatar", content: "https://placedog.net/128/128" },
            trailing: { type: "checkbox" },
          },
          {
            headline: "Sit",
            desc: "i know these are dumb placeholders",
            leading: { type: "photo", content: "https://placedog.net/128/128" },
            trailing: { type: "switch" },
          },
        ]}
        lines={2}
        divider={"full"}
      />
    </div>
  </div>
  <div>
    <p>Bottom sheet</p>
    {#if chosen13}
      <BottomSheet on:close={() => (chosen13 = false)}>
        lorem100 is cool
        <Button type="outlined" on:click={() => alert("no way")}>this is a button</Button>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, aperiam reiciendis, earum delectus
        fugiat dignissimos, suscipit unde dolorum officia accusantium quo? Repellendus obcaecati consectetur
        reprehenderit dolor quisquam hic libero exercitationem, dolorem doloribus quod, aliquid placeat
        quae molestias vel? Necessitatibus, assumenda fugit a eius repellat, aspernatur excepturi itaque
        nisi consequuntur voluptatum accusamus numquam est aliquid labore dolores repellendus commodi?
        Vel ea fugiat dolores molestias sequi. Deleniti voluptate, maxime id cupiditate iusto quibusdam
        culpa quod expedita reprehenderit earum animi sed magni voluptates laudantium reiciendis error.
        Ratione est alias voluptates sunt? Repellendus animi facilis quas quam quasi dolore voluptates
        vero quos ullam omnis.
      </BottomSheet>
    {/if}

    <Button type="outlined" on:click={() => (chosen13 = true)}>Show bottom sheet</Button>
  </div>
  <div>
    <p>Tabs (closest category)</p>
    <Tabs
      style="primary"
      items={[
        { name: "this is", primaryIcon: iconCircle },
        { name: "my attempt", primaryIcon: iconSquare },
        { name: "at tabs", primaryIcon: iconTriangle },
      ]}
      activeItem={chosen11}
    />
  </div>
</div>

<style>
  .container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .parent > div {
    overflow: hidden;
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
  .max-w-body {
    max-width: 50ch;
  }
  table {
    border-collapse: collapse;
  }
  td {
    padding: 1rem;
    border: solid 1px rgb(var(--m3-scheme-on-surface) / 0.12);
  }
</style>
