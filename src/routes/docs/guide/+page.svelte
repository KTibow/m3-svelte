<script lang="ts">
  import { base } from "$app/paths";
  import Base from "../Base.svelte";
  import Snippet from "../Snippet.svelte";
</script>

<Base>
  <p class="m3-font-body-large">
    This is an overview of M3 Svelte. This page is also available <a href="{base}/llms.txt">raw</a>.
  </p>

  <div class="content">
    <div class="category">
      <h2 class="m3-font-headline-medium">Buttons</h2>
      <ul class="component-list">
        <li>Button</li>
        <li>ButtonLink</li>
        <li>SegmentedButtonContainer</li>
        <li>SegmentedButtonItem</li>
        <li>FAB</li>
      </ul>
    </div>
    <div class="section">
      <h3>Button</h3>
      <p>Types: elevated, filled, tonal, outlined, text</p>
      <p>Optional icon: none, left, full</p>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLButtonAttributes</li>
        <li>iconType: "none" | "left" | "full"</li>
        <li>type: "elevated" | "filled" | "tonal" | "outlined" | "text";</li>
        <li>disabled: boolean</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Button type="filled" on:click={() => alert("Hello world!")}>
  Click me
${"<"}/Button>`} lang="xml" />
    </div>
    <div class="section">
      <h3>ButtonLink</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAnchorAttributes</li>
        <li>iconType: "none" | "left" | "full"</li>
        <li>type: "elevated" | "filled" | "tonal" | "outlined" | "text";</li>
        <li>href: string;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>SegmentedButtonContainer</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}SegmentedButtonContainer>
  ${"<"}input type="radio" name="group" id="tab-a" checked />
  ${"<"}SegmentedButtonItem input="tab-a">Tab A${"<"}/SegmentedButtonItem>
  ${"<"}input type="radio" name="group" id="tab-b" />
  ${"<"}SegmentedButtonItem input="tab-b">Tab B${"<"}/SegmentedButtonItem>
${"<"}/SegmentedButtonContainer>`} lang="xml" />
    </div>
    <div class="section">
      <h3>SegmentedButtonItem</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLLabelAttributes</li>
        <li>input: string;</li>
        <li>icon: IconifyIcon | undefined</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>FAB</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLButtonAttributes</li>
        <li>color: "primary" | "surface" | "secondary" | "tertiary"</li>
        <li>size: "small" | "normal" | "large"</li>
        <li>elevation: "normal" | "lowered" | "none"</li>
        <li>icon: IconifyIcon | undefined</li>
        <li>text: string | undefined</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}FAB
  color="primary"
  size="normal"
  icon={iconEdit}
  text="Hello"
/>`} lang="xml" />
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Containers</h2>
      <ul class="component-list">
        <li>Card</li>
        <li>CardClickable</li>
        <li>Dialog</li>
        <li>Snackbar</li>
        <li>SnackbarAnim</li>
        <li>SnackbarItem</li>
        <li>BottomSheet</li>
        <li>ListItem</li>
        <li>ListItemButton</li>
        <li>ListItemLabel</li>
        <li>Menu</li>
        <li>MenuItem</li>
      </ul>
    </div>
    <div class="section">
      <h3>Card</h3>
      <p>Types: elevated, filled, outlined</p>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt; & HTMLButtonAttributes</li>
        <li>type: "elevated" | "filled" | "outlined";</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Card type="elevated">Hello${"<"}/Card>
${"<"}CardClickable type="elevated">Click me${"<"}/CardClickable>`} lang="xml" />
    </div>
    <div class="section">
      <h3>CardClickable</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt; & HTMLButtonAttributes</li>
        <li>type: "elevated" | "filled" | "outlined";</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>Dialog</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLDialogAttributes</li>
        <li>icon: IconifyIcon | undefined</li>
        <li>headline: string;</li>
        <li>open: boolean;</li>
        <li>closeOnEsc: boolean</li>
        <li>closeOnClick: boolean</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
        <li>buttons</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Dialog icon={iconTrash} headline="Delete?" bind:open>
  Delete these items?
  ${"<"}svelte:fragment slot="buttons">
    ${"<"}Button type="text" on:click={() => (open = false)}>Cancel${"<"}/Button>
    ${"<"}Button type="tonal" on:click={() => (open = false)}>Delete${"<"}/Button>
  ${"<"}/svelte:fragment>
${"<"}/Dialog>`} lang="xml" />
    </div>
    <div class="section">
      <h3>Snackbar</h3>
      <h4>Props</h4>
      <ul>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: ComponentProps&lt;SnackbarItem&gt;</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}script>
let snackbar: (data: SnackbarIn) => void;
${"<"}/script>
${"<"}Button on:click={() => snackbar({
  message: "Hello",
  actions: { Undo: () => {} },
  closable: true
})}>Show${"<"}/Button>
${"<"}Snackbar bind:show={snackbar} />`} lang="xml" />
      <h4>Tips</h4>
      <p>Set the CSS variable `--m3-util-bottom-offset` to a size to move all snackbars upwards.</p>
    </div>
    <div class="section">
      <h3>SnackbarAnim</h3>
      <h4>Props</h4>
      <ul>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: ComponentProps&lt;SnackbarItem&gt;</li>
      </ul>
    </div>
    <div class="section">
      <h3>SnackbarItem</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>BottomSheet</h3>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>ListItem</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>overline: string</li>
        <li>headline: string</li>
        <li>supporting: string</li>
        <li>lines: number | undefined</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>leading</li>
        <li>trailing</li>
      </ul>
    </div>
    <div class="section">
      <h3>ListItemButton</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLButtonAttributes</li>
        <li>overline: string</li>
        <li>headline: string</li>
        <li>supporting: string</li>
        <li>lines: number | undefined</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>leading</li>
        <li>trailing</li>
      </ul>
    </div>
    <div class="section">
      <h3>ListItemLabel</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLLabelAttributes</li>
        <li>overline: string</li>
        <li>headline: string</li>
        <li>supporting: string</li>
        <li>lines: number | undefined</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>leading</li>
        <li>trailing</li>
      </ul>
    </div>
    <div class="section">
      <h3>Menu</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Menu>
  ${"<"}MenuItem icon={iconUndo}>Undo${"<"}/MenuItem>
  ${"<"}MenuItem icon={iconRedo} disabled>Redo${"<"}/MenuItem>
${"<"}/Menu>`} lang="xml" />
    </div>
    <div class="section">
      <h3>MenuItem</h3>
      <h4>Props</h4>
      <ul>
        <li>icon: IconifyIcon | "space" | undefined</li>
        <li>disabled: boolean</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Progress</h2>
      <ul class="component-list">
        <li>LinearProgress</li>
        <li>LinearProgressIndeterminate</li>
        <li>CircularProgress</li>
        <li>CircularProgressIndeterminate</li>
      </ul>
    </div>
    <div class="section">
      <h3>LinearProgress</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>percent: number;</li>
      </ul>
    </div>
    <div class="section">
      <h3>LinearProgressIndeterminate</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
      </ul>
    </div>
    <div class="section">
      <h3>CircularProgress</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;SVGElement&gt;</li>
        <li>percent: number;</li>
      </ul>
    </div>
    <div class="section">
      <h3>CircularProgressIndeterminate</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;SVGElement&gt;</li>
      </ul>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Inputs</h2>
      <ul class="component-list">
        <li>RadioAnim1</li>
        <li>RadioAnim2</li>
        <li>RadioAnim3</li>
        <li>Checkbox</li>
        <li>CheckboxAnim</li>
        <li>Switch</li>
        <li>Slider</li>
        <li>SliderTicks</li>
      </ul>
    </div>
    <div class="section">
      <h3>Checkbox</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>CheckboxAnim</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>Switch</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>checked: boolean</li>
        <li>disabled: boolean</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Switch bind:checked />`} lang="xml" />
    </div>
    <div class="section">
      <h3>Slider</h3>
      <h4>Props</h4>
      <ul>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLInputAttributes</li>
        <li>value: number;</li>
        <li>min: number</li>
        <li>max: number</li>
        <li>step: number | "any"</li>
        <li>disabled: boolean</li>
        <li>showValue: boolean</li>
        <li>format: (n: number)</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Slider step="any" bind:value />
${"<"}SliderTicks step={1} max={6} bind:value />`} lang="xml" />
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Textfields</h2>
      <ul class="component-list">
        <li>TextField</li>
        <li>TextFieldMultiline</li>
        <li>TextFieldOutlined</li>
        <li>TextFieldOutlinedMultiline</li>
      </ul>
    </div>
    <div class="section">
      <h3>TextField</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLInputAttributes</li>
        <li>name: string;</li>
        <li>leadingIcon: IconifyIcon | undefined</li>
        <li>trailingIcon: IconifyIcon | undefined</li>
        <li>disabled: boolean</li>
        <li>required: boolean</li>
        <li>error: boolean</li>
        <li>value: string</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}TextField
  name="Field"
  leadingIcon={iconEdit}
  error={false}
  disabled={false}
/>`} lang="xml" />
      <h4>Tips</h4>
      <p>For outlined text fields on a surface that isn't the default background, set the CSS variable `--m3-util-background` to the current background make the text field fit in.</p>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Pickers</h2>
      <ul class="component-list">
        <li>DatePickerDocked</li>
      </ul>
    </div>
    <div class="section">
      <h3>DatePickerDocked</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>date: string</li>
        <li>clearable: boolean;</li>
        <li>focusedMonth: number</li>
        <li>dateValidator: (date: string)</li>
      </ul>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Chips</h2>
      <ul class="component-list">
        <li>Chip</li>
      </ul>
    </div>
    <div class="section">
      <h3>Chip</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLButtonAttributes</li>
        <li>type: "input" | "assist" | "general";</li>
        <li>icon: IconifyIcon | null</li>
        <li>trailingIcon: IconifyIcon | null</li>
        <li>elevated: boolean</li>
        <li>disabled: boolean</li>
        <li>selected: boolean</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Nav</h2>
      <ul class="component-list">
        <li>NavDrawer</li>
        <li>NavDrawerButton</li>
        <li>NavDrawerLink</li>
        <li>NavList</li>
        <li>NavListButton</li>
        <li>NavListLink</li>
        <li>Tabs</li>
        <li>TabsLink</li>
        <li>VariableTabs</li>
        <li>VariableTabsLink</li>
      </ul>
    </div>
    <div class="section">
      <h3>NavDrawer</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLElement&gt;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>NavDrawerButton</h3>
      <h4>Props</h4>
      <ul>
        <li>selected: boolean;</li>
        <li>extraOptions: HTMLButtonAttributes</li>
        <li>icon: IconifyIcon;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>NavDrawerLink</h3>
      <h4>Props</h4>
      <ul>
        <li>href: string;</li>
        <li>selected: boolean;</li>
        <li>extraOptions: HTMLAnchorAttributes</li>
        <li>icon: IconifyIcon;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>NavList</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAttributes&lt;HTMLElement&gt;</li>
        <li>type: "rail" | "bar" | "auto";</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>NavListButton</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLButtonAttributes</li>
        <li>type: "rail" | "bar" | "auto";</li>
        <li>selected: boolean;</li>
        <li>icon: IconifyIcon;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>NavListLink</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraOptions: HTMLAnchorAttributes</li>
        <li>type: "rail" | "bar" | "auto";</li>
        <li>href: string;</li>
        <li>selected: boolean;</li>
        <li>icon: IconifyIcon;</li>
      </ul>
      <h4>Slots</h4>
      <ul>
        <li>default</li>
      </ul>
    </div>
    <div class="section">
      <h3>Tabs</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLInputAttributes</li>
        <li>secondary: boolean</li>
        <li>tab: string;</li>
        <li>items: &#123;</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}Tabs bind:tab secondary={false} items={[
  { name: "Tab 1", value: "tab1" },
  { name: "Tab 2", value: "tab2" }
]} />`} lang="xml" />
    </div>
    <div class="section">
      <h3>TabsLink</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLAnchorAttributes</li>
        <li>secondary: boolean</li>
        <li>tab: string;</li>
        <li>items: &#123;</li>
      </ul>
    </div>
    <div class="section">
      <h3>VariableTabs</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLInputAttributes</li>
        <li>secondary: boolean</li>
        <li>tab: string;</li>
        <li>items: &#123;</li>
      </ul>
    </div>
    <div class="section">
      <h3>VariableTabsLink</h3>
      <h4>Props</h4>
      <ul>
        <li>display: string</li>
        <li>extraWrapperOptions: HTMLAttributes&lt;HTMLDivElement&gt;</li>
        <li>extraOptions: HTMLAnchorAttributes</li>
        <li>secondary: boolean</li>
        <li>tab: string;</li>
        <li>items: &#123;</li>
      </ul>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Utils</h2>
      <ul class="component-list">
        <li>ChipChooser</li>
        <li>Divider</li>
        <li>DateField</li>
      </ul>
    </div>
    <div class="section">
      <h3>ChipChooser</h3>
      <h4>Props</h4>
      <ul>
        <li>options: &#123; label: string; value: string; icon?: IconifyIcon &#125;[];</li>
        <li>chosenOptions: string[]</li>
      </ul>
    </div>
    <div class="section">
      <h3>Divider</h3>
      <h4>Props</h4>
      <ul>
        <li>inset: boolean</li>
      </ul>
    </div>
    <div class="section">
      <h3>DateField</h3>
      <h4>Props</h4>
      <ul>
        <li>name: string;</li>
        <li>date: string</li>
        <li>required: boolean</li>
        <li>disabled: boolean</li>
        <li>extraOptions: HTMLInputAttributes</li>
      </ul>
      <h4>Examples</h4>
      <Snippet code={`${"<"}DateField name="Date" bind:date />`} lang="xml" />
      <h4>Tips</h4>
      <p>This component is like DatePickerDocked but it has a field and it's easier to use</p>
    </div>
    <div class="category">
      <h2 class="m3-font-headline-medium">Misc</h2>
      <ul class="component-list">
        <li>StyleFromScheme</li>
        <li>Icon</li>
        <li>Layer</li>
      </ul>
    </div>
    <div class="section">
      <h3>StyleFromScheme</h3>
      <h4>Props</h4>
      <ul>
        <li>lightScheme: SerializedScheme;</li>
        <li>darkScheme: SerializedScheme;</li>
      </ul>
    </div>
    <div class="section">
      <h3>Layer</h3>
    </div>
  </div>
</Base>

<style>
  .content {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 2rem;
  }

  .category {
    background: rgb(var(--m3-scheme-surface-container-lowest));
    padding: 1.5rem;
    border-radius: var(--m3-util-rounding-large);
    transition: background-color 0.2s;
  }
  .component-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;
  }
  .component-list li {
    padding: 0.25rem 0;
  }

  .section {
    background: rgb(var(--m3-scheme-surface-container));
    padding: 1.5rem;
    border-radius: var(--m3-util-rounding-large);
  }
  h2 {
    margin: 0;
  }
  h3 {
    margin: 0 0 1rem 0;
  }
  h4 {
    margin: 1.5rem 0 0.5rem 0;
  }
  p {
    margin: 0.5rem 0;
  }
  ul {
    margin: 0.5rem 0;
  }
  a {
    color: rgb(var(--m3-scheme-primary));
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>