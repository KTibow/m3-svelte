<script lang="ts">
  import iconTrash from "@iconify-icons/ic/outline-delete";

  import Hero from "./Hero.svelte";
  import ButtonShowcase from "./ButtonShowcase.svelte";
  import SegmentedButtonShowcase from "./SegmentedButtonShowcase.svelte";
  import FABShowcase from "./FABShowcase.svelte";

  import CircularProgress from "$lib/forms/CircularProgress.svelte";
  import CircularProgressIndeterminate from "$lib/forms/CircularProgressIndeterminate.svelte";
  import LinearProgress from "$lib/forms/LinearProgress.svelte";
  import LinearProgressIndeterminate from "$lib/forms/LinearProgressIndeterminate.svelte";

  import CardShowcase from "./CardShowcase.svelte";
  import Dialog from "$lib/containers/Dialog.svelte";
  import Button from "$lib/buttons/Button.svelte";

  let isDialogOpen = false;
</script>

<svelte:head>
  <title>M3 Svelte</title>
  <meta
    name="description"
    content="The home of Material 3 Svelte, a library for the M3 design system, with components, animations, and theming."
  />
</svelte:head>
<Hero />

<h2 class="m3-font-display-medium">Buttons</h2>
<div class="showcase" style="overflow: auto">
  <p class="m3-font-title-large">Buttons</p>
  <ButtonShowcase />
</div>
<div class="showcase" style="overflow: auto">
  <p class="m3-font-title-large">Segmented chooser</p>
  <SegmentedButtonShowcase />
</div>
<div class="showcase" style="overflow: auto">
  <p class="m3-font-title-large">FAB</p>
  <FABShowcase />
</div>

<h2 class="m3-font-display-medium">Containers</h2>
<div class="showcase">
  <p class="m3-font-title-large">Cards</p>
  <CardShowcase />
</div>
<div class="showcase">
  <p class="m3-font-title-large">Dialogs</p>
  <input type="checkbox" bind:checked={isDialogOpen} />
  <Dialog icon={iconTrash} headline="Permanently delete?" bind:open={isDialogOpen}>
    Deleting the selected messages will also remove them from all synced devices.
    <svelte:fragment slot="buttons">
      <Button type="text" on:click={() => (isDialogOpen = false)}>Cancel</Button>
      <Button type="tonal" on:click={() => (isDialogOpen = false)}>Delete</Button>
    </svelte:fragment>
  </Dialog>
</div>

<h2 class="m3-font-display-medium">Forms</h2>

<div class="showcase" style="overflow: hidden">
  <p class="m3-font-title-large">Progress</p>
  <LinearProgress percent={60} />
  <LinearProgressIndeterminate />
  <CircularProgress percent={60} />
  <CircularProgressIndeterminate />
</div>

<!-- <h2 class="m3-font-headline-medium">Form-related components</h2>
<div class="container">
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
<div class="container parent">
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
      <svelte:fragment slot="buttons">hi lol</svelte:fragment>
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
    <p>Menu</p>
    <Menu
      items={[
        { label: "Procyon", icon: iconEdit },
        { label: "FernFlower", icon: "space" },
      ]}
    />
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
</div> -->

<style>
  .showcase {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 2rem;
  }
  .showcase > p {
    margin: 0 auto 0 0;
  }
</style>
