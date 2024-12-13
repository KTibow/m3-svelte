import { readFileSync, writeFileSync } from "node:fs";
import glob from "fast-glob";

// Helper to read a file and extract its props
function extractProps(content: string, file: string): string[] {
  const props: string[] = [];
  const exportMatches = content.matchAll(
    /export\s+let\s+(\w+)(?::\s*([^=\n]+))?(?:\s*=\s*([^;\n]+))?/g,
  );
  let anyTypeCount = 0;
  for (const match of exportMatches) {
    const [, name, type = "", defaultValue] = match;
    let inferredType = type.trim();
    if (!inferredType && defaultValue) {
      if (defaultValue === "false" || defaultValue === "true") {
        inferredType = "boolean";
      } else if (!isNaN(Number(defaultValue))) {
        inferredType = "number";
      } else if (defaultValue.startsWith('"') || defaultValue.startsWith("'")) {
        inferredType = "string";
      }
    }
    if (!inferredType) {
      console.warn(`⚠️ Warning: No type found for prop '${name}' in ${file}`);
      anyTypeCount++;
    }
    const prop = `${name}: ${inferredType || "any"}`;
    props.push(prop);
  }
  if (anyTypeCount > 0) {
    console.warn(`⚠️ Found ${anyTypeCount} props with implicit 'any' type in ${file}`);
  }
  return props;
}

// Helper to format props for documentation
function formatProps(props: string[]): string {
  if (props.length === 0) return "";
  return (
    "- Props:\n" +
    props
      .map((prop) => {
        const [name, type] = prop.split(":").map((s) => s.trim());
        return `  - ${name.replace("?", "")}: ${type.replace(";", "")}`;
      })
      .join("\n")
  );
}

// Helper to extract slots from a component file
function extractSlots(content: string): string[] {
  const slots: string[] = [];
  const slotMatches = content.matchAll(/<slot(?:\s+name="([^"]+)")?\s*\/?\s*>/g);
  for (const match of slotMatches) {
    const slotName = match[1] || "default";
    if (!slots.includes(slotName)) {
      slots.push(slotName);
    }
  }
  return slots;
}

// Data structures
const components = {
  buttons: ["Button", "ButtonLink", "SegmentedButtonContainer", "SegmentedButtonItem", "FAB"],
  containers: [
    "Card",
    "CardClickable",
    "Dialog",
    "Snackbar",
    "SnackbarAnim",
    "SnackbarItem",
    "BottomSheet",
    "ListItem",
    "ListItemButton",
    "ListItemLabel",
    "Menu",
    "MenuItem",
  ],
  progress: [
    "LinearProgress",
    "LinearProgressIndeterminate",
    "CircularProgress",
    "CircularProgressIndeterminate",
  ],
  inputs: [
    "RadioAnim1",
    "RadioAnim2",
    "RadioAnim3",
    "Checkbox",
    "CheckboxAnim",
    "Switch",
    "Slider",
    "SliderTicks",
  ],
  textfields: [
    "TextField",
    "TextFieldMultiline",
    "TextFieldOutlined",
    "TextFieldOutlinedMultiline",
  ],
  pickers: ["DatePickerDocked"],
  chips: ["Chip"],
  nav: [
    "NavDrawer",
    "NavDrawerButton",
    "NavDrawerLink",
    "NavList",
    "NavListButton",
    "NavListLink",
    "Tabs",
    "TabsLink",
    "VariableTabs",
    "VariableTabsLink",
  ],
  utils: ["ChipChooser", "Divider", "DateField"],
  misc: ["StyleFromScheme", "Icon", "Layer"],
};

const examples = {
  Button: `<Button type="filled" on:click={() => alert("Hello world!")}>
  Click me
</Button>`,
  Card: `<Card type="elevated">Hello</Card>
<CardClickable type="elevated">Click me</CardClickable>`,
  Dialog: `<Dialog icon={iconTrash} headline="Delete?" bind:open>
  Delete these items?
  <svelte:fragment slot="buttons">
    <Button type="text" on:click={() => (open = false)}>Cancel</Button>
    <Button type="tonal" on:click={() => (open = false)}>Delete</Button>
  </svelte:fragment>
</Dialog>`,
  Snackbar: `<script>
let snackbar: (data: SnackbarIn) => void;
</script>
<Button on:click={() => snackbar({
  message: "Hello",
  actions: { Undo: () => {} },
  closable: true
})}>Show</Button>
<Snackbar bind:show={snackbar} />`,
  TextField: `<TextField
  name="Field"
  leadingIcon={iconEdit}
  error={false}
  disabled={false}
/>`,
  DateField: `<DateField name="Date" bind:date />`,
  FAB: `<FAB
  color="primary"
  size="normal"
  icon={iconEdit}
  text="Hello"
/>`,
  Menu: `<Menu>
  <MenuItem icon={iconUndo}>Undo</MenuItem>
  <MenuItem icon={iconRedo} disabled>Redo</MenuItem>
</Menu>`,
  SegmentedButtonContainer: `<SegmentedButtonContainer>
  <input type="radio" name="group" id="tab-a" checked />
  <SegmentedButtonItem input="tab-a">Tab A</SegmentedButtonItem>
  <input type="radio" name="group" id="tab-b" />
  <SegmentedButtonItem input="tab-b">Tab B</SegmentedButtonItem>
</SegmentedButtonContainer>`,
  RadioAnim1: `<RadioAnim1>
  <input type="radio" name="a-group" value="1" bind:group={value} />
</RadioAnim1>`,
  Switch: `<Switch bind:checked />`,
  Slider: `<Slider step="any" bind:value />
<SliderTicks step={1} max={6} bind:value />`,
  Tabs: `<Tabs bind:tab secondary={false} items={[
  { name: "Tab 1", value: "tab1" },
  { name: "Tab 2", value: "tab2" }
]} />`,
};

const tips = {
  Snackbar:
    "Set the CSS variable `--m3-util-bottom-offset` to a size to move all snackbars upwards.",
  TextField:
    "For outlined text fields on a surface that isn't the default background, set the CSS variable `--m3-util-background` to the current background make the text field fit in.",
  DateField: "This component is like DatePickerDocked but it has a field and it's easier to use",
};

const componentDocs = {
  Button: {
    types: ["elevated", "filled", "tonal", "outlined", "text"],
    iconTypes: ["none", "left", "full"],
  },
  Card: {
    types: ["elevated", "filled", "outlined"],
  },
  TextField: {
    variants: [
      { name: "TextField", component: "TextField" },
      { name: "Multiline", component: "TextFieldMultiline" },
      { name: "Outlined", component: "TextFieldOutlined" },
      { name: "Outlined Multiline", component: "TextFieldOutlinedMultiline" },
    ],
  },
  RadioAnim1: {
    variants: [
      { name: "Style 1", component: "RadioAnim1" },
      { name: "Style 2", component: "RadioAnim2" },
      { name: "Style 3", component: "RadioAnim3" },
    ],
  },
  Slider: {
    variants: [
      { name: "Continuous", component: "Slider" },
      { name: "With Ticks", component: "SliderTicks" },
    ],
  },
};

// Extracts all component data
async function extractComponentData() {
  const componentFiles = await glob("src/lib/**/*.svelte", {
    ignore: ["**/+*.svelte", "**/forms/_picker/**"],
  });

  // Check for files that should exist but don't
  for (const [, items] of Object.entries(components)) {
    for (const item of items) {
      const searchName = item === "Icon" ? "_icon" : item;
      const matchingFiles = componentFiles.filter((f) => f.includes(`/${searchName}.svelte`));
      if (matchingFiles.length === 0) {
        console.warn(`⚠️ Warning: Listed component '${item}' not found in filesystem`);
      } else if (matchingFiles.length > 1) {
        console.warn(`⚠️ Warning: Multiple files found for component '${item}':`, matchingFiles);
      }
    }
  }

  const componentData = [];

  for (const file of componentFiles) {
    const content = readFileSync(file, "utf-8");
    const componentName = file.split("/").pop()?.replace(".svelte", "");

    if (!componentName || componentName.startsWith("_")) continue;

    const props = extractProps(content, file);
    const slots = extractSlots(content);
    const specs = componentDocs[componentName];

    // Skip variants that will be documented under main component
    if (
      specs?.variants?.some((v) => v.component !== componentName && v.component === componentName)
    ) {
      continue;
    }

    let isVariant = false;
    for (const [mainComponent, mainSpecs] of Object.entries(componentDocs)) {
      if (
        mainSpecs.variants?.some(
          (v) => v.component === componentName && mainComponent !== componentName,
        )
      ) {
        isVariant = true;
        break;
      }
    }
    if (isVariant) continue;

    const displayName = specs?.variants?.some((v) => v.component === componentName)
      ? componentName.replace(/[123]$/, "")
      : componentName;

    let variantProps = {};
    if (specs?.variants) {
      for (const variant of specs.variants) {
        const variantFiles = await glob(`src/lib/**/${variant.component}.svelte`);
        if (variantFiles.length === 0) {
          console.warn(`⚠️ Warning: Variant component '${variant.component}' not found`);
          continue;
        }
        const variantContent = readFileSync(variantFiles[0], "utf-8");
        variantProps[variant.name] = extractProps(variantContent, variantFiles[0]);
      }
    }

    componentData.push({
      name: componentName,
      displayName,
      props,
      slots,
      specs,
      variantProps,
      example: examples[componentName],
      tip: tips[componentName],
    });
  }

  return componentData;
}

// Generates documentation from component data
function formatDocumentation(componentData) {
  let doc = `# M3 Svelte\n\n## Importing components\n\n\`\`\`svelte\nimport { ComponentName } from "m3-svelte";\n\`\`\`\n\n## Available components\n\n`;

  for (const [category, items] of Object.entries(components)) {
    doc += `**${category.charAt(0).toUpperCase() + category.slice(1)}**\n`;
    for (const item of items) {
      doc += `- ${item}\n`;
    }
    doc += "\n";
  }

  doc += "## Components\n\n";

  for (const component of componentData) {
    const { displayName, props, slots, specs, variantProps, example, tip } = component;

    doc += `### ${displayName}\n`;

    if (specs) {
      if (specs.types) {
        doc += `- Types: ${specs.types.join(", ")}\n`;
      }
      if (specs.iconTypes) {
        doc += `- Optional icon: ${specs.iconTypes.join(", ")}\n`;
      }
      if (specs.variants) {
        doc += `- Variants: ${specs.variants.map((v) => `${v.name} (${v.component})`).join(", ")}\n`;

        const baseProps = new Set(variantProps[specs.variants[0].name]);
        const differences = specs.variants.slice(1).some((v) => {
          const varProps = new Set(variantProps[v.name]);
          return (
            ![...baseProps].every((p) => varProps.has(p)) ||
            ![...varProps].every((p) => baseProps.has(p))
          );
        });

        if (differences) {
          doc += "- Variant-specific props:\n";
          for (const variant of specs.variants) {
            const varProps = variantProps[variant.name];
            if (varProps?.length) {
              doc += `  ${variant.name}:\n${formatProps(varProps)
                .split("\n")
                .map((l) => "  " + l)
                .join("\n")}\n`;
            }
          }
        }
      }
    }

    const formattedProps = formatProps(props);
    if (formattedProps) {
      doc += formattedProps + "\n";
    }

    const formattedSlots =
      slots.length == 1 && slots[0] == "default"
        ? `- Has a slot`
        : slots.length
          ? "- Slots:\n" + slots.map((slot) => `  - ${slot}`).join("\n")
          : "";

    if (formattedSlots) {
      doc += formattedSlots + "\n";
    }

    if (example) {
      doc += "Example:\n```svelte\n" + example + "\n```\n";
    }

    if (tip) {
      doc += "Tip:\n" + tip.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;") + "\n";
    }
    doc += "\n";
  }

  return doc;
}

// Extract all component data
const componentData = await extractComponentData();
const doc = formatDocumentation(componentData);

// Write raw docs
writeFileSync("static/llms.txt", doc);

// Generate Svelte page
let sveltePage = `<script lang="ts">
  import { base } from "$app/paths";
  import Base from "../Base.svelte";
  import Snippet from "../Snippet.svelte";
</script>

<Base>
  <p class="m3-font-body-large">
    This is an overview of M3 Svelte. This page is also available <a href="{base}/llms.txt">raw</a>.
  </p>

  <div class="content">`;

// Combine categories with their component documentation
for (const [category, items] of Object.entries(components)) {
  sveltePage += `
    <div class="category">
      <h2 class="m3-font-headline-medium">${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <ul class="component-list">`;
  for (const item of items) {
    sveltePage += `\n        <li>${item}</li>`;
  }
  sveltePage += `\n      </ul>
    </div>`;

  // Add documentation for components in this category, maintaining the same order as the list
  for (const componentName of items) {
    const component = componentData.find((c) => c.displayName === componentName);
    if (!component) continue;
    const { displayName, props, slots, specs, example, tip } = component;

    sveltePage += `\n    <div class="section">
      <h3>${displayName}</h3>`;

    if (specs?.types) {
      sveltePage += `\n      <p>Types: ${specs.types.join(", ")}</p>`;
    }
    if (specs?.iconTypes) {
      sveltePage += `\n      <p>Optional icon: ${specs.iconTypes.join(", ")}</p>`;
    }

    if (props.length > 0) {
      sveltePage += `\n      <h4>Props</h4>\n      <ul>`;
      for (const prop of props) {
        // Escape angle brackets in prop types for display
        // Escape angle brackets and curly braces in prop types for display
        const escapedProp = prop
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\{/g, "&#123;")
          .replace(/\}/g, "&#125;");
        sveltePage += `\n        <li>${escapedProp}</li>`;
      }
      sveltePage += `\n      </ul>`;
    }

    if (slots.length > 0) {
      sveltePage += `\n      <h4>Slots</h4>\n      <ul>`;
      for (const slot of slots) {
        sveltePage += `\n        <li>${slot}</li>`;
      }
      sveltePage += `\n      </ul>`;
    }

    if (example) {
      sveltePage += `\n      <h4>Examples</h4>
      <Snippet code={\`${example}\`} lang="xml" />`;
    }

    if (tip) {
      sveltePage += `\n      <h4>Tips</h4>\n      <p>${tip.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;")}</p>`;
    }

    sveltePage += `\n    </div>`;
  }
}

sveltePage += `\n  </div>
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
</style>`;

// Write Svelte page
writeFileSync("src/routes/docs/guide/+page.svelte", sveltePage);
