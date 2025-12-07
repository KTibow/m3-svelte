## Button

Minimal demo:

```svelte
<Button variant="elevated" onclick={() => alert("!")}>Hello</Button>
```

Full demo:

```use
Button
```

```ts
let variant: "elevated" | "filled" | "tonal" | "outlined" | "text" = $state("filled");
let action: "click" | "link" | "toggle" = $state("click");
let square = $state(false);
let iconType: "none" | "left" | "full" = $state("none");
let size: "xs" | "s" | "m" | "l" | "xl" = $state("s");
let enabled = $state(true);
```

```svelte
<label>
  <Arrows
    list={["elevated", "filled", "tonal", "outlined", "text"]}
    bind:value={variant}
    initialIndex={1}
  />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Arrows list={["click", "link", "toggle"]} bind:value={action} />
  {action[0].toUpperCase() + action.slice(1)}
</label>
<label>
  <Switch bind:checked={square} />
  {square ? "Square" : "Round"}
</label>
<label>
  <Arrows list={["none", "left", "full"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}
</label>
<label>
  <Arrows list={["xs", "s", "m", "l", "xl"]} bind:value={size} initialIndex={1} />
  {size == "xs"
    ? "Extra small"
    : size == "s"
      ? "Small"
      : size == "m"
        ? "Medium"
        : size == "l"
          ? "Large"
          : "Extra large"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
{#snippet demo()}
  <div>
    <input type="checkbox" id="random-input" disabled={!enabled} />
    <Button
      {variant}
      {square}
      {size}
      {...{
        click: { onclick: () => {}, disabled: !enabled },
        link: { href: "https://example.com" },
        toggle: { for: "random-input" },
      }[action]}
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
  </div>
{/snippet}

<style>
  #random-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
</style>
```

## Connected buttons

Minimal demo:

```svelte
<ConnectedButtons>
  <TogglePrimitive bind:toggle={itemA}>A</TogglePrimitive>
  <TogglePrimitive bind:toggle={itemB}>B</TogglePrimitive>
</ConnectedButtons>
```

Full demo:

```use
ConnectedButtons
Button
TogglePrimitive
```

```ts
let variant: "filled" | "tonal" = $state("filled");
let multiselect = $state(true);
let size: "xs" | "s" | "m" | "l" | "xl" = $state("s");
```

```svelte
<label>
  <Arrows list={["filled", "tonal"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={multiselect} />
  {multiselect ? "Multi-select" : "Single-select"}
</label>
<label>
  <Arrows list={["xs", "s", "m", "l", "xl"]} bind:value={size} initialIndex={1} />
  {size == "xs"
    ? "Extra small"
    : size == "s"
      ? "Small"
      : size == "m"
        ? "Medium"
        : size == "l"
          ? "Large"
          : "Extra large"}
</label>
{#snippet demo()}
  <ConnectedButtons>
    {#if multiselect}
      <TogglePrimitive toggle={true} {variant} {size}>Alpha</TogglePrimitive>
      <TogglePrimitive toggle={false} {variant} {size}>Beta</TogglePrimitive>
      <TogglePrimitive toggle={false} {variant} {size}>Charlie</TogglePrimitive>
    {:else}
      <input type="radio" name="segmented-b" id="segmented-b-0" checked />
      <Button for="segmented-b-0" {variant} {size} square>Alpha</Button>
      <input type="radio" name="segmented-b" id="segmented-b-1" />
      <Button for="segmented-b-1" {variant} {size} square>Beta</Button>
      <input type="radio" name="segmented-b" id="segmented-b-2" />
      <Button for="segmented-b-2" {variant} {size} square>Charlie</Button>
    {/if}
  </ConnectedButtons>
{/snippet}
```

## Split button

Minimal demo:

```svelte
<SplitButton variant="filled" onclick={() => alert("!")}>
  Hello
  {#snippet menu()}
    and more
  {/snippet}
</SplitButton>
```

Full demo:

```use
SplitButton
Menu
MenuItem
```

```ts
let variant: "elevated" | "filled" | "tonal" | "outlined" = $state("elevated");
let position: "inner-down" | "inner-up" | "right-down" | "right-up" = $state("inner-down");
let iconType: "none" | "left" | "full" = $state("none");
```

```svelte
<label>
  <Arrows list={["elevated", "filled", "tonal", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Arrows list={["inner-down", "inner-up", "right-down", "right-up"]} bind:value={position} />
  {position[0].toUpperCase() + position.slice(1).replace("-", " ")}
</label>
<label>
  <Arrows list={["none", "left", "full"]} bind:value={iconType} />
  {iconType == "none" ? "No icon" : iconType == "left" ? "Left icon" : "Icon"}
</label>

{#snippet demo()}
  <div>
    <SplitButton
      {variant}
      x={position.startsWith("inner") ? "inner" : "right"}
      y={position.endsWith("down") ? "down" : "up"}
      onclick={() => {}}
    >
      {#if iconType == "none"}
        Hello
      {:else if iconType == "left"}
        <Icon icon={iconCircle} /> Hello
      {:else}
        <Icon icon={iconCircle} />
      {/if}
      {#snippet menu()}
        <Menu>
          <MenuItem icon={iconCircle} onclick={() => {}}>Hi</MenuItem>
          <MenuItem icon={iconSquare} onclick={() => {}}>Howdy</MenuItem>
          <MenuItem icon={iconTriangle} onclick={() => {}}>G'day</MenuItem>
        </Menu>
      {/snippet}
    </SplitButton>
  </div>
{/snippet}
```

## FAB

Minimal demo:

```svelte
<FAB color="primary" icon={iconCircle} onclick={() => alert("!")} />
```

Full demo:

```use
FAB
```

```ts
let color:
  | "primary-container"
  | "secondary-container"
  | "tertiary-container"
  | "primary"
  | "secondary"
  | "tertiary" = $state("primary-container");
let size: "small" | "normal" | "large" | "extended" = $state("normal");
```

```svelte
<label>
  <Arrows
    list={[
      "primary-container",
      "secondary-container",
      "tertiary-container",
      "primary",
      "secondary",
      "tertiary",
    ]}
    bind:value={color}
  />
  {color[0].toUpperCase() + color.slice(1).replace("-", " ")}
</label>
<label>
  <Arrows list={["small", "normal", "large", "extended"]} bind:value={size} initialIndex={1} />
  {size[0].toUpperCase() + size.slice(1)}
</label>
{#snippet demo()}
  <div>
    <FAB
      {color}
      onclick={() => {}}
      {...size == "extended" ? { size: "normal", text: "Hello" } : { size }}
      icon={iconCircle}
    />
  </div>
{/snippet}
```

## Card

Minimal demo:

```svelte
<Card variant="filled">Hello</Card>
<Card variant="filled" onclick={() => alert("!")}>Hello</Card>
```

Full demo:

```use
Card
```

```ts
let variant: "elevated" | "filled" | "outlined" = $state("elevated");
let clickable = $state(false);
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
  <Card {variant} {...clickable ? { onclick: () => {} } : {}}>Hello</Card>
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
const headline = "Hello";

let lines: "1" | "2" | "3" = $state("1");
let type: "div" | "button" | "label" | "a" = $state("div");

let supporting = $derived(
  lines == "1"
    ? undefined
    : lines == "2"
      ? "Welcome to ZomboCom!"
      : "Welcome to ZomboCom! Anything is possible at ZomboCom! You can do anything at ZomboCom!",
);
```

```svelte
<label>
  <Arrows list={["1", "2", "3"]} bind:value={lines} />
  {lines}
  {lines == "1" ? "line" : "lines"}
</label>
<label>
  <Arrows list={["div", "button", "label", "a"]} bind:value={type} />
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
      {...type == "label"
        ? { label: true }
        : type == "button"
          ? { onclick: () => {} }
          : type == "a"
            ? { href: "https://example.com" }
            : {}}
    />
    <Divider />
    <ListItem
      {leading}
      {headline}
      {supporting}
      lines={+lines}
      {...type == "label"
        ? { label: true }
        : type == "button"
          ? { onclick: () => {} }
          : type == "a"
            ? { href: "https://example.com" }
            : {}}
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
let icons = $state(false);
```

```svelte
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
{#snippet demo()}
  <Menu>
    <MenuItem icon={icons ? iconCircle : undefined} onclick={() => {}}>Cut</MenuItem>
    <MenuItem icon={icons ? iconSquare : undefined} onclick={() => {}}>Undo</MenuItem>
    <MenuItem icon={icons ? iconTriangle : undefined} disabled onclick={() => {}}>Redo</MenuItem>
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
  <Button variant="tonal" onclick={() => (open = true)}>Open</Button>
  {#if open}
    <BottomSheet close={() => (open = false)}>
      {"Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at ZomboCom! The unattainable is unknown at ZomboCom! ".repeat(
        20,
      )}
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
    <Button variant="tonal">OK</Button>
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
  <Button variant="tonal" onclick={() => (open = true)}>Open</Button>
  <Dialog icon={iconCircle} headline="Hello" bind:open>
    Anything is possible at ZomboCom! You can do anything at ZomboCom! The infinite is possible at
    ZomboCom! The unattainable is unknown at ZomboCom!
    {#snippet buttons()}
      <Button variant="tonal">OK</Button>
    {/snippet}
  </Dialog>
{/snippet}
```

## Snackbar

Minimal demo:

```svelte
<script lang="ts">
  import { snackbar } from "m3-svelte";
</script>

<Button variant="tonal" onclick={() => snackbar("Hello", undefined, true)}>Show</Button>
<Snackbar />
```

Full demo:

```use
Button
Snackbar
```

```ts
import { snackbar } from "$lib/containers/Snackbar.svelte";
```

```svelte
{#snippet demo()}
  <Button variant="tonal" onclick={() => snackbar("Hello", undefined, true)}>Show</Button>
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
let enabled = $state(true);
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
<Chip variant="general" icon={iconCircle} onclick={() => alert("!")}>Hello</Chip>
```

Full demo:

```use
Chip
```

```ts
let style: "input" | "assist" | "assist elevated" | "general" | "general elevated" =
  $state("input");
let iconType: "none" | "left" | "right" = $state("none");
let enabled = $state(true);
let selected = $state(false);
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
  <div>
    <Chip
      variant={style.startsWith("assist")
        ? "assist"
        : style.startsWith("general")
          ? "general"
          : "input"}
      elevated={style.endsWith("elevated")}
      icon={iconType == "left" ? iconCircle : undefined}
      trailingIcon={iconType == "right" ? iconSquare : undefined}
      disabled={!enabled}
      {selected}
      onclick={() => (selected = !selected)}
    >
      Hello
    </Chip>
  </div>
{/snippet}
```

## Progress

Minimal demo:

```svelte
<LinearProgress percent={60} />
<LinearProgressEstimate sToHalfway={2} />
<WavyLinearProgress percent={60} />
<WavyLinearProgressEstimate sToHalfway={2} />
<CircularProgress percent={60} />
<CircularProgressEstimate sToHalfway={2} />
```

Full demo:

```use
LinearProgress
LinearProgressEstimate
WavyLinearProgress
WavyLinearProgressEstimate
CircularProgress
CircularProgressEstimate
Button
Slider
```

```ts
let type: "linear" | "linear-wavy" | "circular" = $state("linear");
let estimate = $state(false);
let thick = $state(false);
let percent = $state(10);
```

```svelte
<label>
  <Arrows list={["linear", "linear-wavy", "circular"]} bind:value={type} />
  {type[0].toUpperCase() + type.slice(1).replace("-", " ")}
</label>
<label>
  <Switch bind:checked={thick} />
  {thick ? "Thicker" : "Default"}
</label>
{#if !estimate}
  <Slider bind:value={percent} />
{/if}
<input type="checkbox" id="estimate-toggle" bind:checked={estimate} />
<Button variant="tonal" for="estimate-toggle">{estimate ? "Estimated" : "Estimate"}</Button>

{#snippet demo()}
  {#if estimate && type == "linear"}
    <LinearProgressEstimate sToHalfway={2} height={thick ? 8 : undefined} />
  {:else if estimate && type == "linear-wavy"}
    <WavyLinearProgressEstimate height={thick ? 14 : undefined} thickness={thick ? 8 : undefined} />
  {:else if estimate && type == "circular"}
    <CircularProgressEstimate sToHalfway={2} thickness={thick ? 8 : undefined} />
  {:else if type == "linear"}
    <LinearProgress {percent} height={thick ? 8 : undefined} />
  {:else if type == "linear-wavy"}
    <WavyLinearProgress
      {percent}
      height={thick ? 14 : undefined}
      thickness={thick ? 8 : undefined}
    />
  {:else if type == "circular"}
    <CircularProgress {percent} thickness={thick ? 8 : undefined} />
  {/if}
{/snippet}

<style>
  #estimate-toggle {
    display: none;
  }
</style>
```

## Loading

Minimal demo:

```svelte
<LoadingIndicator />
```

Full demo:

```use
LoadingIndicator
```

```ts
let container = $state(false);
```

```svelte
<label>
  <Switch bind:checked={container} />
  {container ? "Contained" : "Raw"}
</label>

{#snippet demo()}
  <LoadingIndicator {container} />
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
let animation: "1" | "2" | "3" = $state("1");
let enabled = $state(true);

let Component = $derived(
  animation == "1" ? RadioAnim1 : animation == "2" ? RadioAnim2 : RadioAnim3,
);
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
      <Component>
        <input type="radio" name="radio" checked disabled={!enabled} />
      </Component>
    </label>
    <label>
      <Component>
        <input type="radio" name="radio" disabled={!enabled} />
      </Component>
    </label>
    <label>
      <Component>
        <input type="radio" name="radio" disabled={!enabled} />
      </Component>
    </label>
  </div>
{/snippet}
```

## Select

Minimal demo:

```svelte
<Select
  label="Select"
  options={[
    { text: "A", value: "a" },
    { text: "B", value: "b" },
  ]}
  bind:value
/>
```

Full demo:

```use
Select
SelectOutlined
```

```ts
let variant: "filled" | "outlined" = $state("filled");
let icons = $state(false);
let enabled = $state(true);
let options = $derived([
  { icon: icons ? iconCircle : undefined, text: "Alpha", value: "alpha" },
  { icon: icons ? iconSquare : undefined, text: "Beta", value: "beta" },
  { icon: icons ? iconTriangle : undefined, text: "Charlie", value: "charlie" },
]);
```

```svelte
<label>
  <Arrows list={["filled", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
</label>
<label>
  <Switch bind:checked={icons} />
  {icons ? "Icons" : "No icons"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  {#if variant === "filled"}
    <Select label="Select" {options} disabled={!enabled} value="alpha" />
  {:else}
    <SelectOutlined label="Select" {options} disabled={!enabled} value="alpha" />
  {/if}
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
```

```ts
let precision = $state<"continuous" | "discrete" | "discrete-stops">("continuous");
let size = $state<"xs" | "s" | "m" | "l" | "xl">("xs");
let trailingIcon = $state<boolean>(false);
let leadingIcon = $state<boolean>(false);
let endStops = $state<boolean>(true);
let enabled = $state<boolean>(true);
let vertical = $state<boolean>(false);
```

```svelte
<label>
  <Arrows list={["continuous", "discrete", "discrete-stops"]} bind:value={precision} />
  {precision == "continuous"
    ? "Continuous"
    : precision == "discrete"
      ? "Discrete"
      : "Discrete (stops)"}
</label>
<label>
  <Arrows list={["xs", "s", "m", "l", "xl"]} bind:value={size} />
  {size == "xs"
    ? "Extra small"
    : size == "s"
      ? "Small"
      : size == "m"
        ? "Medium"
        : size == "l"
          ? "Large"
          : "Extra large"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>
<label>
  <Switch bind:checked={vertical} />
  {vertical ? "Vertical" : "Horizontal"}
</label>
{#if size != "xs" && size != "s"}
  <label>
    <Switch bind:checked={leadingIcon} />
    {leadingIcon ? "Leading icon" : "No leading icon"}
  </label>
  <label>
    <Switch bind:checked={trailingIcon} />
    {trailingIcon ? "Trailing icon" : "No trailing icon"}
  </label>
{/if}
{#if precision != "discrete-stops" && !trailingIcon}
  <label>
    <Switch bind:checked={endStops} />
    {endStops ? "Endstops" : "No endstops"}
  </label>
{/if}

{#snippet demo()}
  <Slider
    step={precision == "continuous" ? "any" : 10}
    value={10}
    disabled={!enabled}
    {size}
    {vertical}
    stops={precision == "discrete-stops"}
    {endStops}
    leadingIcon={leadingIcon ? iconCircle : undefined}
    trailingIcon={trailingIcon ? iconSquare : undefined}
  />
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
let icons: "checked" | "both" | "none" = $state("checked");
let enabled = $state(true);
```

```svelte
<label>
  <Arrows list={["checked", "both", "none"]} bind:value={icons} />
  {icons == "checked" ? "Checked icon" : icons == "both" ? "Both icons" : "No icons"}
</label>
<label>
  <Switch bind:checked={enabled} />
  {enabled ? "Enabled" : "Disabled"}
</label>

{#snippet demo()}
  <label>
    <Switch disabled={!enabled} {icons} />
  </label>
{/snippet}
```

## Text field

Minimal demo:

```svelte
<TextField label="Field" bind:value={text} />
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
let type: "filled" | "filled_multiline" | "outlined" | "outlined_multiline" = $state("filled");
let option: "text" | "password" | "number" | "file" = $state("text");
let leadingIcon = $state(false);
let trailingIcon = $state(false);
let errored = $state(false);
let enabled = $state(true);
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
  <Switch bind:checked={trailingIcon} />
  {trailingIcon ? "Trailing icon" : "No trailing icon"}
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
      label="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      trailing={trailingIcon ? { icon: iconSquare, onclick: () => {} } : undefined}
      error={errored}
      disabled={!enabled}
      type={option}
    />
  {:else if type === "outlined"}
    <TextFieldOutlined
      label="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      trailing={trailingIcon ? { icon: iconSquare, onclick: () => {} } : undefined}
      error={errored}
      disabled={!enabled}
      type={option}
    />
  {:else if type === "filled_multiline"}
    <TextFieldMultiline
      label="Field"
      leadingIcon={leadingIcon ? iconCircle : undefined}
      error={errored}
      disabled={!enabled}
    />
  {:else if type === "outlined_multiline"}
    <TextFieldOutlinedMultiline
      label="Field"
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
let type: "primary" | "secondary" = $state("primary");
let icons = $state(false);
let variable = $state(false);
let tab = $state("hello");

let items = $derived(
  icons
    ? [
        { icon: iconCircle, name: "Hello", value: "hello" },
        { icon: iconSquare, name: "World", value: "world" },
        { icon: iconTriangle, name: "The longest item", value: "long" },
      ]
    : [
        { name: "Hello", value: "hello" },
        { name: "World", value: "world" },
        { name: "The longest item", value: "long" },
      ],
);
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
<DateField label="Date" bind:value />
<DateFieldOutlined label="Date" bind:value />
```

Full demo:

```use
DateField
DateFieldOutlined
```

```ts
let variant: "filled" | "outlined" = $state("filled");
let enabled = $state(true);
let errored = $state(false);
```

```svelte
<label>
  <Arrows list={["filled", "outlined"]} bind:value={variant} />
  {variant[0].toUpperCase() + variant.slice(1)}
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
  {#if variant === "filled"}
    <DateField label="Date" disabled={!enabled} error={errored} />
  {:else}
    <DateFieldOutlined label="Date" disabled={!enabled} error={errored} />
  {/if}
{/snippet}
```

## UI transitions

Minimal demo:

```svelte
<script>
  import { containerTransform, sharedAxisTransition } from "m3-svelte";
</script>
```

Full demo:

```use

```

```ts
import { containerTransform, sharedAxisTransition } from "$lib/misc/animation";
let mode: "X" | "Y" | "Z" | "container" = $state("X");
let affected = $state(false);
const [send, receive] = containerTransform({ duration: 1000 });
```

```svelte
<label>
  <Arrows list={["X", "Y", "Z", "container"]} bind:value={mode} />
  {mode[0].toUpperCase() + mode.slice(1)}
</label>

{#snippet demo()}
  <article>
    {#if mode == "container"}
      {#if affected}
        <div class="expanded" in:receive={{ key: "container" }} out:send={{ key: "container" }}>
          <p>More info now!</p>
          <button onclick={() => (affected = false)}>Close</button>
        </div>
      {:else}
        <button
          class="btn"
          onclick={() => (affected = true)}
          in:receive={{ key: "container" }}
          out:send={{ key: "container" }}
        >
          Click
        </button>
      {/if}
    {:else if mode == "Z"}
      {#if affected}
        <div
          class="pane"
          in:sharedAxisTransition={{
            direction: "Z",
            leaving: false,
          }}
          out:sharedAxisTransition={{
            direction: "Z",
            leaving: true,
          }}
        >
          <button class="btn" onclick={() => (affected = false)}> Beta </button>
        </div>
      {:else}
        <div
          class="pane"
          in:sharedAxisTransition={{
            direction: "Z",
            leaving: false,
          }}
          out:sharedAxisTransition={{
            direction: "Z",
            leaving: true,
          }}
        >
          <button class="btn" onclick={() => (affected = true)}> Alpha </button>
        </div>
      {/if}
    {:else if affected}
      <div
        class="pane"
        transition:sharedAxisTransition={{
          direction: mode,
          rightSeam: false,
        }}
      >
        <button class="btn" onclick={() => (affected = false)}> Beta </button>
      </div>
    {:else}
      <div
        class="pane"
        transition:sharedAxisTransition={{
          direction: mode,
          rightSeam: true,
        }}
      >
        <button class="btn" onclick={() => (affected = true)}> Alpha </button>
      </div>
    {/if}
  </article>
{/snippet}

<style>
  article {
    display: grid;
    height: 4rem;
    > * {
      grid-column: 1;
      grid-row: 1;
    }
  }
  .pane {
    display: grid;
    background-color: var(--m3c-background);
    overflow: hidden;
  }
  .btn {
    @apply --m3-label-large;
    display: flex;
    align-items: center;
    place-self: center;

    background-color: var(--m3c-primary);
    color: var(--m3c-on-primary);
    border: none;
    height: 2.5rem;
    border-radius: 1.25rem;
    padding: 0 1rem;
    cursor: pointer;
  }
  .expanded {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-image: linear-gradient(
      to bottom right,
      var(--m3c-primary-container-subtle),
      var(--m3c-tertiary-container-subtle)
    );
    > p {
      margin: 0;
    }
    > button {
      background-color: unset;
      border: none;
      padding: 0;
      margin: 0;
      font: unset;
      font-weight: bold;
      text-align: start;
      cursor: pointer;
    }
  }
</style>
```

## Icons

Minimal demo:

```svelte
<script>
  import iconCircle from "@ktibow/iconset-material-symbols/circle-outline";
</script>

<Icon icon={iconCircle} />
```

Full demo:

```use
Icon
Slider
```

```ts
let size = $state(24);
```

```svelte
<Slider bind:value={size} min={16} max={96} format={(n) => n.toFixed(0) + "px"} />

{#snippet demo()}
  <div style:display="flex" style:gap="1rem" style:align-items="center" style:justify-content="center">
    <Icon icon={iconCircle} {size} />
    <Icon icon={iconSquare} {size} />
    <Icon icon={iconTriangle} {size} />
  </div>
{/snippet}
```

## Shapes

Minimal demo:

```svelte
<script>
  import { squarePath } from "m3-svelte";
</script>

<!-- go use it in an svg -->
```

Full demo:

```use
Button
```

```ts
import iconGo from "@ktibow/iconset-material-symbols/arrow-forward-rounded";
import * as _paths from "$lib/misc/shapes";
import * as _pathsAnimatable from "$lib/misc/shapesAnimatable";
import * as _pathsAnimatableSmall from "$lib/misc/shapesAnimatableSmall";
import { snackbar } from "$lib/containers/Snackbar.svelte";
import ShapeSelector from "/src/routes/ShapeSelector.svelte";

const paths = _paths as Record<string, string>;
const pathsAnimatable = _pathsAnimatable as Record<string, string>;
const pathsAnimatableSmall = _pathsAnimatableSmall as Record<string, string>;
let shape = $state("pathArch");
let mode: "normal" | "animatable" | "animatable small" = $state("normal");
```

```svelte
<ShapeSelector style="background-color:var(--m3c-surface-container)" bind:shape />
<label>
  <Arrows list={["normal", "animatable", "animatable small"]} bind:value={mode} />
  {mode[0].toUpperCase() + mode.slice(1)} paths
</label>

{#snippet demo()}
  <svg width="4rem" height="4rem" style:margin="auto" viewBox={mode == "animatable small" ? "0 0 48 48" : "0 0 380 380"}>
    <path class="shape" d="{mode == "animatable small" ? pathsAnimatableSmall[shape.replace("path", "pathAnimatableSmall")] : mode == "animatable" ? pathsAnimatable[shape.replace("path", "pathAnimatable")] : paths[shape]}" fill="var(--m3c-primary)" />
  </svg>
{/snippet}

<style>
  path.shape {
    transition: d 200ms;
  }
</style>
```
