import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
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

async function generateDocs() {
  const components = {
    misc: ["StyleFromScheme", "Icon", "Layer"], // Use exported name, not filename
    buttons: ["Button", "ButtonLink", "SegmentedButtonContainer", "SegmentedButtonItem", "FAB"],
    containers: [
      "BottomSheet",
      "Card",
      "CardClickable",
      "Dialog",
      "ListItem",
      "ListItemButton",
      "ListItemLabel",
      "Menu",
      "MenuItem",
      "Snackbar",
      "SnackbarAnim",
      "SnackbarItem",
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
  };

  // Check for components in index.ts that aren't categorized
  const indexContent = readFileSync("src/lib/index.ts", "utf-8");
  // Match both direct exports and renamed exports
  const exportedComponents = [
    ...indexContent.matchAll(/export\s+{\s*default\s+as\s+(\w+)\s*}/g),
    ...indexContent.matchAll(/export\s*{\s*default\s+as\s+(\w+)\s*}\s*from/g),
  ].map((match) => match[1]);

  const categorizedComponents = new Set(Object.values(components).flat());

  const uncategorizedComponents = exportedComponents.filter(
    (comp) => !categorizedComponents.has(comp),
  );

  if (uncategorizedComponents.length > 0) {
    console.warn(
      "⚠️ Warning: Found uncategorized components in index.ts:",
      uncategorizedComponents,
    );
  }

  let doc = `# M3 Svelte

## Importing components

\`\`\`svelte
import { ComponentName } from "m3-svelte";
\`\`\`

## Available components\n\n`;

  // List all components by category
  for (const [category, items] of Object.entries(components)) {
    doc += `**${category.charAt(0).toUpperCase() + category.slice(1)}**\n`;
    for (const item of items) {
      doc += `- ${item}\n`;
    }
    doc += "\n";
  }

  doc += "## Components\n\n";

  // Generate detailed docs for each component
  const componentFiles = await glob("src/lib/**/*.svelte", {
    ignore: ["**/+*.svelte", "**/forms/_picker/**"],
  });

  // Check for files that should exist but don't
  for (const [, items] of Object.entries(components)) {
    for (const item of items) {
      // Handle special case for Icon which is _icon.svelte
      const searchName = item === "Icon" ? "_icon" : item;
      const matchingFiles = componentFiles.filter((f) => f.includes(`/${searchName}.svelte`));
      if (matchingFiles.length === 0) {
        console.warn(`⚠️ Warning: Listed component '${item}' not found in filesystem`);
      } else if (matchingFiles.length > 1) {
        console.warn(`⚠️ Warning: Multiple files found for component '${item}':`, matchingFiles);
      }
    }
  }

  // Extract slots from a component file
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

  // Common examples and tips
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

  // Tips for specific components
  const tips = {
    Snackbar:
      "Set the CSS variable `--m3-util-bottom-offset` to a size to move all snackbars upwards.",
    TextField:
      "For outlined text fields on a surface that isn't the default background, set the CSS variable `--m3-util-background` to the current background make the text field fit in.",
    DateField: "This component is like DatePickerDocked but it has a field and it's easier to use",
  };

  // Component-specific documentation
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

  // Generate detailed docs for each component
  for (const file of componentFiles) {
    const content = readFileSync(file, "utf-8");
    const componentName = file.split("/").pop()?.replace(".svelte", "");

    if (!componentName || componentName.startsWith("_")) continue;

    const props = extractProps(content, file);
    const formattedProps = formatProps(props);

    // Extract and format slots
    const slots = extractSlots(content);
    const formattedSlots =
      slots.length == 1 && slots[0] == "default"
        ? `- Has a slot`
        : slots.length
          ? "- Slots:\n" + slots.map((slot) => `  - ${slot}`).join("\n")
          : "";

    // Skip variants as they'll be documented under their main component
    const specs = componentDocs[componentName];
    if (
      specs?.variants?.some((v) => v.component !== componentName && v.component === componentName)
    ) {
      continue;
    }
    // Also skip if this component is a variant of another component
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

    // For components with variants, use a cleaner name (e.g. "RadioAnim" instead of "RadioAnim1")
    const displayName = specs?.variants?.some((v) => v.component === componentName)
      ? componentName.replace(/[123]$/, "")
      : componentName;
    doc += `### ${displayName}\n`;

    // Add component-specific documentation
    if (specs) {
      if (specs.types) {
        doc += `- Types: ${specs.types.join(", ")}\n`;
      }
      if (specs.iconTypes) {
        doc += `- Optional icon: ${specs.iconTypes.join(", ")}\n`;
      }
      if (specs.variants) {
        doc += `- Variants: ${specs.variants.map((v) => `${v.name} (${v.component})`).join(", ")}\n`;

        // Get props for each variant
        const variantProps = {};
        for (const variant of specs.variants) {
          const variantFiles = await glob(`src/lib/**/${variant.component}.svelte`);
          if (variantFiles.length === 0) {
            console.warn(`⚠️ Warning: Variant component '${variant.component}' not found`);
            continue;
          }
          const variantContent = readFileSync(variantFiles[0], "utf-8");
          variantProps[variant.name] = extractProps(variantContent, variantFiles[0]);
        }

        // Show prop differences if any
        const baseProps = new Set(variantProps[specs.variants[0].name]);
        const differences = specs.variants.slice(1).some((v) => {
          const props = new Set(variantProps[v.name]);
          return (
            ![...baseProps].every((p) => props.has(p)) || ![...props].every((p) => baseProps.has(p))
          );
        });

        if (differences) {
          doc += "- Variant-specific props:\n";
          for (const variant of specs.variants) {
            const props = variantProps[variant.name];
            if (props?.length) {
              doc += `  ${variant.name}:\n${formatProps(props)
                .split("\n")
                .map((l) => "  " + l)
                .join("\n")}\n`;
            }
          }
        }
      }
    }

    // Add props and slots
    if (formattedProps) {
      doc += formattedProps + "\n";
    }
    if (formattedSlots) {
      doc += formattedSlots + "\n";
    }

    // Add example if available
    if (examples[componentName]) {
      doc += "Example:\n```svelte\n" + examples[componentName] + "\n```\n";
    }

    // Add tips if any
    if (tips[componentName]) {
      doc += "Tip:\n" + tips[componentName] + "\n";
    }
    doc += "\n";
  }

  writeFileSync("static/llms.txt", doc);
}

generateDocs();
