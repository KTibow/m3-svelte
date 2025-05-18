## Button

Minimal demo:

```svelte
<Button variant="elevated" click={() => alert("!")}>Hello</Button>
```

Full demo:

```use
Button
```

```ts
let variant: "elevated" | "filled" | "tonal" | "outlined" | "text" = "elevated";
let iconType: "none" | "left" | "full" = "none";
let enabled = true;
let link = false;
```

```svelte
<label>
  <Arrows list={["elevated", "filled", "tonal", "outlined", "text"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Arrows list={["none", "left", "full"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
<label>
  <Switch bind:checked={link} />
  {link ? "Link" : "Button"}
</label>
{#snippet demo()}
  <Button
    {variant}
    {...link ? { href: "https://example.com" } : { click: () => {}, disabled: !enabled }}
    {iconType}
  >
    {#if iconType == "none"}
      Hello
    {:else if iconType == "left"}
      <Icon icon={iconCircle} /> Hello
    {:else}
      <Icon icon={iconCircle} />
    {/if}
  </Button>
{/snippet}
```

## Segmented button

Minimal demo:

```svelte
<SegmentedButtonContainer>
  <input type="checkbox" id="segmented-0" bind:checked={itemA} />
  <SegmentedButtonItem input="segmented-0">A</SegmentedButtonItem>
  <input type="checkbox" id="segmented-1" bind:checked={itemB} />
  <SegmentedButtonItem input="segmented-1">B</SegmentedButtonItem>
</SegmentedButtonContainer>
```

Full demo:

```use
SegmentedButtonContainer
SegmentedButtonItem
```

```ts
let multiselect = false;
```

```svelte
<label>
  <Switch bind:checked={multiselect} />
  {multiselect ? "Multi-select" : "Single-select"}
</label>
{#snippet demo()}
  {#if multiselect}
    <SegmentedButtonContainer>
      <input type="checkbox" id="segmented-a-0" />
      <SegmentedButtonItem input="segmented-a-0" icon={iconCircle}>A</SegmentedButtonItem>
      <input type="checkbox" id="segmented-a-1" />
      <SegmentedButtonItem input="segmented-a-1" icon={iconSquare}>B</SegmentedButtonItem>
      <input type="checkbox" id="segmented-a-2" disabled />
      <SegmentedButtonItem input="segmented-a-2" icon={iconTriangle}>C</SegmentedButtonItem>
    </SegmentedButtonContainer>
  {:else}
    <SegmentedButtonContainer>
      <input type="radio" name="segmented-b" id="segmented-b-0" checked />
      <SegmentedButtonItem input="segmented-b-0" icon={iconCircle}>A</SegmentedButtonItem>
      <input type="radio" name="segmented-b" id="segmented-b-1" />
      <SegmentedButtonItem input="segmented-b-1" icon={iconSquare}>B</SegmentedButtonItem>
      <input type="radio" name="segmented-b" id="segmented-b-2" disabled />
      <SegmentedButtonItem input="segmented-b-2" icon={iconTriangle}>C</SegmentedButtonItem>
    </SegmentedButtonContainer>
  {/if}
{/snippet}
```

## FAB

Minimal demo:

```svelte
<FAB color="primary" icon={iconCircle} click={() => alert("!")} />
```

Full demo:

```use
FAB
```

```ts
let color: "primary" | "surface" | "secondary" | "tertiary" = "primary";
let size: "small" | "normal" | "large" | "extended" = "normal";
```

```svelte
<label>
  <Arrows list={["primary", "surface", "secondary", "tertiary"]} bind:value={color} />
  {color[0].toUpperCase() + color.slice(1)}
</label>
<label>
  <Arrows list={["small", "normal", "large", "extended"]} bind:value={size} index={1} />
  {size[0].toUpperCase() + size.slice(1)}
</label>
{#snippet demo()}
  <FAB
    {color}
    click={() => {}}
    {...size == "extended" ? { size: "normal", text: "Hello" } : { size }}
    icon={iconCircle}
  />
{/snippet}
```

## Card

Minimal demo:

```svelte
<Card variant="filled">Hello</Card>
<Card variant="filled" click={() => alert("!")}>Hello</Card>
```

Full demo:

```use
Card
```

```ts
let variant: "elevated" | "filled" | "outlined" = "elevated";
let clickable = false;
```

```svelte
<label>
  <Arrows list={["elevated", "filled", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={clickable} />
  {clickable ? "Clickable" : "Not clickable"}
</label>
{#snippet demo()}
  <Card {variant} {...clickable ? { click: () => {} } : {}}>Hello</Card>
{/snippet}
```

## List

Minimal demo:

```svelte
<div>
  <ListItem headline="Hello" />
  <ListItem headline="Hello" />
</div>
```

Full demo:

```use
ListItem
Checkbox
Divider
```

```ts
let lines: "1" | "2" | "3" = "1";
let type: "div" | "button" | "label" = "div";
const headline = "Hello";

let supporting = $derived(
  lines == "1"
    ? undefined
    : lines == "2"
      ? "Welcome to ZomboCom!"
      : "Welcome to ZomboCom! Anything is possible at ZomboCom! You can do anything at ZomboCom!");
```

```svelte
<label>
  <Arrows list={["1", "2", "3"]} bind:value={lines} />
  {lines}
  {lines == "1" ? "line" : "lines"}
</label>
<label>
  <Arrows list={["div", "button", "label"]} bind:value={type} />
  {"<" + type + ">"}
</label>
{#snippet demo()}
  <div class="demo">
    {#snippet leading()}
      {#if type == "label"}
        <div class="box-wrapper">
          <Checkbox><input type="checkbox" /></Checkbox>
        </div>
      {:else}
        <Icon icon={iconCircle} />
      {/if}
    {/snippet}
    <ListItem
      {leading}
      {headline}
      {supporting}
      lines={+lines}
      {...type == "label" ? { label: true } : type == "button" ? { click: () => {} } : {}}
    />
    <Divider />
    <ListItem
      {leading}
      {headline}
      {supporting}
      lines={+lines}
      {...type == "label" ? { label: true } : type == "button" ? { click: () => {} } : {}}
    />
  </div>
{/snippet}

<style>
  .demo {
    display: flex;
    flex-direction: column;
  }
  .box-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
```

## Menu

Minimal demo:

```svelte
<Menu>
  <MenuItem icon={iconCircle}>Undo</MenuItem>
  <MenuItem icon={iconSquare}>Redo</MenuItem>
  <MenuItem icon={iconTriangle}>Cut</MenuItem>
</Menu>
```

Full demo:

```use
Menu
MenuItem
```

```ts
let icons = false;
```

```svelte
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
{#snippet demo()}
  <Menu>
    <MenuItem icon={icons ? iconCircle : undefined} click={() => {}}>Cut</MenuItem>
    <MenuItem icon={icons ? iconSquare : undefined} click={() => {}}>Undo</MenuItem>
    <MenuItem icon={icons ? iconTriangle : undefined} disabled click={() => {}}>Redo</MenuItem>
  </Menu>
{/snippet}
```

## Bottom sheet

Minimal demo:

```svelte
{#if open}
  <BottomSheet close={() => (open = false)}>Hello</BottomSheet>
{/if}
```

Full demo:

```use
Button
BottomSheet
```

```ts
let open = $state(false);
```

```svelte
{#snippet demo()}
  <Button variant="tonal" click={() => (open = true)}>Open</Button>
  {#if open}
    <BottomSheet close={() => (open = false)}>
      {"Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at ZomboCom! The unattainable is unknown at ZomboCom! ".repeat(20)}
    </BottomSheet>
  {/if}
{/snippet}
```

## Dialog

Minimal demo:

```svelte
<Dialog headline="Hello" bind:open>
  I'm alive
  {#snippet buttons()}
    <Button variant="tonal" click={() => (open = false)}>OK</Button>
  {/snippet}
</Dialog>
```

Full demo:

```use
Button
Dialog
```

```ts
let open = $state(false);
```

```svelte
{#snippet demo()}
  <Button variant="tonal" click={() => (open = true)}>Open</Button>
  <Dialog icon={iconCircle} headline="Hello" bind:open>
    Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at
    ZomboCom! The unattainable is unknown at ZomboCom!
    {#snippet buttons()}
      <Button variant="tonal" click={() => (open = false)}>OK</Button>
    {/snippet}
  </Dialog>
{/snippet}
```

## Snackbar

Minimal demo:

```svelte
<script lang="ts">
  let snackbar: ReturnType<typeof Snackbar>;
</script>

<Button variant="tonal" click={() => snackbar.show({ message: "Hello", closable: true })}>Show</Button>
<Snackbar bind:this={snackbar} />
```

Full demo:

```use
Button
Snackbar
```

```ts
let snackbar: ReturnType<typeof Snackbar>;
```

```svelte
{#snippet demo()}
  <Button variant="tonal" click={() => snackbar.show({ message: "Hello", closable: true })}>Show</Button>
  <Snackbar bind:this={snackbar} />
{/snippet}
```

## Checkbox

Minimal demo:

```svelte
<label>
  <Checkbox>
    <input type="checkbox" bind:checked={on} />
  </Checkbox>
</label>
```

Full demo:

```use
Checkbox
```

```ts
let enabled = true;
```

```svelte
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
{#snippet demo()}
  <label>
    <Checkbox>
      <input type="checkbox" checked disabled={!enabled} />
    </Checkbox>
  </label>
{/snippet}
```

## Chip

Minimal demo:

```svelte
<Chip variant="general" icon={iconCircle} on:click={() => alert("!")}>Hello</Chip>
```

Full demo:

```use
Chip
```

```ts
let style: "input" | "assist" | "assist elevated" | "general" | "general elevated" = "input";
let iconType: "none" | "left" | "right" = "none";
let enabled = true;
let selected = false;
```

```svelte
<label>
  <Arrows
    list={["input", "assist", "assist elevated", "general", "general elevated"]}
    bind:value={style}
  />
  {style[0].toUpperCase() + style.slice(1)}
</label>
<label>
  <Arrows list={["none", "left", "right"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Right icon"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  <Chip
    variant={style.startsWith("assist") ? "assist" : style.startsWith("general") ? "general" : "input"}
    elevated={style.endsWith("elevated")}
    icon={iconType == "left" ? iconCircle : undefined}
    trailingIcon={iconType == "right" ? iconSquare : undefined}
    disabled={!enabled}
    {selected}
    click={() => (selected = !selected)}
  >
    Hello
  </Chip>
{/snippet}
```

## Progress

Minimal demo:

```svelte
<LinearProgress percent={60} />
<LinearProgressIndeterminate />
<CircularProgress percent={60} />
<CircularProgressIndeterminate />
```

Full demo:

```use
LinearProgress
LinearProgressIndeterminate
CircularProgress
CircularProgressIndeterminate
```

```ts
let type: "linear" | "circular" = "linear";
let indeterminate = false;
```

```svelte
<label>
  <Arrows list={["linear", "circular"]} bind:value={type} />
  {type[0].toUpperCase() + type.slice(1)}
</label>
<label>
  <Switch bind:checked={indeterminate} />
  {indeterminate ? "Indeterminate" : "Fixed progress"}
</label>

{#snippet demo()}
  {#if type == "linear" && indeterminate}
    <LinearProgressIndeterminate />
  {:else if type == "linear"}
    <LinearProgress percent={60} />
  {:else if type == "circular" && indeterminate}
    <CircularProgressIndeterminate />
  {:else if type == "circular"}
    <CircularProgress percent={60} />
  {/if}
{/snippet}
```

## Radio

Minimal demo:

```svelte
<RadioAnim1><input type="radio" name="stuff" value="one" bind:group={stuff} /></RadioAnim1>
<RadioAnim1><input type="radio" name="stuff" value="two" bind:group={stuff} /></RadioAnim1>
<RadioAnim1><input type="radio" name="stuff" value="three" bind:group={stuff} /></RadioAnim1>
```

Full demo:

```use
RadioAnim1
RadioAnim2
RadioAnim3
```

```ts
let animation: "1" | "2" | "3" = "1";
let enabled = true;

let component = $derived(animation == "1" ? RadioAnim1 : animation == "2" ? RadioAnim2 : RadioAnim3);
```

```svelte
<label>
  <Arrows list={["1", "2", "3"]} bind:value={animation} />
  Animation {animation}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
<div style:display="flex" style:gap="0.5rem">
  <label>
    <svelte:component this={component}>
      <input type="radio" name="radio" checked disabled={!enabled} />
    </svelte:component>
  </label>
  <label>
    <svelte:component this={component}>
      <input type="radio" name="radio" disabled={!enabled} />
    </svelte:component>
  </label>
  <label>
    <svelte:component this={component}>
      <input type="radio" name="radio" disabled={!enabled} />
    </svelte:component>
  </label>
</div>
{/snippet}
```

## Slider

Minimal demo:

```svelte
<Slider bind:value={n} />
```

Full demo:

```use
Slider
SliderTicks
```

```ts
let precision: "continuous" | "discrete" | "discrete-ticks" = "continuous";
let enabled = true;
let value = 0;
```

```svelte
<label>
  <Arrows list={["continuous", "discrete", "discrete-ticks"]} bind:value={precision} />
  {precision == "continuous"
    ? "Continuous"
    : precision == "discrete"
      ? "Discrete"
      : "Discrete (ticks)"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  {#if precision == "discrete-ticks"}
    <SliderTicks step={1} max={6} value={0} disabled={!enabled} />
  {:else}
    <Slider step={precision == "continuous" ? "any" : 10} value={0} disabled={!enabled} />
  {/if}
{/snippet}
```

## Switch

Minimal demo:

```svelte
<label>
  <Switch bind:checked={on} />
</label>
```

Full demo:

```use
Switch
```

```ts
let enabled = true;
```

```svelte
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
<label>
  <Switch disabled={!enabled} />
</label>
{/snippet}
```

## Text field

Minimal demo:

```svelte
<TextField name="Field" bind:value={text} />
```

Full demo:

```use
TextField
TextFieldOutlined
TextFieldMultiline
TextFieldOutlinedMultiline
```

```ts
import type { HTMLInputAttributes } from "svelte/elements";
let type: "filled" | "filled_multiline" | "outlined" | "outlined_multiline" = "filled";
let option: "text" | "password" | "number" | "file" = "text";
let leadingIcon = false;
let errored = false;
let enabled = true;
```

```svelte
<label>
  <Arrows
    list={["filled", "filled_multiline", "outlined", "outlined_multiline"]}
    bind:value={type}
  />
  {type == "filled"
    ? "Filled"
    : type == "filled_multiline"
      ? "Filled multiline"
      : type == "outlined"
        ? "Outlined"
        : "Outlined multiline"}
</label>
<label>
  <Arrows list={["text", "password", "number", "file"]} bind:value={option} />
  {option == "text"
    ? "Text"
    : option == "password"
      ? "Password"
      : option == "number"
        ? "Number"
        : "File"}
</label>
<label>
  <Switch bind:checked={leadingIcon} />
  {leadingIcon ? "Leading icon" : "No leading icon"}
</label>
<label>
  <Switch bind:checked={errored} />
  {errored ? "Errored" : "Not errored"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  {#if type === "filled"}
    <TextField
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
      type={option}
    />
  {:else if type === "outlined"}
    <TextFieldOutlined
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
      type={option}
    />
  {:else if type === "filled_multiline"}
    <TextFieldMultiline
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
    />
  {:else if type === "outlined_multiline"}
    <TextFieldOutlinedMultiline
      name="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
    />
  {/if}
{/snippet}
```

## Tabs

Minimal demo:

```svelte
<Tabs
  items={[
    { name: "A", value: "a" },
    { name: "B", value: "b" },
  ]}
  bind:tab
/>
```

Full demo:

```use
Tabs
VariableTabs
```

```ts
let type: "primary" | "secondary" = "primary";
let icons = false;
let variable = false;
let tab = "hello";

let items = $derived(icons
  ? [
      { icon: iconCircle, name: "Hello", value: "hello" },
      { icon: iconSquare, name: "World", value: "world" },
      { icon: iconTriangle, name: "The longest item", value: "long" },
    ]
  : [
      { name: "Hello", value: "hello" },
      { name: "World", value: "world" },
      { name: "The longest item", value: "long" },
    ]);
```

```svelte
<label>
  <Arrows list={["primary", "secondary"]} bind:value={type} />
  {type == "primary" ? "Primary" : "Secondary"}
</label>
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
<label>
  <Switch bind:checked={variable} />
  {variable ? "Variable" : "Fixed"}
</label>

{#snippet demo()}
  {#if variable}
    <VariableTabs bind:tab secondary={type == "secondary"} {items} />
  {:else}
    <Tabs bind:tab secondary={type == "secondary"} {items} />
  {/if}
{/snippet}
```

## Date field

Minimal demo:

```svelte
<DateField name="Date" bind:date />
```

Full demo:

```use
DateField
```

```ts

```

```svelte
{#snippet demo()}
  <DateField name="Date" />
{/snippet}
```
